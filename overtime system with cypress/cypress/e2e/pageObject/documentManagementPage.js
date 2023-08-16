

export class managementDocumentPage {

  // Create Document Button
  btnCreateDocument = '#home-panel > div > div > div > div > div.col-md-9 > div > div.panel-body > div > fieldset:nth-child(1) > div > div:nth-child(2) > form > button.btn.btn-add.ng-scope.btn-80'
  
  // Select Workflow
  btnSearchWorkflow = '#lkRO_LIST2 > div > div.input-group > span > button'
  txtWorkflow = '#input_search'
  btnSelectWorkflow = '#1687232777153-0-uiGrid-0097-cell .cs-button .btn'
  
  // Select Type Document 
  btnCreateDocumentSingleForm = '#modalSelectWorkFlow > div > div > div.modal-body > div:nth-child(5) > div > button'
  btnCreateDocumentMultiForm = '#modalSelectWorkFlow > div > div > div.modal-body > div:nth-child(6) > div > button'
  
  // Document Box
  btnMyDocument = 'เอกสารของฉัน'
  btnDraftDocument = 'เอกสารร่าง/คืน'
  headingDraftDocument = `#home-panel > div > div > div > div > div.col-md-9 > div > div.panel-heading.hidden-xs > h3:nth-child(2)`
  btnInboxDocument = 'เอกสารเข้า'
  btnOutboxDocument = 'เอกสารออก'

  // Button
  btnDeleteDocument = '.ng-scope > div.ng-binding > .btn-h-delete'
  btnCloseModalActionDocument = '#modalActionDocument > .modal-dialog > .modal-content > .modal-footer > .btn'
  btnEditDocument = ':nth-child(1) > .font-size-responsive > [style="padding-top: 10px; margin-left: 30px;"] > .hidden-xs > :nth-child(2) > :nth-child(2) > .btn > .fa'
  
  clickCreateDocument(){
    cy.get(this.btnCreateDocument).scrollIntoView();
    cy.get(this.btnCreateDocument).click();
  }
  
  inputWorkflow(workflowID){
    cy.get(this.btnSearchWorkflow).click();
    cy.get(this.txtWorkflow).type(workflowID +'{enter}');
    cy.get(this.btnSelectWorkflow).click();
  }

  clickCreateDocumentSingleForm(){
    cy.get(this.btnCreateDocumentSingleForm).click();
  }
  
  // Switch Window homePage to documentManagementPage 
  openDocumentManagementPage(){
    cy.intercept('GET', 'your-url').as('pageLoad');
    cy.visit('your-url');
  }

  clickDraftDocumentAndVerify(checkDate,checkTime){
    cy.contains(this.btnDraftDocument).click();
    cy.wait(1000);
    cy.contains(this.btnDraftDocument).click();
    cy.wait(100);
    cy.contains(this.btnDraftDocument).click();
    cy.contains(checkDate)
    cy.contains(checkTime)
  }

  clickMyDocumentAndVerify(checkDate,checkTime){
    cy.contains(this.btnMyDocument).click();
    cy.contains(checkDate)
    cy.contains(checkTime)
  }

  clickCheckBoxDocument() {
    this.getDCSNo().then((dcs)=>{
      // cy.log('DCS_NO = '+ dcs)
      cy.window().then(win => {
        const element = win.document.querySelector(`label[for='${dcs}']`);
        if (element) {
          element.click();
        } else {
  
          cy.log('Element not found');
        }
      });
    })
  }    

  clickDeleteDocument(){
    cy.get(this.btnDeleteDocument)
    .should('be.visible').click();
  }

  clickEditDocument(){
    this.getDCSNo().then((dcsNo)=>{
      cy.window().then((win) => {
        cy.stub(win, 'open', url => {
          win.location.href = `your-url/${dcsNo}`;
        }).as("popup")
      })
    })
    cy.get(this.btnEditDocument).click()
  }

  expectedMessageModalActionDocument(mes){
    cy.contains(mes);
    cy.get(this.btnCloseModalActionDocument).click();
  }

  expectedDocumentNotFound(checkDate,checkTime){
    cy.contains(checkDate).should('not.be.visible');
    cy.contains(checkTime).should('not.be.visible');
  }

  getDocumentId(){
    // Get Text using Invoke
    return  cy.get(':nth-child(1) > .font-size-responsive > [style="padding-top: 10px; margin-left: 30px;"] > .col-sm-2 > :nth-child(1)')
      .invoke('text')
      .then((getDocNumber) => {
        const lines = getDocNumber.split('\n');
        const documentNumber = lines[2].trim();
        // return  cy.log(documentNumber);
        return  documentNumber;
      })
  }

