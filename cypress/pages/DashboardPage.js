import BasePage from './BasePage'

class DashboardPage extends BasePage {
  constructor() {
    super()
    this.url = '/admin/dashboard'
    this.dateRangeInput = '[data-testid="date-range"]'
    this.clearButton = '[data-testid="clear-button"]'
    this.filterDataButton = '[data-testid="filter-button"]'
    this.filterSelect = 'select'
    this.tableHeaders = {
      status: 'th[aria-label*="Estado de Aprobación"]',
      revenue: 'th[aria-label*="Generando Ingresos"]',
      country: 'th[aria-label*="País de operación"]',
      sector: 'th[aria-label*="Sectores"]'
    }
    this.barChart = 'app-bar-chart'
    this.circleChart = 'app-circle-chart'
    this.table = 'table tbody tr'
    this.pagination = {
      first: 'a[tabindex="-1"]:contains("First")',
      previous: 'a[tabindex="-1"]:contains("Previous")',
      next: 'a[tabindex="0"]:contains("Next")',
      last: 'a[tabindex="0"]:contains("Last")',
      pageNumbers: 'a[tabindex="0"]',
      info: ':contains("Showing 1 to 10 of")'
    }
    this.sections = {
      dashboard: 'h2:contains("Tablero")',
      investments: 'h2:contains("Presentaciones de Inversión")',
      metrics: 'h2:contains("Empresas: Métricas Clave")',
      evaluationForms: 'h2:contains("Formularios de Evaluación")',
      evaluationAnalysis: 'h2:contains("Análisis de Formularios de Evaluación")'
    }
  }

  selectRandomFilter() {
    cy.log('Starting filter selection process...')
    
    // Wait for critical elements with consistent timeout
    cy.get('[data-testid="metrics-title"]', { timeout: 15000 }).should('be.visible')
    cy.get('[data-testid="data-table"]', { timeout: 15000 }).should('be.visible')
    
    // Get initial row count
    cy.get('[data-testid="data-table"] tbody tr')
      .should('exist')
      .and('have.length.gt', 0)
      .then($rows => {
        cy.log(`Initial row count: ${$rows.length}`)
      })

    // Click filter button
    cy.get('[data-testid="filter-button"]')
      .should('be.visible')
      .click()

    // Select filter options
    cy.get("select[formcontrolname='gender']").should('be.visible').select(1)
    cy.get("select[formcontrolname='approval_status']").should('be.visible').select(1)
    cy.get("select[formcontrolname='sectors']").should('be.visible').select(1)
    cy.get("select[formcontrolname='location']").should('be.visible').select(1)
    cy.get("select[formcontrolname='generating_revenue']").should('be.visible').select(1)
    cy.get("select[formcontrolname='investment_vehicle']").should('be.visible').select(1)
    cy.get("select[formcontrolname='language']").should('be.visible').select(1)

    // Submit filter
    cy.get('[data-testid="submit-filter"]').click()
    cy.wait(3000)

    // Verify filtered results
    cy.get('[data-testid="data-table"] tbody tr')
      .should('exist')
      .and('have.length.lte', 25)
      .and('have.length.gt', 0)
      .then($newRows => {
        cy.log(`Row count after filter: ${$newRows.length}`)
      })
  }

  clearFilters() {
    cy.log('Starting filter clear process...')
    
    cy.get('[data-testid="clear-button"]')
      .should('be.visible')
      .click()

    // Verify filter was cleared
    cy.get('[data-testid="filter-button"]')
      .should('be.visible')

    // Verify table data after clearing
    cy.get('[data-testid="data-table"] tbody tr')
      .should('exist')
      .and('have.length.gt', 0)
      .then($rows => {
        cy.log(`Row count after clearing filter: ${$rows.length}`)
      })
  }

  verifyDashboardMetrics() {
    // Verify metrics are present
    cy.get('[data-testid="metric-new-form"]').should('be.visible')
    cy.get('[data-testid="metric-not-presented"]').should('be.visible')
    cy.get('[data-testid="metric-pending"]').should('be.visible')
    cy.get('[data-testid="metric-average"]').should('be.visible')
  }

  verifyCharts() {
    // Verify bar chart with specific elements
    cy.get(this.barChart).within(() => {
      cy.get('[data-testid="chart-invites"]').should('be.visible')
      cy.get('[data-testid="chart-submissions"]').should('be.visible')
      cy.get('[data-testid="chart-interviews"]').should('be.visible')
      cy.get('[data-testid="chart-diligence"]').should('be.visible')
    })

    // Verify circle chart with specific elements
    cy.get(this.circleChart).within(() => {
      cy.get('[data-testid="chart-development"]').should('be.visible')
      cy.get('[data-testid="chart-business"]').should('be.visible')
      cy.get('[data-testid="chart-status"]').should('be.visible')
    })
  }
}

export default new DashboardPage()
