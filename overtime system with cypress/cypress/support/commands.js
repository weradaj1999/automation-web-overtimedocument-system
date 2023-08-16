import { loginPage } from "../e2e/pageObject/loginPage"
const authentication = new loginPage()

// Method Re-use Session Storage
Cypress.Commands.add('getAuthentication',(username, password) => {
  cy.session('MySession', () => {
    cy.visit('/');
    authentication.login(username, password);
    authentication.loginVerifyUser('ดารารัตน์ นามสมมุติ');
  }, {
    cacheAcrossSpecs: true // ทำให้ทุกไฟล์สามารถนำ session มาใช้ร่วมกันได้ทุกไฟล์
  })
})

// Set Authorization in Overtime Form Page
Cypress.Commands.add('getAuthorization',()=>{
  cy.window().then((win) => {
    win.sessionStorage.setItem('ls.CLERK', 'N');
    win.sessionStorage.setItem('ls.DS_FLAG', 'NM');
    win.sessionStorage.setItem('ls.EM_RUNNO', '202205000000010');
    win.sessionStorage.setItem('ls.AdAcEM_RUNNO', '202205000000010');
    win.sessionStorage.setItem('ls.RES_LIST', '[{"EM_RUNNO":"202303000000249","EM_CODE":"FIRST03","EM_PRENAME":"นาย","EM_FULLNAME":"FIRST03 FIRST03","EM_NAME":"FIRST03","EM_SURNAME":"FIRST03"},{"EM_RUNNO":"202205000000010","EM_CODE":"K001","EM_PRENAME":"นางสาว","EM_FULLNAME":"ดารารัตน์ นามสมมุติ","EM_NAME":"ดารารัตน์","EM_SURNAME":"นามสมมุติ"},{"EM_RUNNO":"202304000000085","EM_CODE":"PH03","EM_PRENAME":"นางสาว","EM_FULLNAME":"วันพุธ นามวันพุธ","EM_NAME":"วันพุธ","EM_SURNAME":"นามวันพุธ"}]');
  })
})

// Set Authorization in Overtime Form Page (Multi Documents)
Cypress.Commands.add('getAuthorizationMulti',()=>{
  cy.window().then((win) => {
    win.sessionStorage.setItem('ls.RES_LIST_MULTI', '[{"EM_RUNNO":"202303000000249","EM_CODE":"FIRST03","EM_PRENAME":"นาย","EM_FULLNAME":"FIRST03 FIRST03","EM_NAME":"FIRST03","EM_SURNAME":"FIRST03"},{"EM_RUNNO":"202205000000010","EM_CODE":"K001","EM_PRENAME":"นางสาว","EM_FULLNAME":"ดารารัตน์ นามสมมุติ","EM_NAME":"ดารารัตน์","EM_SURNAME":"นามสมมุติ"},{"EM_RUNNO":"202304000000085","EM_CODE":"PH03","EM_PRENAME":"นางสาว","EM_FULLNAME":"วันพุธ นามวันพุธ","EM_NAME":"วันพุธ","EM_SURNAME":"นามวันพุธ"}]');
    win.sessionStorage.setItem('ls.dataMulti_backup', 'null');
  })
})