  getDCSNo() {
    return  this.getDocumentId().then((value)=>{
      cy.log(value)

    let DCS_RUNNO;
    // cy.log(documentNumber);
    return cy.request({
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
      const authToken = response.body.access_token;
      cy.log('access_token is: ' + authToken);
  
      return cy.request({
        method: 'GET',
        url: `your-url/${value}`,
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
        }).then((response) => {
          expect(response.status).to.eq(200);
          DCS_RUNNO = response.body[0].DCS_RUNNO;
          return  DCS_RUNNO;
          // cy.log('DCS_RUNNO ' + DCS_RUNNO);
      });
    })
    })
  }

  deleteDocumentByToken() {
    // Get Text
    cy.get(':nth-child(1) > .font-size-responsive > [style="padding-top: 10px; margin-left: 30px;"] > .col-sm-2 > :nth-child(1)')
      .invoke('text')
      .then((getDocNumber) => {
        const lines = getDocNumber.split('\n');
        const documentNumber = lines[2].trim();
        cy.log(documentNumber);

        let authToken;
        let DCS_RUNNO;

        
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
          cy.log('access_token is: ' + authToken);

          // Request for Get DCS_RUNNO Value
          cy.request({
            method: 'GET',
            url: `your-url/${documentNumber}`,
            headers: {
              'Authorization': 'Bearer ' + authToken
            }
          }).then((response) => {
            expect(response.status).to.eq(200);
            DCS_RUNNO = response.body[0].DCS_RUNNO;
            cy.log('DCS_RUNNO ' + DCS_RUNNO);

            
            cy.request({
              method: 'POST',
              url: 'your-url',
              body: [{
                "dcs_runno": DCS_RUNNO,
                "DCS_RUNNO": DCS_RUNNO,
                "rs_runno": "0000011365",
                "RS_RUNNO": "0000011365",
                "DS_FLAG": "NM",
                "AdAcEM_RUNNO": "202205000000010",
                "UsrDS_REMARK": null
              }],
              headers: {
                'Authorization': 'Bearer ' + authToken
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
              cy.log('ROLLBACK SUCCESS')

              cy.request({
                method: 'POST',
                url: 'your-url',
                body: [{
                  "dcs_runno": DCS_RUNNO,
                  "DCS_RUNNO": DCS_RUNNO,
                  "rs_runno": "0000011364",
                  "RS_RUNNO": "0000011364",
                  "DS_FLAG": "NM",
                  "AdAcEM_RUNNO": "202205000000010",
                  "UsrDS_REMARK": null
                }],
                headers: {
                  'Authorization': 'Bearer ' + authToken
                }
              }).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('DELETE DOCUMENT SUCCESS')
            });
          });
        });
      })
    })
  }

  generateDocumentByToken(date,dateThai,stimeH,stimeM,etimeH,etimeM,hh,mm,taskId) {
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
      cy.log('access_token is: ' + authToken);

      cy.request({
        method: 'POST',
        url: 'your-url',
        body: {
          "OT_SHDATE_TEMP":"21/07/2566", 
          "OT_SHDATE_ID":0,
          "BackDay":"N",
          "OverDay":"N",
          "OT_STIME_H":stimeH, 
          "OT_STIME_M":stimeM,
          "OT_ETIME_H":etimeH,
          "OT_ETIME_M":etimeM,
          "OT_RTIME_H":hh,
          "OT_RTIME_M":mm,
          "OT_S":"",
          "OT_SM":"",
          "OT_E":"",
          "OT_EM":"",
          "SH_CODE":"AU1",
          "SH_STIME_S":"08:00",
          "SH_ETIME_S":"17:00",
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
          "CC_CODE":"",
          "CC_CODE2":null,
          "PJ_CODE":"",
          "PJ_CODE2":null,
          "OS_DESC":null,
          "OW_CODEGROUP":null,
          "SHUTTLE_ROUTE":"-",
          "SHUTTLE_STOP":"-",
          "SHUTTLE_END_TIME":"-",
          "REQUEST_ROUTE_NO":"-",
          "OT_DATE_SHOW":"21/07/2566",
          "OT_SDATE_SHOW":null,
          "OT_SDATE_SHOW_FULL":dateThai,
          "OT_EDATE_SHOW":null,
          "OT_SHDATE_SHOW":date,
          "OD_RUNNO":null,
          "OT_NO":null,
          "OT_DATE":"2023-07-21T00:00:00",
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
          "DC_RUNNO":"0000067012",
          "RS_RUNNO":"0000011364",
          "DCS_RUNNO":null,
          "OT_OPTION":null,
          "OT_OPTION_NAME":null,
          "SR1":null,
          "SR2":null,
          "SR3":null,
          "SR4":null,
          "SR5":null,
          "SF_KEYVALUE":"0000067012;0000011364",
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
          "work":[{"OW_CODE":taskId,"CC_CODE":"","PJ_CODE":"","OW_PERCENT":100,"OS_DESC":null}]
                    
        },
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  }

}


