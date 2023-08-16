export class singleDocumentPage {

  // Document Detail 
  txtDateOverTime = '.ng-star-inserted > .input-group > .form-control'
  dpdStartHourTime = '[data-test="ot_stime_hh_selected"]'
  dpdStartMinsTime = '[data-test="ot_stime_mm_selected"]'
  dpdEndHourTime = '[data-test="ot_etime_hh_selected"]'
  dpdEndMinsTime = '[data-test="ot_etime_mm_selected"]'
  txtStartHourTime = ':nth-child(2) > [placeholder="HH"'
  txtStartMinsTime = ':nth-child(2) > [placeholder="MM"]'
  txtEndHourTime = ':nth-child(4) > [placeholder="HH"]'
  txtEndMinsTime = ':nth-child(4) > [placeholder="MM"]'

  // Activity Detail
  btnAddTask = '#mainPanelCenter > :nth-child(2) > .panel > .panel-heading > .panel-tools > .btn'
  btnSearchTask = '.col-11 > [style="clear: both;"] > :nth-child(2)'
  txtTask = ':nth-child(2) > .input-group > .form-control'
  btnSelectTask = '[aria-colindex="1"] > .btn'
  btnSaveTask = '.btn-success'

  // Button
  btnSaveDocument = '.btn-h-save'
  btnSendDocument = '.btn-h-send'
  btnProcessingDocument = '[title="คำนวณ"]'

  // Time Result
  txtTimePay = '.panel-body > :nth-child(4) > .text-right > span'

  // Overtime Result
  txt1D = '.panel-body > :nth-child(2) > :nth-child(1) > :nth-child(2) > .processEdit'
  txt15AB = '.panel-body > :nth-child(2) > :nth-child(1) > :nth-child(4) > .processEdit'
  txt2D = '.panel-body > :nth-child(2) > :nth-child(2) > :nth-child(2) > .processEdit'
  txt3AB = '.panel-body > :nth-child(2) > :nth-child(2) > :nth-child(4) > .processEdit'
  txt15D = '.panel-body > :nth-child(2) > :nth-child(3) > :nth-child(2) > .processEdit'
  txt1N = ':nth-child(3) > :nth-child(4) > .processEdit'
  txt15N = ':nth-child(3) > :nth-child(4) > .processEdit'
  txt2N = ':nth-child(4) > :nth-child(4) > .processEdit'
  
  // Expected Message
  expectedMessageResult = '#swal2-content'


  
  inputDate(date){
    cy.get(this.txtDateOverTime).clear().type(date);
  }

  inputTime(sHH,sMM,eHH,eMM){
    cy.get(this.txtStartHourTime).clear().click(sHH);
    cy.get(this.txtStartMinsTime).clear().type(sMM);
    cy.get(this.txtEndHourTime).clear().type(eHH);
    cy.get(this.txtEndMinsTime).clear().type(eMM);
  }

  inputTimeByDropdown(sHH,sMM,eHH,eMM){
    cy.get(this.dpdStartHourTime).click();
    cy.get(this.dpdStartHourTime).contains(sHH).click();
    
    if (sMM !== '00') {
      cy.get(this.dpdStartMinsTime).click();
      cy.get(this.dpdStartMinsTime).contains(sMM).click();
    }

    cy.get(this.dpdEndHourTime).click();
    cy.get(this.dpdEndHourTime).contains(eHH).click();

    if (eMM !== '00') {
      cy.get(this.dpdEndMinsTime).click();
      cy.get(this.dpdEndMinsTime).contains(eMM).click();
    }
  }
  
  inputTask(taskNumber){
    cy.get(this.btnAddTask).click();
    cy.get(this.btnSearchTask).click();
    cy.get(this.txtTask).type(taskNumber);
    cy.get(this.btnSelectTask).click();
    cy.get(this.btnSaveTask).click();
  }

  clickSaveDocument(){
    cy.get(this.btnSaveDocument).scrollIntoView();
    cy.get(this.btnSaveDocument).click();
  }

  clickSendDocument(){
    cy.get(this.btnSendDocument).scrollIntoView();
    cy.get(this.btnSendDocument).click();
  }

  clickProcessingDocument(){
    cy.get(this.btnProcessingDocument).click();
  }

  verifyMessageSave() {
    cy.get(this.expectedMessageResult)
      .then(($getMessageInWeb) => {
        const elementText = $getMessageInWeb.text();
        cy.expect(elementText).to.satisfy((text) => {
          return (
            text === 'การขอนี้จะไม่ถูกจัดรถ กรุณาให้ติดต่อทาง GA' ||
            text === 'บันทึกเอกสารเรียบร้อยแล้ว'
          );
        },'The message does not match the expected value.');
      });
  }

  verifyMessageSend(message){
    cy.get(this.expectedMessageResult).contains(message)
  }

  verifyMessageProcessing(message,timePay,value1D, value15AB, value2D, value3AB, value15D, value1N, value2N) {
    const elements = [
      { selector: this.txtTimePay, value: timePay },
      { selector: this.txt1D, value: value1D },
      { selector: this.txt15AB, value: value15AB },
      { selector: this.txt2D, value: value2D },
      { selector: this.txt3AB, value: value3AB },
      { selector: this.txt15D, value: value15D },
      { selector: this.txt1N, value: value1N },
      { selector: this.txt2N, value: value2N }
    ];
    this.expectedMessage(message);
    
    elements.forEach((element) => {
      cy.get(element.selector).should('have.text', element.value);
    });
  }
  
  expectedMessage(message) {
    cy.contains(message);
  }


}