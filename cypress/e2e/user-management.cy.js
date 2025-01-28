import UserManagementPage from '../pages/UserManagementPage'

describe('User Management Module', () => {
  beforeEach(() => {
    // Login and wait for dashboard
    cy.login()
    cy.url().should('include', '/admin/dashboard')
    
    // Navigate directly to User Management page
    cy.log('Navigating directly to User Management page...')
    cy.visit('/admin/user-management')
    // Wait for critical elements with increased timeout
    cy.url().should('include', '/admin/user-management', { timeout: 15000 })
  })

  it('should load user management page successfully', () => {
    cy.url().should('include', '/admin/user-management')
    
  })

  it('should send invite to new user with random email', () => {
    
    UserManagementPage.TestSendInvite();
  })

  it.only('should apply and verify filters', () => {
      UserManagementPage.selectRandomFilter()
    
  })
})
