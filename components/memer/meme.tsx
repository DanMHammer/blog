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

const Language = styled.div`
  position: absolute;
  bottom: -25px;
  font-size: 20px;
  color: white;
  font-family: impact;
  text-shadow: 2px 2px black;
  z-index: 2;
  text-align: center;
`;

interface Props {
  topText?: string;
  bottomText?: string;
  url: string;
  id?: string;
  fullMeme?: boolean;
  language?: string;
  translatify?: (id: string, top: string, bottom: string) => void;
}

const Meme = ({
  topText,
  bottomText,
  url,
  id,
  fullMeme,
  language,
  translatify,
}: Props) => {
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);

  const [top, setTop] = useState(topText);
  const [bottom, setBottom] = useState(bottomText);
  const [preview, setPreview] = useState();

  useEffect(() => {
    setTop(topText);
  }, [topText]);

  useEffect(() => {
    setBottom(bottomText);
  }, [bottomText]);

  const submit = () => {
    fetch(`/api/memer/submitMeme?id=${id}&top=${topText}&bottom=${bottomText}`)
      .then((response) => response.json())
      .then((data) => setPreview(data.data.url));
  };

  useEffect(() => {}, [preview]);

  return (
    <>
      <Modal show={show} onHide={handleClose} onShow={fullMeme ? null : submit}>
        <Modal.Body>
          {fullMeme === false ? (
            <MemeContainer key={`modal-${id}`}>
              <Image src={preview} width={400} height={400} />
              <a href={preview}>Link to image</a>
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
          {fullMeme === false &&
          translatify != undefined &&
          id != undefined &&
          top != undefined &&
          bottom != undefined ? (
            <Button
              variant="primary"
              onClick={() => {
                translatify(id, top, bottom);
                handleClose();
              }}
            >
              Translatify!
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
        {fullMeme ? <Language>{language}</Language> : <></>}
      </MemeContainer>
    </>
  );
};

export default Meme;
