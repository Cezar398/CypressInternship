import Tests from '../support/pom_spec.js';
describe("3 Random tests", () => {
	const POM = new Tests();

	beforeEach(() =>{
		POM.visit()
	})

	it("Get facebook class", ()=> {
		POM.getSocialButton('.footer_block > .social_icons > .facebook', {click: false})
	})

	it("Search item", () => {
		POM.search("anti-age")
	})

	it("Add item to cart by ID", () => {
		POM.addToCartID(68);
	})

	it("Login test", () => {
		POM.clickButton('#customer_menu_top > li > a')

		POM.getInput('#loginFrm_loginname', {type: "Cezar397"});
		POM.getInput('#loginFrm_password', {type: "password"});

		POM.clickButton('#loginFrm > fieldset > .btn');
	})

	it("Login test 2", () => {
		POM.clickButton('#customer_menu_top > li > a')
		POM.selectForm('#loginFrm > fieldset', 'login');
		POM.clickButton('#loginFrm > fieldset > .btn')

	})

	it("Register test", () => {
		POM.clickButton('#customer_menu_top > li > a')
		POM.clickButton("#accountFrm > fieldset > .btn")
		POM.selectForm("AccountFrm", 'register')
		POM.clickButton('.col-md-2 > .btn')
	})
})