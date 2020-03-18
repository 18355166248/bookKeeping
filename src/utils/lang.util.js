import _ from "lodash";

const intlUtil = {
  /**
   * 代理多语言配置
   * @param {object} langs
   */
  params: {},
  langProxy: null,
  proxy(langs) {
    if (!_.isPlainObject(langs)) {
      throw new Error("params of lang must be object");
    }
    const _this = this;
    let paramsStack = [];

    const handler = {
      apply: function(target, ctx, args) {
        const targetValue = target();
        if (typeof args[0] === "number") {
          ctx.params["lang" + new Date().getTime()] = args[0];
          return;
        }
        // let langName = getObjeValue(targetValue, "targetValue", paramsStack);

        console.log(_this);

        // 如果执行函数传入了第一个参数
        if (args[0]) {
          if (typeof args[0] === "string") {
            // langName = langName[args[0]];
          }
        }

        // 如果执行函数传入了第二个参数
        if (args[1]) {
          if (_.isPlainObject(args[1])) {
            console.log(args[1]);
          } else {
            throw new Error(
              "The second parameter to get a language must be an Object"
            );
          }
        }

        paramsStack = [];

        return {};
      },
      get: function(target, propKey, proxy) {
        const targetValue = target();
        paramsStack.push(propKey);

        return proxy;
      }
    };

    this.langProxy = new Proxy(() => _.cloneDeep(langs), handler);

    return this.filterProxy();
  },
  filterProxy() {
    const _this = this;
    const proxy = new Proxy(
      {
        _params: []
      },
      {
        get: function(target, propKey, proxy) {
          if (propKey === "_params") {
            return target._params;
          }

          proxy._params.push(propKey);

          _this.langProxy(proxy._params.length - 1);

          return _this.langProxy;
        }
      }
    );

    return proxy;
  }
};

/**
 * 获取多层对象下的指定key的value
 * @param {*} template
 * @param {*} params
 */
function getObjeValue(obj, objName, paramsStack) {
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

export { intlUtil };
