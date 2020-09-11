import { Col, Container, Form, FormGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import { GetServerSideProps } from "next";
import MainNav from "../../../components/navigation/MainNav";
import Meme from "../../../components/memer/meme";
import { MemeType } from "../../../components/interfaces/MemeInterface";
import { ThemeContext } from "../../../components/context/ThemeContext";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, top, bottom } = context.query;

  const res = await fetch(
    `http://danhammer.dev/api/memer/translatify?id=${id}&top=${top}&bottom=${bottom}`
  );
  const data = await res.json();

  return {
    props: { memes: data },
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
  const [showChild, setShowChild] = useState(false);

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
      <GridWrapper>
        {memes.map((meme: MemeType) => {
          return (
            <>
              <Meme url={meme.url} />
            </>
          );
        })}
      </GridWrapper>
    </div>
  );
}
