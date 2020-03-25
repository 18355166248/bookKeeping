import React, { useEffect, useState, useRef } from 'react';
import HtmlToPdfPage from './HtmlToPdfPage';
import VirtualDom from './VirtualDom';
import _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function HtmlToPdf(props) {
  const {
    Head,
    Foot,
    Content,
    height = 841.89,
    width = 595.28,
    padding,
    renderFinish,
    finish,
    preview = false,
    setGetPdfCallback
  } = props;
  const [domInfo, setDomInfo] = useState(null);
  const [headHeight, setHeadHeight] = useState(0);
  const [footHeight, setFootHeight] = useState(0);
  const [contentList, setContentList] = useState([]);
  const htmlContent = useRef(null);

  // 获取 Head, Foot, Content 高度
  useEffect(() => {
    if (_.isPlainObject(domInfo)) {
      const { headRef, footRef, contentRef } = domInfo;
      const headHeight = headRef.offsetHeight;
      const footHeight = footRef.offsetHeight;
      const curContentList = [];
      setHeadHeight(headHeight);
      setFootHeight(footHeight);

      let curHeight = headHeight + footHeight;
      let pageContentDoms = [];
      [...contentRef.children].forEach((child, childIndex) => {
        if (child.tagName === 'TABLE') {
          const trList = child.getElementsByTagName('tr');
          const pdfPageRangeList = child.getElementsByClassName('pdf-page-range');
          console.log(pdfPageRangeList);
          [...trList].forEach(tr => {
            const cloneCurHeight = curHeight + tr.offsetHeight;

            if (cloneCurHeight >= height) {
              curContentList.push(pageContentDoms);
              pageContentDoms = [tr.cloneNode(true)];
              curHeight = headHeight + footHeight + tr.offsetHeight;
            } else {
              pageContentDoms.push(tr.cloneNode(true));
              curHeight += tr.offsetHeight;
            }
          });
        } else {
          const cloneCurHeight = curHeight + child.offsetHeight;

          if (cloneCurHeight >= height) {
            curContentList.push(pageContentDoms);
            pageContentDoms = [child.cloneNode(true)];
            curHeight = headHeight + footHeight + child.offsetHeight;
          } else {
            pageContentDoms.push(child.cloneNode(true));
            curHeight += child.offsetHeight;
          }
        }
      });

      curContentList.push(pageContentDoms);

      setContentList(curContentList);
    }
  }, [domInfo]);

  // 监听contentList
  useEffect(() => {
    if (contentList.length > 0) {
      renderFinish();
      // getPDF();
    }
  }, [contentList]);

  return (
    <div ref={htmlContent} style={{ width: width + 'px' }}>
      {/* {contentList.map((content, contentIndex) => (
        <div key={contentIndex} style={{ backgroundColor: '#fff' }}>
          <HtmlToPdfPage
            Head={Head}
            Foot={Foot}
            Content={content}
            width={width}
            height={height}
            padding={padding}
            total={contentList.length}
            curPage={contentIndex + 1}
          />
        </div>
      ))} */}
      <VirtualDom
        Head={Head}
        Foot={Foot}
        Content={Content}
        width={width}
        padding={padding}
        setDomInfo={setDomInfo}
      />
    </div>
  );

  function getPDF() {
    html2canvas(htmlContent.current, {
      scale: 2,
    }).then(canvas => {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = (contentWidth / width) * height;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //pdf页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = width;
      var imgHeight = (width / contentWidth) * contentHeight;

      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      var pdf = new jsPDF('', 'pt');
      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= height;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }

      finish();

      if (preview) {
        setGetPdfCallback(() => {
          return name => pdf.save((name || 'default') + '.pdf');
        });
      } else {
        pdf.save('content.pdf');
      }
    });
  }
}

export default HtmlToPdf;
