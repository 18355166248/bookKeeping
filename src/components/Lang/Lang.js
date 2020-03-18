import React, { useEffect } from "react";
import { intlUtil } from "utils/lang.util.js";
import _ from "lodash";

const commonLangConfig = {
  ok: {
    zh_CN: "确定",
    en_US: "ok"
  },
  cancel: {
    zh_CN: "取消",
    en_US: "cancel"
  }
};

const nestedConfig = {
  footer: {
    zh_CN: "页底",
    en_US: "footer",
    label: {
      zh_CN: "页底标题",
      en_US: "Footer Label"
    },
    left: {
      zh_CN: "页底左",
      en_US: "Footer Left",
      leftTop: {
        zh_CN: "{{label}}页底左上{{num}}",
        en_US: "{{label}} Footer Left Top {{num}}"
      }
    }
  },
  label: {
    zh_CN: "标题",
    en_US: "Label"
  },
  num: {
    zh_CN: "数字",
    en_US: "Number"
  }
};

function Lang() {
  useEffect(() => {
    const commonLang = intlUtil.proxy(nestedConfig);

    // console.log(
    //   commonLang.footer.left.leftTop("zh_CN", {
    //     label: "传入Label",
    //     num: "传入Num"
    //   })
    // );
    console.log(
      commonLang.footer.left.leftTop("en_US", {
        num: commonLang.num("en_US"),
      })
    );

    // console.log(commonLang.footer.left.leftTop);
    // console.log(commonLang.footer.left("en_US"));
    // console.log("1.", commonLang.footer);

    // console.log('2.', _.isEqual(commonLang.ok(), commonLangConfig.ok));

    // const pageLevelLang = intlUtil.proxy({
    //   ok: commonLang.ok,
    //   cancle: commonLang.cancel,
    //   specialContent: {
    //     zh_CN: '特殊内容',
    //     en_US: 'special content',
    //   },
    // });

    // console.log('3.', pageLevelLang.ok('en_US'));

    // const nestedLang = intlUtil.proxy({
    //   footer: {
    //     zh_CN: '页底',
    //     en_US: 'footer',
    //     left: {
    //       zh_CN: '页底左',
    //       en_US: 'footer left',
    //       leftTop: {
    //         zh_CN: '页底左上',
    //         en_US: 'footer leftTop',
    //       }
    //     },
    //   },
    // });

    // console.log(nestedLang.footer('zh_CN'))
    // console.log(nestedLang.footer.left('en_US'))
    // console.log(nestedLang.footer.left.leftTop('zh_CN'))

    // const includeVarLang = intlUtil.proxy({
    //   welcome: {
    //     zh_CN: '你好 {name} 欢迎你来到这里{age}',
    //     en_US: 'Hi, Welcome to here, {name}, {age}',
    //   },
    //   fake: {
    //     zh_CN: '你好 {{name}} 欢迎你来到{{address}}',
    //     en_US: 'Hi, Welcome to {{address}}, {{name}}',
    //   },
    // });

    // console.log(includeVarLang.welcome('zh_CN', {
    //   name: '小明',
    // }))

    // console.log(includeVarLang.fake('zh_CN', {
    //   name: '小明',
    //   address: '中国'
    // }))
  }, []);

  return <div>Lang</div>;
}

export default Lang;
