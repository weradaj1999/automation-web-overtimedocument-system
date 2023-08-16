describe('Login Authentication', () => {
    it('Authentication', () => {
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
        expect(response.status).to.eq(200)
        cy.log('status is: '+ response.status)
        expect(response.body.NameTH).to.equal('นางสาว ดารารัตน์ นามสมมุติ')
        cy.log('NameTH is: '+ response.body.NameTH)
        cy.log('access_token is: '+ response.body.access_token)
      });
    });
  });
  