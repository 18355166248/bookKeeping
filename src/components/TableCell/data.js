import moment from "moment";

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
          name: "第一行第一个预约 offset: 1 unit: 4"
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
          name: "第一行第二个预约 offset: 2 unit: 4"
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
          name: "第一行第三个预约 offset: 0 unit: 4"
        }
      }
    ]
  },
  {
    rowId: 1,
    col_0: [
      {
        id: 4,
        config: {
          col: 0,
          startRow: 1,
          rowNumber: 3
        },
        content: {
          name: "第二行第一个预约 offset: 2 unit: 4"
        }
      }
    ]
  },
  {
    rowId: 2,
    col_0: [
      {
        id: 5,
        config: {
          col: 0,
          startRow: 2,
          rowNumber: 2
        },
        content: {
          name: "第三行第一个预约 offset: 1 unit: 4"
        }
      },
      {
        id: 6,
        config: {
          col: 0,
          startRow: 2,
          rowNumber: 2
        },
        content: {
          name: "第三行第二个预约 offset: 3 unit: 4"
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
        id: 7,
        config: {
          col: 0,
          startRow: 4,
          rowNumber: 2
        },
        content: {
          name: "第五行第一个预约 offset: 0 unit: 3"
        }
      }
    ]
  },
  {
    rowId: 5,
    col_0: [
      {
        id: 8,
        config: {
          col: 0,
          startRow: 5,
          rowNumber: 1
        },
        content: {
          name: "第六行第一个预约 offset: 2 unit: 3"
        }
      },
      {
        id: 9,
        config: {
          col: 0,
          startRow: 5,
          rowNumber: 2
        },
        content: {
          name: "第六行第二个预约 offset: 1 unit: 3"
        }
      }
    ]
  }
];

const tableData2 = [
  {
    col_0: [
      {
        config: {
          startRow: 0,
          rowNumber: 2
        },
        content: {
          name: "第一行第一个预约 offset: 1 unit: 5"
        }
      },
      {
        config: {
          startRow: 0,
          rowNumber: 2
        },
        content: {
          name: "第一行第二个预约 offset: 2 unit: 5"
        }
      },
      {
        config: {
          startRow: 0,
          rowNumber: 3
        },
        content: {
          name: "第一行第一个预约 offset: 0 unit: 5"
        }
      }
    ],
    col_1: [
      {
        config: {
          startRow: 0,
          rowNumber: 2
        },
        content: {
          name: "第二列: 第一行第一个预约 offset: 0 unit: 3"
        }
      },
      {
        config: {
          startRow: 0,
          rowNumber: 1
        },
        content: {
          name: "第二列: 第一行第二个预约 offset: 2 unit: 3"
        }
      },
      {
        config: {
          startRow: 0,
          rowNumber: 2
        },
        content: {
          name: "第二列: 第一行第一个预约 offset: 1 unit: 3"
        }
      }
    ]
  },
  {
    col_0: [
      {
        config: {
          startRow: 1,
          rowNumber: 2
        },
        content: {
          name: "第二行第一个预约 offset: 3 unit: 5"
        }
      }
    ],
    col_1: [
      {
        config: {
          startRow: 1,
          rowNumber: 1
        },
        content: {
          name: "第二列: 第二行第一个预约 offset: 2 unit: 3"
        }
      }
    ]
  },
  {
    col_0: [
      {
        config: {
          startRow: 2,
          rowNumber: 1
        },
        content: {
          name: "第三行第一个预约 offset: 2 unit: 5"
        }
      },
      {
        config: {
          startRow: 2,
          rowNumber: 1
        },
        content: {
          name: "第三行第二个预约 offset: 4 unit: 5"
        }
      },
      {
        config: {
          startRow: 2,
          rowNumber: 2
        },
        content: {
          name: "第三行第三个预约 offset: 1 unit: 5"
        }
      }
    ],
    col_1: [
      {
        config: {
          startRow: 2,
          rowNumber: 2
        },
        content: {
          name: "第二列: 第三行第一个预约 offset: 1 unit: 3"
        }
      },
      {
        config: {
          startRow: 2,
          rowNumber: 3
        },
        content: {
          name: "第二列: 第三行第一个预约 offset: 0 unit: 3"
        }
      }
    ]
  },
  {
    col_0: [
      {
        config: {
          startRow: 3,
          rowNumber: 2
        },
        content: {
          name: "第四行第一个预约 offset: 0 unit: 5"
        }
      }
    ]
  },
  {
    col_1: [
      {
        config: {
          startRow: 4,
          rowNumber: 1
        },
        content: {
          name: "第二列: 第五行第一个预约 offset: 1 unit: 3"
        }
      },
      {
        config: {
          startRow: 4,
          rowNumber: 1
        },
        content: {
          name: "第二列: 第五行第一个预约 offset: 2 unit: 3"
        }
      }
    ]
  },
  {
    col_0: [
      {
        config: {
          startRow: 5,
          rowNumber: 1
        },
        content: {
          name: "第六行第一个预约 offset: 1 unit: 3"
        }
      },
      {
        config: {
          startRow: 5,
          rowNumber: 2
        },
        content: {
          name: "第六行第二个预约 offset: 0 unit: 3"
        }
      }
    ]
  },
  {
    col_0: [
      {
        config: {
          startRow: 6,
          rowNumber: 1
        },
        content: {
          name: "第七行第一个预约 offset: 1 unit: 3"
        }
      },
      {
        config: {
          startRow: 6,
          rowNumber: 1
        },
        content: {
          name: "第七行第一个预约 offset: 2 unit: 3"
        }
      }
    ]
  }
];

