import EmailTemplatePage from '../pages/EmailTemplatePage'

describe('Email Template Module', () => {
  beforeEach(() => {
    // Login and navigate to Email Templates page
    cy.login()
    cy.url().should('include', '/admin/dashboard')
    
    // Navigate directly to Email Templates page
    cy.visit('/admin/email-template')
    
    // Wait for critical elements
    cy.url().should('include', '/admin/email-template')
    cy.contains('Plantillas de Correo', { timeout: 15000 }).should('be.visible')  // Page title
    cy.get('table', { timeout: 15000 }).should('be.visible')  // Template table
  })

  it('should load email templates page successfully', () => {
    // Verify page title and table structure
    cy.url().should('include', '/admin/email-template')
    EmailTemplatePage.verifyPageContent()
  })

  it('should click and verify all email templates', () => {
    // Click each template and verify content
    EmailTemplatePage.clickAndVerifyTemplates()
  })
})
