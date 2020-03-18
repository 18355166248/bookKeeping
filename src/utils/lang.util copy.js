import _ from "lodash";

const handler = {
  set: function(obj, prop, value) {
    if (_.isFunction(obj[prop])) {
      Object.keys(value).forEach(valueKey => {
        obj[prop][valueKey] = value[valueKey];
      });
    } else {
      obj[prop] = value;
    }

    return true;
  },
  get: function(target, propKey) {
    if (_.isFunction(target[propKey])) {
      return target[propKey];
    }

    return target[propKey];
  }
};

const intlUtil = {
  /**
   * 代理多语言配置
   * @param {object} langs
   */
  proxy(langs) {
    if (!_.isPlainObject(langs)) {
      throw new Error("params of lang must be object");
    }

    const langProxy = new Proxy({}, handler);

    Object.keys(langs).forEach(langKey => {
      let langValue = langs[langKey];

      if (_.isFunction(langValue)) {
        langValue = langValue();
      }

      if (_.isPlainObject(langValue)) {
        // if (_.has(langValue, 'zh_CN') && _.has(langValue, 'en_US')) {
        // 判断如果有zh_CN, en_US 表示符合规范
        langProxy[langKey] = (language, params) => {
          if (language) {
            if (!_.isString(language)) {
              throw new Error("params of language must be string");
            }

            if (langValue[language]) {
              if (_.isPlainObject(params)) {
                return templateTranslate(langValue[language], params);
              }

              return langValue[language];
            } else {
              throw new Error("无此多语言配置：" + langKey);
            }
          }

          return langValue;
        };

        const copyLangValue = _.cloneDeep(langValue);

        delete copyLangValue.zh_CN;
        delete copyLangValue.en_US;

        if (Object.keys(copyLangValue).length > 0) {
          const childFuncObj = this.proxy(copyLangValue);

          langProxy[langKey] = childFuncObj;
        }
      } else {
        throw new Error(
          "The first parameter of proxy is not in the correct format, expect function or object"
        );
      }
    });

    return langProxy;
  }
};

/**
 * 模板转换
 * @param {string} template 带有 {param}格式的字符串 就是需要转换的模板
 * @param {object} params 替换模板的参数
 */
function templateTranslate(template, params) {
  const reg = /\{\{(.*?)\}\}/g;

  const paramsList = template.match(reg);

  if (paramsList) {
    // eslint-disable-next-line no-useless-escape
    const paramsKeyList = paramsList.map(v => v.replace(/[\{, \}]/g, ""));

    if (Array.isArray(paramsKeyList)) {
      paramsKeyList.forEach((paramsKey, paramsIndex) => {
        if (_.has(params, paramsKey)) {
          template = template.replace(
            paramsList[paramsIndex],
            params[paramsKey]
          );
        }
      });
    }
  }

  return template;
}

export { intlUtil };
