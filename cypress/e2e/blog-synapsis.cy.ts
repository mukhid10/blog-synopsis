describe('Berhasil acces wibsite Blog test', () => {
  it('passes', () => {
    cy.visit('https://blog-synopsis.vercel.app/')
  })
})

describe('Testing Login Blog test', () => {
  it('login', () => {
    cy.visit('https://blog-synopsis.vercel.app/')
    cy.get('input[name="email"]').type('your_email')
    cy.get('input[name="token"]').type('your_token')
    cy.get('button[type="submit"]').click()
  })
})

describe('Testing Update Blog test', () => {
  it('update (Edit blog)', () => {
    cy.visit('https://blog-synopsis.vercel.app/')
    cy.get('button[aria-label="Edit"]').click()
    cy.get('input[name="title"]').clear().type('New Title')
    cy.get('textarea[name="body"]').clear().type('New Body')
    cy.get('button[type="submit"]').click()
  })
})

describe('Testing Delete Blog test', () => {
  it('delete (Remove blog)', () => {
    cy.visit('https://blog-synopsis.vercel.app/')
    cy.get('button[aria-label="Delete"]').click()
    cy.get('button[type="submit"]').click()
  })
})


