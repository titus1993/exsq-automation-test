import MainPage from '../pages/main.page'
import FormsPage from '../pages/forms.page'

describe('Forms Page Tests', () => {
    const mainPage = new MainPage()
    const formsPage = new FormsPage()

    beforeEach(() => {
        mainPage.visit()
        mainPage.clickFormsCard()
        formsPage.waitForPageToLoad()
        formsPage.clickPracticeFormItem()
        formsPage.waitPracticeFormToLoad()
    })

    it('Practice Form Test', { tags: ['@forms', '@regression'] }, () => {    
        formsPage.typeFirstName('John')
        formsPage.typeLastName('Doe')
        formsPage.typeEmail('john.doe@example.com')
        formsPage.clickGenderMaleRadioButton()
        formsPage.typeMobileNumber('1234567890')
        formsPage.typeDateOfBirth('31', 'August', '1990')
        formsPage.addSubject('Math')
        formsPage.checkSportsCheckbox()
        formsPage.checkReadingCheckbox()
        formsPage.checkMusicCheckbox()
        formsPage.uploadFile('test-file.txt')
        formsPage.typeCurrentAddress('123 Main Street')
        formsPage.selectState('NCR')
        formsPage.selectCity('Delhi')
        formsPage.submitForm()
    })
})