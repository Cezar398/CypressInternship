  /// <reference types="cypress" />
  //19.07.2021
  describe('example to-do app', () => {
    beforeEach(() => {

      cy.visit('https://automationteststore.com/')

      cy.get("#customer_menu_top > li > a").click()
      cy.get('#accountFrm_accountregister').should("be.checked")
      cy.get('#accountFrm > fieldset > .btn').should("have.attr", "title", "Continue").click()



    })

    it('Register Check with valid data', () =>
    {
     cy.get('.alert').contains("Login name must be alphanumeric only and between 5 and 64 characters!").should("exist")
     cy.get('.alert').contains("Telephone must be between 3 and 32 characters!").should("exist")
     cy.get('.alert').contains("Email Address does not appear to be valid!").should("exist")
     cy.get('.alert').contains("City must be between 3 and 128 characters!").should("exist")
     cy.get('.alert').contains("Zip/postal code must be between 3 and 10 characters!").should("exist")
     cy.get('.alert').contains("Address 1 must be between 3 and 128 characters!").should("exist")
     cy.get('#AccountFrm_firstname').type("Catarau")
     cy.get('#AccountFrm_lastname').type("Cezar")
     cy.get('#AccountFrm_email').type("catarau.ci@gmail.com")
     cy.get('#AccountFrm_telephone').type("0760133551")
     cy.get('#AccountFrm_company').type("COMPANY NAME")
     cy.get('#AccountFrm_address_1').type("Suceava")
     cy.get('#AccountFrm_city').type("Suceava")
     cy.get('#AccountFrm_postcode').type("720066")
     cy.get('#AccountFrm_country_id').select("Romania").trigger("click")
     cy.get('#AccountFrm_zone_id').select("Suceava").trigger("click")
     cy.get('#AccountFrm_loginname').type("Cezar397")
     cy.get('#AccountFrm_password').type("password")
     cy.get('#AccountFrm_confirm').type("password")
     cy.get('#AccountFrm_newsletter1').check()
     cy.get('#AccountFrm_agree').check()

     cy.get('.col-md-2 > .btn').should("have.attr", "title", "Continue").click()
   })

    it('Register Check with invalid data', () =>
    {

      cy.get('#AccountFrm_firstname').type("Catarauuuuuuuuuuuuuuu123")
      cy.get('#AccountFrm_lastname').type("Cezar")
      cy.get('#AccountFrm_email').type("catarau.ci@gmail...com")
      cy.get('#AccountFrm_telephone').type("0760133551asd")
      cy.get('#AccountFrm_company').type("COMPANY NAME")
      cy.get('#AccountFrm_address_1').type("Suceavaa")
      cy.get('#AccountFrm_city').type("Suceava123")
      cy.get('#AccountFrm_postcode').type("720066aa")
      cy.get('#AccountFrm_country_id').select("Romania").trigger("click")
      cy.get('#AccountFrm_zone_id').select("Suceava").trigger("click")
      cy.get('#AccountFrm_loginname').type("Cezar397@@@")
      cy.get('#AccountFrm_password').type("password")
      cy.get('#AccountFrm_confirm').type("password1")
      cy.get('#AccountFrm_newsletter1').check()
      cy.get('#AccountFrm_agree').check()

      cy.get('.col-md-2 > .btn').should("have.attr", "title", "Continue").click()


     cy.wait(500)
     cy.get('.alert').contains("Login name must be alphanumeric only and between 5 and 64 characters!").should("exist")
     cy.get('.alert').contains("Telephone must be between 3 and 32 characters!").should("not.exist")
     cy.get('.alert').contains("Email Address does not appear to be valid!").should("exist")
     cy.get('.alert').contains("City must be between 3 and 128 characters!").should("exist")
     cy.get('.alert').contains("Zip/postal code must be between 3 and 10 characters!").should("exist")
     cy.get('.alert').contains("Address 1 must be between 3 and 128 characters!").should("not.exist")
    })

    it('Random Register Data', () => {

      
      let userData = cy.request("https://randomuser.me/api/").then((result) =>{
        let localData = result.body.results[0]
        console.log(localData)

        cy.get('#AccountFrm_firstname').type(localData.name.first)
        cy.get('#AccountFrm_lastname').type(localData.name.last)
        cy.get('#AccountFrm_email').type(localData.email)
        cy.get('#AccountFrm_telephone').type(localData.phone)
        cy.get('#AccountFrm_address_1').type(localData.location.country + ' ' + localData.location.city)
        cy.get('#AccountFrm_city').type(localData.location.city)
        cy.get('#AccountFrm_postcode').type(localData.location.postcode)
        cy.get('#AccountFrm_country_id').select(localData.location.country).trigger('click')

        let state = localData.location.state.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        cy.get('#AccountFrm_zone_id').select(state).trigger('click')
        cy.get('#AccountFrm_loginname').type(localData.login.username)
        cy.get('#AccountFrm_password').type(localData.login.password)
        cy.get('#AccountFrm_confirm').type(localData.login.password)
        cy.get('#AccountFrm_newsletter0').check()
        cy.get('#AccountFrm_agree').check()

        cy.get('.col-md-2 > .btn').click()


      })
    })

    it("Register boundary test <", () => {
      //Login name 5-64
      //First name 1-32
      //Last name 1-32
      //Email address valid
      //Telephone 3-32
      //Address 1 3-128
      //City 3-128
      //Zip/Postal 3-10
      //Select regin
      //Password 4-20
      //Company Name ?

     cy.log("Boundary <")
     cy.get('#AccountFrm_firstname').type(" ")
     cy.get('#AccountFrm_lastname').type(" ")
     cy.get('#AccountFrm_email').type("catarau.ci@gmail.com")
     cy.get('#AccountFrm_telephone').type("07")
     cy.get('#AccountFrm_company').type(" ")
     cy.get('#AccountFrm_address_1').type("Su")
     cy.get('#AccountFrm_city').type("Su")
     cy.get('#AccountFrm_postcode').type("72")
     cy.get('#AccountFrm_country_id').select("Romania").trigger("click")
     cy.get('#AccountFrm_zone_id').select("Suceava").trigger("click")
     cy.get('#AccountFrm_loginname').type("Ceza")
     cy.get('#AccountFrm_password').type("pas")
     cy.get('#AccountFrm_confirm').type("pas")
     cy.get('#AccountFrm_newsletter1').check()
     cy.get('#AccountFrm_agree').check()

     cy.get('.col-md-2 > .btn').click()

     cy.wait(500)
     cy.get('.alert').contains("Login name must be alphanumeric only and between 5 and 64 characters!").should("exist")
     cy.get('.alert').contains("Telephone must be between 3 and 32 characters!").should("exist")
     cy.get('.alert').contains("Email Address does not appear to be valid!").should("not.exist")
     cy.get('.alert').contains("City must be between 3 and 128 characters!").should("exist")
     cy.get('.alert').contains("Zip/postal code must be between 3 and 10 characters!").should("exist")
     cy.get('.alert').contains("Address 1 must be between 3 and 128 characters!").should("exist")

    })

    it("Register boundary test <", () => {
      //Login name 5-64
      //First name 1-32
      //Last name 1-32
      //Email address valid
      //Telephone 3-32
      //Address 1 3-128
      //City 3-128
      //Zip/Postal 3-10
      //Select regin
      //Password 4-20
      //Company Name ?

     cy.log("Boundary <")
     cy.get('#AccountFrm_firstname').type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
     cy.get('#AccountFrm_lastname').type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
     cy.get('#AccountFrm_email').type("catarau.ci@gmail.com")
     cy.get('#AccountFrm_telephone').type("0712344407123444071234440712344407123444")
     cy.get('#AccountFrm_company').type(" ")
     cy.get('#AccountFrm_address_1').type("AdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssss")
     cy.get('#AccountFrm_city').type("AdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssssAdressssss")
     cy.get('#AccountFrm_postcode').type("1234567891011")
     cy.get('#AccountFrm_country_id').select("Romania").trigger("click")
     cy.get('#AccountFrm_zone_id').select("Suceava").trigger("click")
     cy.get('#AccountFrm_loginname').type("CezarrrrrrCezarrrrrrCezarrrrrrCezarrrrrrCezarrrrrrCezarrrrrrCezarrrrrr")
     cy.get('#AccountFrm_password').type("passsswordpasssswordpassssword")
     cy.get('#AccountFrm_confirm').type("passsswordpasssswordpassssword")
     cy.get('#AccountFrm_newsletter1').check()
     cy.get('#AccountFrm_agree').check()

     cy.get('.col-md-2 > .btn').click()

     cy.wait(500)
     cy.get('.alert').contains("Login name must be alphanumeric only and between 5 and 64 characters!").should("exist")
     cy.get('.alert').contains("Telephone must be between 3 and 32 characters!").should("exist")
     cy.get('.alert').contains("Email Address does not appear to be valid!").should("not.exist")
     cy.get('.alert').contains("City must be between 3 and 128 characters!").should("exist")
     cy.get('.alert').contains("Zip/postal code must be between 3 and 10 characters!").should("exist")
     cy.get('.alert').contains("Address 1 must be between 3 and 128 characters!").should("exist")

    
    })

    it("Check visible", () => {
     cy.get('#AccountFrm_firstname').should("be.visible")
     cy.get('#AccountFrm_lastname').should("be.visible")
     cy.get('#AccountFrm_email').should("be.visible")
     cy.get('#AccountFrm_telephone').should("be.visible")
     cy.get('#AccountFrm_company').should("be.visible")
     cy.get('#AccountFrm_address_1').should("be.visible")
     cy.get('#AccountFrm_city').should("be.visible")
     cy.get('#AccountFrm_postcode').should("be.visible")
     cy.get('#AccountFrm_country_id').should("be.visible")
     cy.get('#AccountFrm_zone_id').should("be.visible")
     cy.get('#AccountFrm_loginname').should("be.visible")
     cy.get('#AccountFrm_password').should("be.visible")
     cy.get('#AccountFrm_confirm').should("be.visible")
     cy.get('#AccountFrm_newsletter1').should("be.visible")
     cy.get('#AccountFrm_agree').should("be.visible")
    })

  })
