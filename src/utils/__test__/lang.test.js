import { intlUtil } from './intl.util';

const commonLangConfig = {
  ok: {
    zh_CN: '确定',
    en_US: 'ok',
  },
  cancel: {
    zh_CN: '取消',
    en_US: 'cancel',
  },
};

describe('intl util', () => {

  test('代理多语言配置', () => {
    const commonLang = intlUtil.proxy(commonLangConfig);

    expect(commonLang.ok('zh_CN'))
    .toBe('确定');
  });

  test('获取多语言配置项', () => {
    const commonLang = intlUtil.proxy(commonLangConfig);

    expect(commonLang.ok())
    .toEqual(commonLangConfig.ok);
  });

  test('继承配置', () => {
    const commonLang = intlUtil.proxy(commonLangConfig);

    const pageLevelLang = intlUtil.proxy({
      ok: commonLang.ok,
      specialContent: {
        zh_CN: '特殊内容',
        en_US: 'special content',
      },
    });

    expect(pageLevelLang.ok('zh_CN'))
    .toBe('确定');
  });

  test('配置嵌套', () => {
    const nestedLang = intlUtil.proxy({
      footer: {
        left: {
          zh_CN: '页底左',
          en_US: 'footer left',
        },
      },
    });

    expect(function () {
      nestedLang.footer('zh_CN');
    })
    .toThrowError(new Error('无此多语言配置：footer'));

    expect(nestedLang.footer.left('zh_CN'))
    .toBe('页底左');
  });

  test('支持变量', () => {
    const includeVarLang = intlUtil.proxy({
      welcome: {
        zh_CN: '你好 {name} 欢迎你来到{address}',
        en_US: 'Hi, Welcome to {address}, {name}',
      },
      fake: {
        zh_CN: '你好 {{name}} 欢迎你来到{{address}}',
        en_US: 'Hi, Welcome to {{address}}, {{name}}',
      },
    });

    expect(includeVarLang.welcome('zh_CN', {
      name: '小明',
      address: '中国',
    }))
    .toBe('你好 {name} 欢迎你来到{address}');

    expect(includeVarLang.fake('zh_CN', {
      name: '小明',
      address: '中国',
    }))
    .toBe('你好 小明 欢迎你来到中国');
  });
});
