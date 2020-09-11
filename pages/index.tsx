import { useContext, useEffect, useState } from "react";

import About from "../components/content/About";
import { Container } from "react-bootstrap";
import MainNav from "../components/navigation/MainNav";
import Projects from "../components/content/Projects";
import { ThemeContext } from "../components/context/ThemeContext";
import styled from "styled-components";

export default function Home() {
  const [showChild, setShowChild] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return <div></div>;
  }

  const HR = styled.hr`
    color: ${theme.textColor};
    height: 1px;
    background-color: ${theme.textColor};
  `;

  return (
    <div>
      <MainNav />
      <Container>
        <br></br>
        <h3>About</h3>
        <HR />
        <About />
        <h3>Projects</h3>
        <HR />
        <Projects />
      </Container>
      <style jsx global>
        {`
          body {
            background-color: ${theme.backgroundColor};
            color: ${theme.textColor};
          }
          hr {
          }
        `}
      </style>
    </div>
  );
}
