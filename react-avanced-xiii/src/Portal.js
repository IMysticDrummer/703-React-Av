import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const portalElement = document.getElementById('portal');

export default function Portal({ children }) {
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    portalElement.appendChild(el.current);
    return () => portalElement.removeChild(el.current);
  }, []);

  return createPortal(children, el.current);
}
