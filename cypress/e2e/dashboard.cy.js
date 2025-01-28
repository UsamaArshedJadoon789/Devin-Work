import DashboardPage from '../pages/DashboardPage'

describe('Dashboard Module', () => {
  beforeEach(() => {
    cy.login()
    cy.url().should('include', '/admin/dashboard', { timeout: 15000 })
    
    cy.get('[data-testid="metrics-title"]', { timeout: 15000 }).should('be.visible')
    cy.get('[data-testid="data-table"]', { timeout: 15000 }).should('be.visible')
    cy.get('[data-testid="data-table"] tbody tr').should('have.length.gt', 0)
  })

  it('should load dashboard page successfully', () => {
    cy.url().should('include', '/admin/dashboard')
    // Verify page title and portal name
    cy.contains('h2', 'Tablero').should('be.visible')
    cy.contains('Portal de Interface GDA').should('be.visible')
    DashboardPage.verifyDashboardMetrics()
  })

  it('should display all dashboard sections', () => {
    // Verify all main sections are present
    Object.values(DashboardPage.sections).forEach(selector => {
      cy.get(selector).should('be.visible')
    })
  })

  it('should select random filter and apply it', () => {
    DashboardPage.selectRandomFilter()
    
    cy.get('[data-testid="data-table"] tbody tr')
      .should('exist')
      .and('have.length.lte', 25)
      .and('have.length.gt', 0)
      .then($rows => {
        cy.log(`Row count after filter: ${$rows.length}`)
      })
  })

  it('should clear filters when clicking clear button', () => {
    DashboardPage.selectRandomFilter()
    DashboardPage.clearFilters()
    
    cy.get('[data-testid="data-table"] tbody tr')
      .should('exist')
      .and('have.length.gt', 0)
      .then($rows => {
        cy.log(`Row count after clearing: ${$rows.length}`)
      })
  })

  it('should display analytics charts', () => {
    DashboardPage.verifyCharts()
  })
})
