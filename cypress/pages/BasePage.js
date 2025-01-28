export default class BasePage {
  constructor() {
    this.url = ''
  }

  visit() {
    cy.visit(this.url)
  }

  getElement(selector) {
    return cy.get(selector)
  }

  click(selector) {
    this.getElement(selector).click()
  }

  type(selector, text) {
    this.getElement(selector).clear().type(text)
  }

  select(selector, option) {
    this.getElement(selector).select(option)
  }

  shouldBeVisible(selector) {
    this.getElement(selector).should('be.visible')
  }

  shouldExist(selector) {
    this.getElement(selector).should('exist')
  }

  shouldHaveText(selector, text) {
    this.getElement(selector).should('have.text', text)
  }

  waitForElement(selector, timeout = 10000) {
    return cy.get(selector, { timeout })
  }
}
