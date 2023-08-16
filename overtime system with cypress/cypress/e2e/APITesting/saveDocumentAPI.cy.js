function saveDocumentbyToken() {
  let authToken;

  
  cy.request({
    method: 'POST',
    url: 'your-url',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      grant_type: 'password',
      username: 'FIRST01',
      password: 'FIRST01',
      client_id: 'ESSWebApp',
      environment: 'SQL',
      lang: 'TH',
      client_ver: '5.0',
      apipath: '1.4',
      cp_code_rms: '',
      year: '2023'
    },
    form: true
  }).then((response) => {
    expect(response.status).to.eq(200);
    authToken = response.body.access_token;
    // ตรวจสอบข้อมูลการรับสิทธิ์การเข้าถึง (access token)
    cy.log('access_token is: ' + authToken);


    
    cy.request({
      method: 'POST',
      url: 'your-url',
      body: [{
        "OT_SHDATE_TEMP":"20/06/2566",
        "OT_SHDATE_ID":0,
        "BackDay":"N",
        "OverDay":"N",
        "OT_STIME_H":"17",
        "OT_STIME_M":"31",
        "OT_ETIME_H":"19",
        "OT_ETIME_M":"32",
        "OT_RTIME_H":"02",
        "OT_RTIME_M":"01",
        "OT_S":"",
        "OT_SM":"",
        "OT_E":"",
        "OT_EM":"",
        "SH_CODE":"AU1",
        "SH_STIME_S":"08:00", //
        "SH_ETIME_S":"17:00", //
        "OT1":null,
        "OT1M":null,
        "OT2":null,
        "OT2M":null,
        "OT3":null,
        "OT3M":null,
        "OT4":null,
        "OT4M":null,
        "OT5":null,
        "OT5M":null,
        "OT6":null,
        "OT6M":null,
        "OT7":null,
        "OT7M":null,
        "OT8":null,
        "OT8M":null,
        "OTRATE":"",
        "OTRATEM":"",
        "file":null,
        "fileName":null,
        "OW_CODE":"",
        "OW_CODE2":null,
        "OW_NAME":null,
        "OW_PERCENT":null,
        "CC_CODE":"","CC_CODE2":null,
        "PJ_CODE":"","PJ_CODE2":null,
        "OS_DESC":null,
        "OW_CODEGROUP":null,
        "SHUTTLE_ROUTE":"-",
        "SHUTTLE_STOP":"-",
        "SHUTTLE_END_TIME":"-",
        "REQUEST_ROUTE_NO":"-",
        "OT_DATE_SHOW":"20/06/2566",
        "OT_SDATE_SHOW":null,
        "OT_SDATE_SHOW_FULL":"03 มกราคม 2566",
        "OT_EDATE_SHOW":null,
        "OT_SHDATE_SHOW":"03/01/2566",
        "OD_RUNNO":null,
        "OT_NO":null,
        "OT_DATE":"2023-06-20T00:00:00",
        "OT_DATE_SHOW_FULL":null,
        "OS_RUNNO":"",
        "OS_FLAG":null,
        "OT_SDATE":"2023-01-03T00:00:00",
        "OT_EDATE":"2023-01-03T00:00:00",
        "OT_SHDATE":"2023-01-03T00:00:00",
        "OS_RSTIME":null,
        "OS_RETIME":null,
        "OS_RRATE":null,
        "REMARK":null,
        "OT_STIME":null,
        "OT_ETIME":null,
        "OT_RATE":null,
        "OT_RATE1":null,
        "OT_RATE2":null,
        "OT_RATE3":null,
        "OT_RATE4":null,
        "OT_RATE5":null,
        "OT_RATE6":null,
        "OT_RATE7":null,
        "OT_RATE8":null,
        "OT_AMT1":null,
        "OT_AMT2":null,
        "OT_AMT3":null,
        "OT_AMT4":null,
        "OT_AMT5":null,
        "OT_HOURS":null,
        "OS_RHOURS":null,
        "CT_RUNNO":null,
        "CT_RUNNO_TEXT":null,
        "SL_NAME":null,
        "EM_CODE":"K001",
        "EM_RUNNO":"202205000000010",
        "EM_NAME":"ดารารัตน์ นามสมมุติ",
        "EM_TNAME":"ดารารัตน์",
        "EM_TSURNAME":"นามสมมุติ",
        "EM_ENAME":"Dararat",
        "EM_ESURNAME":"Namsomut",
        "EM_RUNNO_WORK_LIST":[],
        "CALCULATE_OT_CHECKED":true,
        "USE_SHUTTLE":false,
        "DC_RESOURCE":"202205000000010",
        "DC_CREATE":"202205000000010",
        "AdAcEM_RUNNO":"202205000000010",
        "DS_FLAG":"AD",
        "RO_RUNNO":"0000002717",
        "ENVIRONMENT":null,
        "DC_RUNNO":"0000064229",
        "RS_RUNNO":"0000011364",
        "DCS_RUNNO":null,
        "OT_OPTION":null,
        "OT_OPTION_NAME":null,
        "SR1":null,
        "SR2":null,
        "SR3":null,
        "SR4":null,
        "SR5":null,
        "SF_KEYVALUE":"0000064229;0000011364",
        "GT":"Y",
        "GU":"15:00",
        "GV":"PN01",
        "W8":"N",
        "WB":2,
        "WC":2,
        "WH":"N",
        "WI":"ค่าเหมา/ค่าควบกะ",
        "WJ":"N",
        "WK":"N",
        "WL":"N",
        "SHIFT_RATE":"SH",
        "MULTI_RECORD":false,
        "PROCESS_MODE":false,
        "IS_ALLOWANCE":false,
        "IS_SAVE_SEND":false,
        "usrDS_REMARK":"",
        "DAY_STATUS":"N",
        "DAY_STATUS_NAME":"วันทำงาน",
        "GEN_OT_RATE":null,
        "work":[{"OW_CODE":"02","CC_CODE":"","PJ_CODE":"","OW_PERCENT":100,"OS_DESC":null}]
      }],
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    }).then((response) => {
      expect(response.status).to.eq(500);

    });
  });
}

describe('API Test', () => {
  it('Send POST Request', () => {
    saveDocumentbyToken();
  });
});
