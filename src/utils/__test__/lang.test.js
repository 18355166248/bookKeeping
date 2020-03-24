import React from 'react';
import { intlUtil } from '../lang.util';
import _ from 'lodash';

const commonLangConfig = {
  ok: {
    zh_CN: '确定',
    en_US: 'ok',
    okSub: {
      zh_CN: '确定副',
      en_US: 'ok sub'
    }
  },
  cancel: {
    zh_CN: '取消',
    en_US: 'cancel'
  },
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
};

describe('intl util', () => {
  test('代理多语言配置', () => {
    const commonLang = intlUtil.proxy(commonLangConfig);

    expect(commonLang.ok('zh_CN')).toBe('确定');
  });

  test('获取多语言配置项', () => {
    const commonLang = intlUtil.proxy(commonLangConfig);

    expect(commonLang.ok()).toEqual(commonLangConfig.ok);
  });

  test('继承配置', () => {
    const commonLang = intlUtil.proxy(commonLangConfig);

    const pageLevelLang = intlUtil.proxy({
      ok: commonLang.ok(),
      okSub: commonLang.ok.okSub(),
      specialContent: {
        zh_CN: '特殊内容',
        en_US: 'special content'
      }
    });

    expect(pageLevelLang.ok('zh_CN')).toBe('确定');
    expect(pageLevelLang.okSub('zh_CN')).toBe('确定副');
  });

  test('配置嵌套', () => {
    const nestedLang = intlUtil.proxy({
      footer: {
        left: {
          zh_CN: '页底左',
          en_US: 'Footer Left'
        }
      },
      top: {
        zh_CN: '页首',
        en_US: 'Header Left',
        left: {
          zh_CN: '页首左',
          en_US: 'Header Left'
        }
      }
    });

    expect(function() {
      nestedLang.footer('zh_CN');
    }).toThrowError(new Error('无此多语言配置：footer'));

    expect(nestedLang.top('en_US')).toBe('Header Left');

    expect(nestedLang.footer.left('zh_CN')).toBe('页底左');
  });

  test('支持变量', () => {
    const includeVarLang = intlUtil.proxy({
      welcome: {
        zh_CN: '你好 {name} 欢迎你来到{address}',
        en_US: 'Hi, Welcome to {address}, {name}'
      },
      fake: {
        zh_CN: '你好 {{name}} 欢迎你来到{{address}}',
        en_US: 'Hi, Welcome to {{address}}, {{name}}'
      }
    });

    expect(
      includeVarLang.welcome('zh_CN', {
        name: '小明',
        address: '中国'
      })
    ).toBe('你好 {name} 欢迎你来到{address}');

    expect(
      includeVarLang.fake('zh_CN', {
        name: '小明',
        address: '中国'
      })
    ).toBe('你好 小明 欢迎你来到中国');
  });

  test('支持React组件作为参数', () => {
    const commonLang = intlUtil.proxy(commonLangConfig);

    const getTipsComponent = commonLang.tips('zh_CN');
    const renderTipsComponent = (() => commonLangConfig.tips.zh_CN)();
    const isSame = _.isEqual(getTipsComponent, renderTipsComponent);

    expect(isSame).toBe(true);
  });
});
