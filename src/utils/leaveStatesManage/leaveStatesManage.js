import _ from 'lodash';

// 离开状态管理
class Blocking {
  chainSymbol = '.';

  constructor() {
    this._statusId = 0;
    this.leaveStates = { id: this._statusId };
  }

  // 创建依赖关系
  add(name, callback = () => true) {
    if (!name || !_.isString(name)) {
      throw new Error('param of add must be string');
    }

    const chainList = name.split(this.chainSymbol);

    // 如果依赖关系是正确的就返回需要创建参数的父级parent, 当前集current 和 创建集的name 否则报错
    const result = findParent(chainList, this.leaveStates, this);

    result.parent[result.name] = {
      ...result.current,
      id: ++this._statusId,
      onCallback: callback,
    };

    return () => {
      Object.keys(result.parent[result.name])
        .forEach(key => delete result.parent[result.name][key]);
    };
  }

  /**
   * 输入一层值, 判断其及他的子集是否满足离开页面条件
   * @param name a.b.c 格式 表示判断哪一层级是否满足离开页面条件
   * 返回true代表可以离开, 返回false代表不可以离开
   */
  canLeave(name) {
    if (!name || !_.isString(name)) {
      return Promise.reject('param of canLeave must be string');
    }

    const chainList = name.split(this.chainSymbol);

    const canLeave = findParent(chainList, this.leaveStates);

    if (canLeave.current) {
      // current有值的情况下 表示有需要执行的子集, 递归执行获取结果
      return onChildrenCallback(canLeave.current);
    } else {
      // 如果没有current 代表没有需要执行的子集 所以默认返回true
      return Promise.resolve(true);
    }
  }

  // 销毁
  remove(name) {
    if (!name || !_.isString(name)) {
      throw new Error('param of canLeave must be string');
    }

    const chainList = name.split(this.chainSymbol);

    const findResult = onFindStateByName(chainList, this.leaveStates);

    if (findResult.parent && findResult.name && findResult.parent[findResult.name]) {
      delete findResult.parent[findResult.name];
    }
  }
}

// 判断是否存在依赖关系的父级
function findParent(chainList, parent, that) {
  if (chainList.length === 1) {
    // 递归到最后一层(创建层)了, 所以返回父集, 当前集进行创建新的依赖
    return {
      parent,
      current: parent[chainList[0]],
      name: chainList[0],
    };
  } else if (parent?.[chainList[0]]) {
    // 递归将当前集合新的列表向下传递,去查询
    const parentItem = findParent(chainList.slice(1), parent?.[chainList[0]], that);

    // 如果有返回值 将其返回 否则返回报错信息
    if (parentItem && parentItem.name && parentItem.parent) {
      return parentItem;
    }
  } else {
    // 既不是最后一层, 也不是有向下递归的情况, 表示没有实例 创建一个默认实例, 继续递归往下
    parent[chainList[0]] = {
      id: ++that._statusId,
      onCallback: () => true,
    };

    // 递归将当前集合新的列表向下传递,去查询
    const parentItem = findParent(chainList.slice(1), parent?.[chainList[0]], that);

    // 如果有返回值 将其返回 否则返回报错信息
    if (parentItem && parentItem.name && parentItem.parent) {
      return parentItem;
    }
  }
}

// 执行当前及子集onCallback
function onChildrenCallback(leaveStatus) {
  return new Promise((resolve, reject) => {
    let isLeave = true;
    let onOff = false;

    if (_.isFunction(leaveStatus.onCallback)) {
      const callBackResult = leaveStatus.onCallback();

      if (Object.prototype.toString.call(callBackResult) === '[object Promise]') {
        // 处理异步函数
        onOff = true;

        callBackResult
          .then(res => {
            onOff = false;

            isLeave = res;

            if (!isLeave) {
              resolve(false);

              return;
            }

            console.log(!onOff)

            if (!onOff) {
              if (Object.keys(leaveStatus).length <= 2) {
                resolve(isLeave);
              }

              for (let key in leaveStatus) {
                if (key !== 'id' && key !== 'onCallback') {
                  onChildrenCallback(leaveStatus[key])
                    .then(res => {
                      resolve(res);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                }
              }
            }
          })
          .catch((err) => {
            reject(err);
          });
      }

      if (Object.prototype.toString.call(callBackResult) === '[object Boolean]') {
        isLeave = callBackResult;
      }
    }

    if (!isLeave) {
      resolve(false);

      return;
    }

    if (!onOff) {
      if (Object.keys(leaveStatus).length <= 2) {
        resolve(isLeave);

        return;
      }

      for (let key in leaveStatus) {
        if (key !== 'id' && key !== 'onCallback') {
          onChildrenCallback(leaveStatus[key])
            .then(res => {
              resolve(res);
            })
            .catch();
        }
      }
    }
  });
}

/**
 * 通过id找集合
 * @param id
 * @param currentList  当前集合
 * @param parent 父集
 * @returns {*}
 */
// function onFindStateById(id, currentList) {
//   let state;
//
//   if (currentList.id === Number(id)) {
//     state = currentList;
//   } else {
//     for (let key in currentList) {
//       if (key !== 'id' && key !== 'onCallback') {
//         const findResult = onFindStateById(id, currentList[key]);
//
//         if (findResult.state) {
//           break;
//         }
//       }
//     }
//   }
//
//   return { id, state };
// }

/**
 * 通过名字找集合
 * @param nameList {array}
 * @param currentList {object} 当前集合
 */
function onFindStateByName(nameList, currentList) {
  if (nameList.length === 1) {
    return {
      name: nameList[0],
      current: currentList[nameList[0]],
      parent: currentList,
    };
  } else if (currentList[nameList[0]]) {
    return onFindStateByName(nameList.slice(1), currentList[nameList[0]]);
  }
}

export default Blocking;
