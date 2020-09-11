import { useContext, useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import { Container } from "react-bootstrap";
import Image from "react-image-resizer";
import MainNav from "../components/navigation/MainNav";
import { ThemeContext } from "../components/context/ThemeContext";
import { useMedia } from "react-media";

export default function Animals() {
  const [showChild, setShowChild] = useState(false);
  const theme = useContext(ThemeContext);

  const GLOBAL_MEDIA_QUERIES = {
    small: "(max-width: 599px)",
    medium: "(min-width: 600px) and (max-width: 1199px)",
    large: "(min-width: 1200px)",
  };
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return <div></div>;
  }

  return (
    <div style={{ backgroundColor: theme.backgroundColor }}>
      <MainNav />
      <br />
      <div
        style={{
          width: matches.medium || matches.large ? "800px" : "360px",
          height: "95vh",
          margin: "auto",
        }}
        className="carousel-outer-div"
      >
        <Carousel showArrows={true}>
          {images.map((image) => {
            return (
              <div>
                <Image
                  src={image.src}
                  alt={image.alt}
                  height={matches.medium || matches.large ? 800 : 600}
                  width={matches.medium || matches.large ? 800 : 360}
                  className="images"
                />
                <p className="legend">{image.caption}</p>
              </div>
            );
          })}
        </Carousel>
      </div>
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
