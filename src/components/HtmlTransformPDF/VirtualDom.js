import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function VirtualDom(props) {
  let { Head, Foot, Content, width, padding, setDomInfo, virtualClass } = props;

  const idArr = useRef({
    headId: 'head' + Date.now() + Math.ceil(Math.random() * 1000),
    contentId: 'content' + Date.now() + Math.ceil(Math.random() * 1000),
    footId: 'foot' + Date.now() + Math.ceil(Math.random() * 1000),
  });

  useEffect(() => {
    setDomInfo({
      headData: {
        id: idArr.current.headId,
      },
      contentData: {
        id: idArr.current.contentId,
      },
      footData: {
        id: idArr.current.footId,
      },
    });
  }, []);

  return createPortal(
    <div
      className={virtualClass}
      style={{
        width: width + 'px',
        padding: padding + 'px',
        position: 'fixed',
        zIndex: -10,
        opacity: '0',
      }}
    >
      <Head id={idArr.current.headId} />
      <Content id={idArr.current.contentId} />
      <Foot id={idArr.current.footId} />
    </div>,
    document.body,
  );
}

export default VirtualDom;
