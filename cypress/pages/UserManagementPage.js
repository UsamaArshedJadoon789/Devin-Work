import BasePage from "./BasePage";

class UserManagementPage extends BasePage {
  constructor() {
    super();
    this.url = "/admin/user-management";
    // Page elements using Spanish text
    this.pageTitle = "div[class='info-wrap'] h2"; // "Gestión de Usuarios"
    this.inviteButton = "a[type='button']"; // "Invitar" button
    this.filterButton = "div[class='light-box'] a"; // "Filtrar Datos" link
    this.searchInput = 'input[type="search"]'; // Search input
    this.emailInput = 'input[type="email"]';
  }
  generateRandomEmail() {
    let emailCounter = 1;
    const randomString = Math.random().toString(36).substring(2, 4);  // Generates random string of 2 characters
    const email = `testingStaging${randomString}@yopmail.com`;  // Add the random string to the email
    emailCounter++; 
    return email;
  }

  TestSendInvite() {
    // Click invite button
    cy.get(this.inviteButton).should("be.visible").click();
    //name
    cy.get(
      "body > ngb-modal-window:nth-child(12) > div:nth-child(1) > div:nth-child(1) > app-user-invitation:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > input:nth-child(2)"
    )
      .should("be.visible")
      .clear()
      .type("TestAutomation");

    // Comapny Name
    cy.get(
      "body > ngb-modal-window:nth-child(12) > div:nth-child(1) > div:nth-child(1) > app-user-invitation:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input:nth-child(2)"
    )
      .should("be.visible")
      .clear()
      .type("TestAutomationCompany");
    // email
    cy.get(
      "body > ngb-modal-window:nth-child(12) > div:nth-child(1) > div:nth-child(1) > app-user-invitation:nth-child(1) > div:nth-child(1) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > input:nth-child(2)"
    )
      .should("be.visible")
      .clear()
      .type(this.generateRandomEmail());
     
      cy.get("select[formcontrolname='user_role']", { timeout: 20000 }) // Wait up to 20 seconds
      .should('exist')
      .should('be.visible')
      .select(1)
      .trigger('change');

      cy.get("label[for='lang-es']", { timeout: 20000 }) // Wait up to 20 seconds
      .should('exist')
      .should('be.visible')
      .click();

    cy.get("div[class='modal-footer'] button[type='submit']")
      .should("be.visible")
      .click();
    // Verify success message in Spanish
    cy.wait(5000)

  }

  selectRandomFilter() {
    cy.get("div[class='light-box'] a").click();
    cy.get("select[formcontrolname='sectors']").should("be.visible").select(1);
    cy.get("select[formcontrolname='location']").should("be.visible").select(1);
    cy.get("select[formcontrolname='status']").should("be.visible").select(1);
    cy.get("button[type='submit']").should("be.visible").click();
    cy.wait(3000);
    cy.get("button[type='button']").click();
  }
}

export default new UserManagementPage();
