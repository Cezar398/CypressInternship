describe("API TEST", () => {
	beforeEach(() => {
		cy.visit("https://automationteststore.com")
	})

	it("Show JSON", () => {
		cy.request("https://petstore.swagger.io/v2/store/inventory").then((result) => {
			console.table(result.body)
		})
	})
})