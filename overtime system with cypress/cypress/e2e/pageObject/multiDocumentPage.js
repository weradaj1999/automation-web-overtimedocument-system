
export class multiDocumentPage {

    // Employee Detail
    btnSearchStaff = '[title="พนักงาน"] > :nth-child(1) > .form-control'
    txtSearchStaff = ':nth-child(3) > .input-group > .form-control'
    labelStaff = '.ag-selection-checkbox > .ag-icon-checkbox-unchecked'
    btnSelectStaff = ':nth-child(3) > .input-group > .input-group-append > #btn-select-1 > :nth-child(2)'
    
    // Document Detail
    txtStartDate = ':nth-child(2) > cp-date > [title=""] > .ng-star-inserted > .input-group > .form-control'
    txtEndDate = ':nth-child(4) > cp-date > [title=""] > .ng-star-inserted > .input-group > .form-control'
    dpdStartHourTime = '[data-test="ot_stime_hh_selected"]'
    dpdStartMinsTime = '[data-test="ot_stime_mm_selected"]'
    dpdEndHourTime = '[data-test="ot_etime_hh_selected"]'
    dpdEndMinsTime = '[data-test="ot_etime_mm_selected"]'

     // Activity Detail
    btnAddTask = '#mainPanelCenter > :nth-child(2) > .panel > .panel-heading > .panel-tools > .btn'
    btnSearchTask = '.col-11 > [style="clear: both;"] > :nth-child(2)'
    txtTask = ':nth-child(2) > .input-group > .form-control'
    btnSelectTask = '[aria-colindex="1"] > .btn'
    btnSaveTask = 'body > ngb-modal-window:nth-child(23) > div > div > div.modal-body > div > div > div.row.ng-star-inserted > div > button.btn.btn-success.btn-long-work'

    // Expected Result
    btnCloseModalMessage = '.close > span'
    txtDateOTModal = '.ag-column-hover > .ag-cell-label-container > .ag-header-cell-label'
    
    // Button 
    btnSaveDocument = '#mainPanelCenter > div.row.ng-star-inserted > div > button.btn.btn-success.btn-long-work'
    btnSendDocument = '.btn-h-send'
    btnConfirmSendDocument = '.swal2-confirm'
    labelSelectAllDocument = '[col-id="SELECT_FIELD"] > .ag-header-select-all'

    // Document Id Result
    txtDocumentId = 'body > app-root > div > div.content.min-vh-80 > div > div > div > app-multi > div.min-vh-85 > div.panel.panel-primary > div.panel-body > div:nth-child(2) > ag-grid-angular > div > div.ag-root-wrapper-body.ag-layout-normal > div > div.ag-body-viewport.ag-layout-normal.ag-row-no-animation > div.ag-center-cols-clipper > div > div > div.ag-row.ag-row-no-focus.ag-row-even.ag-row-level-0.ag-row-position-absolute.ag-row-first > div:nth-child(3)'



    inputStaffById(staffId){
        cy.get(this.btnSearchStaff).click();
        cy.get(this.txtSearchStaff).type(staffId);
        cy.get(this.labelStaff).click();

        cy.get('body').click(); 

        cy.get(this.btnSelectStaff)
        .should('be.visible')
        .click();
    }

    inputDate(startDate,endDate){
        cy.get(this.txtStartDate)
        .clear().type(startDate);
        cy.get(this.txtEndDate)
        .clear().type(endDate);
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

    clickCloseModal(){
        cy.wait(300)
        // cy.get('body').click();
        cy.get(this.btnCloseModalMessage)
        .should('be.visible')
        .click();
    }

    clickLabelAllDocument(){
        cy.get(this.labelSelectAllDocument)
        .click();
    }

    clickSendDocument(){
        cy.get(this.btnSendDocument)
        .should('be.visible')
        .click();
    }

    clickConfirmSendDocument(){
        cy.get(this.btnConfirmSendDocument)
        .should('be.visible')
        .click();
        cy.contains('ส่งสำเร็จ')
    }

    verifyErrorMessage(message){
        cy.contains(message);
    }

    verifyDocumentSuccessInList(staffId){
        cy.contains(staffId)
    }

    getDocumentIdInList(){
        return  cy.get(this.txtDocumentId)
        .invoke('text').then((getDocumentId)=>{
            return  getDocumentId;
        })
    }

    deleteDocumentMultiByToken() {
        // Call Value getDocmentId
        this.getDocumentIdInList().then((value)=>{
            cy.log(value);

            let authToken;
            let DCS_RUNNO;
            // ส่งคำขอรับค่า Token
            cy.request({
                method: 'POST',
                url: 'your-url-token',
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
                // cy.log('access_token is: ' + authToken);


                // Request For Get DCS_RUNNO Value
                cy.request({
                method: 'GET',
                url: `your-url/${value}`,
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
                }).then((response) => {
                expect(response.status).to.eq(200);

                for (let i = 0; i < response.body.length; i++){ //response.body.length = 2
                    const DCS_RUNNO = response.body[i].DCS_RUNNO;
                    cy.log('DCS_RUNNO ' + DCS_RUNNO);

                    // Request For Rollback Document by Token
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
                        cy.log('ROLLBACK DOCUMENT SUCCESS')

                        // Request Delete Document by Token
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
                            })
                        })
                }
            })
        })
    })
}

}
