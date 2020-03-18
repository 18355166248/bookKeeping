import _ from "lodash";

const intlUtil = {
  /**
   * 代理多语言配置
   * @param {object} langs
   */
  params: {},
  proxy(langs) {
    const proxyList = {};
    const _this = this;
    Object.keys(langs).forEach(langKey => {
      const langValue = langs[langKey];
      this.params[langKey] = [];

      proxyList[langKey] = new Proxy(() => [langValue, langKey], {
        apply(target, object, args) {
          const targetValue = target();
          const langsList = targetValue[0];
          let langValue = getObjeValue(
            langsList,
            "langsList",
            _this.params[targetValue[1]]
          );

          _this.params[targetValue[1]] = [];

          if (args[0]) {
            if (typeof args[0] !== "string") {
              throw new Error("调用函数第一个参数必须是字符串");
            }

            langValue = langValue[args[0]];
          }

          if (args[1]) {
            if (!_.isPlainObject(args[1])) {
              throw new Error("调用函数第二个参数必须是对象");
            }

            langValue = templateTranslate(langValue, args[1]);
          }

          return langValue;
        },
        get(target, key, receiver) {
          const targetValue = target();
          _this.params[targetValue[1]].push(key);

          return receiver;
        }
      });
    });

    return proxyList;
  }
};

/**
 * 获取多层对象下的指定key的value
 * @param {*} template
 * @param {*} params
 */
function getObjeValue(obj, objName, paramsStack) {
  if (paramsStack.length === 0) {
    return obj;
  }

  const getValue = new Function(
    objName,
    `return ${objName}.${paramsStack.join(".")}`
  );

  const langName = _.cloneDeep(getValue(obj));

  if (!langName && !_.isPlainObject(langName)) {
    throw new Error("无此多语言配置：" + paramsStack.join("."));
  }

  // 删除所有子集数据
  Object.keys(langName).forEach(lang => {
    if (_.isPlainObject(langName[lang])) {
      delete langName[lang];
    }
  });

  return langName;
}

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
