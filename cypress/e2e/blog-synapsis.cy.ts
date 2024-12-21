describe('Berhasil acces wibsite Blog test', () => {
  it('passes', () => {
    cy.visit('https://blog-synopsis.vercel.app/')
  })
})

describe('Testing Create Token Blog test', () => {
  it('create token', () => {
    cy.visit('https://blog-synopsis.vercel.app/auth/register')
    cy.get('input[name="name"]').type('your name')
    cy.get('input[name="email"]').type('yourEmail@gmail.com')
    cy.get('select[name="gender"]').select('male')
    cy.get('button[type="submit"]').click()
  })
})

describe('Testing Login Blog test', () => {
  it('login', () => {
    cy.visit('https://blog-synopsis.vercel.app/')
    cy.get('input[name="email"]').type('adit@gmail.com')
    cy.get('input[name="token"]').type('7594876')
    cy.get('button[type="submit"]').click()
  })
})

describe('Testing CRUD Blog di Halaman Beranda', () => {
  it('delete blog', () => {
    cy.visit('https://blog-synopsis.vercel.app/auth/login')
    cy.get('input[name="email"]').type('adit@gmail.com')
    cy.get('input[name="token"]').type('7594876')
    cy.get('button[type="submit"]').click()
    cy.wait(1000)
    cy.visit('https://blog-synopsis.vercel.app/screen/beranda')
    cy.get('.ant-table-tbody > tr:first').within(() => {
      cy.get('span').contains('Delete').click({ force: true })
    })
    cy.contains('Submit').click({ force: true })
  })

  it('Update blog', () => {
    cy.visit('https://blog-synopsis.vercel.app/auth/login')
    cy.get('input[name="email"]').type('adit@gmail.com')
    cy.get('input[name="token"]').type('7594876')
    cy.get('button[type="submit"]').click()
    cy.wait(1000)
    cy.visit('https://blog-synopsis.vercel.app/screen/beranda')
    cy.get('.ant-table-tbody > tr:first').within(() => {
      cy.get('span').contains('Edit').click({ force: true })
    })
    cy.get('input[name="title"]').clear().type('Judul Baru')
    cy.get('textarea[name="body"]').clear().type('Isi Baru')
    cy.contains('Submit').click({ force: true })
  })

  it('Add new blog', () => {
    cy.visit('https://blog-synopsis.vercel.app/auth/login')
    cy.get('input[name="email"]').type('adit@gmail.com')
    cy.get('input[name="token"]').type('7594876')
    cy.get('button[type="submit"]').click()
    cy.wait(1000)
    cy.visit('https://blog-synopsis.vercel.app/screen/beranda')
    cy.get('button').contains('Add Blog').click({ force: true })
    cy.get('input[name="title"]').type('Judul Baru')
    cy.get('textarea[name="body"]').type('Isi Baru')
    cy.contains('Submit').click({ force: true })
  })

})









