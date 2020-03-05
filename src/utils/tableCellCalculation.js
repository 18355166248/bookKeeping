function getUnitAndOffset(data) {
  const arrAreaList = [];

  data.forEach((dataItem, dataIndex) => {
    Object.keys(dataItem).forEach(dataItemKey => {
      if (dataItemKey.indexOf("col_") > -1) {
        // 表示每一列的单元格
        const colList = dataItem[dataItemKey];
        // 表示哪一列, 按列进行分组
        const colIndex = dataItemKey.replace("col_", "");

        if (!Array.isArray(arrAreaList[colIndex])) {
          arrAreaList[colIndex] = [];
        }

        const areaList = arrAreaList[colIndex];

        colList.forEach((col, colIndex) => {
          // 每一列中的每一个预约 生成最大值, 最小值区间
          let area = {};

          const { config } = col;

          area = {
            min: config.startRow,
            max: config.startRow + config.rowNumber - 1,
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

        /**
         * areaList代表分组之后的数据, 每一组都和其他组没有交集
         * 然后在分组里面将每组按行分类
         * 按行从上至下按照盒子的高度也就是rowNumber进行降序排列
         */
        areaList.forEach(area => {
          // 将每组相同行的数据放在一个对象下 对象名就是当前行的索引 从0开始
          const colList = {};
          let placeList = [];
          // 当前组的最小值和当前组的最大值, 依靠这个生成位置信息
          let min = Math.min(...area.map(areaItem => areaItem.min));
          let max = Math.max(...area.map(areaItem => areaItem.max));
          let unit = 0;

          area.forEach(areaItem => {
            if (colList[areaItem.dataIndex]) {
              colList[areaItem.dataIndex].push(areaItem);
            } else {
              colList[areaItem.dataIndex] = [areaItem];
            }
          });

          // 遍历每个分组下每行的预约列表
          Object.keys(colList).forEach(col => {
            // 按照数组下的config.rowNumber进行降序排列
            colList[col].sort(
              (a, b) => b.config.rowNumber - a.config.rowNumber
            );

            // 初始化unit为当前组下预约列表的最大长度
            unit = colList[col].length > unit ? colList[col].length : unit;

            // colList[col] 为降序排列的预约列表
            colList[col].forEach((colChildItem, colChildIndex) => {
              for (let i = min; i <= max; i++) {
                // 生成位置信息 例如: 0.0 1.0 2.0
                const name = String(i) + "." + String(colChildIndex);

                if (placeList.findIndex(place => place.name === name) === -1) {
                  placeList.push({ name });
                }
              }

              // 生成当前盒子所占区域的位置信息, 并设置已被占用位置标识
              const copyUnit = setPlaceInfo(
                placeList,
                colChildIndex,
                colChildItem,
                unit,
                colList
              );

              unit = copyUnit > unit ? copyUnit : unit;
            });
          });

          // 通过 placeList 去找到data对应的模块进行赋值
          placeList.forEach(place => {
            if (place.info) {
              const { dataIndex, colIndex, parentKey } = place.info;

              if (data[dataIndex][parentKey][colIndex]) {
                data[dataIndex][parentKey][colIndex].config.offset =
                  place.offset;
                data[dataIndex][parentKey][colIndex].config.unit = unit;
              }
            }
          });
        });
      }
    });
  });
}

// 递归生成正确的位置数据
function setPlaceInfo(placeList, colChildIndex, colChildItem, unit, colList) {
  const { min, max } = colChildItem;
  // 生成当前盒子所占区域
  let curAreaArr = [];

  for (let i = min; i <= max; i++) {
    curAreaArr.push(i + "." + colChildIndex);
  }

  const index = placeList.findIndex(place => place.name === curAreaArr[0]);

  if (placeList[index]) {
    if (!placeList[index].use) {
      // 代表没有占用
      curAreaArr.forEach(curArea => {
        const index = placeList.findIndex(place => place.name === curArea);

        if (index > -1) {
          placeList[index].use = true;
          placeList[index].offset = colChildIndex;
          placeList[index].info = colChildItem;
        }
      });
    } else {
      // 被占用了 需要重新计算curAreaArr
      unit = setPlaceInfo(
        placeList,
        ++colChildIndex,
        colChildItem,
        unit,
        colList
      );
    }
  } else {
    // 重新开辟一条数据
    unit = colChildIndex + 1;

    const keysList = Object.keys(colList);
    keysList.push(String(Number(keysList[keysList.length - 1]) + 1));

    keysList.forEach(colKey => {
      const name = String(colKey) + "." + String(colChildIndex);
      const colKeyIndex = placeList.findIndex(place => place.name === name);

      if (colKeyIndex === -1) {
        placeList.push({ name });
      }
    });

    // 判断 curAreaArr 是否爱placeList 如果在 要赋值 use
    curAreaArr.forEach(curArea => {
      const curIndex = placeList.findIndex(place => place.name === curArea);

      if (curIndex > -1) {
        placeList[curIndex].use = true;
        placeList[curIndex].offset = colChildIndex;
        placeList[curIndex].info = colChildItem;
      }
    });
  }

  return unit;
}

export default {
  getUnitAndOffset
};
