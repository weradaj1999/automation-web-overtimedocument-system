import { multiDocumentPage } from "../pageObject/multiDocumentPage";
import { dataTestMulti } from "../../fixtures/datatest_saveMulti";

const multiDoc = new multiDocumentPage();


describe('Save Document Multi', () => {
  before(() => {
    // Ignore Error Function App
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  beforeEach('Go to Document Form Page', () => {
    // Re-use Session Storage
    cy.getAuthentication('FIRST01', 'FIRST01');
    cy.getAuthorization();
    cy.getAuthorizationMulti();
    // Go to Single Document Form Page
    cy.visit('your-url')
  });

  dataTestMulti.forEach((data) => {
    it(data.testCase, () => {

        // #1 Fill Staff Id 
        if (data.inputStaff !== null) {
          data.inputStaff.forEach((staff)=>{
            cy.wrap(staff.staffId).then((staffId)=>{
              multiDoc.inputStaffById(staffId);
            })
          })
        }

        // #2 Fill Start Date and End Date Value\
        if (data.inputStartDate !== null || data.inputEndDate !== null) {
          multiDoc.inputDate(data.inputStartDate, data.inputEndDate);
        }

        // #3 Fill Time
        if (data.inputStartHour !== null || data.inputStartMins !== null || data.inputEndHour !== null || data.inputEndMins !== null) {
          multiDoc.inputTimeByDropdown(data.inputStartHour, data.inputStartMins, data.inputEndHour, data.inputEndMins); 
        }
        

        // #4 Fill Task Id
        if (data.inputTask !== null) {
          multiDoc.inputTask(data.inputTask);
        }

        // #5 Click Save
        multiDoc.clickSaveDocument();

        // #5.1 Verify Expected Modal Message When Find The Error
        if (data.expectedModelMessage !== null) {
          data.expectedModelMessage.forEach((errorMes) => {
            cy.wrap(errorMes.errorMessage).then((message) => {
              multiDoc.verifyErrorMessage(message)
            })
          })
          multiDoc.clickCloseModal();
        }

        // #5.2 Verify Expected Document is Success by Staff Id
        if (data.expectedDocumentSuccessByUser !== null) {
          data.expectedDocumentSuccessByUser.forEach((successList) => {
            cy.wrap(successList.docStaff).then((checkUserData) => {
              multiDoc.verifyDocumentSuccessInList(checkUserData)
            })
          })
          // #5.3 Clean Data 
          multiDoc.deleteDocumentMultiByToken();
        }
    })
  })
})
          