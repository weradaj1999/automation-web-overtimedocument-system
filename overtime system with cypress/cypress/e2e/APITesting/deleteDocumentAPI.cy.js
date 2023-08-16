


  function deleteDocumentByToken(docNO) {
    let authToken;
    let DCS_RUNNO;
    

   
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
      expect(response.status).to.eq(200);
      authToken = response.body.access_token;
      cy.log('access_token is: ' + authToken);

      cy.request({
        method: 'GET',
        url: `your-url/${docNO}`,
        headers: {
          'Authorization': 'Bearer ' + authToken
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        DCS_RUNNO = response.body[0].DCS_RUNNO;
        cy.log('DCS_RUNNO ' + DCS_RUNNO);


        // ส่งคำขอรายการลบข้อมูลด้วย access token
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
        });
      });
    });
  }
  


describe('API Test', () => {
  it('delete POST Request', () => {
    deleteDocumentByToken('W23060399');
  });
});


    
    
  