
import { singleDocumentPage } from "../pageObject/singleDocumentPage";
import { dataSuccessCase } from "../../fixtures/datatest_processing";
const singleDoc = new singleDocumentPage();

describe('Processing Document', () => {
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
            singleDoc.clickProcessingDocument();
            singleDoc.verifyMessageProcessing(
                  data.expectedMessageProcessing,
                  data.expectedTimePay,
                  data.expected1D,
                  data.expected15AB,
                  data.expected2D,
                  data.expected3AB,
                  data.expected15D,
                  data.expected1N,
                  data.expected2N)
            })
      })
})







