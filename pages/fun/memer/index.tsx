import { Col, Container, Form, FormGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import { GetStaticProps } from "next";
import MainNav from "../../../components/navigation/MainNav";
import Meme from "../../../components/memer/meme";
import { MemeType } from "../../../components/interfaces/MemeInterface";
import { ThemeContext } from "../../../components/context/ThemeContext";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://api.imgflip.com/get_memes");
  const data = await res.json();

  return {
    props: {
      memes: data.data.memes.filter((meme: MemeType) => meme.box_count === 2),
    },
  };
};

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  width: 80vw;
  margin: auto;
`;

interface Props {
  memes: MemeType[];
}

export default function Memer({ memes }: Props) {
  const theme = useContext(ThemeContext);

  const [templates, setTemplates] = useState(
    memes.sort(() => 0.5 - Math.random()).slice(0, 18)
  );

  const [topText, setTopText] = useState("Top Text");
  const [bottomText, setBottomText] = useState("Bottom Text");

  const [showChild, setShowChild] = useState(false);

  const translatify = (id: string, top: string, bottom: string): void => {
    window.location.href = `/fun/memer/result?id=${id}&top=${top}&bottom=${bottom}`;
  };

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return <div></div>;
  }

  return (
    <div style={{ backgroundColor: theme.backgroundColor, height: "100vh" }}>
      <MainNav />
      <br />
      <Form>
        <Form.Row style={{ width: "50vw", margin: "auto" }}>
          <Col>
            <Form.Control
              type="text"
              placeholder="Top text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Bottom text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
            />
          </Col>
        </Form.Row>
      </Form>
      <br />
      <GridWrapper>
        {templates.map((meme: { url: string; id: string }) => {
          return (
            <Meme
              topText={topText}
              bottomText={bottomText}
              url={meme.url}
              id={meme.id}
              fullMeme={false}
              translatify={translatify}
            />
          );
        })}
      </GridWrapper>
    </div>
  );
}
