describe('Admin - Navigating Menus', () => {
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
  it('Navigate to Students', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-students').click()
    cy.url().should('include', 'students')
  })
  it('Navigate to Lecturers', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-lecturers').click()
    cy.url().should('include', 'lecturers')
  })
  it('Navigate to Rooms', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-rooms').click()
    cy.url().should('include', 'rooms')
  })
  it('Navigate to Subjects', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-subjects').click()
    cy.url().should('include', 'subjects')
  })
  it('Navigate to Departments', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-departments').click()
    cy.url().should('include', 'departments')
  })
  it('Navigate to Study Programs', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-study-programs').click()
    cy.url().should('include', 'study-programs')
  })
  it('Navigate to Majors', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-majors').click()
    cy.url().should('include', 'majors')
  })
  it('Navigate to Groups', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-groups').click()
    cy.url().should('include', 'groups')
  })
  it('Navigate to Schedules', () => {
    cy.get('.aio-menu-datasets').click()
    cy.get('.aio-menu-schedules').click()
    cy.url().should('include', 'schedules')
  })
  it('Navigate to Attendances', () => {
    cy.get('.aio-menu-attendance').click()
    cy.get('.aio-menu-attendances').click()
    cy.url().should('include', 'attendances')
  })
  it('Navigate to Presences', () => {
    cy.get('.aio-menu-attendance').click()
    cy.get('.aio-menu-presences').click()
    cy.url().should('include', 'presences')
  })
  it('Logout', () => {
    cy.get('.aio-menu-account').click()
    cy.get('.aio-menu-logout').click()
    cy.contains('.v-toolbar__title', 'Login')
  })
})
