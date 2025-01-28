import InterviewPage from '../pages/InterviewPage';

describe('Interview Page Module', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/admin/dashboard');
    cy.visit('/admin/interview-forms');
    cy.url().should('include', '/admin/interview-forms');
  });

  it('should load interview page successfully', () => {
    InterviewPage.verifyPageContent();
  });

  it('should apply and verify filters', () => {
    InterviewPage.selectRandomFilter();
    
    cy.get('[data-testid="data-table"] tbody tr')
      .should('exist')
      .and('have.length.lte', 25)
      .and('have.length.gt', 0)
      .then($rows => {
        cy.log(`Row count after filter: ${$rows.length}`)
      });
  });
});
