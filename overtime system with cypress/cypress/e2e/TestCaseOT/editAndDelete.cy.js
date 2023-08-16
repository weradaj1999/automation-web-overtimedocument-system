import { managementDocumentPage } from "../pageObject/documentManagementPage";
import { singleDocumentPage } from "../pageObject/singleDocumentPage";

const manageDoc = new managementDocumentPage();
const singleDoc = new singleDocumentPage();

describe('Delete and Edit Document', () => {
    before(() => {
        // Ignore Error Function App
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    beforeEach('Go to Document Form Page', () => {
        //Mock Data
        manageDoc.generateDocumentByToken('03/01/2566','03 มกราคม 2566','20','00','21','00','01','00','01');
        // Re-use Session Storage
        cy.getAuthentication('FIRST01', 'FIRST01');
        cy.getAuthorization();
        // Go to Document Management Page
        cy.visit('your-url')
    });

    it('OT-DELETE-02', () => {
        manageDoc.clickDraftDocumentAndVerify('03/01/2023','20:00-21:00')
        manageDoc.clickCheckBoxDocument();
        manageDoc.clickDeleteDocument();
        manageDoc.expectedMessageModalActionDocument('ดำเนินการเสร็จแล้ว 100%');
        manageDoc.expectedDocumentNotFound('03/01/2023','20:00-21:00')
    })

    it('OT-EDIT-01', () => {
        manageDoc.clickDraftDocumentAndVerify('03/01/2023','20:00-21:00')
        manageDoc.clickEditDocument();
        singleDoc.inputDate('04/01/2566');
        singleDoc.inputTimeByDropdown('21','00','22','00');
        singleDoc.clickSaveDocument();
        // Verify 
        cy.visit('your-url')
        manageDoc.clickDraftDocumentAndVerify('04/01/2023','21:00-22:00')
        manageDoc.deleteDocumentByToken();
    })
})
