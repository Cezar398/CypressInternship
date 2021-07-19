/// <reference types="cypress" />
//19.07.2021
describe('example to-do app', () => {
  beforeEach(() => {
    
    cy.visit('https://automationteststore.com/')
  })

  it('Test Case', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.log("Welcome to the internship!")
  })

  it('Register Check', () =>
  {
  		cy.get("#customer_menu_top > li > a").click()
		cy.get('#accountFrm_accountregister').should("be.checked")
		cy.get('#accountFrm > fieldset > .btn').should("have.attr", "title", "Continue").click()

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

		if(cy.get('.alert'))
  	  	{
  	  		cy.log("Alert has appeared")
  	  	}
  	  	else{
  	  		cy.log("Alert has not appeared")
  	  	}
  })

  it('Login check with valid data', () => {
  	  	cy.get("#customer_menu_top > li > a").click()

  	  	cy.get('#loginFrm_loginname').type("Cezar397")
  	  	cy.get('#loginFrm_password').type("password")
  	  	cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

  })

  it('Login check with invalid data', () => {
  		cy.get("#customer_menu_top > li > a").click()

  	  	cy.get('#loginFrm_loginname').type("Cezar397")
  	  	cy.get('#loginFrm_password').type("password1")
  	  	cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

  	  	if(cy.get('.alert'))
  	  	{
  	  		cy.log("Alert has appeared")
  	  	}
  	  	else{
  	  		cy.log("Alert has not appeared")
  	  	}
  })


})
