import { Col, Container, Form, FormGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import Image from "react-image-resizer";
import ImageMasonry from "react-image-masonry";
import MainNav from "../../../components/navigation/MainNav";
import Meme from "../../../components/memer/meme";
import { ThemeContext } from "../../../components/context/ThemeContext";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

export async function getServerSideProps({ query }) {
  const { id, top, bottom } = query;

  const res = await fetch(
    `http://localhost:3000/api/memer/translatify?id=${id}&top=${top}&bottom=${bottom}`
  );
  const data = await res.json();

  return {
    props: { memes: data },
  };
}

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  width: 80vw;
  margin: auto;
`;

export default function Memer({ memes }) {
  const { theme } = useContext(ThemeContext);
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
        {memes.map((meme) => {
          return (
            <>
              <Meme
                topText={null}
                bottomText={null}
                url={meme.url}
                id={null}
                fullMeme={true}
                translatify={null}
                language={meme.language}
              />
            </>
          );
        })}
      </GridWrapper>
    </div>
  );
}
