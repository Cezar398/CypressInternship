describe("Tests for unregistered customers", () => {
	beforeEach(()=>{
		cy.visit("https://automationteststore.com")
	})
	/*
	it("Test search product", () => {
		cy.get('#filter_keyword').type("Skin")
		cy.get('.button-in-search > .fa').click()

		cy.get('#filter_keyword').clear()
		cy.get('#filter_keyword').type("anti-age")
		cy.get('.button-in-search > .fa').click()
	})*/

	it("Test add to cart", () => {
		cy.get('#filter_keyword').type("anti-age")
		cy.get('.button-in-search > .fa').click()


		cy.get('.cart').click()

		cy.wait(500)

		let item = []

		cy.get('tbody > :nth-child(2) > :nth-child(4)').invoke("text").then((itemLocal) =>{
		 	let localItemPrice = parseFloat(itemLocal.substring(1))
		 	item.push(localItemPrice)
		 })

		cy.get('#cart_quantity68').invoke('val').then((quanity) => {
			let localQuanity = parseInt(quanity)
			item.push(localQuanity)
		})

		cy.get('tbody > :nth-child(2) > :nth-child(6)').invoke("text").then((totalPrice) => {
		 		let localTotalPrice = parseFloat(totalPrice.substring(1))
		 		item.push(localTotalPrice)
		})

		if(item[0] == item[2])
			cy.log("ok")

		cy.get('#cart_quantity68').click().clear().type(2)
		cy.get('#cart_update').click()

				cy.get('tbody > :nth-child(2) > :nth-child(6)').invoke("text").then((totalPrice) => {
		 		let localTotalPrice = parseFloat(totalPrice.substring(1))
		 		
		 		if(item[0] * 2 == localTotalPrice)
		 			cy.log("Total price is ok")
		 		else
		 			cy.log("Total price isn't ok")
		})

		cy.get('#estimate_country').select("Romania").trigger('click')
		cy.get('#estimate_country_zones').select("Suceava").trigger('click')
		cy.get('#estimate_postcode').click().type("720024")
		cy.get(':nth-child(2) > .input-group > .input-group-btn > .btn').click()


		let localFinishPrice = []

		cy.get(':nth-child(1) > :nth-child(2) > .bold').invoke("text").then((text)=>{
			let localPrice = parseFloat(text.substring(1))
			localFinishPrice.push(localPrice)
		})


		cy.get('#totals_table > tbody > :nth-child(2) > :nth-child(2)').invoke("text").then((text)=>{
			let localPrice = parseFloat(text.substring(1))
			localFinishPrice.push(localPrice)

		})

		cy.get(':nth-child(3) > :nth-child(2) > .bold').invoke("text").then((text) => {
			let localPrice = parseFloat(text.substring(1))
			localFinishPrice.push(localPrice)

		})

		let finish = localFinishPrice

		console.log(finish[1])

		if(localFinishPrice[0] + localFinishPrice[1] == localFinishPrice[2])
			cy.log("Finish price is ok")
		else
			cy.log("Finish price isn't ok")

	})
})