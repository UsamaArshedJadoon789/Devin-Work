import BasePage from './BasePage'

class LoginPage extends BasePage {
  constructor() {
    super()
    this.url = '/admin/login'
    this.emailInput = 'input[name="Email"]'
    this.passwordInput = 'input[name="Password"]'
    this.submitButton = 'button[type="submit"]'
    this.welcomeHeading = 'h1'
  }

  login(email = Cypress.env('email'), password = Cypress.env('password')) {
    this.visit()
    this.type(this.emailInput, email)
    this.type(this.passwordInput, password)
    this.click(this.submitButton)
  }

  verifyLoginPage() {
    this.shouldHaveText(this.welcomeHeading, 'Sign in to GDA Investment Readiness Portal')
  }
}

export default new LoginPage()
