import MainPage from '../../pages/main.page'
import AlertsWindowsPage from '../../pages/alertsWindows.page'

const mainPage = new MainPage()
const alertsWindowsPage = new AlertsWindowsPage()

describe('Windows and AlertsTests', () => {
    describe('Windows Page Tests', () => {
        beforeEach(() => {
            cy.step('Navigate to Window Section')
            mainPage.visit()
            mainPage.clickAlertsFrameAndWindowsCard()
            alertsWindowsPage.waitForPageToLoad()
            alertsWindowsPage.clickBrowserWindowsItem()
            alertsWindowsPage.waitFormToLoad()
        })

        it('Window - New Tab', { tags: ['@window', '@positive'] }, () => {
            cy.step('Stub window.open for URL')
            cy.stubWindowOpenForUrl()

            cy.step('Click on New Tab button')
            alertsWindowsPage.clickTabButton()

            cy.step('Validate window.open was called and navigate to URL')
            cy.get('@windowOpen')
                .should('have.been.calledOnce')
                .then(stub => {
                    const url = stub.getCall(0).args[0]
                    cy.visit(url)
                })

            cy.step('Validate URL and content')
            cy.location('pathname').should('eq', '/sample')
            cy.contains('This is a sample page').should('be.visible')
        })

        it('Window - New Window', { tags: ['@window', '@positive'] }, () => {
            cy.step('Stub window.open for URL')
            cy.stubWindowOpenForUrl()

            cy.step('Click on New Window button')
            alertsWindowsPage.clickWindowButton()

            cy.step('Validate new window URL')
            cy.get('@windowOpen')
                .should('have.been.calledOnce')
                .then(stub => {
                    const url = stub.getCall(0).args[0]
                    cy.visit(url)
                })

            cy.step('Validate URL and content')
            cy.location('pathname').should('eq', '/sample')
            cy.contains('This is a sample page').should('be.visible')
        })

        it('Window - New Window Message', { tags: ['@window', '@positive'] }, () => {
            cy.step('Stub window.open for message')
            cy.stubWindowOpenForMessage()

            cy.step('Click on New Window Message button')
            alertsWindowsPage.clickMessageWindowButton()

            cy.step('Validate message content')
            cy.get('@documentWrite')
                .should(
                    'have.been.calledOnceWithExactly',
                    'Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.'
                )
        })
    })


    describe('Alerts Page Tests', () => {
        beforeEach(() => {
            cy.step('Navigate to Alerts Section')
            mainPage.visit()
            mainPage.clickAlertsFrameAndWindowsCard()
            alertsWindowsPage.waitForPageToLoad()
            alertsWindowsPage.clickAlertsItem()
            alertsWindowsPage.waitFormToLoad()
        })

        it('Alerts - Simple Alert', { tags: ['@alerts', '@positive'] }, () => {
            cy.step('Register alert listener')
            cy.on('window:alert', msg => {
                expect(msg).to.eq('You clicked a button')
            })

            cy.step('Click Alert button')
            alertsWindowsPage.clickAlertButton()
        })

        it('Alert - Timer alert should appear after delay', { tags: ['@alerts', '@positive'] }, () => {
            cy.step('Freeze time')
            cy.clock()

            cy.step('Click delayed alert button')
            alertsWindowsPage.clickTimerAlertButton()

            cy.step('Fast-forward time')
            cy.tick(5000)

            cy.on('window:alert', msg => {
                expect(msg).to.eq('This alert appeared after 5 seconds')
            })
        })

        it('Alert - Confirm OK', { tags: ['@alerts', '@positive'] }, () => {
            cy.on('window:confirm', msg => {
                expect(msg).to.eq('Do you confirm action?')
                return true
            })

            cy.step('Click Confirm button')
            alertsWindowsPage.clickConfirmButton()

            cy.step('Validate confirmation result')
            alertsWindowsPage.elements.alertsForm.confirmResult()
                .should('contain', 'You selected Ok')
        })

        it('Alert - Confirm Cancel', { tags: ['@alerts', '@negative'] }, () => {
            cy.on('window:confirm', () => false)

            cy.step('Click Confirm button')
            alertsWindowsPage.clickConfirmButton()

            cy.step('Validate cancel result')
            alertsWindowsPage.elements.alertsForm.confirmResult()
                .should('contain', 'You selected Cancel')
        })

        it('Alert - Prompt input accepted', { tags: ['@alerts', '@positive'] }, () => {
            cy.window().then(win => {
                cy.stub(win, 'prompt').returns('Marvin').as('prompt')
            })

            cy.step('Click Prompt button')
            alertsWindowsPage.clickPromptButton()

            cy.step('Validate prompt text result')

            alertsWindowsPage.elements.alertsForm.promptResult()
                .should('contain', 'You entered Marvin')
        })
    })
})