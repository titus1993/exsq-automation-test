import MainPage from '../../pages/main.page'
import ElementsPage from '../../pages/elements.page'

const mainPage = new MainPage()
const elementsPage = new ElementsPage()

describe('Elements', () => {
    describe('Checkbox Functionality', () => {
        beforeEach(() => {
            cy.step('Navigate to Checkbox page')
            mainPage.visit()
            mainPage.clickElementsCard()
            elementsPage.waitForPageToLoad()
            elementsPage.clickCheckBoxItem()
            elementsPage.waitFormToLoad()
        })

        it('Select Home and validate result', { tags: ['@checkbox', '@positive'] }, () => {
            const expectedResult = 'homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile'
            cy.step('Expand all nodes')
            elementsPage.clickExpandAll()

            cy.step('Select Home')
            elementsPage.clickCheckboxLabel('Home')

            cy.step('Validate result shows Home')
            elementsPage.elements.checkboxForm.result().should('contain.text', expectedResult)
        })

        it('Select Notes + Commands only', { tags: ['@checkbox', '@positive'] }, () => {
            const expectedResult = 'desktopnotescommands'

            cy.step('Expand all nodes')
            elementsPage.clickExpandAll()

            cy.step('Select Notes')
            elementsPage.clickCheckboxLabel('Notes')

            cy.step('Select Commands')
            elementsPage.clickCheckboxLabel('Commands')

            cy.step('Validate multiple selections')
            elementsPage.elements.checkboxForm.result()
                .should('contain.text', expectedResult)
        })

        it('Selecting Desktop selects children', { tags: ['@checkbox', '@positive'] }, () => {
            const expectedResult = 'desktopnotescommands'
            cy.step('Expand all nodes')
            elementsPage.clickExpandAll()

            cy.step('Select Desktop parent')
            elementsPage.clickCheckboxLabel('Desktop')

            cy.step('Validate output')
            elementsPage.elements.checkboxForm.result()
                .should('contain.text', expectedResult)
        })

        it('Uncheck only Notes under Desktop', { tags: ['@checkbox', '@positive'] }, () => {
            const expectedResult = 'desktopnotescommands'
            const expectedResult2 = 'commands'

            cy.step('Expand all')
            elementsPage.clickExpandAll()

            cy.step('Select Desktop')
            elementsPage.clickCheckboxLabel('Desktop')

            cy.step('Validate Desktop, Notes and Commands are checked')
            elementsPage.elements.checkboxForm.result()
                .should('contain.text', expectedResult)

            cy.step('Uncheck Notes only')
            elementsPage.clickCheckboxLabel('Notes')

            cy.step('Validate Notes removed but Commands remain')
            elementsPage.elements.checkboxForm.result()
                .should('contain.text', expectedResult2)
        })

        it('Collapse hides UI but keeps internal state', { tags: ['@checkbox', '@positive'] }, () => {
            cy.step('Expand all and select Home')
            elementsPage.clickExpandAll()
            elementsPage.clickCheckboxLabel('Home')

            cy.step('Collapse all')
            elementsPage.clickCollapseAll()

            cy.step('Ensure Notes is hidden')
            cy.contains('.rct-title', 'Notes').should('not.exist')

            cy.step('Expand again and validate still checked')
            elementsPage.clickExpandAll()
            elementsPage.elements.checkboxForm.checkboxInput('Home').should('be.checked')
        })

        it('Desktop becomes partial when only Notes is selected', { tags: ['@checkbox', '@positive'] }, () => {
            cy.step('Expand all')
            elementsPage.clickExpandAll()

            cy.step('Select Notes only')
            elementsPage.clickCheckboxLabel('Notes')

            cy.step('Validate Desktop indeterminate state')
            elementsPage.elements.checkboxForm
                .checkboxInput('Desktop')
                .should('have.prop', 'indeterminate', true)
        })
    })

    describe('Radio Button Functionality', () => {
        beforeEach(() => {
            cy.step('Navigate to Radio Button page')
            mainPage.visit()
            mainPage.clickElementsCard()
            elementsPage.waitForPageToLoad()
            elementsPage.clickRadioButtonItem()
            elementsPage.waitFormToLoad()
        })

        it('Select Yes and validate output', { tags: ['@radioButton', '@positive'] }, () => {
            cy.step('Select Yes option')
            elementsPage.clickRadioButton('Yes')

            cy.step('Validate result text')
            elementsPage.elements.radioButtonForm.result()
                .should('contain.text', 'Yes')
        })

        it('Select Impressive and validate output', { tags: ['@radioButton', '@positive'] }, () => {
            cy.step('Select Impressive option')
            elementsPage.clickRadioButton('Impressive')

            cy.step('Validate displayed result')
            elementsPage.elements.radioButtonForm.result()
                .should('contain.text', 'Impressive')
        })

        it('No option should be disabled', { tags: ['@radioButton', '@positive'] }, () => {
            cy.step('Validate No Radio is disabled')
            elementsPage.elements.radioButtonForm.input('No')
                .should('be.disabled')
        })

        it('No result message should be shown until choice is made', { tags: ['@radioButton', '@positive'] }, () => {
            cy.step('Validate result not displayed by default')
            elementsPage.elements.radioButtonForm.result()
                .should('not.exist')
        })

        it('Selecting Yes after Impressive should update output', { tags: ['@radioButton', '@positive'] }, () => {
            cy.step('Select Impressive first')
            elementsPage.clickRadioButton('Impressive')

            cy.step('Validate Impressive')
            elementsPage.elements.radioButtonForm.result()
                .should('contain.text', 'Impressive')

            cy.step('Switch to Yes')
            elementsPage.clickRadioButton('Yes')

            cy.step('Validate updated result')
            elementsPage.elements.radioButtonForm.result()
                .should('contain.text', 'Yes')
        })
    })
})
