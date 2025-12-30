class AlertsWindowsPage {

    /* =========================
       SELECTORS
    ========================== */
    elements = {
        logo: () => cy.get('#app').find('header').find('img'),
        browserWindowsItem: () => cy.contains('.element-list li', 'Browser Windows'),
        alertsItem: () => cy.contains('.element-list li', 'Alerts'),
        browserWindowsForm: {
            root: () => cy.get('#browserWindows'),
            tabButton: () => cy.get('#tabButton'),
            windowButton: () => cy.get('#windowButton'),
            messageWindowButton: () => cy.get('#messageWindowButton'),
        },
        alertsForm: {
            root: () => cy.get('#javascriptAlertsWrapper'),
            alertButton: () => cy.get('#alertButton'),
            timerAlertButton: () => cy.get('#timerAlertButton'),
            confirmButton: () => cy.get('#confirmButton'),
            promptButton: () => cy.get('#promtButton'),
            confirmResult: () => cy.get('#confirmResult'),
            promptResult: () => cy.get('#promptResult')
        }

    }

    /* =========================
       ACTIONS
    ========================== */
    clickBrowserWindowsItem() {
        this.elements.browserWindowsItem()
            .should('be.visible')
            .click()
    }

    clickAlertsItem() {
        this.elements.alertsItem()
            .should('be.visible')
            .click()
    }

    clickTabButton() {
        cy.get('#tabButton')
            .invoke('removeAttr', 'target')
            .click()
    }

    clickWindowButton() {
        this.elements.browserWindowsForm.windowButton()
            .should('be.visible')
            .click()
    }

    clickMessageWindowButton() {
        this.elements.browserWindowsForm.messageWindowButton()
            .should('be.visible')
            .click()
    }

    clickAlertButton() {
        this.elements.alertsForm.alertButton()
            .should('be.visible')
            .click()
    }

    clickTimerAlertButton() {
        this.elements.alertsForm.timerAlertButton()
            .should('be.visible')
            .click()
    }

    clickConfirmButton() {
        this.elements.alertsForm.confirmButton()
            .should('be.visible')
            .click()
    }

    clickPromptButton() {
        this.elements.alertsForm.promptButton()
            .should('be.visible')
            .click()
    }

    /* =========================
       METHODS (Flows)
    ========================== */
    visit() {
        cy.visit('/alertsWindows')
    }

    waitForPageToLoad() {
        cy.location('pathname').should('eq', '/alertsWindows')
        this.elements.logo()
            .and('be.visible')
    }

    waitFormToLoad() {
        cy.location('pathname').should('be.oneOf', [
            '/browser-windows',
            '/alerts'
        ])

        this.elements.logo()
            .and('be.visible')
    }



}

export default AlertsWindowsPage