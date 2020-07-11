import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";

import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Projects = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <NextDash theme={theme} />
      <br />
      <Ansible theme={theme} />
      <br />
      <Blog theme={theme} />
      <br />
    </>
  );
};

const NextDash = ({ theme }) => {
  return (
    <Card bg={theme.variant} style={{ height: "65vh" }}>
      <Card.Header as="h4">
        NextJS Internal Dashboard for CrossBrowserTesting
      </Card.Header>
      <Card.Body>
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
                    src="/images/projects/nextdash-light.png"
                    alt="Server Dashboard Light Mode"
                  />
                  <h3>Server Dashboard - Light Mode</h3>
                  <p>Note: Black Bars obscure internal info.</p>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/images/projects/nextdash-dark.png"
                    alt="Server Dashboard Dark Mode"
                  />
                  <h3>Server Dashboard - Dark Mode</h3>
                  <p>Note: Black Bars obscure internal info.</p>
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
                {/* <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/images/projects/reports.png"
                    alt="Reports"
                  />
                  <h3>Reports Pages</h3>
                  <p>
                    Queries database to create a report and caches the data in
                    Redis to make it shareable.
                  </p>
                </Carousel.Item> */}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const Ansible = ({ theme }) => {
  return (
    <Card bg={theme.variant} style={{ height: "75vh" }}>
      <Card.Header as="h4">
        Windows Ansible Playbooks for CrossBrowserTesting
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Container>
          <Row>
            <Col sm={8}>
              <Carousel indicators={false}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/images/projects/awx.png"
                    alt="AWX"
                  />
                  <h3>AWX</h3>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/images/projects/playbook.png"
                    alt="AWX"
                  />
                  <h3>Main Playbook</h3>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col sm={4}>
              <Card.Text>
                Playbooks that are run on a dynamic inventory through AWX to
                ensure new browsers are quickly installed, all selenium driver
                files are in place, and the VMs are in a good state. Reduced the
                time to deploy new browsers on 300 Windows VMs from 3 days to 1
                day. Support now only has to create database entries for the
                software, upload the zipped browser to a server, and then run
                the playbook. No manual work is neccessary.
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
    <Card bg={theme.variant}>
      <Card.Header as="h4">This blog!</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Container>
          <Row>
            <Card.Text>
              This blog is written in React with NextJS and deployed on Vercel
              automatically. More content and projects to come!
            </Card.Text>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Projects;
