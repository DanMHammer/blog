import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import MainNav from "../../../components/navigation/MainNav";
import { ThemeContext } from "../../../components/context/ThemeContext";
import styled from "styled-components";

interface Dice {
  d2: number;
  d2high: number;
  d4: number;
  d4high: number;
  d6: number;
  d6high: number;
  d8: number;
  d8high: number;
  d10: number;
  d10high: number;
  d12: number;
  d12high: number;
  d20: number;
  d20high: number;
  plus: number;
  minus: number;
  [propName: string]: number;
}

const Empty: Dice = {
  d2: 0,
  d2high: 0,
  d4: 0,
  d4high: 0,
  d6: 0,
  d6high: 0,
  d8: 0,
  d8high: 0,
  d10: 0,
  d10high: 0,
  d12: 0,
  d12high: 0,
  d20: 0,
  d20high: 0,
  plus: 0,
  minus: 0,
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

export default function Dice() {
  const { theme } = useContext(ThemeContext);
  const [diceImage, setDiceImage] = useState("");
  const [rollCode, setRollCode] = useState("4d20");
  const [dice, dispatch] = useReducer(reducer, Empty);

  const rollDice = async () => {
    const res = await fetch(`https://k8s.danhammer.dev/roll/${rollCode}`);
    const data = await res.json();
    setDiceImage(data.image);
  };

  useEffect(() => {
    var code = "";
    ["d2", "d4", "d6", "d8", "d10", "d12", "d20"].map((size) => {
      let count = dice[size];
      let high = dice[`${size}high`];
      if (count != 0) {
        code += "+" + count + size;
      }
      if (high != 0) {
        code += "H" + high;
      }
    });
    setRollCode(code);
  }, [dice]);

  const HR = styled.hr`
    color: ${theme.textColor};
    height: 1px;
    background-color: ${theme.textColor};
  `;

  return (
    <div>
      <MainNav />
      <Container>
        <Col>
          <Row>
            <Container>
              <br />
              <h3>Dice Roller</h3>
              <HR />
              <p>
                <strong>Count:</strong> For each die size 2 sided through 20
                sided (denoted by d2 through d20), select the number of that
                size that need to be rolled. For example, set d2 to 2 and d8 to
                3 if you want to roll 2 2-sided dice and 3 8-sided dice
                together.
                <br />
                <br />
                <strong>Highest:</strong> For each size, optionally choose to
                keep only the highest x rolls in your total. For example, if you
                want to roll 4 20-sided dice and keep only the highest 2 rolls,
                set d20 Count to 4 and d20 Highest to 2.
              </p>
              <HR />
            </Container>
          </Row>
          <Row style={{ margin: "auto", width: "75%" }}>
            <Col>
              <DiceSelector dice={dice} dispatch={dispatch} />
            </Col>
          </Row>
          <br />
          <Row style={{ margin: "auto", width: "75%" }}>
            Roll Code: {rollCode}
          </Row>
          <Row style={{ margin: "auto", width: "75%" }}>
            <Button
              style={{ marginTop: 25, padding: 10 }}
              onClick={() => rollDice()}
            >
              Roll!
            </Button>
          </Row>
          <br />
          {diceImage != "" ? (
            <>
              <Row style={{ margin: "auto", width: "75%" }}>
                <img
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    margin: "auto",
                  }}
                  src={diceImage}
                />
              </Row>
              <Row style={{ margin: "auto", width: "75%" }}>
                <a href={diceImage}>Share</a>
              </Row>
            </>
          ) : (
            <></>
          )}
        </Col>
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

type SelectorProps = {
  dice: Dice;
  dispatch: any;
};

const DiceSelector = ({ dice, dispatch }: SelectorProps) => {
  const { d2, d4, d6, d8, d10, d12, d20 } = dice;

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: parseInt(e.target.value) });
  };

  return (
    <Form>
      <Form.Row>
        <Col style={{ marginTop: 40 }}>Count</Col>
        {["d2", "d4", "d6", "d8", "d10", "d12", "d20"].map((size) => {
          return (
            <Col key={`${size}-count-col`}>
              <Form.Label>{size}</Form.Label>
              <Form.Control
                as="select"
                value={dice[size]}
                name={size}
                onChange={onChange}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                  return <option>{num}</option>;
                })}
              </Form.Control>
            </Col>
          );
        })}
      </Form.Row>
      <br />
      <Form.Row>
        <Col key={"highest-col"}>Highest</Col>
        {["d2", "d4", "d6", "d8", "d10", "d12", "d20"].map((size) => {
          return (
            <Col key={`${size}-highest-col`}>
              <Form.Control
                as="select"
                value={dice[`${size}high`]}
                name={`${size}high`}
                onChange={onChange}
              >
                {Array.from(Array(dice[size]).keys()).map((num) => {
                  return <option>{num}</option>;
                })}
              </Form.Control>
            </Col>
          );
        })}
      </Form.Row>
    </Form>
  );
};
