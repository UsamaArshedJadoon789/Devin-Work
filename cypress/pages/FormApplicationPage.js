import BasePage from './BasePage';
class FormApplicationPage extends BasePage {
  constructor() {
    super();
    this.url = '/admin/form-applications';

    // Page elements
    this.pageTitle = 'div.info-wrap.form-wrappers h2';  // CSS selector for the title
    this.tableHeaders = {
      name: 'th:contains("Nombre")',
      company: 'th:contains("Empresa")',
      status: 'th:contains("Estado")',
      date: 'th:contains("Fecha")',
    };
    this.tableRows = 'tbody tr';
  }

  verifyPageContent() {
    cy.log('Verifying page content...');

    // Verify page title
    cy.get(this.pageTitle).should('be.visible').and('contain', 'Validación e Informes');
  }

  selectRandomFilter(){
    cy.get("div[class='light-box'] a").click(); 
    cy.get("select[formcontrolname='gender']").should('be.visible').select(1);
    cy.get("select[formcontrolname='approval_status']").should('be.visible').select(1);
    cy.get("select[formcontrolname='sectors']").should('be.visible').select(1);
    cy.get("select[formcontrolname='location']").should('be.visible').select(1);
    cy.get("select[formcontrolname='generating_revenue']").should('be.visible').select(1);
    cy.get("select[formcontrolname='investment_vehicle']").should('be.visible').select(1);
    cy.get("select[formcontrolname='language']").should('be.visible').select(1);
    // cy.get("#fltpikrForm").should('be.visible').select(1);
    cy.get("button[type='submit']").should('be.visible').click();
    cy.wait(3000);
    cy.get("button[class='btn custom-btn ms-2']").click()
  
}
       
}

export default new FormApplicationPage();
