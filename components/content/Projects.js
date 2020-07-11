import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { useMedia } from "react-media";

const Projects = () => {
  const { theme } = useContext(ThemeContext);

  const GLOBAL_MEDIA_QUERIES = {
    small: "(max-width: 599px)",
    medium: "(min-width: 600px) and (max-width: 1199px)",
    large: "(min-width: 1200px)",
  };
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });

  return (
    <>
      <NextDash theme={theme} matches={matches} />
      <br />
      <Ansible theme={theme} matches={matches} />
      <br />
      <Blog theme={theme} />
      <br />
    </>
  );
};

const NextDash = ({ theme, matches }) => {
  return (
    <Card bg={theme.variant}>
      <Card.Header as="h4">
        NextJS Internal Dashboard for CrossBrowserTesting
      </Card.Header>
      <Card.Body
        style={{ height: matches.medium || matches.large ? "500px" : "700px" }}
      >
        <Card.Title></Card.Title>
        <Container>
          <Row>
            <Col sm={4}>
              <Card.Text>
                <ul>
                  <li>
                    Dashboard written in NextJS that fetches data from MySQL and
                    represent status of hundreds of Windows, macOS, iOS, and
                    Android devices and Virtual Machines.
                  </li>
                  <li>SSR for quick initial page load</li>
                  <li>
                    useSWR hook for consistent refreshes on individual
                    components
                  </li>
                  <li>Fast data filters</li>
                  <li>Accessible Color Schemes</li>
                  <li>Dark Mode</li>
                  <li>Responsive Breakpoints up to 5000 px wide</li>
                  <li>
                    Redis data cache to reduce load on the database while still
                    providing relevant data.
                  </li>
                </ul>
              </Card.Text>
            </Col>
            <Col sm={8}>
              <Carousel indicators={false}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/images/projects/nextdash-light.jpg"
                    alt="Server Dashboard Light Mode"
                  />
                  <h3>Server Dashboard - Light Mode</h3>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/images/projects/nextdash-dark.jpg"
                    alt="Server Dashboard Dark Mode"
                  />
                  <h3>Server Dashboard - Dark Mode</h3>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/images/projects/query-builder.png"
                    alt="Query Builder"
                  />
                  <h3>Query Builders</h3>
                  <p>
                    Create and Preview important SQL queries to prevent errors
                  </p>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/images/projects/reports.jpg"
                    alt="Reports"
                  />
                  <h3>Reports Pages</h3>
                  <p>
                    Queries database to create a report and caches the data in
                    Redis to make it shareable.
                  </p>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const Ansible = ({ theme, matches }) => {
  return (
    <Card bg={theme.variant}>
      <Card.Header as="h4">
        Windows Ansible Playbooks for CrossBrowserTesting
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Container>
          <Row>
            <Col sm={8}>
              <img
                className="d-block w-100"
                src="/images/projects/awx.png"
                alt="AWX"
              />
              <h3>AWX</h3>
            </Col>
            <Col sm={4}>
              <Card.Text>
                <ul>
                  <li>Playbooks run on AWX against Windows VMs</li>
                  <li>
                    Ensures Web Browsers are present and quickly installs them
                    if not
                  </li>
                  <li>Ensures VM state</li>
                  <li>
                    Reduced the time to deploy new browsers on 300 Windows VMs
                    from 3 days to 1 day.
                  </li>
                  <li>
                    Replaced a long manual process with a completely automated
                    one.
                  </li>
                  <li>
                    Create database entries with the query builders, upload new
                    software to the server, and click run! That's it!
                  </li>
                </ul>
              </Card.Text>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const Blog = ({ theme }) => {
  return (
    <Card bg={theme.variant} className="simplecard">
      <Card.Header as="h4">This blog!</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Container>
          <Row>
            <Card.Text>
              This blog is written in React with NextJS and deployed on Vercel
              automatically. More content and projects to come! <br />
              <a href="https://github.com/DanMHammer/blog">Repo Link</a>
            </Card.Text>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Projects;
