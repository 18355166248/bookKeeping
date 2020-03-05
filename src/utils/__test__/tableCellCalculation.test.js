import { tableCellCalculation } from "../tableCellCalculation";
import _ from "lodash";

const tableData = [
  {
    rowId: 0,
    col_0: [
      {
        id: 1,
        config: {
          col: 0,
          startRow: 0,
          rowNumber: 2
        },
        content: {
          name: "第一行第一个预约"
        }
      },
      {
        id: 2,
        config: {
          col: 0,
          startRow: 0,
          rowNumber: 1
        },
        content: {
          name: "第一行第二个预约"
        }
      },
      {
        id: 3,
        config: {
          col: 0,
          startRow: 0,
          rowNumber: 3
        },
        content: {
          name: "第一行第三个预约"
        }
      }
    ]
  },
  {
    rowId: 1,
    col_0: [
      {
        id: 2,
        config: {
          col: 0,
          startRow: 1,
          rowNumber: 3
        },
        content: {
          name: "第二行第一个预约"
        }
      }
    ]
  },
  {
    rowId: 2,
    col_0: [
      {
        id: 2,
        config: {
          col: 0,
          startRow: 2,
          rowNumber: 2
        },
        content: {
          name: "第三行第一个预约"
        }
      }
    ]
  },
  {
    rowId: 3
  },
  {
    rowId: 4,
    col_0: [
      {
        id: 3,
        config: {
          col: 0,
          startRow: 4,
          rowNumber: 2
        },
        content: {
          name: "第五行第一个预约"
        }
      }
    ]
  },
  {
    rowId: 5,
    col_0: [
      {
        id: 3,
        config: {
          col: 0,
          startRow: 5,
          rowNumber: 1
        },
        content: {
          name: "第六行第一个预约"
        }
      }
    ]
  }
];

describe("测试单元格数据", () => {
  it("生成unit和offset参数", () => {
    const expectTableData = [
      {
        rowId: 0,
        col_0: [
          {
            id: 1,
            config: {
              col: 0,
              startRow: 0,
              rowNumber: 2,
              unit: 3,
              offset: 1
            },
            content: {
              name: "第一行第一个预约"
            }
          },
          {
            id: 2,
            config: {
              col: 0,
              startRow: 0,
              rowNumber: 1,
              unit: 3,
              offset: 2
            },
            content: {
              name: "第一行第二个预约"
            }
          },
          {
            id: 3,
            config: {
              col: 0,
              startRow: 0,
              rowNumber: 3,
              unit: 3,
              offset: 0
            },
            content: {
              name: "第一行第三个预约"
            }
          }
        ]
      },
      {
        rowId: 1,
        col_0: [
          {
            id: 2,
            config: {
              col: 0,
              startRow: 1,
              rowNumber: 3,
              unit: 3,
              offset: 2
            },
            content: {
              name: "第二行第一个预约"
            }
          }
        ]
      },
      {
        rowId: 2,
        col_0: [
          {
            id: 2,
            config: {
              col: 0,
              startRow: 2,
              rowNumber: 2,
              unit: 3,
              offset: 1
            },
            content: {
              name: "第三行第一个预约"
            }
          }
        ]
      },
      {
        rowId: 3
      },
      {
        rowId: 4,
        col_0: [
          {
            id: 3,
            config: {
              col: 0,
              startRow: 4,
              rowNumber: 2,
              unit: 2,
              offset: 0
            },
            content: {
              name: "第五行第一个预约"
            }
          }
        ]
      },
      {
        rowId: 5,
        col_0: [
          {
            id: 3,
            config: {
              col: 0,
              startRow: 5,
              rowNumber: 1,
              unit: 2,
              offset: 1
            },
            content: {
              name: "第六行第一个预约"
            }
          }
        ]
      }
    ];

    const TableDataCalculation = tableCellCalculation(tableData);

    const isSame = _.isEqual(TableDataCalculation, expectTableData);

    expect(isSame).toBe(true);
  });
});
