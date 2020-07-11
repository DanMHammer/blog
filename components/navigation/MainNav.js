import {
  Button,
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";

import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const MainNav = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const icon_width = "25px";
  const icon_height = "25px";

  return (
    <Navbar bg={theme.variant} variant={theme.variant} sticky="top">
      <Navbar.Brand style={{ marginLeft: "15vw" }}>Dan Hammer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/animals">Animals</Nav.Link>
        </Nav>
        <Form inline>
          <Nav className="mr-auto">
            <Nav.Link href="mailto:daniel.m.hammer@gmail.com">
              <img
                style={{ width: icon_width, height: icon_height }}
                src={theme.mail}
              />
            </Nav.Link>
            <Nav.Link target="_blank" href="https://github.com/DanMHammer">
              <img
                style={{ width: icon_width, height: icon_height }}
                src={theme.github}
              />
            </Nav.Link>
            <Nav.Link
              target="_blank"
              href="https://www.linkedin.com/in/daniel-hammer/"
            >
              <img
                style={{
                  width: icon_width,
                  height: icon_height,
                  marginRight: "20px",
                }}
                src={theme.linkedin}
              />
            </Nav.Link>
          </Nav>
          <Button
            variant={theme.outlineButtonContrast}
            onClick={(e) => toggleTheme(e)}
            style={{ marginRight: "15vw" }}
          >
            Theme: {theme.variant}
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
