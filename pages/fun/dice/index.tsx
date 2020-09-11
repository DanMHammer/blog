import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { has, set } from "lodash";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import MainNav from "../../../components/navigation/MainNav";
import { ThemeContext } from "../../../components/context/ThemeContext";
import produce from "immer";

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
    const res = await fetch(`http://localhost:3001/roll/${rollCode}`);
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

  return (
    <div>
      <MainNav />
      <Container>
        <Col>
          <Row>
            <Col>
              <DiceSelector dice={dice} dispatch={dispatch} />
            </Col>
            <Col>
              <Button style={{ marginTop: 25 }} onClick={() => rollDice()}>
                Roll!
              </Button>
            </Col>
          </Row>
          <br />
          <Row>Roll Code: {rollCode}</Row>
          <br />
          {diceImage != "" ? (
            <>
              <Row>
                <img style={{ backgroundColor: "white" }} src={diceImage} />
              </Row>
              <Row>
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
            <Col>
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
        <Col>Highest</Col>
        {["d2", "d4", "d6", "d8", "d10", "d12", "d20"].map((size) => {
          return (
            <Col>
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
