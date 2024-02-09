import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";
import { SiCodechef } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const socialMedia = [
  { name: "github", icon: <FaGithub /> },
  { name: "codeforces", icon: <SiCodeforces /> },
  { name: "codechef", icon: <SiCodechef /> },
  { name: "linkedin", icon: <FaLinkedinIn /> },
  { name: "twitter", icon: <FaXTwitter /> },
  { name: "instagram", icon: <FaInstagram /> },
  { name: "discord", icon: <FaDiscord /> },
];

export default socialMedia;
