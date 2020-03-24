import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { intlUtil } from 'utils/lang.util.js';
import _ from 'lodash';

const commonLangConfig = {
  ok: {
    zh_CN: '确定',
    en_US: 'ok'
  },
  cancel: {
    zh_CN: '取消',
    en_US: 'cancel'
  }
};

const nestedConfig = {
  footer: {
    label: {
      zh_CN: '页底标题',
      en_US: 'Footer Label'
    },
    left: {
      zh_CN: '页底左',
      en_US: 'Footer Left',
      leftTop: {
        zh_CN: '{{label}}页底左上{{num}}',
        en_US: '{{label}} Footer Left Top {{num}}'
      }
    }
  },
  label: {
    zh_CN: '标题',
    en_US: 'Label',
    tips: {
      zh_CN: (
        <div>
          <span>选择</span>
          <span data-emphasis>牙位</span>
          <span>可做牙齿检查并设置症状，按住“</span>
          <span data-emphasis>Ctrl</span>
          <span>”可选择</span>
          <span data-emphasis>多个牙位</span>
          <span>，点</span>
          <span data-emphasis>【牙齿检查】</span>
          <span>并设置症状，右键牙位可以标记萌出or乳牙/恒牙切换。</span>
        </div>
      ),
      en_US: (
        <div>
          <span>Select </span>
          <span data-emphasis>tooth position </span>
          <span>for dental examination and set symptoms. Hold down &quot;</span>
          <span data-emphasis>Ctrl</span>
          <span>&quot; to select </span>
          <span data-emphasis>multiple tooth positions</span>
          <span>, click </span>
          <span data-emphasis>&quot;teeth check&quot; </span>
          <span>and set symptoms.</span>
        </div>
      )
    }
  },
  num: {
    zh_CN: '数字',
    en_US: 'Number'
  }
};

function Lang() {
  useEffect(() => {
    const commonLang = intlUtil.proxy(nestedConfig);

    const pageLevelLang = intlUtil.proxy({
      footer: commonLang.footer.label(),
      leftTop: commonLang.footer.left.leftTop(),
      specialContent: {
        zh_CN: '{{leftTop}}特殊内容{{footer}}',
        en_US: '{{leftTop}}special content{{footer}}'
      }
    });

    console.log(
      pageLevelLang.specialContent('zh_CN', {
        footer: pageLevelLang.footer('zh_CN'),
        leftTop: pageLevelLang.leftTop('zh_CN', {
          label: commonLang.label('en_US'),
          num: commonLang.num('en_US')
        })
      })
    );

    const getTips = commonLang.label.tips('zh_CN');
    const renderTips = (() => nestedConfig.label.tips.zh_CN)();
    console.log(_.isEqual(getTips, renderTips));
  }, []);

  return <div>Lang</div>;
}

export default Lang;
