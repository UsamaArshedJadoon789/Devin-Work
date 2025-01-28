import LoginPage from '../pages/LoginPage'

describe('Login Module', () => {
  beforeEach(() => {
    LoginPage.visit()
  })

  it('should display login page correctly', () => {
    LoginPage.verifyLoginPage()
  })

  it('should login successfully with valid credentials', () => {
    LoginPage.login()
    // After successful login, we should be redirected to dashboard
    cy.url().should('include', '/admin/dashboard')
  })

  it('should show error with invalid credentials', () => {
    LoginPage.login('invalid@email.com', 'wrongpassword')
    // Add assertion for error message once we see the actual error on the page
    cy.url().should('include', '/admin/login')
  })
})
