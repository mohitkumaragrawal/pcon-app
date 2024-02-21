import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";
import { SiCodechef } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TbLetterP } from "react-icons/tb";

const socialMedia = [
  { name: "github", icon: <FaGithub />, link: "#" },
  { name: "codeforces", icon: <SiCodeforces /> },
  { name: "codechef", icon: <SiCodechef /> },
  { name: "linkedin", icon: <FaLinkedinIn />, link: "#" },
  { name: "twitter", icon: <FaXTwitter />, link: "#" },
  { name: "instagram", icon: <FaInstagram />, link: "#" },
  { name: "discord", icon: <FaDiscord /> },
  { name: "pcon", icon: <TbLetterP /> },
];

export default socialMedia;
