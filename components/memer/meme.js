import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

import Image from "react-image-resizer";
import styled from "styled-components";

const TopText = styled.div`
  position: absolute;
  top: 25px;
  font-size: 20px;
  color: white;
  font-family: impact;
  text-shadow: 2px 2px black;
  z-index: 2;
`;

const BottomText = styled.div`
  position: absolute;
  bottom: 25px;
  font-size: 20px;
  color: white;
  font-family: impact;
  text-shadow: 2px 2px black;
  z-index: 2;
`;

const MemeContainer = styled.div`
  position: relative;
  text-align: center;
`;

const Meme = ({ topText, bottomText, url, id, submit, fullMeme }) => {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);

  const [top, setTop] = useState(topText);
  const [bottom, setBottom] = useState(bottomText);

  useEffect(() => {
    setTop(topText);
  }, [topText]);

  useEffect(() => {
    setBottom(bottomText);
  }, [bottomText]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {fullMeme === false ? (
            <MemeContainer key={`modal-${id}`}>
              <TopText style={{ fontSize: "40px" }}>{top}</TopText>
              <Image src={url} width={400} height={400} />
              <BottomText style={{ fontSize: "40px" }}>{bottom}</BottomText>
            </MemeContainer>
          ) : (
            <MemeContainer key={`modal-${id}`}>
              <Image src={url} width={400} height={400} />
              <a href={url}>Link to image</a>
            </MemeContainer>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {fullMeme === false ? (
            <Button
              variant="primary"
              onClick={() => {
                submit(id);
                handleClose();
              }}
            >
              Submit
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
      <MemeContainer onClick={() => setShow(true)} key={`div-${id}`}>
        <TopText>{topText}</TopText>
        <Image src={url} width={175} height={175} />
        <BottomText>{bottomText}</BottomText>
      </MemeContainer>
    </>
  );
};

export default Meme;
