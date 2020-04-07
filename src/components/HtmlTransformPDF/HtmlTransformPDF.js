import React, { useEffect, useState } from 'react';
import VirtualDom from './VirtualDom';
import _ from 'lodash';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { previewDom } from './previewDom';

// HtmlTransformPDF.proptypes = {
//   Head: PropTypes.any, // 头部
//   Foot: PropTypes.any, // 尾部
//   Content: PropTypes.any, // 主体
//   height: PropTypes.number, // 每页高度
//   width: PropTypes.number, // PDF宽度
//   padding: PropTypes.number, // PDF左右间距
//   renderFinish: PropTypes.func, // 虚拟Dom渲染完成回调函数
//   previewFinish: PropTypes.func, // 预览Dom渲染完成
//   finish: PropTypes.func, // 生成PDF的每页图片渲染完成
//   preview: PropTypes.bool, // 是否需要预览
//   setGetPdfCallback: PropTypes.func, // 预览情况下, 通过这个hook设置获取文件数据回调
//   container: PropTypes.object, // 生成 PDF 的每页图片包裹的 Dom 节点
//   virtualClass: PropTypes.string, // 虚拟 Dom 的类名, 用来设置 css 样式的包裹器, 避免全局样式污染
//   download: PropTypes.bool, // 是否直接下载, 如果设置 true, 那么会直接下载 pdf 文件到本地
// };

let transformStopStatus = false; // true: 表示进程需要停止

