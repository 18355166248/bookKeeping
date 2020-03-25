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
  const [headImg, setHeadImg] = useState('');
  const [footImg, setFootImg] = useState('');
  const htmlContent = useRef(null);

  // 获取 Head, Foot, Content 高度
  useEffect(() => {
    if (_.isPlainObject(domInfo)) {
      const { headRef, footRef, contentRef } = domInfo;
      const headHeight = headRef.offsetHeight;
      const footHeight = footRef.offsetHeight;
      const curContentList = [0];
      let total = 1;
      setHeadHeight(headHeight);
      setFootHeight(footHeight);

      const pdfPageRangeList = contentRef.getElementsByClassName(
        'pdf-page-range'
      );

      const bodyOffsetTop = contentRef.getBoundingClientRect().top; // content盒子距离页面顶部距离
      [...pdfPageRangeList].forEach((pdfPageRange, pdfPageRangeIndex) => {
        const curOffsetTop =
          pdfPageRange.getBoundingClientRect().top - bodyOffsetTop;

        if (curOffsetTop >= (height - (headHeight + footHeight)) * total) {
          total++;
          // 换页
          curContentList.push(
            curOffsetTop -
              pdfPageRangeList[pdfPageRangeIndex - 1].offsetHeight -
              2
          );
        }
      });

      console.log(curContentList);

      // 生成头部, 底部图片
      setTimeout(() => {
        html2canvas(domInfo.headRef, {
          scale: 2,
          height: domInfo.headRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
          width: domInfo.headRef.offsetWidth
        }).then(canvas => {
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;

          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = width;
          var imgHeight = (width / contentWidth) * contentHeight;

          var pageData = canvas.toDataURL('image/jpeg', 1.0);
          // console.log(pageData);
          setHeadImg({ data: pageData, width: imgWidth, height: imgHeight });
        });

        html2canvas(domInfo.footRef, {
          scale: 2,
          height: domInfo.footRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
          width: domInfo.footRef.offsetWidth
        }).then(canvas => {
          var contentWidth = canvas.width;
          var contentHeight = canvas.height;

          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          var imgWidth = width;
          var imgHeight = (width / contentWidth) * contentHeight;

          var pageData = canvas.toDataURL('image/jpeg', 1.0);
          // console.log(pageData);
          setFootImg({ data: pageData, width: imgWidth, height: imgHeight });
        });
      }, 100);

      setContentList(curContentList);
    }
  }, [domInfo]);

  // 监听contentList
  useEffect(() => {
    if (contentList.length > 0 && headImg && footImg) {
      renderFinish();
      getPDF();
    }
  }, [contentList, headImg, footImg]);

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
    console.log(domInfo.contentRef);
    html2canvas(domInfo.contentRef, {
      scale: 2,
      height: domInfo.contentRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
      width: domInfo.contentRef.offsetWidth
    }).then(canvas => {
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = width;
      var imgHeight = (width / contentWidth) * contentHeight;

      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      var pdf = new jsPDF('', 'pt');

      contentList.forEach((content, contentIndex) => {
        const imagBox = document.createElement('div');
        imagBox.style.width = width + 'px';
        imagBox.style.height = height + 'px';
        imagBox.style.paddingLeft = padding + 'px';
        imagBox.style.paddingRight = padding + 'px';
        imagBox.innerHTML = '';
        const imgHead = new Image();
        const imgContent = new Image();
        const imgFoot = new Image();

        imgHead.onload = function() {
          imagBox.appendChild(imgHead);

          imgContent.onload = function() {
            const contentBox = document.createElement('div');
            contentBox.style.width = '100%';
            contentBox.style.backgroundColor = '#fff';
            contentBox.style.height = height - headHeight - footHeight + 'px';
            const contentBoxChild = document.createElement('div');
            contentBoxChild.style.width = '100%';
            contentBoxChild.style.position = 'relative';
            const diffNum =
              (height - headHeight - footHeight) * (contentIndex + 1) -
              contentList[contentIndex + 1];
            if (diffNum > 0) {
              contentBox.style.paddingBottom = diffNum + 'px';
            }
            contentBoxChild.style.height = '100%';
            contentBoxChild.style.overflow = 'hidden';
            contentBoxChild.appendChild(imgContent);
            contentBox.style.overflow = 'hidden';
            contentBox.appendChild(contentBoxChild);
            imgContent.style.position = 'absolute';
            imgContent.style.left = 0;
            imgContent.style.top = -content + 'px';
            imagBox.appendChild(contentBox);

            imgFoot.onload = function() {
              imagBox.appendChild(imgFoot);

              document.body.appendChild(imagBox);
            };
          };
        };

        imgHead.src = headImg.data;
        imgHead.style.width = '100%';
        imgContent.src = pageData;
        imgContent.style.width = '100%';
        imgFoot.src = footImg.data;
        imgFoot.style.width = '100%';

        // pdf.addImage(headImg.data, 'JPEG', 0, 0, headImg.width, headImg.height);
        // pdf.addImage(pageData, 'JPEG', 0, -content, imgWidth, imgHeight);
        // pdf.addImage(footImg.data, 'JPEG', 0, 0, footImg.width, footImg.height);
      });

      // pdf.save('content.pdf');
    });
  }
}

export default HtmlToPdf;
