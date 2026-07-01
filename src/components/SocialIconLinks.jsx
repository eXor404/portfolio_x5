/* SocialIconLinks — the GitHub + LinkedIn icon-button pair used in the nav bar
   and its mobile overlay. URLs come from the single SOCIALS source in data.js. */
import { Github, Linkedin } from 'lucide-react';
import { SOCIALS } from '../data.js';
import { IconButton } from '../ds/index.js';

export default function SocialIconLinks({ size = 18 }) {
  return (
    <>
      <a href={SOCIALS.github} target="_blank" rel="noreferrer">
        <IconButton label="GitHub" variant="ghost" size="sm"><Github size={size} /></IconButton>
      </a>
      <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer">
        <IconButton label="LinkedIn" variant="ghost" size="sm"><Linkedin size={size} /></IconButton>
      </a>
    </>
  );
}
