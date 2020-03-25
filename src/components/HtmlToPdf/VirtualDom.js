import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function VirtualDom(props) {
  let { Head, Foot, Content, width, padding, setDomInfo } = props;

  const headRef = React.createRef();
  const footRef = React.createRef();
  const contentRef = React.createRef();

  useEffect(() => {
    setDomInfo({
      headRef: headRef.current,
      contentRef: contentRef.current,
      footRef: footRef.current
    });
  }, []);

  return createPortal(
    <div
      style={{
        width: width + 'px',
        padding: padding + 'px',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1,
        opacity: '0'
      }}
    >
      <Head ref={headRef} />
      <Content ref={contentRef} />
      <Foot ref={footRef} />
    </div>,
    document.body
  );
}

export default VirtualDom;
