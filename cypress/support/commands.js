// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('validateModalData', (modal, data) => {
    cy.step('Validating modal data')
    Object.entries(data).forEach(([label, value]) => {
        modal.valueByLabel(label)
            .should('contain.text', value)
    })
})

Cypress.Commands.add('stubWindowOpenForUrl', () => {
  cy.window().then(win => {
    cy.stub(win, 'open').as('windowOpen')
  })
})

Cypress.Commands.add('stubWindowOpenForMessage', () => {
  cy.window().then(win => {
    cy.stub(win, 'open').callsFake(() => {
      return {
        document: {
          write: cy.stub().as('documentWrite')
        }
      }
    }).as('windowOpen')
  })
})