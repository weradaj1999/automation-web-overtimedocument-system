

import { managementDocumentPage } from "../pageObject/documentManagementPage";
import { singleDocumentPage } from "../pageObject/singleDocumentPage";
import { dataSuccessCase, dataUnsuccessCase } from "../../fixtures/datatest_save";

const singleDoc = new singleDocumentPage();
const manageDoc = new managementDocumentPage();


describe('Save Document For Success Case', () => {
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
            // Go to Single Document Form Page
            cy.visit('your-url')
      });

      dataSuccessCase.forEach((data) => {
            it(data.testCase, () => {
            // cy.log(data.description)
            singleDoc.inputDate(data.inputDate);
            singleDoc.inputTimeByDropdown(data.inputStartHour,data.inputStartMins,data.inputEndHour,data.inputEndMins);
            singleDoc.inputTask(data.inputTask);
            singleDoc.clickSaveDocument();
            singleDoc.verifyMessageSave(data.expectedMessageSave);
            manageDoc.openDocumentManagementPage();
            manageDoc.clickDraftDocumentAndVerify(data.expectedDateInList,data.expectedTimeRequestInList)
            manageDoc.deleteDocumentByToken();
            })
      })
})


describe('Save Document For Unsuccess Case', () => {
      before(() => {
            // Ignore Error Function App
            Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
            })
      });

      beforeEach('Open System', () => {
            // Re-use Session Storage
            cy.getAuthentication('FIRST01', 'FIRST01');
            cy.getAuthorization();
            // Go to Single Document Form Page
            cy.visit('your-url')
      });

      dataUnsuccessCase.forEach((data)=>{
            it(data.testCase, () => {
            singleDoc.inputDate(data.inputDate);
            singleDoc.inputTimeByDropdown(data.inputStartHour,data.inputStartMins,data.inputEndHour,data.inputEndMins);
            singleDoc.inputTask(data.inputTask);
            singleDoc.clickSaveDocument();
            singleDoc.expectedMessage(data.expectedMessageSave);
            })
      })
})





