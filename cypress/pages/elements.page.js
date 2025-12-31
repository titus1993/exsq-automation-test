class ElementsPage {
    /* =========================
       SELECTORS
    ========================== */
    elements = {
        logo: () => cy.get('#app').find('header').find('img'),
        checkBoxItem: () => cy.contains('.element-list li', 'Check Box'),
        checkboxForm: {
            root: () => cy.get('#check-box-tree-wrapper'),
            expandAll: () => cy.get('.rct-option-expand-all'),
            collapseAll: () => cy.get('.rct-option-collapse-all'),
            checkboxLabel: (name) => cy.contains('.rct-title', name).parent('label'),
            checkboxInput: (name) => cy.contains('.rct-title', name).parent('label').find('input[type="checkbox"]'),
            result: () => cy.get('#result')
        },
        radioButtonItem: () => cy.contains('.element-list li', 'Radio Button'),
        radioButtonForm: {
            root: () => cy.contains('h1', 'Radio Button').next('div'),
            label: (text) => cy.contains('label', text),
            input: (text) => cy.contains('label', text).prev('input'),
            result: () => cy.get('.mt-3')
        }
    }

    /* =========================
       ACTIONS
    ========================== */
    clickCheckBoxItem() {
        this.elements.checkBoxItem()
            .should('be.visible')
            .click()
    }

    clickRadioButtonItem() {
        this.elements.radioButtonItem()
            .should('be.visible')
            .click()
    }

    clickExpandAll() {
        this.elements.checkboxForm.expandAll()
            .should('be.visible')
            .click()
    }

    clickCollapseAll() {
        this.elements.checkboxForm.collapseAll()
            .should('be.visible')
            .click()
    }

    clickCheckboxLabel(name) {
        this.elements.checkboxForm.checkboxLabel(name).click()
    }

    clickRadioButton(text) {
        this.elements.radioButtonForm.label(text).click()
    }



    /* =========================
       METHODS (Flows)
    ========================== */
    visit() {
        cy.visit('/elements')
    }

    waitForPageToLoad() {
        cy.location('pathname').should('eq', '/elements')
        this.elements.logo()
            .and('be.visible')
    }

    waitFormToLoad() {
        cy.location('pathname').should('be.oneOf', [
            '/checkbox',
            '/radio-button'
        ])

        this.elements.logo()
            .and('be.visible')
    }
}

export default ElementsPage