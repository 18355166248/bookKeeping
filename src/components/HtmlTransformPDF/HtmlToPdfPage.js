import React, { useRef, useEffect } from 'react';

function HtmlToPdfPage(props) {
  const { Head, Foot, Content, width, height, padding, total, curPage } = props;
  const tableDom = [];
  const tableRef = useRef(null);

  useEffect(() => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.setAttribute('width', '100%');
    table.setAttribute('border', '1px solid #ccc%');
    table.setAttribute('cellSpacing', '0');
    table.setAttribute('cellPadding', '0');

    Content.forEach(contentItem => {
      if (contentItem.tagName !== 'TR') {
        tableRef.current.appendChild(contentItem);

        return;
      }

      tbody.appendChild(contentItem);
    });

    table.appendChild(tbody);
    tableRef.current.appendChild(table);
  }, [tableRef.current]);

  return (
    <div
      style={{
        position: 'relative',
        padding: '0 ' + padding + 'px',
        width: width + 'px',
        height: height + 'px',
        overflow: 'hidden'
      }}
    >
      <Head />
      <div ref={tableRef}></div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: padding + 'px',
          width: width - padding * 2 + 'px'
        }}
      >
        <Foot total={total} curpage={curPage} />
      </div>
    </div>
  );
}

export default HtmlToPdfPage;
