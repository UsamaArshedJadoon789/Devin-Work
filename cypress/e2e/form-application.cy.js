import FormApplicationPage from '../pages/FormApplicationPage'

describe('Form Application Module', () => {
  beforeEach(() => {
    // Login and navigate to Form Applications page
    cy.login()
    cy.url().should('include', '/admin/dashboard')
    cy.visit('/admin/form-applications')
    cy.url().should('include', '/admin/form-applications')
  })

  it('should load form application page successfully', () => {
    FormApplicationPage.verifyPageContent()
  })

  it('should apply and verify filters', () => {
    // Apply filter and verify results
    FormApplicationPage.selectRandomFilter()
    
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