const tableData3 = [
  {
    hour: {},
    minute: {},
    doctorId_1: {
      apptList: [
        {
          patientName: "第一行第一个预约 offset: 0 unit: 3",
          startTimestamp: moment()
            .hours(9)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(10)
            .minutes(39)
            .endOf("minutes")
            .valueOf()
        },
        {
          patientName: "第一行第二个预约 offset: 2 unit: 3",
          startTimestamp: moment()
            .hours(9)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(9)
            .minutes(19)
            .endOf("minutes")
            .valueOf()
        },
        {
          patientName: "第一行第三个预约 offset: 1 unit: 3",
          startTimestamp: moment()
            .hours(9)
            .minutes(10)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(9)
            .minutes(29)
            .endOf("minutes")
            .valueOf()
        }
      ]
    },
    doctorId_2: {
      apptList: [
        {
          patientName: "第二列: 第一行第一个预约 offset: 0 unit: 1",
          startTimestamp: moment()
            .hours(9)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(10)
            .minutes(39)
            .endOf("minutes")
            .valueOf()
        }
      ]
    }
  },
  {
    hour: {},
    minute: {},
    doctorId_1: {
      apptList: [
        {
          patientName: "第二行第一个预约 offset: 2 unit: 3",
          startTimestamp: moment()
            .hours(10)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(10)
            .minutes(38)
            .endOf("minutes")
            .valueOf()
        },
        {
          patientName: "第二行第二个预约 offset: 1 unit: 3",
          startTimestamp: moment()
            .hours(10)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(10)
            .minutes(39)
            .endOf("minutes")
            .valueOf()
        }
      ]
    }
  },
  {
    hour: {},
    minute: {},
    doctorId_1: {
      apptList: [
        {
          patientName: "第三行第一个预约 offset: 0 unit: 1",
          startTimestamp: moment()
            .hours(20)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(20)
            .minutes(39)
            .endOf("minutes")
            .valueOf()
        }
      ]
    }
  }
];

const expectTableData = [
  {
    hour: {},
    minute: {},
    doctorId_1: {
      apptList: [
        {
          patientName: "第一行第一个预约 offset: 0 unit: 3",
          startTimestamp: moment()
            .hours(9)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(10)
            .minutes(39)
            .endOf("minutes")
            .valueOf(),
          $config: {
            offset: 0,
            unit: 3
          }
        },
        {
          patientName: "第一行第二个预约 offset: 2 unit: 3",
          startTimestamp: moment()
            .hours(9)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(9)
            .minutes(19)
            .endOf("minutes")
            .valueOf(),
          $config: {
            offset: 2,
            unit: 3
          }
        },
        {
          patientName: "第一行第三个预约 offset: 1 unit: 3",
          startTimestamp: moment()
            .hours(9)
            .minutes(10)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(9)
            .minutes(29)
            .endOf("minutes")
            .valueOf(),
          $config: {
            offset: 1,
            unit: 3
          }
        }
      ]
    },
    doctorId_2: {
      apptList: [
        {
          patientName: "第二列: 第一行第一个预约 offset: 0 unit: 1",
          startTimestamp: moment()
            .hours(9)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(10)
            .minutes(39)
            .endOf("minutes")
            .valueOf(),
          $config: {
            offset: 0,
            unit: 1
          }
        }
      ]
    }
  },
  {
    hour: {},
    minute: {},
    doctorId_1: {
      apptList: [
        {
          patientName: "第二行第一个预约 offset: 2 unit: 3",
          startTimestamp: moment()
            .hours(10)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(10)
            .minutes(38)
            .endOf("minutes")
            .valueOf(),
          $config: {
            offset: 2,
            unit: 3
          }
        },
        {
          patientName: "第二行第二个预约 offset: 1 unit: 3",
          startTimestamp: moment()
            .hours(10)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(10)
            .minutes(39)
            .endOf("minutes")
            .valueOf(),
          $config: {
            offset: 1,
            unit: 3
          }
        }
      ]
    }
  },
  {
    hour: {},
    minute: {},
    doctorId_1: {
      apptList: [
        {
          patientName: "第三行第一个预约 offset: 0 unit: 1",
          startTimestamp: moment()
            .hours(20)
            .minutes(0)
            .startOf("minutes")
            .valueOf(),
          endTimestamp: moment()
            .hours(20)
            .minutes(39)
            .endOf("minutes")
            .valueOf(),
          $config: {
            offset: 0,
            unit: 1
          }
        }
      ]
    }
  }
];

export default {
  tableData,
  tableData2,
  tableData3,
  expectTableData
};
