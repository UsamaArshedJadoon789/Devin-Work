import BasePage from './BasePage';

class InterviewPage extends BasePage {
  constructor() {
    super();
    this.url = '/admin/interview-forms';

    this.pageTitle = 'div.info-wrap h2';
    this.tableHeaders = {
      name: 'th:contains("Nombre")',
      company: 'th:contains("Empresa")',
      status: 'th:contains("Estado")',
      date: 'th:contains("Fecha")'
    };
    this.tableRows = 'tbody tr';
    this.filterButton = "div[class='light-box'] a";
    this.filterSelectors = {
      gender: "select[formcontrolname='gender']",
      status: "select[formcontrolname='approval_status']",
      sectors: "select[formcontrolname='sectors']",
      location: "select[formcontrolname='location']",
      revenue: "select[formcontrolname='generating_revenue']",
      investment: "select[formcontrolname='investment_vehicle']",
      language: "select[formcontrolname='language']"
    };
    this.submitButton = "button[type='submit']";
    this.clearButton = "button[class='btn custom-btn ms-2']";
  }

  verifyPageContent() {
    cy.get(this.pageTitle).should('be.visible');
    cy.get('table').should('be.visible');
    cy.get(this.tableRows).should('exist');
  }

  selectRandomFilter() {
    cy.get(this.filterButton).click();
    Object.values(this.filterSelectors).forEach(selector => {
      cy.get(selector).should('be.visible').select(1);
    });
    cy.get(this.submitButton).should('be.visible').click();
    cy.wait(3000);
    cy.get(this.clearButton).click();
  }
}

export default new InterviewPage();
