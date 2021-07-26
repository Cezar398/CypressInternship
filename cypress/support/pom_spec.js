class Tests{
  visit(){
    cy.visit('https://automationteststore.com');
  }

  changeVisit(value)
  {
    cy.visit(value);
  }

  getSocialButton(value, options={}){

    if(options.click == true)
        cy.get(value).click();
    else
    {
        cy.get(value);
        console.log(cy.get(value));
    }

    return this;
  }


  search(value){
    cy.get('#filter_keyword').type(value);
    cy.get('.button-in-search > .fa').click();
  }

  clickButton(value){
    cy.get(value).click()
  }

  getInput(value, options={})
  {
    let el = cy.get(value);

    if(options.type)
      el.type(options.type)
  }

  selectForm(value, formType){

    if(formType == 'login')
    {
    let jso = cy.readFile('cypress/support/login.json').then((result) => {
        cy.get(value + '> .form-group > .input-group > input').then((input) => {
          cy.get(input[0]).type(result.loginName)
          cy.get(input[1]).type(result.password)
        })
    })
  }


    if(formType == 'register')
    {
        let jso = cy.readFile('cypress/support/register.json').then((result) => {
        cy.get("#AccountFrm > .registerbox > fieldset > .form-group > .input-group").then((input) => {
          cy.get(input[0]).type(result.firstname)
          cy.get(input[1]).type(result.lastname)
          cy.get(input[2]).type(result.email)
          cy.get(input[3]).type(result.telephone)
          cy.get(input[5]).type(result.company)
          cy.get(input[6]).type(result.address)
          cy.get(input[8]).type(result.city)
          cy.get(input[10]).type(result.postcode)
          cy.get(input[12]).type(result.loginname)
          cy.get(input[13]).type(result.password)
          cy.get(input[14]).type(result.password)
          cy.get('#AccountFrm_country_id').select(result.selectinput.country)
          cy.get('#AccountFrm_zone_id').select(result.selectinput.city)

          if(result.news)
            cy.get('#AccountFrm_newsletter1').check()
          else
            cy.get('#AccountFrm_newsletter0').check()


          if(result.agree)
            cy.get('#AccountFrm_agree').check()

          
        })
      })
    }
 
   


  }

  addToCartID(value){
      this.changeVisit("https://automationteststore.com/index.php?rt=product/product&product_id=" + value);
      cy.get('.cart').click();
  }
}

export default Tests;