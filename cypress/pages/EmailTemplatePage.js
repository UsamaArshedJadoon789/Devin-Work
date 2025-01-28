import BasePage from './BasePage'

class EmailTemplatePage extends BasePage {
  constructor() {
    super()
    this.url = '/admin/email-template'
    
    // Page elements
    this.pageTitle = 'h2'  // "Plantillas de Correo"
    this.entriesSelect = 'select[name="recent-orders_length"]'
    this.searchInput = 'input[type="search"]'
    
    // Table headers
    this.tableHeaders = {
      title: 'th[aria-label*="Título"]',
      subject: 'th[aria-label*="Asunto"]',
      status: 'th[aria-label*="Estado"]',
      actions: 'th[aria-label*="Acciones"]'
    }
    
    // Template elements
    this.templateRows = 'tbody tr'
    this.actionButtons = 'button[type="button"]'
  }

  verifyPageContent() {
    // Verify page title and critical elements
    cy.get(this.pageTitle)
      .should('be.visible')
      .and('contain', 'Plantillas de Correo')
    
    cy.get('table').should('be.visible')
    cy.get(this.templateRows).should('exist')
    
    // Verify table headers
    Object.values(this.tableHeaders).forEach(selector => {
      cy.get(selector).should('be.visible')
    })
  }

  clickAndVerifyTemplates() {
    // Click each template action button and verify content
    cy.get(this.actionButtons).each(($button, index) => {
      cy.wrap($button)
        .should('be.visible')
        .click()
      
      // Verify modal or content appears
      cy.wait(1000)
      
      // Press Escape to close modal
      cy.get('body').type('{esc}')
      
      // Wait for modal to close
      cy.wait(500)
    })
  }
}

export default new EmailTemplatePage()
