import MainPage from '../pages/main.page'

describe('template spec', () => {
  const mainPage = new MainPage()

  beforeEach(() => {
    mainPage.visit()
  })

  it('Elements Card', { tags: ['@smoke', '@regression'] }, () => {    
    mainPage.elements.elementsCard().should('be.visible')
    mainPage.elements.elementsCard().click();
  })

  it('Forms Card', { tags: '@smoke' }, () => {    
    mainPage.elements.formsCard().should('not.be.visible')
    mainPage.elements.formsCard().click();
  })

  it('Alerts, Frame & Windows Card', { tags: '@smoke' }, () => {    
    mainPage.elements.alertsFrameAndWindowsCard().should('be.visible')
    mainPage.elements.alertsFrameAndWindowsCard().click();
  })

  it('Widgets Card', { tags: '@smoke' }, () => {    
    mainPage.elements.widgetsCard().should('be.visible')
    mainPage.elements.widgetsCard().click();
  })

  it('Interactions Card', { tags: '@smoke' }, () => {    
    mainPage.elements.interactionsCard().should('be.visible')
    mainPage.elements.interactionsCard().click();
  })

  it('Book Store Application Card', { tags: '@smoke' }, () => {    
    mainPage.elements.bookStoreApplicationCard().should('be.visible')
    mainPage.elements.bookStoreApplicationCard().click();
  })
})