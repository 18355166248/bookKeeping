export function previewDom(contentList, {
  width,
  height,
  headerWithFootHeight,
  pageHeight,
  padding,
  destroy,
  headImg,
  pageData,
  footImg,
  imagePagesDom,
}) {
  return new Promise(resolve => {
    let loadNum = 0; // 每页三个 contentList * 3 = 总loadNum
    const fragment = document.createDocumentFragment();

    contentList.forEach((content, contentIndex) => {
      const imagBox = document.createElement('div');

      imagBox.style.width = width + 'px';
      imagBox.style.height = height + 'px';
      imagBox.style.paddingLeft = padding + 'px';
      imagBox.style.paddingRight = padding + 'px';
      imagBox.style.backgroundColor = '#fff';
      // imagBox.style.marginBottom = '10px';
      imagBox.innerHTML = '';
      const imgHead = new Image();
      const imgContent = new Image();
      const imgFoot = new Image();
      const contentBox = document.createElement('div');

      // 头部图片渲染完成
      imgHead.onload = function () {
        if (destroy()) {
          return;
        }

        resolveEnd();
      };
      // 中间主题图片渲染完成
      imgContent.onload = function () {
        if (destroy()) {
          return;
        }

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

        resolveEnd();
      };
      // 底部图片渲染完成
      imgFoot.onload = function () {
        if (destroy()) {
          return;
        }

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

        resolveEnd();
      };

      imagBox.appendChild(imgHead);
      imagBox.appendChild(contentBox);
      imagBox.appendChild(imgFoot);

      fragment.appendChild(imagBox);

      imgHead.src = headImg.data;
      imgHead.style.width = '100%';
      imgContent.src = pageData;
      imgContent.style.width = '100%';
      imgFoot.src = footImg.data;
      imgFoot.style.width = '100%';
    });

    function resolveEnd() {
      if (typeof loadNum === 'number' && ++loadNum === contentList.length * 3) {
        loadNum = '';
        imagePagesDom.appendChild(fragment);
        resolve();
      }
    }
  });
}
