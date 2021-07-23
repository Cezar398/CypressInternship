describe("Tests for registered users", () => {
	beforeEach(()=>{
		cy.visit("https://automationteststore.com")
		      cy.get("#customer_menu_top > li > a").click()

	cy.get('#loginFrm_loginname').type("Cezar397")
      cy.get('#loginFrm_password').type("password")
      cy.get('#loginFrm > fieldset > .btn').should("have.attr", "title", "Login").click()

	})

	const firstName = "First" + Math.random()
	const lastName = "Last" + Math.random()
	const city = "Suceava" + Math.random()


	const newAddrFirstName = firstName
	const newAddrLastName = lastName
	const newAddrAddress1 = city
	const newAddrCity = "Suceava" + Math.random()

	it("Updating account details", () => {
		cy.get("[href='https://automationteststore.com/index.php?rt=account/account']")
		cy.get('.nav-dash > :nth-child(1) > a').click()
		cy.get('#AccountFrm_firstname').invoke("val").then((result) => {
			cy.get('#AccountFrm_firstname').clear()
			cy.get('#AccountFrm_firstname').type(firstName)
		})

		cy.get('#AccountFrm_lastname').invoke("val").then((result) => {
			cy.get('#AccountFrm_lastname').clear()
			cy.get('#AccountFrm_lastname').type(lastName)
		})

		cy.get('.col-md-12 > .btn-orange').contains("Continue").click()

		cy.get('.nav-dash > :nth-child(1) > a').click()

			cy.get('#AccountFrm_firstname').invoke("val").then((result) => {
				if(result == firstName)
					cy.log("First name changed")
				else
					cy.log("First name don't changed")
		})

			cy.get('#AccountFrm_lastname').invoke("val").then((result) => {
				if(result == lastName)
					cy.log("Last name changed")
				else
					cy.log("Last name don't changed")
		})

	})

	it("Update address book", () => {
		cy.get('.nav-dash > :nth-child(3) > a').click()
		cy.get('tr > .pull-right > .btn').contains("Edit").click()

		cy.get('#AddressFrm_city').invoke("val").then((result) => {
				cy.get('#AddressFrm_city').clear()
				cy.get('#AddressFrm_city').type(city)
		})

		cy.get('.col-md-12 > .btn-orange').contains("Continue").click()

		cy.get('tr > .pull-right > .btn').contains("Edit").click()

		cy.get('#AddressFrm_city').invoke("val").then((result) => {
				if(result == city)
					cy.log("Adresa a fost schimbata")
				else
					cy.log("Adresa nu a fost schimbata")
		})

		cy.get('.col-md-12 > .btn-default').contains("Back").click()
		cy.get('.col-md-12 > .btn-orange').contains("New").click()


		cy.get('#AddressFrm_firstname').type(newAddrFirstName)
		cy.get('#AddressFrm_lastname').type(newAddrLastName)
		cy.get('#AddressFrm_address_1').type(newAddrAddress1)
		cy.get('#AddressFrm_city').type(newAddrCity)
		cy.get('#AddressFrm_country_id').select("Romania").trigger('click')
		cy.get('#AddressFrm_zone_id').select("Suceava").trigger('click')
		cy.get('#AddressFrm_postcode').type("720024")

		cy.get('.col-md-12 > .btn-orange').contains("Continue").click()
	})

	it("Test wishlist", () => {

		cy.get('#filter_keyword').type("Skin")
		cy.get('.button-in-search > .fa').click()

		cy.get('#filter_keyword').clear()
		cy.get('#filter_keyword').type("anti-age")
		cy.get('.button-in-search > .fa').click()

		cy.get('.productinfo > :nth-child(1)').invoke("text").then((result) => {
			result = result.trim()
			if(result.localeCompare("Availability: Out of Stock") == 0)
			{
				cy.log("Produsul nu este in stock")
				cy.get('.nostock').should("exist").should("be.visible")
			}
			else
				cy.log("Produsul este in stock")
				cy.get('.cart').should('exist').should("be.visible")

				cy.get('.productinfo > :nth-child(2)').invoke("text").then((result) => {
					let localRes = result.substring(7)

					cy.get('.wishlist_add').click()

					cy.get("[href='https://automationteststore.com/index.php?rt=account/account']").contains("Account").click()



				})
		})
	
	})

	it.only("Check purchase", () =>{
		cy.get('#filter_keyword').type("Skin")
		cy.get('.button-in-search > .fa').click()

		cy.get('#filter_keyword').clear()
		cy.get('#filter_keyword').type("anti-age")
		cy.get('.button-in-search > .fa').click()
	})
})