// Custom commands for the application
Cypress.Commands.add('login', (email = Cypress.env('email'), password = Cypress.env('password')) => {
  cy.visit('/admin/login')
  cy.get('input[name="Email"]').clear().type(email)
  cy.get('input[name="Password"]').clear().type(password)
  cy.get('button[type="submit"]').click()
  // Wait for redirect and dashboard load
  cy.url().should('include', '/admin/dashboard', { timeout: 15000 })
  cy.get('h2:contains("Tablero")').should('be.visible', { timeout: 15000 })
})

// Command to handle random selection from dropdown
Cypress.Commands.add('selectRandomOption', (selector) => {
  cy.get(selector).first().then($select => {
    const options = $select.find('option').toArray()
    if (options.length > 1) {
      const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1
      cy.wrap($select).select(options[randomIndex].value)
    }
  })
})

// Command to generate random email
Cypress.Commands.add('generateRandomEmail', () => {
  const timestamp = new Date().getTime()
  return `Tester${timestamp}@yopmail.com`
})
