import DueDiligencePage from '../pages/DueDiligencePage'

describe('Due Diligence Module', () => {
  beforeEach(() => {
    // Login and navigate to Due Diligence page
    cy.login()
    cy.url().should('include', '/admin/dashboard')
    
    // Navigate directly to Due Diligence page
    cy.visit('/admin/diligence-forms')
    
    // Wait for critical elements with increased timeout
    cy.url().should('include', '/admin/diligence-forms')
    cy.get('[data-testid="page-title"]', { timeout: 15000 }).should('be.visible').and('contain', 'Debida Diligencia')
    cy.get('table', { timeout: 15000 }).should('be.visible')
  })

  it('should load due diligence page successfully', () => {
    DueDiligencePage.verifyPageContent()
  })

  it('should apply and verify filters', () => {
    // Apply filter and verify results
    DueDiligencePage.selectRandomFilter()
    
    // Verify filtered results
    cy.get('[data-testid="data-table"] tbody tr')
      .should('exist')
      .and('have.length.lte', 25)
      .and('have.length.gt', 0)
      .then($rows => {
        cy.log(`Row count after filter: ${$rows.length}`)
      })
  })
})