function HtmlTransformPDF(props) {
  const {
    Head,
    Foot,
    Content,
    height = 841.89,
    width = 595.28,
    padding,
    renderFinish,
    previewFinish,
    finish,
    preview = false,
    setGetPdfCallback,
    container,
    virtualClass,
    download
  } = props;
  const [domInfo, setDomInfo] = useState(null);
  const [headHeight, setHeadHeight] = useState(0);
  const [footHeight, setFootHeight] = useState(0);
  const [contentList, setContentList] = useState([]);
  const [headImg, setHeadImg] = useState('');
  const [footImg, setFootImg] = useState('');
  const pageHeight = 40;
  const imagePageDomId = 'imagePageDomId' + new Date().getTime(); // 生成dom的Id

  // 获取 Head, Foot, Content 高度
  useEffect(() => {
    if (_.isPlainObject(domInfo)) {
      console.time('virtualFinish');
      const { headData, footData, contentData } = domInfo;
      const headRef = document.getElementById(headData.id);
      const contentRef = document.getElementById(contentData.id);
      const footRef = document.getElementById(footData.id);
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
      const time = setTimeout(() => {
        html2canvas(document.getElementById(headData.id), {
          // scale: 2,
          height: headRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
          width: headRef.offsetWidth,
          scrollY: 0
        })
          .then(canvas => {
            if (destroy()) {
              return Promise.reject();
            }

            const contentWidth = canvas.width;
            const contentHeight = canvas.height;
            const imgWidth = width;
            const imgHeight = (width / contentWidth) * contentHeight;

            const pageData = canvas.toDataURL('image/jpeg', 1.0);

            setHeadImg({ data: pageData, width: imgWidth, height: imgHeight });
          })
          .catch(err => {
            console.log(err);
          });

        html2canvas(footRef, {
          // scale: 2,
          height: footRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
          width: footRef.offsetWidth,
          scrollY: 0
        })
          .then(canvas => {
            if (destroy()) {
              return Promise.reject();
            }

            const contentWidth = canvas.width;
            const contentHeight = canvas.height;
            const imgWidth = width;
            const imgHeight = (width / contentWidth) * contentHeight;
            const pageData = canvas.toDataURL('image/jpeg', 1.0);

            setFootImg({ data: pageData, width: imgWidth, height: imgHeight });
          })
          .catch(err => {
            console.log(err);
          });
      }, 50);

      if (transformStopStatus) {
        transformStopStatus = false;

        clearTimeout(time);

        return;
      }

      setContentList(curContentList);
    }
  }, [domInfo, height, width]);

  // 监听contentList
  useEffect(() => {
    if (contentList.length > 0 && headImg && footImg && !transformStopStatus) {
      _.isFunction(renderFinish) && renderFinish();
      console.timeEnd('virtualFinish');

      console.time('previewFinish');

      getPDF();
    }
  }, [contentList, headImg, footImg]);

  return (
    <VirtualDom
      virtualClass={virtualClass}
      Head={Head}
      Foot={Foot}
      Content={Content}
      width={width}
      padding={padding}
      setDomInfo={setDomInfo}
    />
  );

  // 处理html 按要求拼接
  function getPDF() {
    return new Promise((resolve, reject) => {
      const contentRef = document.getElementById(domInfo.contentData.id);

      html2canvas(contentRef, {
        // scale: 2,
        height: contentRef.offsetHeight, // 下面解决当页面滚动之后生成图片出现白边问题
        width: contentRef.offsetWidth,
        scrollY: 0
      })
        .then(canvas => {
          if (destroy()) {
            return;
          }

          const headerWithFootHeight = headHeight + footHeight + pageHeight; //头部+尾部+页码高度
          const pageData = canvas.toDataURL('image/jpeg', 1.0);
          const imagePagesDom = document.createElement('div');

          imagePagesDom.style.width = width + 'px';
          imagePagesDom.style.position = 'fixed';
          imagePagesDom.style.zIndex = -100;
          imagePagesDom.style.backgroundColor = '#fff';
          imagePagesDom.style.top = '0';
          imagePagesDom.style.left = '0';
          imagePagesDom.id = imagePageDomId;

          previewDom(contentList, {
            width,
            height,
            headerWithFootHeight,
            pageHeight,
            padding,
            destroy,
            headImg,
            pageData,
            footImg,
            imagePagesDom
          })
            .then(() => {
              // 放在body上进行合成图片渲染
              document.body.appendChild(imagePagesDom);
              // 放在container上进行预览
              const cloneImagePagesDom = imagePagesDom.cloneNode(true);

              cloneImagePagesDom.style.position = 'static';
              cloneImagePagesDom.style.zIndex = 0;
              container.current &&
                container.current.appendChild(cloneImagePagesDom);

              _.isFunction(previewFinish) && previewFinish();
              console.timeEnd('previewFinish');

              console.time('finish');

              createPDFPreview()
                .then(({ imgList }) => {
                  if (destroy()) {
                    return;
                  }

                  console.timeEnd('finish');

                  // 如果有预览, 那么就设置setGetPdfCallback
                  if (preview) {
                    setGetPdfCallback(() => {
                      return () => createPDF(imgList);
                    });
                    _.isFunction(finish) && finish();

                    return;
                  }

                  // 如果没有预览, 就直接返回pdf文件数据
                  _.isFunction(finish) && finish(createPDF(imgList));
                })
                .finally(() => {
                  transformStopStatus = false;

                  if (imagePagesDom.parentNode) {
                    imagePagesDom.parentNode.removeChild(imagePagesDom);
                  }
                })
                .catch(err => {
                  console.log(err);

                  return Promise.reject(err);
                });
            })
            .catch();
        })
        .catch(err => {
          console.log(err);

          reject(err);
        });
    });
  }

  // 生成pdf预览文件
  function createPDFPreview() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const imagePageDom = document.getElementById(imagePageDomId);
        const ImagePageDomChildren = imagePageDom.children;
        const html2canvasList = [];

        [...ImagePageDomChildren].forEach(ImagePageDomChild => {
          html2canvasList.push(
            html2canvas(ImagePageDomChild, {
              // scale: 2,
              width: ImagePageDomChild.offsetWidth,
              height: ImagePageDomChild.offsetHeight,
              scrollY: 0
            })
          );
        });

        Promise.all(html2canvasList)
          .then(imgList => {
            if (destroy()) {
              return;
            }

            let num = 0;
            const imgDomList = document.createElement('div');
            const fragment = document.createDocumentFragment();

            imgDomList.style.width = width + 'px';
            imgDomList.style.backgroundColor = '#ccc';

            imgList.forEach((canvas, canvasIndex) => {
              const pageData = canvas.toDataURL('image/jpeg', 1.0);
              const previewImage = new Image();

              previewImage.onload = function() {
                if (destroy()) {
                  return;
                }

                num++;

                if (num === imgList.length) {
                  // 加载完成
                  resolve({ imgList });
                }
              };
              previewImage.src = pageData;
              previewImage.style.width = '100%';
              fragment.appendChild(previewImage);

              if (canvasIndex < imgList.length - 1) {
                // previewImage.style.marginBottom = '10px';
              }
            });

            imgDomList.appendChild(fragment)
          })
          .catch(err => {
            console.log(err);

            reject(err);
          });
      });
    });
  }

  function createPDF(imgList) {
    const pdf = new jsPDF({
      unit: 'pt',
      compress: true
    });

    imgList.forEach((canvas, canvasIndex) => {
      // const contentWidth = canvas.width;
      // const contentHeight = canvas.height;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      // const imgWidth = width;
      // const imgHeight = (width / contentWidth) * contentHeight;

      pdf.addImage(canvas, 'JPEG', 0, 0, 595.28, 841.89);

      if (canvasIndex < imgList.length - 1) {
        pdf.addPage();
      }
    });

    if (download) {
      pdf.save(new Date().getTime() + '.pdf');

      return;
    }

    const fileString = pdf.output('dataurlstring');

    const file = dataURLtoFile(fileString, new Date().getTime());

    return file;
  }

  //将base64转换为文件对象
  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    //转换成file对象
    return new File([u8arr], filename, { type: mime });
    //转换成成blob对象
    //return new Blob([u8arr],{type:mime});
  }

  function destroy() {
    if (transformStopStatus) {
      transformStopStatus = false;

      const imagePageDom = document.getElementById(imagePageDomId);

      if (imagePageDom && imagePageDom.parentNode) {
        imagePageDom.parentNode.removeChild(imagePageDom);
      }

      return true;
    }

    return false;
  }
}

// 执行此方法, 生成PDF流程会强制停止
HtmlTransformPDF.stop = function() {
  transformStopStatus = true;
};

// 执行此方法, 会重置状态, 在执行完stop方法后, 适当的时机需要执行此方法, 重置状态
HtmlTransformPDF.destroy = function() {
  transformStopStatus = false;
};

export default HtmlTransformPDF;
