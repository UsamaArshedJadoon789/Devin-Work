import BasePage from './BasePage'

class DueDiligencePage extends BasePage {
  constructor() {
    super()
    this.url = '/admin/diligence-forms'
    
    // Page elements using Spanish text selectors
    this.pageTitle = 'h2:contains("Debida Diligencia")'  // "Debida Diligencia"
    this.filterButton = 'a:contains("Filtrar Datos")'  // "Filtrar Datos" button
    this.entriesSelect = 'select[name="recent-orders_length"]' // Entries dropdown
    this.searchInput = 'input[type="search"]'   // Search input
    
    // Table headers using Spanish text
    this.tableHeaders = {
      company: 'th[aria-label*="Empresa"]',
      status: 'th[aria-label*="Estado"]',
      date: 'th[aria-label*="Fecha"]',
      action: 'th[aria-label*="Acciones"]'
    }
    this.tableRows = 'tbody tr'
  }

  verifyPageContent() {
    // Verify page title and critical elements
    cy.get(this.pageTitle).should('be.visible')
    cy.get('table').should('be.visible')
    cy.get(this.tableRows).should('exist')
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
    cy.get("button[type='submit']").should('be.visible').click();
    cy.wait(3000);
    cy.get("button[class='btn custom-btn ms-2']").click()
}
}

export default new DueDiligencePage()
