function getUnitAndOffset(data) {
  // 初始化
  let unit = 0;
  let rowLength = data.length;
  let colLength = 0;
  let placeList = new Array(rowLength); // 模拟宫格排列位置

  data.forEach((dataItem, dataIndex) => {
    Object.keys(dataItem).forEach(dataItemKey => {
      if (dataItemKey.indexOf("col_") > -1) {
        const colList = dataItem[dataItemKey];

        colLength = colList.length > colLength ? colList.length : colLength;
      }
    });
  });

  placeList = getPlaceList(rowLength, colLength);

  data.forEach((dataItem, dataIndex) => {
    Object.keys(dataItem).forEach(dataItemKey => {
      if (dataItemKey.indexOf("col_") > -1) {
        const colList = dataItem[dataItemKey];

        colLength = colList.length > colLength ? colList.length : colLength;

        colList.forEach((col, index) => {
          const { config } = col;
          const { startRow, rowNumber } = config;

          let colIndex = index;

          col.config.unit = colLength;

          for (let i = 0; i < rowNumber; i++) {
            let rowIndex = i + dataIndex;

            while (placeList?.[rowIndex]?.[colIndex]?.use) {
              if (colIndex === placeList[rowIndex].length - 1) {
                rowIndex++;
              } else {
                colIndex++;
              }
            }

            let name = rowIndex + "." + colIndex;

            console.log(col.content.name, rowIndex, colIndex);

            col.config.offset = colIndex;

            placeList.forEach(place => {
              place.forEach(placeItem => {
                if (placeItem.name === name) {
                  placeItem.use = true;
                }
              });
            });
          }
        });
      }
    });
  });

  console.log(placeList);
  console.log(data);
}

// 生成宫格数据
function getPlaceList(row, col) {
  const placeList = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (Array.isArray(placeList[i])) {
        placeList[i].push({ name: i + "." + j });
      } else {
        placeList[i] = [{ name: i + "." + j }];
      }
    }
  }

  return placeList;
}

export default {
  getUnitAndOffset
};
