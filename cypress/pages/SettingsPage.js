import BasePage from './BasePage'

class SettingsPage extends BasePage {
  constructor() {
    super()
    this.url = '/admin/admin-setting'
    
    // Page elements using Spanish text
    this.pageTitle = "div[class='info-wrap form-wrappers'] h2"  // "Configuración"
    this.createButton = 'button:contains("Crear")'  // "Crear" button
    this.allSettingsLink = 'a:contains("Todas las Configuraciones")'  // "Todas las Configuraciones" link
    
    // Form elements
    this.formInputs = {
      name: 'input[placeholder*="Nombre"]',      // "Nombre"
      description: 'input[placeholder*="Descripción"]', // "Descripción"
      value: 'input[placeholder*="Valor"]'      // "Valor"
    }
    this.submitButton = 'button:contains("Guardar")'  // "Guardar" button
    
    // Delete elements
    this.deleteButton = 'button[aria-label="Eliminar"]'  // Delete icon button
    this.confirmDeleteButton = 'button:contains("Confirmar")'  // "Confirmar" button in modal
    this.cancelDeleteButton = 'button:contains("Cancelar")'  // "Cancelar" button in modal
    
    // Table elements
    this.tableHeaders = {
      name: 'th:contains("Nombre")',      // "Nombre"
      description: 'th:contains("Descripción")', // "Descripción"
      value: 'th:contains("Valor")',     // "Valor"
      actions: 'th:contains("Acciones")'    // "Acciones"
    }
    this.tableRows = 'tbody tr'
  }

  verifyPageContent() {
    // Verify page title and critical elements
    cy.get(this.pageTitle).should('contain', "Configuración"); 
    cy.get(this.createButton).should('be.visible')
    cy.get(this.allSettingsLink).should('be.visible')
    
    // Verify table headers
    Object.values(this.tableHeaders).forEach(selector => {
      cy.get(selector).should('be.visible')
    })
  }

  createSetting() {
    // Click create button
    cy.get(this.createButton)
      .should('be.visible')
      .click()
    
    // Fill all input fields with "testing testing"
    Object.values(this.formInputs).forEach(selector => {
      cy.get(selector)
        .should('be.visible')
        .clear()
        .type('testing testing')
    })
    
    // Submit form
    cy.get(this.submitButton)
      .should('be.visible')
      .click()
    
    // Verify success message
    cy.get('[data-testid="success-message"]').should('be.visible').and('contain', 'Configuración creada')
  }

  deleteSetting() {
    // Find and click delete button for "testing testing" entry
    cy.get('[data-testid="settings-row"]')
      .contains('testing testing')
      .parents('[data-testid="settings-row"]')
      .find(this.deleteButton)
      .click()
    
    // Confirm deletion
    cy.get(this.confirmDeleteButton)
      .should('be.visible')
      .click()
    
    // Verify success message
    cy.get('[data-testid="success-message"]').should('be.visible').and('contain', 'Configuración eliminada')
    
    // Verify row is removed
    cy.get('[data-testid="settings-row"]').contains('testing testing').should('not.exist')
  }
}

export default new SettingsPage()
