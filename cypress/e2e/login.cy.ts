// cypress/integration/login.spec.js
describe('Login', () => {
  it('should allow a user to log in', () => {
    cy.visit('/auth/login')
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="token"]').type('password')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/screen/beranda')
  })
})