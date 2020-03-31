import React, { useEffect, useState, useRef } from 'react';
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
    fileName,
    setGetPdfCallback
  } = props;
  const [domInfo, setDomInfo] = useState(null);
  const [headHeight, setHeadHeight] = useState(0);
  const [footHeight, setFootHeight] = useState(0);
  const [contentList, setContentList] = useState([]);
  const [headImg, setHeadImg] = useState('');
  const [footImg, setFootImg] = useState('');
  const htmlContent = useRef(null);
  const pageHeight = 40;
  const imagePageDomId = 'imagePageDomId' + new Date().getTime(); // 生成dom的Id

  // 获取 Head, Foot, Content 高度
  useEffect(() => {
    if (_.isPlainObject(domInfo)) {
      const { headRef, footRef, contentRef } = domInfo;
      const headHeight = headRef.offsetHeight;
      const footHeight = footRef.offsetHeight;
      const curContentList = [0];
      const headerWithFootHeight = headHeight + footHeight + pageHeight;
      setHeadHeight(headHeight);
      setFootHeight(footHeight);

      const pdfPageRangeList = contentRef.getElementsByClassName(
        'pdf-page-range'
      );

      const bodyOffsetTop = contentRef.getBoundingClientRect().top; // content盒子距离页面顶部距离
      [...pdfPageRangeList].forEach((pdfPageRange, pdfPageRangeIndex) => {
        const curOffsetTop =
          pdfPageRange.getBoundingClientRect().top - bodyOffsetTop;

        // 这里表示的是排除公共区域, 截取位置所在的高度 dom超过这个高度那就应该要换页
        const curHeightTotal =
          height -
          headerWithFootHeight +
          curContentList[curContentList.length - 1];

        if (curOffsetTop >= curHeightTotal) {
          // 换页
          curContentList.push(
            pdfPageRangeList[pdfPageRangeIndex - 1].getBoundingClientRect()
              .top - bodyOffsetTop
          );
        }
      });

      // 生成头部, 底部图片
      setTimeout(() => {
        html2canvas(domInfo.headRef, {
          scale: 2,
          height: domInfo.headRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
          width: domInfo.headRef.offsetWidth
        }).then(canvas => {
          const contentWidth = canvas.width;
          const contentHeight = canvas.height;

          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          const imgWidth = width;
          const imgHeight = (width / contentWidth) * contentHeight;

          const pageData = canvas.toDataURL('image/jpeg', 1.0);
          setHeadImg({ data: pageData, width: imgWidth, height: imgHeight });
        });

        html2canvas(domInfo.footRef, {
          scale: 2,
          height: domInfo.footRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
          width: domInfo.footRef.offsetWidth
        }).then(canvas => {
          const contentWidth = canvas.width;
          const contentHeight = canvas.height;

          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          const imgWidth = width;
          const imgHeight = (width / contentWidth) * contentHeight;

          const pageData = canvas.toDataURL('image/jpeg', 1.0);
          setFootImg({ data: pageData, width: imgWidth, height: imgHeight });
        });
      }, 100);

      setContentList(curContentList);
    }
  }, [domInfo, height, width]);

  // 监听contentList
  useEffect(() => {
    if (contentList.length > 0 && headImg && footImg) {
      _.isFunction(renderFinish) && renderFinish();
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

  // 处理html 按要求拼接
  function getPDF() {
    return new Promise((resolve, reject) => {
      html2canvas(domInfo.contentRef, {
        scale: 2,
        height: domInfo.contentRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
        width: domInfo.contentRef.offsetWidth
      })
        .then(canvas => {
          const headerWithFootHeight = headHeight + footHeight + pageHeight; //头部+尾部+页码高度
          const pageData = canvas.toDataURL('image/jpeg', 1.0);
          const imagePagesDom = document.createElement('div');
          imagePagesDom.style.width = width + 'px';
          imagePagesDom.style.position = 'fixed';
          imagePagesDom.id = imagePageDomId;

          contentList.forEach((content, contentIndex) => {
            const imagBox = document.createElement('div');
            imagBox.style.width = width + 'px';
            imagBox.style.height = height + 'px';
            imagBox.style.paddingLeft = padding + 'px';
            imagBox.style.paddingRight = padding + 'px';
            imagBox.style.backgroundColor = '#fff';
            imagBox.style.marginBottom = '10px';
            imagBox.innerHTML = '';
            const imgHead = new Image();
            const imgContent = new Image();
            const imgFoot = new Image();

            // 头部图片渲染完成
            imgHead.onload = function() {
              imagBox.appendChild(imgHead);

              // 中间主题图片渲染完成
              imgContent.onload = function() {
                const contentBox = document.createElement('div');
                contentBox.style.width = '100%';

                contentBox.style.height = height - headerWithFootHeight + 'px';
                const contentBoxChild = document.createElement('div');
                contentBoxChild.style.width = '100%';
                contentBoxChild.style.position = 'relative';

                const diffNum =
                  content +
                  (height - headerWithFootHeight) -
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

                // 底部图片渲染完成
                imgFoot.onload = function() {
                  imagBox.appendChild(imgFoot);

                  const pageBox = document.createElement('div');
                  const pageTextDom = document.createElement('span');
                  const curPageDom = document.createElement('span');
                  const splitLineDom = document.createElement('span');
                  const totalPageDom = document.createElement('span');
                  pageTextDom.innerText = 'Page ';
                  curPageDom.innerText = contentIndex + 1;
                  splitLineDom.innerText = '/';
                  totalPageDom.innerText = contentList.length;

                  pageBox.style.height = pageHeight + 'px';
                  pageBox.style.lineHeight = pageHeight + 'px';
                  pageBox.style.textAlign = 'center';
                  pageBox.style.fontWeight = '700';

                  pageBox.appendChild(pageTextDom);
                  pageBox.appendChild(curPageDom);
                  pageBox.appendChild(splitLineDom);
                  pageBox.appendChild(totalPageDom);

                  imagBox.appendChild(pageBox);
                  // 添加底部page/total
                  imagePagesDom.appendChild(imagBox);
                };
              };
            };

            imgHead.src = headImg.data;
            imgHead.style.width = '100%';
            imgContent.src = pageData;
            imgContent.style.width = '100%';
            imgFoot.src = footImg.data;
            imgFoot.style.width = '100%';
          });

          document.body.appendChild(imagePagesDom);

          setTimeout(() => {
            _.isFunction(finish) && finish();
          }, 100);

          // 如果没有预览, 那么就直接生成pdf并返回
          if (preview) {
            setGetPdfCallback(() => {
              return () => createPDF();
            });

            resolve(true);

            return;
          }

          createPDF().then(fileString => {
            resolve(fileString);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // 生成pdf文件
  function createPDF() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const imagePageDom = document.getElementById(imagePageDomId);
        const ImagePageDomChildren = imagePageDom.children;
        const html2canvasList = [];
        const pdf = new jsPDF('', 'pt');

        [...ImagePageDomChildren].forEach(ImagePageDomChild => {
          html2canvasList.push(
            html2canvas(ImagePageDomChild, {
              scale: 2,
              width: ImagePageDomChild.offsetWidth,
              height: ImagePageDomChild.offsetHeight
            })
          );
        });

        Promise.all(html2canvasList)
          .then(imgList => {
            imgList.forEach((canvas, canvasIndex) => {
              const contentWidth = canvas.width;
              const contentHeight = canvas.height;
              //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
              const imgWidth = width;
              const imgHeight = (width / contentWidth) * contentHeight;
              const pageData = canvas.toDataURL('image/jpeg', 1.0);

              pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);

              if (canvasIndex < imgList.length - 1) {
                pdf.addPage();
              }
            });

            const fileString = pdf.output('dataurlstring').substring(28);

            resolve(fileString);
          })
          .catch(err => {
            reject(err);
          });
      }, 100);
    });
  }
}

export default HtmlToPdf;
