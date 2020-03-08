import _ from "lodash";
const noContainKeys = ["hour", "minute"];

// 说明:
// dataIndex表示data下的索引
// colIndex表示apptList下的索引

function getUnitAndOffset(dataList) {
  const data = _.cloneDeep(dataList);
  const arrAreaList = {};

  data.forEach((dataItem, dataIndex) => {
    Object.keys(dataItem).forEach(dataItemKey => {
      if (!noContainKeys.includes(dataItemKey)) {
        // 表示每一列的单元格
        const colList = dataItem[dataItemKey].apptList;
        // 表示哪一列, 按列进行分组
        if (!Array.isArray(arrAreaList[dataItemKey])) {
          arrAreaList[dataItemKey] = [];
        }

        const areaList = arrAreaList[dataItemKey];

        colList.forEach((col, colIndex) => {
          // 每一列中的每一个预约 生成最大值, 最小值区间
          let area = {};

          const { startTimestamp, endTimestamp } = col;

          area = {
            min: startTimestamp,
            max: endTimestamp,
            ...col,
            dataIndex,
            colIndex,
            parentKey: dataItemKey
          };

          // 将有相交区域的预约放在一个数组中,就会生成多个不想交的分组区域
          const index = areaList.findIndex(
            areaItem =>
              areaItem.findIndex(
                areaChildItem => area.min <= areaChildItem.max
              ) > -1
          );

          if (index > -1) {
            if (areaList[areaList.length - 1]) {
              areaList[areaList.length - 1].push(area);
            } else {
              areaList[areaList.length - 1] = [area];
            }
          } else {
            areaList.push([area]);
          }
        });

        arrAreaList[dataItemKey] = areaList;
      }
    });
  });

  Object.keys(arrAreaList).forEach(arrAreaKey => {
    const arrArea = arrAreaList[arrAreaKey];

    arrArea.forEach(area => {
      // 按列进行分组
      const rowSortList = [];
      // 生成当前组每列存在的最大值
      let rowMaxArr = [];

      area.forEach(areaItem => {
        if (rowSortList[areaItem.dataIndex]) {
          rowSortList[areaItem.dataIndex].push(areaItem);
        } else {
          rowSortList[areaItem.dataIndex] = [areaItem];
        }
      });

      // 将rowSortList中的每组进行降序排列
      rowSortList.forEach(rowSort => {
        rowSort.sort((a, b) => b.max - a.max);
      });

      rowSortList.forEach(rowSort => {
        rowSort.forEach((rowSortItem, rowSortIndex) => {
          const { max, min } = rowSortItem;

          // 判断当前列的数据在缓存rowMaxArr对应的数据中 哪个比较大, 大的话覆盖 并且更新rowMaxArr
          // 小的话切换到下一列并判断大小
          // 如果缓存区的值小于当前盒子的最小值, 那么证明没有交集
          const isArea = (rowMaxArr[rowSortIndex] || 0) < min;

          if (isArea) {
            // 没有交集 更新缓存区值
            rowMaxArr[rowSortIndex] = max;
            // offset为当前降序后的索引位置
            rowSortItem.$config = { offset: rowSortIndex };
          } else {
            // 存在交集 需要去下一列去判断 (递归判断)
            getRowInfo(rowMaxArr, rowSortItem, rowSortIndex + 1);
          }
        });
      });

      // 更新unit (unit的值就是rowMaxArr长度)
      const unit = rowMaxArr.length;

      area.forEach(areaItem => {
        areaItem.$config.unit = unit;
      });
    });
  });

  // console.log(arrAreaList, data);
  Object.keys(arrAreaList).forEach(arrAreaKey => {
    // 这一层表示的是每列的数据
    const arrArea = arrAreaList[arrAreaKey];
    arrArea.forEach(area => {
      // 这一层表示的分组, 各组之间没有交集
      area.forEach(areaItem => {
        // 这一层表示每一个盒子
        // 在这里给data赋值unit, offset
        const { dataIndex, colIndex, parentKey, $config } = areaItem;

        data[dataIndex][parentKey].apptList[colIndex].$config = $config;
      });
    });
  });

  return data;
}

/**
 *
 * @param {*} rowMaxArr 缓存区
 * @param {*} rowSortItem 当前盒子
 * @param {*} colPosition 预估盒子要添加的列, 有交集的话就要去下一列递归判断
 */
function getRowInfo(rowMaxArr, rowSortItem, colPosition) {
  const { max, min } = rowSortItem;
  if ((rowMaxArr[colPosition] || 0) < min) {
    rowMaxArr[colPosition] = max;
    rowSortItem.$config = { offset: colPosition };
  } else {
    getRowInfo(rowMaxArr, rowSortItem, colPosition + 1);
  }
}

export default {
  getUnitAndOffset
};
