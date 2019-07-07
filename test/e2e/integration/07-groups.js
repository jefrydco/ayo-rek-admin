describe('Admin - CRUD Groups', () => {
  it('Login', () => {
    cy.visit('/')
    cy.contains('.v-toolbar__title', 'Login')
    cy.get('input[name="email"]').type('admin@gmail.com')
    cy.get('input[name="password"]').type('admin123')
    cy.get('.v-input__icon--append').click()
    cy.get('.v-input__icon--append').click()
    cy.get('button[type="submit"]').click()
    cy.url().should('include', 'admin')
  })
  it('Navigate to Groups', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-groups').click()
    cy.url().should('include', 'groups')
  })
  it('Create Group', () => {
    cy.get('.aio-create').click()
    cy.get('input[name="name"]')
      .clear()
      .type('A Group 1')
    cy.screenshot()
    cy.get('.aio-edit-save').click()
  })
  it('Edit Group', () => {
    cy.get('.aio-edit-a-group-1').click()
    cy.get('input[name="name"]')
      .clear()
      .type('A GROUP 2')
    cy.screenshot()
    cy.get('.aio-edit-save').click()
  })
  it('Delete Group', () => {
    cy.get('.aio-delete-a-group-2').click()
    cy.screenshot()
    cy.get('.aio-remove').click()
  })
})