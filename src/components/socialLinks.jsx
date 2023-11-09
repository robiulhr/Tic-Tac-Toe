import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const twitterFont = <FontAwesomeIcon icon={faTwitter} />;
const linkedinFont = <FontAwesomeIcon icon={faLinkedin} />;
const githubFont = <FontAwesomeIcon icon={faGithub} />;
const websiteFont = <FontAwesomeIcon icon={faGlobe} />;
export default function SocialLinks() {
  return (
    <div className="social_links">
      <ul>
        <li>
          <a target="_blank" href="https://twitter.com/robiulhr01">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>{twitterFont}</span>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.linkedin.com/in/robiulhr/">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>{linkedinFont}</span>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/robiulhr">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>{githubFont}</span>
          </a>
        </li>
        <li>
          <a target="_blank" href="https://robiul.dev/">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>{websiteFont}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
