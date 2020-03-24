import _ from 'lodash';

const intlUtil = {
  /**
   * 代理多语言配置
   * @param {object} langs
   */
  params: {},
  proxy(langs) {
    if (!_.isPlainObject(langs)) {
      throw new Error('The proxy initialization parameter must be an object');
    }

    let proxyList = {};
    const _this = this;
    Object.keys(langs).forEach(langKey => {
      let langValue = langs[langKey];
      this.params[langKey] = [];

      proxyList[langKey] = new Proxy(() => [langValue, langKey], {
        apply(target, object, args) {
          const targetValue = target();
          const langsList = targetValue[0];
          let langValue = getObjeValue(
            langsList,
            'langsList',
            _this.params[targetValue[1]],
            targetValue[1]
          );

          if (args[0]) {
            if (typeof args[0] !== 'string') {
              throw new Error(
                'The first parameter to call the function must be a string'
              );
            }

            langValue = langValue[args[0]];
          }

          if (args[1]) {
            if (!_.isPlainObject(args[1])) {
              throw new Error(
                'The second parameter of the calling function must be an object'
              );
            }

            langValue = templateTranslate(langValue, args[1]);
          }

          const completeParamsStack = [
            targetValue[1],
            ..._this.params[targetValue[1]]
          ];

          if (!langValue) {
            throw new Error('无此多语言配置：' + completeParamsStack.join('.'));
          }

          if (Object.keys(langValue).length === 0) {
            throw new Error('无此多语言配置：' + completeParamsStack.join('.'));
          }

          _this.params[targetValue[1]] = [];

          return langValue;
        },
        get(target, key, receiver) {
          const targetValue = target();

          // 判断只有是字符串才能缓存key值
          if (typeof key === 'string') {
            _this.params[targetValue[1]].push(key);
          }

          return receiver;
        }
      });
    });

    proxyList = new Proxy(proxyList, {
      get(target, key, receiver) {
        const keyName = Object.keys(_this.params).find(
          paramKey => paramKey === key
        );

        if (!keyName) {
          throw new Error('无此多语言配置：' + key);
        }

        // 存在嵌套调用
        if (keyName && _this.params[keyName].length > 0) {
          throw new Error('不允许嵌套使用');
        }

        return target[key];
      }
    });

    return proxyList;
  }
};

/**
 * 获取多层对象下的指定key的value
 * @param {*} template
 * @param {*} params
 */
function getObjeValue(obj, objName, paramsStack, parentKey) {
  if (paramsStack.length === 0) {
    return obj;
  }

  const getValue = new Function(
    objName,
    `return ${objName}.${paramsStack.join('.')}`
  );

  const langName = _.cloneDeep(getValue(obj));

  if (!langName && !_.isPlainObject(langName)) {
    const completeParamsStack = [parentKey, ...paramsStack];
    throw new Error('无此多语言配置：' + completeParamsStack.join('.'));
  }

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
    const paramsKeyList = paramsList.map(v => v.replace(/[\{, \}]/g, ''));

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
