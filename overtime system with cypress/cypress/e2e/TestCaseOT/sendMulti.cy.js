    import { multiDocumentPage } from "../pageObject/multiDocumentPage";
    import { dataTestMulti } from "../../fixtures/datatest_sendMulti";

    const multiDoc = new multiDocumentPage();


describe('Send Document Multi', () => {
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
            // #1 Fill Multi Employee By Id
            if (data.inputStaff !== null) {
                data.inputStaff.forEach((staff)=>{
                    cy.wrap(staff.staffId).then((staffId)=>{
                        multiDoc.inputStaffById(staffId);
                    })
                })
            }

            // #2 Fill Start Date and End Date Value
            if (data.inputStartDate !== null || data.inputEndDate !== null) {
                multiDoc.inputDate(data.inputStartDate, data.inputEndDate);
            }

            // #3 Fill Time Value
            if (data.inputStartHour !== null || data.inputStartMins !== null || data.inputEndHour !== null || data.inputEndMins !== null) {
                multiDoc.inputTimeByDropdown(data.inputStartHour, data.inputStartMins, data.inputEndHour, data.inputEndMins); 
            }

            // #4 Fill Activity or Task Id
            if (data.inputTask !== null) {
                multiDoc.inputTask(data.inputTask);
            }

            // #5 Click Save
            multiDoc.clickSaveDocument();

            // #5.1 Verify Expected Modal Message When Find The Error
            if (data.expectedModelMessage !== null) {
                data.expectedModelMessage.forEach((errorMes) => {
                    cy.wrap(errorMes.errorMessage).then((message) => {
                        multiDoc.verifyErrorMessage(message);
                    })
                })
                multiDoc.clickCloseModal();
            }

            // #5.2 Verify Expected Document When Success 
            if (data.expectedDocumentSuccessByUser !== null) {
                data.expectedDocumentSuccessByUser.forEach((successList) => {
                    cy.wrap(successList.docStaff).then((checkUserData) => {
                        multiDoc.verifyDocumentSuccessInList(checkUserData)
                    })
                })
                // #5.2.1 Get Document Id Before Click Send
                multiDoc.getDocumentIdInList();

                // #6 Select All Document
                multiDoc.clickLabelAllDocument();

                // // #7 Click Send
                multiDoc.clickSendDocument();
                multiDoc.clickConfirmSendDocument();

                // // #8 Clean All Document
                multiDoc.deleteDocumentMultiByToken();
            }
        })
    })
})
            