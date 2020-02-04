import { intlUtil } from 'utils/intl.util';

/**
 * @namespace commonLang
 */
const commonLang = intlUtil.proxy({
  ok: {
    zh_CN: '确定',
    en_US: 'ok',
  },
  cancel: {
    zh_CN: '取消',
    en_US: 'cancel',
  },

  footer: {
    left: {
      zh_CN: '页底左',
      en_US: 'footer left',
    },

    right: {
      zh_CN: '页底右',
      en_US: 'footer right',
    },
  },
});

export default commonLang;
