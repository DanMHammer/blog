import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <p>
      I'm Dan Hammer, a developer from Memphis, TN. I currently work for{" "}
      <a href="crossbrowsertesting.com">CrossBrowserTesting</a>, a SmartBear
      product. At CBT, I've created internal tools to improve the workflow for
      our Support, DevOps, and Automation teams. I've also replaced the manual
      process of installing software on our Windows VMs with an easy to use
      automated process. Outside of work, I enjoy playing fetch and frisbee with
      my Australian Shepherds (you can see pictures on the{" "}
      <Link href="/animals">
        <a>Animals Page</a>
      </Link>
      ). I am an excellent cook, and I love to attend a good potluck.
    </p>
  );
};

export default About;
