import SettingsPage from '../pages/SettingsPage'

describe('Settings Module', () => {
  beforeEach(() => {
    cy.login()
    cy.url().should('include', '/admin/dashboard')
    cy.visit('admin/admin-setting')
  })

  it('should load settings page successfully', () => {
    SettingsPage.verifyPageContent()
  })

  it('should create and delete a test setting', () => {
    // Create new setting
    SettingsPage.createSetting()
    
    // Verify setting was created
    cy.contains('tr', 'testing testing').should('be.visible')
    
    // Delete the setting
    SettingsPage.deleteSetting()
    
    // Verify setting was deleted
    cy.contains('tr', 'testing testing').should('not.exist')
  })
})
