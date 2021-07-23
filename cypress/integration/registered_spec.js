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
	const newAddrZip = "7200" + Math.floor(Math.random() * 10)

	var wishlistItems = []
	Cypress.Commands.add('addWishlist', () => {
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

				

				cy.get('.wishlist_add').click()
				cy.get('.productinfo > :nth-child(2)').invoke("text").then((result) => {
					let text = result.substring(7)
					wishlistItems.push(text)
				})
		})
	})

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
		cy.get('#AddressFrm_postcode').type(newAddrZip)
		cy.get('#AddressFrm_default1').check()

		cy.get('.col-md-12 > .btn-orange').contains("Continue").click()
		cy.get('tr > .pull-right > .btn-default').click()
	})
	     
	it("Test wishlist", () => {

		cy.get('#filter_keyword').clear()
		cy.get('#filter_keyword').type("anti-age")
		cy.get('.button-in-search > .fa').click()
		cy.addWishlist()
		cy.get('#filter_keyword').type("Acqua Di Gio Pour Homme")
		cy.get('.button-in-search > .fa').click()
		cy.addWishlist()

		cy.visit("https://automationteststore.com/index.php?rt=account/account")
		cy.get('.nav-dash > :nth-child(4) > a').click()

		/*cy.wrap(wishlistItems).then((result) => {
			cy.contains(result[0])

		})	*/

		cy.get('.wishlist_68 > :nth-child(6) > .btn-default').click()
		cy.get('.wishlist_80 > :nth-child(6) > .btn-default').click()
	})

	it("Check purchase", () =>{
		cy.get('#filter_keyword').type("anti-age")
		cy.get('.button-in-search > .fa').click()

		cy.get('.cart').click()


		cy.get('#filter_keyword').type("Skinsheen Bronzer Stick")
		cy.get('.button-in-search > .fa').click()

		cy.get('.cart').click()

		cy.get('#filter_keyword').type("Viva Glam Lipstick")
		cy.get('.button-in-search > .fa').click()

		cy.get('.cart').click()

		cy.get('#filter_keyword').type("Acqua Di Gio Pour Homme")
		cy.get('.button-in-search > .fa').click()

		cy.get('.cart').click()


		cy.get('#cart_quantity68').clear().type(2)
		cy.get('#cart_update').click()


		let item = []

		cy.get('.table > tbody > :nth-child(2) > :nth-child(4)').invoke("text").then((result) => {
			let localItemPrice = parseFloat(result.substring(1).trim())
			item.push(localItemPrice)
		})

		cy.get('#cart_quantity68').invoke("val").then((result) => {
			let localItemQuantity = result.trim()

			item.push(localItemQuantity)
		})


		cy.get('tbody > :nth-child(2) > :nth-child(6)').invoke("text").then((result) => {
			let localItemTotalPrice = parseFloat(result.substring(1).trim())
			item.push(localItemTotalPrice)
		})

		cy.get(':nth-child(3) > :nth-child(7) > .btn').click()

		cy.wrap(item).then((result) => {
			if(result[0] * result[1] == result[2])
				cy.log("Pretul total este ok")
			else
				cy.log("Pretul total nu este ok")

			if(result[1] == 2)
				cy.log("Cantintatea s-a modificat")
			else
				cy.log("Cantintatae nu s-a modificat")
		})

		cy.get('#estimate_postcode').should("have.value", newAddrZip)

		
		cy.get('#cart_checkout2').click()
		cy.get('#checkout_btn').click()
		cy.get('.mb40 > :nth-child(4) > a').click()




		cy.get('.contentpanel > :nth-child(1) > .table > tbody > tr > :nth-child(1)').invoke("text").then((text) => {
			let localtext = text.substring(text.indexOf('#'), text.indexOf('Status'))

			cy.visit("https://automationteststore.com/index.php?rt=account/invoice&order_id=" + localtext.substring(1))

			cy.get('.contentpanel > :nth-child(1) > .table > tbody > tr > :nth-child(1)').invoke("text").then((text) => {
				let localtext2 = text.substring(text.indexOf('#'), text.indexOf('Status'))

				if(localtext == localtext2)
					cy.log("Order ID is ok")
				else
					cy.log("Order ID isn't ok")
			})
		})

	})
})

