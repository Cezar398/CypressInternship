describe("Login test", () =>{
	beforeEach(() => {

      cy.visit('https://automationteststore.com/')

      cy.get("#customer_menu_top > li > a").click()

    })

	it('Login check with valid data', () => {

      cy.get('#loginFrm_loginname').type("Cezar397")
      cy.get('#loginFrm_password').type("password")
      cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

   	  cy.get('.alert').should("not.exist")


    })

    it('Login check with invalid data', () => {

      cy.get('#loginFrm_loginname').type("Cezar397")
      cy.get('#loginFrm_password').type("password1")
      cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

      cy.get('.alert').should("exist").contains("Error: Incorrect login or password provided.")

   })


    it('Login check with empty', () => {

      cy.get('#loginFrm_loginname').type(" ")
      cy.get('#loginFrm_password').type(" ")
      cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

      cy.get('.alert').should("exist").contains("Error: Incorrect login or password provided.")

   })


     it('Login check SQL Injection', () => {

      cy.get('#loginFrm_loginname').type('" or ""="')
      cy.get('#loginFrm_password').type('" or ""="')
      cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

      cy.get('.alert').should("exist").contains("Error: Incorrect login or password provided.")

   })

   it('Check login boundary', () => {
          cy.get('#loginFrm_loginname').type("catarau.ci@gmail.com")
      cy.get('#loginFrm_password').type("123")

            cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

      cy.get('.alert').should("exist").contains("Error: Incorrect login or password provided.")

    cy.get('#loginFrm_password').type("123123123123123123123123123123")
            cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

      cy.get('.alert').should("exist").contains("Error: Incorrect login or password provided.")



   })
})