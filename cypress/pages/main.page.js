class MainPage {

    /* =========================
       SELECTORS
    ========================== */
    elements = {
        elementsCard: () => cy.contains('.top-card', 'Elements'),
        formsCard: () => cy.contains('.top-card', 'Forms'),
        alertsFrameAndWindowsCard: () => cy.contains('.top-card', 'Alerts, Frame & Windows'),
        widgetsCard: () => cy.contains('.top-card', 'Widgets'),
        interactionsCard: () => cy.contains('.top-card', 'Interactions'),
        bookStoreApplicationCard: () => cy.contains('.top-card', 'Book Store Application'),
    }

    /* =========================
       ACTIONS
    ========================== */
    clickElementsCard() {
        this.elements.elementsCard()
            .should('be.visible')
            .click()
    }

    clickFormsCard() {
        this.elements.formsCard()
            .should('be.visible')
            .click()
    }

    clickAlertsFrameAndWindowsCard() {
        this.elements.alertsFrameAndWindowsCard()
            .should('be.visible')
            .click()
    }

    clickWidgetsCard() {
        this.elements.widgetsCard()
            .should('be.visible')
            .click()
    }

    clickInteractionsCard() {
        this.elements.interactionsCard()
            .should('be.visible')
            .click()
    }

    clickBookStoreApplicationCard() {
        this.elements.bookStoreApplicationCard()
            .should('be.visible')
            .click()
    }

    /* =========================
       METHODS (Flows)
    ========================== */
    visit() {
        cy.visit('/')
    }
}

export default MainPage