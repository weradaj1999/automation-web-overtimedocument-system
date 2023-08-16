export class loginPage  {

    // LOCATOR LOGIN PAGE
    txtUsername = '#username'
    txtPassword = '.input-group > .form-control'
    btnSignIn   = '#sign-in'
    txtUserName = '.dropdown-toggle > .ng-binding'
    txtloginError = '.jquery-notific8-message'


    login(username, password){
      cy.get(this.txtUsername).type(username)
      cy.get(this.txtPassword).type(password)
      cy.get(this.btnSignIn).click()
    }

    loginVerifyUser(userName){
      cy.contains(this.txtUserName,userName)
    }

    loginVerifyError(message){
      cy.contains(this.txtloginError,message)
    }

}