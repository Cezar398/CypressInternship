describe("Tests for unregistered customers", () => {
	beforeEach(()=>{
		cy.visit("https://automationteststore.com")
	})
	
	it("Test search product", () => {
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
		})
	})

	it("Test add to cart", () => {
		cy.get('#filter_keyword').type("anti-age")
		cy.get('.button-in-search > .fa').click()


		cy.get('.cart').click()


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

		}).then(() => {                                                   // queued last

    if(localFinishPrice[0] + localFinishPrice[1] == localFinishPrice[2])
      cy.log("Finish price is ok")
    else
      cy.log("Finish price isn't ok")

  })

		cy.get('#cart_checkout2').click()
		cy.get('#accountFrm_accountguest').click()
		cy.get('#accountFrm > fieldset > .btn').contains("Continue").click()


		cy.get('#guestFrm_firstname').type("Catarau")
		cy.get('#guestFrm_lastname').type("Cezar")
		cy.get('#guestFrm_email').type("catarau.ci@gmail.com")
		cy.get(':nth-child(6) > fieldset > :nth-child(2)').type("Suceava")
		cy.get('#guestFrm_city').type("Suceava")
		cy.get('#guestFrm_country_id').select("Romania").trigger('click')
		cy.get('#guestFrm_zone_id').select("Suceava").trigger('click')
		cy.get('#guestFrm_postcode').type("720024")

		cy.get('.col-md-12 > .btn-orange').contains("Continue").click()

		cy.get('#checkout_btn').contains("Confirm").click()
		cy.get('.mb40 > :nth-child(4) > a').click()

		cy.get('.contentpanel > :nth-child(1) > .table > tbody > tr > :nth-child(1)').invoke("text").then((text) => {
			let localtext = text.substring(text.indexOf('#'), text.indexOf('Status'))

			cy.visit("https://automationteststore.com/index.php?rt=account/invoice")

			cy.get('#CheckOrderFrm_order_id').type(parseInt(localtext.substring(1)))
			cy.get('#CheckOrderFrm_email').type('catarau.ci@gmail.com')
			cy.get('.col-md-12 > .btn-orange').contains("Continue").click()

			cy.get('.contentpanel > :nth-child(1) > .table > tbody > tr > :nth-child(1)').invoke("text").then((text) => {
				let localtext2 = text.substring(text.indexOf('#'), text.indexOf('Status'))

				if(localtext == localtext2)
					cy.log("Order ID is ok")
				else
					cy.log("Order ID isn't ok")
			})
		})

	})

	it("Test sorting and order", ()=>{
		cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=58"]').click()
		cy.get('#sort').select("Price Low > High")

		let items = []

		cy.get(':nth-child(1) > .thumbnail > .pricetag > .price > .oneprice').invoke("text").then((result) => {
			let item = parseFloat(result.substring(1))
			items.push(item)
		})

		cy.get(':nth-child(2) > .thumbnail > .pricetag > .price > .oneprice').invoke("text").then((result) => {
			let item = parseFloat(result.substring(1))
			items.push(item)
		})

		cy.get(':nth-child(3) > .thumbnail > .pricetag > .price > .oneprice').invoke("text").then((result) => {
			let item = parseFloat(result.substring(1))
			items.push(item)
		})


		cy.wrap(items).then((result) => {
			let len = result.length
			let ok = 1
			for(let i=1;i<result.len;i++)
				if(result(i-1) > result(i))
					ok = 0

			if(ok == 1)
				cy.log("Ordering price Low to High is working")
			else
				cy.log("Ordering price Low to High isn't working")

		})


		cy.get('#sort').select("Price High > Low")

		items = []

		cy.get(':nth-child(1) > .thumbnail > .pricetag > .price > .oneprice').invoke("text").then((result) => {
			let item = parseFloat(result.substring(1))
			items.push(item)
		})

		cy.get(':nth-child(2) > .thumbnail > .pricetag > .price > .oneprice').invoke("text").then((result) => {
			let item = parseFloat(result.substring(1))
			items.push(item)
		})

		cy.get(':nth-child(3) > .thumbnail > .pricetag > .price > .oneprice').invoke("text").then((result) => {
			let item = parseFloat(result.substring(1))
			items.push(item)
		})


		cy.wrap(items).then((result) => {
			let len = result.length
			let ok = 1
			for(let i=1;i<result.len;i++)
				if(result(i-1) < result(i))
					ok = 0

			if(ok == 1)
				cy.log("Ordering price High to Low is working")
			else
				cy.log("Ordering price High to Low isn't working")

		})

	})

	it("Check out of stock", () => {
			cy.get('#filter_keyword').type("flash bronzer")
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
		})
	})
})