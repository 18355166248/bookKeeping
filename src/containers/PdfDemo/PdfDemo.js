import React, { useState, Fragment } from 'react';
import HtmlToPdf from '../../components/HtmlToPdf/HtmlToPdf';
import { data } from './mock.js';
import './style.scss';
import logo from './logo.jpg';

// a4纸的尺寸[595.28,841.89]
function PdfDemo() {
  const [getPdfCallback, setGetPdfCallback] = useState(() => {});
  const {
    patient,
    deptInfo,
    doctor,
    patientAllergyRecordList,
    medicalHistory,
    diagnosisTreatmentPlanList,
    createFileTime
  } = data;

  const Header = React.forwardRef((props, ref) => (
    <div className="header" {...props} ref={ref}>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="table">
        <table
          width="100%"
          border="1px solid #ccc"
          cellSpacing="0"
          cellPadding="0"
        >
          <tbody>
            <tr>
              <td width="50%">MRN</td>
              <td width="50%">{patient.mrn}</td>
            </tr>
            <tr>
              <td width="50%">患者姓名 Patient Name</td>
              <td width="50%">
                {patient.name.zh_CN && (
                  <span>
                    <span>{patient.name.zh_CN}</span>
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td width="50%">性别/出生日期/年龄 Gender/DOB/Age</td>
              <td width="50%">
                {patient.gender.zh_CN && (
                  <span>
                    <span>{patient.gender.zh_CN + '/'}</span>
                  </span>
                )}
                {patient.birthday.zh_CN && (
                  <span if="${patient.birthday.zh_CN} != null">
                    <span text="${patient.birthday.zh_CN} + '/'">
                      {patient.birthday.zh_CN + '/'}
                    </span>
                  </span>
                )}
                {patient.age && (
                  <span if="${patient.age} != null">
                    <span text="${patient.age}">{patient.age + ' '}</span>
                  </span>
                )}
                {patient.gender.en_US && (
                  <span if="${patient.gender.en_US} != null">
                    <span text="${patient.gender.en_US} + '/'">
                      {patient.gender.en_US + '/'}
                    </span>
                  </span>
                )}
                {patient.birthday.en_US && (
                  <span if="${patient.birthday.en_US} != null">
                    <span text="${patient.birthday.en_US} + '/'">
                      {patient.birthday.en_US + '/'}
                    </span>
                  </span>
                )}
                {patient.age && (
                  <span if="${patient.age} != null">
                    <span text="${patient.age}">{patient.age}</span>
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td width="50%">院区/专科 Campus/Specialty</td>
              <td width="50%">
                {deptInfo.campus.zh_CN +
                  '(' +
                  deptInfo.campus.en_US +
                  ')  ' +
                  deptInfo.specialty.zh_CN +
                  '(' +
                  deptInfo.specialty.en_US +
                  ') '}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ));

  const Footer = React.forwardRef((props, ref) => (
    <div {...props} ref={ref}>
      <div className="footer">
        <div>
          <span className="fw-500">上海嘉会国际医院</span> Jiahui International
          Hospital (Shanghai)
        </div>
        <div className="fw-500">上海市徐汇区桂平路 689 号</div>
        <div>689 Guiping Road, Xuhui District, Shanghai</div>
      </div>
    </div>
  ));

  const Content = React.forwardRef((props, ref) => (
    <div {...props} ref={ref}>
      <div className="hospital pdf-page-range">
        <h3>上海嘉会国际医院</h3>
        <h3>Jiahui International Hospital(Shanghai)</h3>
        <h3>门诊病历摘要 Outpatient Medical Record</h3>
      </div>
      <table
        width="100%"
        border="1px solid #ccc"
        cellSpacing="0"
        cellPadding="0"
      >
        <tbody>
          <tr className="pdf-page-range">
            <td width="50%">
              <span className="fw-500">就诊日期</span>
              Consultation date：<span text="${registerDate}"></span>
            </td>
            <td width="50%">
              <span className="fw-500">主诊医师</span>
              Attending physician：
              {doctor.zh_CN && (
                <span if="${doctor.zh_CN} != null">
                  <span text="${doctor.zh_CN} + ' '">{doctor.zh_CN + ' '}</span>
                </span>
              )}
              {doctor.en_US && (
                <span if="${doctor.en_US} != null">
                  <span text="${doctor.en_US}">{doctor.en_US}</span>
                </span>
              )}
            </td>
          </tr>
          <tr className="pdf-page-range">
            <td width="50%">
              <span className="fw-500">就诊机构</span>
              <span>
                {deptInfo.medicalInstitution.zh_CN +
                  '(' +
                  deptInfo.medicalInstitution.en_US +
                  ')  '}
              </span>
            </td>
            <td width="50%">
              <span className="fw-500">专科</span>
              <span>
                {deptInfo.specialty.zh_CN +
                  '(' +
                  deptInfo.specialty.en_US +
                  ')  '}
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">主诉</span> Chief Complaint:
              </div>
              <div
                className="pdf-page-range"
                if="${medicalHistory.mainComplaint} != null"
              >
                <div>{medicalHistory.mainComplaint}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">现病史</span> History of Present
                Illness:
              </div>
              <div
                className="pdf-page-range"
                if="${medicalHistory.presentIllnessHistory} != null"
              >
                <div>{medicalHistory.presentIllnessHistory}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">药物过敏</span> Allergies：
              </div>
              {patientAllergyRecordList.map(
                (patientAllergyRecord, patientAllergyRecordIndex) => (
                  <Fragment key={patientAllergyRecordIndex}>
                    {patientAllergyRecord.allergyType === 1 && (
                      <div className="pdf-page-range">
                        <span>过敏药品:</span>
                        <span if="${patientAllergyRecord.allergySourceName} != null">
                          <span>{patientAllergyRecord.allergySourceName}</span>
                        </span>
                        <span if="${patientAllergyRecord.allergyReactionName} != null and ${patientAllergyRecord.allergyReactionName} != ''">
                          <span>
                            {'过敏反应:' +
                              patientAllergyRecord.allergyReactionName}
                          </span>
                        </span>
                        <span if="${patientAllergyRecord.allergyDegreeName} != null and ${patientAllergyRecord.allergyDegreeName} != ''">
                          <span>
                            {'严重级别:' +
                              patientAllergyRecord.allergyDegreeName}
                          </span>
                        </span>
                      </div>
                    )}
                    {patientAllergyRecord.allergyType !== 1 && (
                      <div className="pdf-page-range">
                        <span>过敏原:</span>
                        <span if="${patientAllergyRecord.allergySourceName} != null">
                          <span>{patientAllergyRecord.allergySourceName}</span>
                        </span>
                        <span if="${patientAllergyRecord.allergyReactionName} != null and ${patientAllergyRecord.allergyReactionName} != ''">
                          <span>
                            {'过敏反应:' +
                              patientAllergyRecord.allergyReactionName}
                          </span>
                        </span>
                        <span if="${patientAllergyRecord.allergyDegreeName} != null and ${patientAllergyRecord.allergyDegreeName} != ''">
                          <span>
                            {'严重级别:' +
                              patientAllergyRecord.allergyDegreeName}
                          </span>
                        </span>
                      </div>
                    )}
                  </Fragment>
                )
              )}
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">既往史</span> Past medical history:
              </div>
              <div className="pl-32 pastMedicalHistory">
                {medicalHistory.pastIllnessHistoryDiseaseFlag && (
                  <Fragment>
                    <div className="pdf-page-range">
                      <span className="fw-500">疾病史 Past diseases：</span>
                    </div>
                    {medicalHistory.pastIllnessHistoryDiseaseList.map(
                      (pastIllnessHistory, pastIllnessHistoryIndex) => (
                        <div
                          className="pl-32 pdf-page-range"
                          key={pastIllnessHistoryIndex}
                        >
                          <span if="${pastIllnessHistory.diseaseName} != null">
                            <span>{pastIllnessHistory.diseaseName + ' '}</span>
                          </span>
                          <span if="${pastIllnessHistory.diseaseStart} != null and ${pastIllnessHistory.diseaseStart} != ''">
                            <span>
                              {pastIllnessHistory.diseaseStart + ' ~ '}
                            </span>
                          </span>
                          <span if="${pastIllnessHistory.diseaseEnd} != null">
                            <span>{pastIllnessHistory.diseaseEnd + ' '}</span>
                          </span>
                          <span if="${pastIllnessHistory.treatment} != null">
                            <span>{pastIllnessHistory.treatment + ' '}</span>
                          </span>
                          <span if="${pastIllnessHistory.remark} != null">
                            <span>{pastIllnessHistory.remark + ' '}</span>
                          </span>
                        </div>
                      )
                    )}
                  </Fragment>
                )}
                {medicalHistory.historySocialHabitsFlag && (
                  <Fragment>
                    <div className="pdf-page-range">
                      <span className="fw-500">
                        社会习惯史 Personal history :
                      </span>
                    </div>
                    {medicalHistory.pastIllnessHistorySmokeFlag && (
                      <div>
                        <div className="pdf-page-range">
                          <span className="fw-500">吸烟史 Cigarette :</span>
                        </div>
                        {medicalHistory.pastIllnessHistorySmokeList.map(
                          (pastIllnessHistory, pastIllnessHistoryIndex) => (
                            <div
                              key={pastIllnessHistoryIndex}
                              className="pl-32 pdf-page-range"
                            >
                              {pastIllnessHistory.isSmoke === '0' && (
                                <span if="${pastIllnessHistory.isSmoke} eq '0'">
                                  <span> 否 no </span>
                                </span>
                              )}
                              {pastIllnessHistory.isSmoke === '2' && (
                                <span if="${pastIllnessHistory.isSmoke} eq '0'">
                                  <span> 已戒 Quitted </span>
                                </span>
                              )}
                              {pastIllnessHistory.isSmoke === '1' && (
                                <span if="${pastIllnessHistory.isSmoke} eq '0'">
                                  <span> 是 yes </span>
                                </span>
                              )}

                              <span if="${pastIllnessHistory.amount} != null and ${pastIllnessHistory.amount} != ''">
                                <span>
                                  {pastIllnessHistory.amount +
                                    ' ' +
                                    pastIllnessHistory.unit +
                                    '/天 Day '}
                                </span>
                              </span>
                              <span if="${pastIllnessHistory.sTime} != null and ${pastIllnessHistory.sTime} != ''">
                                <span>{pastIllnessHistory.sTime + ' ~ '}</span>
                              </span>
                              <span if="${pastIllnessHistory.eTime} != null">
                                <span>{pastIllnessHistory.eTime + ' '}</span>
                              </span>
                              <span if="${pastIllnessHistory.remark} != null">
                                <span>{pastIllnessHistory.remark + ' '}</span>
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {medicalHistory.pastIllnessHistoryDrinkFlag && (
                      <div>
                        <div className="pdf-page-range">
                          <span className="fw-500">饮酒史 Alcohol :</span>
                        </div>
                        {medicalHistory.pastIllnessHistoryDrinkList.map(
                          (pastIllnessHistory, pastIllnessHistoryIndex) => (
                            <div
                              key={pastIllnessHistoryIndex}
                              className="pl-32 pdf-page-range"
                            >
                              {pastIllnessHistory.isDrink === '0' && (
                                <span>
                                  <span> 否 no </span>
                                </span>
                              )}
                              {pastIllnessHistory.isDrink === '2' && (
                                <span>
                                  <span> 已戒 Quitted </span>
                                </span>
                              )}
                              {pastIllnessHistory.isDrink === '1' && (
                                <span>
                                  <span> 是 yes </span>
                                </span>
                              )}

                              <span if="${pastIllnessHistory.amount} != null and ${pastIllnessHistory.amount} != ''">
                                <span>
                                  {pastIllnessHistory.amount + 'ml/天 Day '}
                                </span>
                              </span>
                              <span if="${pastIllnessHistory.sTime} != null and ${pastIllnessHistory.sTime} != ''">
                                <span>{pastIllnessHistory.sTime + ' ~ '}</span>
                              </span>
                              <span if="${pastIllnessHistory.eTime} != null">
                                <span>{pastIllnessHistory.eTime + ' '}</span>
                              </span>
                              <span if="${pastIllnessHistory.remark} != null">
                                <span>{pastIllnessHistory.remark + ' '}</span>
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {medicalHistory.pastIllnessHistorySportFlag && (
                      <div>
                        <div className="pdf-page-range">
                          <span className="fw-500">运动史 Exercises :</span>
                        </div>
                        {medicalHistory.pastIllnessHistorySportList.map(
                          (pastIllnessHistory, pastIllnessHistoryIndex) => (
                            <div
                              key={pastIllnessHistoryIndex}
                              className="pl-32 pdf-page-range"
                            >
                              {pastIllnessHistory.times === '0' && (
                                <span>不运动 </span>
                              )}
                              {pastIllnessHistory.times === '1' && (
                                <span>经常运动 </span>
                              )}
                              {pastIllnessHistory.times === '2' && (
                                <span>曾静运动现已停止 </span>
                              )}

                              <span if="${pastIllnessHistory.remark} != null">
                                <span>{pastIllnessHistory.remark + ' '}</span>
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {medicalHistory.pastIllnessHistoryTravelFlag && (
                      <div>
                        <div className="pdf-page-range">
                          <span className="fw-500">
                            近期旅行史 Recennt travel :
                          </span>
                        </div>
                        {medicalHistory.pastIllnessHistoryTravelList.map(
                          (pastIllnessHistory, pastIllnessHistoryIndex) => (
                            <div
                              key={pastIllnessHistoryIndex}
                              className="pl-32 pdf-page-range"
                            >
                              <div if="${pastIllnessHistory.remark} != null">
                                <span>{pastIllnessHistory.remark + ' '}</span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {medicalHistory.pastIllnessHistoryWorkFlag && (
                      <div>
                        <div className="pdf-page-range">
                          <span className="fw-500">职业史 Occupation :</span>
                        </div>
                        {medicalHistory.pastIllnessHistoryWorkList.map(
                          (pastIllnessHistory, pastIllnessHistoryIndex) => (
                            <div
                              key={pastIllnessHistoryIndex}
                              className="pl-32 pdf-page-range"
                            >
                              <span if="${pastIllnessHistory.work} != null">
                                <span>{pastIllnessHistory.work + ' '}</span>
                              </span>
                              <span if="${pastIllnessHistory.year} != null">
                                <span>{pastIllnessHistory.year + 'Y '}</span>
                              </span>
                              <span if="${pastIllnessHistory.month} != null">
                                <span>{pastIllnessHistory.month + 'M '}</span>
                              </span>
                              <span if="${pastIllnessHistory.remark} != null">
                                <span>{pastIllnessHistory.remark}</span>
                              </span>
                              <br />
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {medicalHistory.pastIllnessHistoryOtherFlag && (
                      <div>
                        <div className="pdf-page-range">
                          <span className="fw-500">其他 Others :</span>
                        </div>
                        {medicalHistory.pastIllnessHistoryOtherList.map(
                          (pastIllnessHistory, pastIllnessHistoryIndex) => (
                            <div
                              key={pastIllnessHistoryIndex}
                              className="pl-32 pdf-page-range"
                            >
                              <span>{pastIllnessHistory.remark}</span>
                              <br />
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </Fragment>
                )}
                {medicalHistory.pastIllnessHistoryFamilyFlag && (
                  <Fragment>
                    <div className="pdf-page-range">
                      <span className="fw-500">家族史 Family history:</span>
                    </div>
                    {medicalHistory.pastIllnessHistoryFamilyList.map(
                      (pastIllnessHistory, pastIllnessHistoryIndex) => (
                        <div
                          className="pl-32 pdf-page-range"
                          key={pastIllnessHistoryIndex}
                        >
                          <div>
                            <span if="${pastIllnessHistory.relationNameChn} != null">
                              <span>
                                {pastIllnessHistory.relationNameChn + ' '}
                              </span>
                            </span>
                            <span if="${pastIllnessHistory.relationNameEng} != null">
                              <span>
                                {pastIllnessHistory.relationNameEng + ' '}
                              </span>
                            </span>
                            <span if="${pastIllnessHistory.diseaseName} != null">
                              <span>
                                {pastIllnessHistory.diseaseName + ' '}
                              </span>
                            </span>
                            <span if="${pastIllnessHistory.remark} != null">
                              <span>{pastIllnessHistory.remark + ' '}</span>
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </Fragment>
                )}
                {medicalHistory.pastIllnessHistoryOperationFlag && (
                  <Fragment>
                    <div className="pdf-page-range">
                      <span className="fw-500">手术外伤史 Surgery Trauma:</span>
                    </div>
                    {medicalHistory.pastIllnessHistoryOperationList.map(
                      (pastIllnessHistory, pastIllnessHistoryIndex) => (
                        <div
                          className="pl-32 pdf-page-range"
                          key={pastIllnessHistoryIndex}
                        >
                          <span if="${pastIllnessHistory.operationName} != null">
                            <span>
                              {pastIllnessHistory.operationName + ' '}
                            </span>
                          </span>
                          <span if="${pastIllnessHistory.operationDate} != null">
                            <span>
                              {pastIllnessHistory.operationDate + ' '}
                            </span>
                          </span>
                          <span if="${pastIllnessHistory.operationExplain} != null">
                            <span>
                              {pastIllnessHistory.operationExplain + ' '}
                            </span>
                          </span>
                          <span if="${pastIllnessHistory.remark} != null">
                            <span>{pastIllnessHistory.remark + ' '}</span>
                          </span>
                        </div>
                      )
                    )}
                  </Fragment>
                )}
                {medicalHistory.pastIllnessHistoryBloodFlag && (
                  <Fragment>
                    <div className="pdf-page-range">
                      <span className="fw-500">输血史 Transfusion:</span>
                    </div>
                    {medicalHistory.pastIllnessHistoryBloodList.map(
                      (pastIllnessHistory, pastIllnessHistoryIndex) => (
                        <div
                          className="pl-32 pdf-page-range"
                          key={pastIllnessHistoryIndex}
                        >
                          <span if="${pastIllnessHistory.bloodTypeName} != null">
                            <span>
                              {pastIllnessHistory.bloodTypeName + ' '}
                            </span>
                          </span>
                          <span if="${pastIllnessHistory.bloodDate} != null">
                            <span>{pastIllnessHistory.bloodDate + ' '}</span>
                          </span>
                          <span if="${pastIllnessHistory.amount} != null">
                            <span>{pastIllnessHistory.amount + ' '}</span>
                          </span>
                          {pastIllnessHistory.hasEffect === '0' && (
                            <span if="${pastIllnessHistory.hasEffect} eq '0'">
                              <span> 无 no 输血反应TR </span>
                            </span>
                          )}
                          {pastIllnessHistory.hasEffect === '1' && (
                            <span if="${pastIllnessHistory.hasEffect} eq '1'">
                              <span> 有 yes 输血反应TR </span>
                            </span>
                          )}
                          <span if="${pastIllnessHistory.effect} != null">
                            <span>{pastIllnessHistory.effect + ' '}</span>
                          </span>
                          <span if="${pastIllnessHistory.remark} != null">
                            <span>{pastIllnessHistory.remark + ' '}</span>
                          </span>
                        </div>
                      )
                    )}
                  </Fragment>
                )}
              </div>
              <div>
                <div className="pdf-page-range">
                  <span className="fw-500">口腔专科既往史</span> Past Medical
                  history of stomatology:
                </div>
                <div
                  className="pdf-page-range"
                  if="${medicalHistory.dentalPastHistory} != null"
                >
                  <div>{medicalHistory.dentalPastHistory}</div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">检查</span> Physical checkup:
              </div>
              {medicalHistory.diagnosisMedicalRecordCheckNormalList.map(
                (
                  diagnosisMedicalRecordCheckNormal,
                  diagnosisMedicalRecordCheckNormalIndex
                ) => (
                  <div
                    className="pdf-page-range"
                    key={diagnosisMedicalRecordCheckNormalIndex}
                  >
                    <span if="${diagnosisMedicalRecordCheckNormal.diagnosisPosition} != null">
                      <span>
                        {diagnosisMedicalRecordCheckNormal.diagnosisPosition}
                      </span>
                    </span>
                    <span if="${diagnosisMedicalRecordCheckNormal.checkNormalSymptoms} != null">
                      <span>
                        {diagnosisMedicalRecordCheckNormal.checkNormalSymptoms +
                          ','}
                      </span>
                    </span>
                    <span if="${diagnosisMedicalRecordCheckNormal.checkNormalResult} != null">
                      <span>
                        {diagnosisMedicalRecordCheckNormal.checkNormalResult}
                      </span>
                    </span>
                  </div>
                )
              )}
              <div className="pdf-page-range">
                <span className="fw-500">生命体征</span> Vital signs:
              </div>
              <div
                className="pdf-page-range"
                if="${medicalHistory.vitalSigns} != null"
              >
                <div>{medicalHistory.vitalSigns}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">辅助检查</span> Auxiliary examinations:
              </div>
              {medicalHistory.diagnosisMedicalRecordCheckRayList.map(
                (
                  diagnosisMedicalRecordCheckRay,
                  diagnosisMedicalRecordCheckRayIndex
                ) => (
                  <div
                    className="pdf-page-range"
                    key={diagnosisMedicalRecordCheckRayIndex}
                  >
                    <span if="${diagnosisMedicalRecordCheckRay.diagnosisPosition} != null">
                      <span>
                        {diagnosisMedicalRecordCheckRay.diagnosisPosition}
                      </span>
                    </span>
                    <span if="${diagnosisMedicalRecordCheckRay.checkRaySymptoms} != null">
                      <span>
                        {diagnosisMedicalRecordCheckRay.checkRaySymptoms}
                      </span>
                    </span>
                  </div>
                )
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">诊断</span> Diagnosis:
              </div>
              {medicalHistory.diagnosisMedicalRecordDiagnosisList.map(
                (
                  diagnosisMedicalRecordDiagnosis,
                  diagnosisMedicalRecordDiagnosisIndex
                ) => (
                  <div
                    className="pdf-page-range"
                    key={diagnosisMedicalRecordDiagnosisIndex}
                  >
                    <span if="${diagnosisMedicalRecordDiagnosis.diagnosisPosition} != null">
                      <span>
                        {diagnosisMedicalRecordDiagnosis.diagnosisPosition}
                      </span>
                    </span>
                    <span if="${diagnosisMedicalRecordDiagnosis.diagnosisDesc} != null">
                      <span>
                        {diagnosisMedicalRecordDiagnosis.diagnosisDesc}
                      </span>
                    </span>
                  </div>
                )
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">治疗计划</span> Treatment plan :
              </div>
              {diagnosisTreatmentPlanList.map(
                (diagnosisTreatmentPlan, diagnosisTreatmentPlanIndex) => (
                  <div
                    className="pdf-page-range"
                    key={diagnosisTreatmentPlanIndex}
                  >
                    <div if="${diagnosisTreatmentPlan.diagnosisTreatmentPlanName} != null">
                      {diagnosisTreatmentPlan.diagnosisTreatmentPlanName}
                    </div>
                  </div>
                )
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">处置</span> Processing :
              </div>
              {medicalHistory.diagnosisMedicalRecordDisposeList.map(
                (
                  diagnosisMedicalRecordDispose,
                  diagnosisMedicalRecordDisposeIndex
                ) => (
                  <div
                    className="pdf-page-range"
                    key={diagnosisMedicalRecordDisposeIndex}
                  >
                    <span if="${diagnosisMedicalRecordDispose.diagnosisPosition} != null">
                      <span>
                        {diagnosisMedicalRecordDispose.diagnosisPosition}
                      </span>
                    </span>
                    <span if="${diagnosisMedicalRecordDispose.dispose} != null">
                      <span>{diagnosisMedicalRecordDispose.dispose}</span>
                    </span>
                  </div>
                )
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">Order</span>
              </div>
              {medicalHistory.doctorAdviceList.map(
                (doctorAdvice, doctorAdviceIndex) => (
                  <Fragment key={doctorAdviceIndex}>
                    {doctorAdvice.itemType === 3 && (
                      <div if="${doctorAdvice.itemType} == 3">
                        <div className="pdf-page-range">
                          <span className="fw-500">
                            {doctorAdviceIndex + 1}
                          </span>
                          <span>{doctorAdvice.itemName.zh_CN + '，'}</span>
                          <span if="${doctorAdvice.everyDayDose} != null">
                            <span>
                              {'每次量 ' +
                                doctorAdvice.everyDayDose +
                                doctorAdvice.doseUnit}
                              + '，'}
                            </span>
                          </span>
                          <span if="${doctorAdvice.total} != null">
                            <span>
                              {'总量 ' +
                                doctorAdvice.total +
                                doctorAdvice.unit +
                                '，'}
                            </span>
                          </span>
                          <span if="${doctorAdvice.usageName} != null">
                            <span>{doctorAdvice.usageName.zh_CN + '，'}</span>
                          </span>
                          <span if="${doctorAdvice.frequencyName} != null">
                            <span>{doctorAdvice.frequencyName.zh_CN}</span>
                          </span>
                        </div>
                        <div className="pdf-page-range">
                          <span>{doctorAdvice.itemName.en_US + '，'}</span>
                          <span if="${doctorAdvice.everyDayDose} != null">
                            <span>
                              {'Dose ' +
                                doctorAdvice.everyDayDose +
                                doctorAdvice.doseUnit +
                                '，'}
                            </span>
                          </span>
                          <span if="${doctorAdvice.total} != null">
                            <span>
                              {'Total ' +
                                doctorAdvice.total +
                                doctorAdvice.unit +
                                '，'}
                            </span>
                          </span>
                          <span if="${doctorAdvice.usageName} != null">
                            <span>{doctorAdvice.usageName.en_US + '，'}</span>
                          </span>
                          <span if="${doctorAdvice.frequencyName} != null">
                            <span>{doctorAdvice.frequencyName.en_US}</span>
                          </span>
                        </div>
                      </div>
                    )}
                    {doctorAdvice.itemType === 4 && (
                      <div className="pdf-page-range">
                        <span className="fw-500">{doctorAdviceIndex + 1}</span>
                        <span>
                          {doctorAdvice.itemName.zh_CN +
                            ',' +
                            doctorAdvice.itemName.en_US}
                        </span>
                      </div>
                    )}
                  </Fragment>
                )
              )}
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">医嘱</span> Doctor's order :
                <span>{medicalHistory.doctorAdvice}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="pdf-page-range">
                <span className="fw-500">医师姓名</span> Physician's name :
                <span>{doctor.zh_CN}</span>
                <span>{doctor.en_US}</span>
              </div>
              <div className="pdf-page-range">
                <span className="fw-500">医师签名</span> Physician's signature :
                <span>{doctor.zh_CN}</span>
                <span>{doctor.en_US}</span>
              </div>
              <div className="pdf-page-range">
                <span className="fw-500">日期</span> Date :
                <span>{createFileTime}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ));

  return (
    <div>
      <button onClick={createPDF}>生成pdf</button>
      <HtmlToPdf
        preview
        fileName="测试Pdf文件名"
        padding={20}
        Head={Header}
        Foot={Footer}
        Content={Content}
        renderFinish={renderFinish}
        finish={finish}
        setGetPdfCallback={setGetPdfCallback}
      />
    </div>
  );

  function renderFinish() {
    console.log('renderFinish');
  }

  function finish() {
    console.log('finish');
  }

  function createPDF() {
    getPdfCallback().then(fileString => {
      console.log(fileString);
    });
  }
}

export default PdfDemo;
