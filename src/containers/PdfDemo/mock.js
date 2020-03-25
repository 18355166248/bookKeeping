export const data = {
  doctor: { en_US: 'Alex Jiang', zh_CN: '蒋益' },
  createFileTime: '2020-03-25',
  patientAllergyRecordList: [
    {
      allergyDegreeName: '轻度',
      allergyReactionName: '胸闷',
      allergySourceName: '大豆蛋白',
      allergyType: 9
    },
    {
      allergyDegreeName: '轻度',
      allergyReactionName: '面色苍白',
      allergySourceName: '(乙10%)兰索拉唑肠溶胶囊 (达克普隆) 30mg',
      allergyType: 1
    }
  ],
  patient: {
    age: '30Y2M2D',
    birthday: { en_US: '1990/01/23', zh_CN: '1990/01/23' },
    gender: { en_US: 'Male', zh_CN: '男' },
    mrn: '0020000983',
    name: { en_US: 'CHEN/LEI', zh_CN: '陈磊' }
  },
  diagnosisTreatmentPlanList: [{ diagnosisTreatmentPlanName: '38牙齿拔牙' }],
  deptInfo: {
    campus: { en_US: 'JIH', zh_CN: 'JIH' },
    medicalInstitution: {
      en_US: 'Jiahui International Hospital (Shanghai)',
      zh_CN: '上海嘉会国际医院'
    },
    specialty: { en_US: 'Dentistry (JIH)', zh_CN: '嘉会口腔科' }
  },
  medicalHistory: {
    dentalPastHistory: '口腔病史',
    diagnosisMedicalRecordCheckNormalList: [
      {
        checkNormalResult: '检查结果1',
        checkNormalSymptoms: '检查症状1',
        diagnosisPosition: '38'
      },
      {
        checkNormalResult: '检查结果2',
        checkNormalSymptoms: '检查症状2',
        diagnosisPosition: ''
      }
    ],
    diagnosisMedicalRecordCheckRayList: [
      { checkRaySymptoms: '辅助检查1', diagnosisPosition: '38' },
      { checkRaySymptoms: '辅助检查2', diagnosisPosition: '' }
    ],
    diagnosisMedicalRecordDiagnosisList: [
      { diagnosisDesc: '诊断1', diagnosisPosition: '38' },
      {
        diagnosisDesc: '诊断2',
        diagnosisPosition: '11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28'
      }
    ],
    diagnosisMedicalRecordDisposeList: [
      { diagnosisPosition: '38', dispose: '处置1' },
      { diagnosisPosition: '', dispose: '处置2' },
      { diagnosisPosition: '', dispose: '处置3' }
    ],
    doctorAdviceList: [
      {
        itemName: { en_US: 'Complicated extraction', zh_CN: '复杂拔牙/颗' },
        itemType: 4,
        total: '1'
      },
      {
        itemName: {
          en_US: 'CT maxillofacial w/o contrast (t)',
          zh_CN: '颌面部CT检查, 平扫 (T)'
        },
        itemType: 4,
        total: '1',
        unit: ''
      },
      {
        doseUnit: 'MG',
        everyDayDose: '200.00',
        frequencyName: { en_US: 'BID', zh_CN: '每日两次' },
        itemName: {
          en_US: 'Metronidazole tablets 200mg',
          zh_CN: '甲硝唑片 200mg'
        },
        itemType: 3,
        total: '1',
        unit: 'BOX',
        usageName: { en_US: 'PO', zh_CN: '口服' }
      }
    ],
    historySocialHabitsFlag: true,
    mainComplaint: '左侧下颌牙齿疼痛两天',
    pastIllnessHistoryBloodFlag: true,
    pastIllnessHistoryBloodList: [
      {
        amount: '1ml',
        bloodDate: '2017/1/1',
        bloodType: '04',
        bloodTypeName: '血浆Plasma',
        createTime: '2020-03-20 19:56:30',
        effect: '反应1',
        episodeId: '01OP20001782',
        hasEffect: '1',
        isValid: '1',
        keyCategory: 'blood',
        keyCategoryNameCN: '输血史',
        keyCategoryNameEN: 'blood',
        patientId: '0020000983',
        remark: '备注1',
        visitType: '2'
      },
      {
        amount: '4',
        bloodDate: '',
        bloodType: '01',
        bloodTypeName: '全血Whole Blood',
        createTime: '2020-03-20 19:56:47',
        effect: '',
        episodeId: '01OP20001782',
        hasEffect: '0',
        isValid: '1',
        keyCategory: 'blood',
        keyCategoryNameCN: '输血史',
        keyCategoryNameEN: 'blood',
        patientId: '0020000983',
        remark: '备注2',
        visitType: '2'
      }
    ],
    pastIllnessHistoryDiseaseFlag: true,
    pastIllnessHistoryDiseaseList: [
      {
        createTime: '2020-03-20 22:06:51',
        diseaseCode: '',
        diseaseEnd: '',
        diseaseName: '疾病',
        diseaseProcess: '',
        diseaseStart: '',
        episodeId: '01OP20001782',
        isInfect: '0',
        isValid: '1',
        keyCategory: 'disease',
        keyCategoryNameCN: '疾病史',
        keyCategoryNameEN: 'disease',
        patientId: '0020000983',
        remark: '',
        treatment: '',
        visitType: '2'
      },
      {
        createTime: '2020-03-20 22:07:46',
        diseaseCode: '',
        diseaseEnd: 'Now',
        diseaseName: '高血压',
        diseaseProcess: '',
        diseaseStart: '2017/1/1',
        episodeId: '01OP20001782',
        isInfect: '0',
        isValid: '1',
        keyCategory: 'disease',
        keyCategoryNameCN: '疾病史',
        keyCategoryNameEN: 'disease',
        patientId: '0020000983',
        remark: '备注',
        treatment: '治疗措施',
        visitType: '2'
      },
      {
        createTime: '2020-03-20 22:07:46',
        diseaseCode: '',
        diseaseEnd: 'Now',
        diseaseName: '糖尿病',
        diseaseProcess: '',
        diseaseStart: 'Unknown',
        episodeId: '01OP20001782',
        isInfect: '0',
        isValid: '1',
        keyCategory: 'disease',
        keyCategoryNameCN: '疾病史',
        keyCategoryNameEN: 'disease',
        patientId: '0020000983',
        remark: '',
        treatment: '疗',
        visitType: '2'
      }
    ],
    pastIllnessHistoryDrinkFlag: true,
    pastIllnessHistoryDrinkList: [
      {
        amount: '20',
        createTime: '2020-03-20 21:58:21',
        eTime: '',
        episodeId: '01OP20001782',
        isDrink: '2',
        keyCategory: 'drink',
        keyCategoryNameCN: '饮酒史',
        keyCategoryNameEN: 'drink',
        month: '0',
        patientId: '0020000983',
        remark: '备注2',
        sTime: '2017/4/7',
        visitType: '2',
        year: '0'
      }
    ],
    pastIllnessHistoryFamilyFlag: true,
    pastIllnessHistoryFamilyList: [
      {
        createTime: '2020-03-20 19:58:23',
        diseaseName: '疾病1',
        episodeId: '01OP20001782',
        isCancer: '0',
        isValid: '1',
        keyCategory: 'family',
        keyCategoryNameCN: '家庭史',
        keyCategoryNameEN: 'family',
        onsetAge: '21',
        patientId: '0020000983',
        relationCode: '2',
        relationNameChn: '父亲Father',
        relationNameEng: '',
        remark: '备注1',
        visitType: '2'
      },
      {
        createTime: '2020-03-20 19:58:23',
        diseaseName: '疾病2',
        episodeId: '01OP20001782',
        isCancer: '0',
        isValid: '1',
        keyCategory: 'family',
        keyCategoryNameCN: '家庭史',
        keyCategoryNameEN: 'family',
        onsetAge: '23',
        patientId: '0020000983',
        relationCode: '3',
        relationNameChn: '母亲Mother',
        relationNameEng: '',
        remark: '备注2',
        visitType: '2'
      }
    ],
    pastIllnessHistoryOperationFlag: true,
    pastIllnessHistoryOperationList: [
      {
        createTime: '2020-03-20 15:40:51',
        episodeId: '01OP20001782',
        isValid: '1',
        keyCategory: 'operation',
        keyCategoryNameCN: '手术史',
        keyCategoryNameEN: 'operation',
        operationDate: '2017/1/1',
        operationExplain: '',
        operationName: '阑尾切除',
        patientId: '0020000983',
        remark: '',
        visitType: '2'
      },
      {
        createTime: '2020-03-20 19:56:12',
        episodeId: '01OP20001782',
        isValid: '1',
        keyCategory: 'operation',
        keyCategoryNameCN: '手术史',
        keyCategoryNameEN: 'operation',
        operationDate: '',
        operationExplain: '',
        operationName: '手术1',
        patientId: '0020000983',
        remark: '备注',
        visitType: '2'
      }
    ],
    pastIllnessHistoryOtherFlag: true,
    pastIllnessHistoryOtherList: [
      {
        createTime: '2020-03-20 19:57:52',
        episodeId: '01OP20001782',
        isValid: '1',
        keyCategory: 'other',
        keyCategoryNameCN: '其他病史',
        keyCategoryNameEN: 'other',
        patientId: '0020000983',
        remark: 'QITA 1',
        visitType: '2'
      },
      {
        createTime: '2020-03-20 19:57:52',
        episodeId: '01OP20001782',
        isValid: '1',
        keyCategory: 'other',
        keyCategoryNameCN: '其他病史',
        keyCategoryNameEN: 'other',
        patientId: '0020000983',
        remark: 'QITA 2',
        visitType: '2'
      }
    ],
    pastIllnessHistorySmokeFlag: true,
    pastIllnessHistorySmokeList: [
      {
        amount: '20',
        createTime: '2020-03-20 21:58:21',
        eTime: 'Now',
        episodeId: '01OP20001782',
        isSmoke: '1',
        keyCategory: 'smoke',
        keyCategoryNameCN: '吸烟史',
        keyCategoryNameEN: 'smoke',
        month: '0',
        patientId: '0020000983',
        remark: '备注1',
        sTime: '2017/1/1',
        unit: '支Cigarettes',
        visitType: '2',
        year: '0'
      }
    ],
    pastIllnessHistorySportFlag: true,
    pastIllnessHistorySportList: [
      {
        createTime: '2020-03-20 19:57:52',
        episodeId: '01OP20001782',
        keyCategory: 'sport',
        keyCategoryNameCN: '运动史',
        keyCategoryNameEN: 'sport',
        patientId: '0020000983',
        remark: '备注3',
        times: '2',
        visitType: '2'
      }
    ],
    pastIllnessHistoryTravelFlag: true,
    pastIllnessHistoryTravelList: [
      {
        createTime: '2020-03-20 19:57:52',
        episodeId: '01OP20001782',
        isValid: '1',
        keyCategory: 'travel',
        keyCategoryNameCN: '旅行史',
        keyCategoryNameEN: 'travel',
        patientId: '0020000983',
        remark: '意大利',
        visitType: '2'
      },
      {
        createTime: '2020-03-20 19:57:52',
        episodeId: '01OP20001782',
        isValid: '1',
        keyCategory: 'travel',
        keyCategoryNameCN: '旅行史',
        keyCategoryNameEN: 'travel',
        patientId: '0020000983',
        remark: '挪威',
        visitType: '2'
      }
    ],
    pastIllnessHistoryWorkFlag: true,
    pastIllnessHistoryWorkList: [
      {
        createTime: '2020-03-20 19:57:52',
        episodeId: '01OP20001782',
        isValid: '1',
        keyCategory: 'work',
        keyCategoryNameCN: '职业',
        keyCategoryNameEN: 'work',
        month: '0',
        patientId: '0020000983',
        remark: '',
        visitType: '2',
        work: 'IT1',
        year: '1'
      },
      {
        createTime: '2020-03-20 19:57:52',
        episodeId: '01OP20001782',
        isValid: '1',
        keyCategory: 'work',
        keyCategoryNameCN: '职业',
        keyCategoryNameEN: 'work',
        month: '1',
        patientId: '0020000983',
        remark: '',
        visitType: '2',
        work: 'IT2',
        year: '0'
      }
    ],
    presentIllnessHistory:
      '3周前左侧下牙常有阵发性疼痛，未治疗，两天前开始抽痛，放散到整个左下颌及耳部，不能咀嚼，遂来就诊。',
    vitalSigns:
      '体温 Body temp:38.0℃ 血压 BP:80.0/120.0 mmHg 脉搏 Pulse:89.0 bpm 呼吸 BR:21 min 身高 Height:178.0 cm 体重 Weight:89.0 KG '
  },
  registerDate: '2020-03-20 15:38:43'
};
