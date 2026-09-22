import { useEffect, useState } from "react";

export default function useTypingEffect(
  roles,
  typingSpeed = 80,
  deleteSpeed = 35,
  pause = 1400
) {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      setText(current.substring(0, charIndex));
      if (charIndex === current.length) {
        timeout = setTimeout(() => setDeleting(true), pause);
      } else {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
      }
    } else if (deleting && charIndex >= 0) {
      setText(current.substring(0, charIndex));
      if (charIndex === 0) {
        setDeleting(false);
        setRoleIndex((r) => (r + 1) % roles.length);
      } else {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), deleteSpeed);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex, roles, typingSpeed, deleteSpeed, pause]);

  return text;
}