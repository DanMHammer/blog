import { Carousel, Container } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import About from "../components/content/About";
import Image from "react-image-resizer";
import MainNav from "../components/navigation/MainNav";
import Projects from "../components/content/Projects";
import { ThemeContext } from "../components/context/ThemeContext";
import styled from "styled-components";

export default function Home() {
  const [showChild, setShowChild] = useState(false);
  const { theme } = useContext(ThemeContext);

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
      <br />
      <Container>
        <Carousel
          style={{
            backgroundColor: theme.imageBackgroundColor,
            width: "700px",
            margin: "auto",
          }}
        >
          {images.map((image) => {
            return (
              <Carousel.Item>
                <Image
                  className="d-block w-100"
                  src={image.src}
                  alt={image.alt}
                  height={700}
                  width={700}
                />
                <br />
                <br />
                <br />
                <Carousel.Caption>{image.caption}</Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
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

const images = [
  {
    src: "/images/animals/mez-and-arya-desk.jpeg",
    alt: "Mez and Arya under my desk chair",
    caption: "Mez and Arya under my desk chair",
  },
  {
    src: "/images/animals/mez-bed.jpeg",
    alt: "Mez",
    caption: "Mez being adorable",
  },
  {
    src: "/images/animals/arya-ball.jpeg",
    alt: "Arya with a ball",
    caption: "Arya still struggles with fetch",
  },
  {
    src: "/images/animals/opal.jpeg",
    alt: "Opal",
    caption: "Opal likes watching trash TV with us",
  },
  {
    src: "/images/animals/lali.jpeg",
    alt: "Lali and an African Violet",
    caption: "Lali, deep in thought",
  },
  {
    src: "/images/animals/tolstoy-lali.jpeg",
    alt: "Tolstoy and Lali cuddling",
    caption:
      "Lali and Tolstoy - Do I have too many animals? Yes. Am I happy with it? Also yes.",
  },
];
