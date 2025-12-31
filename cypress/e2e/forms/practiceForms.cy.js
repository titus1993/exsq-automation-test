import MainPage from '../../pages/main.page'
import FormsPage from '../../pages/forms.page'

const { students } = require('../../fixtures/data.json')
const mainPage = new MainPage()
const formsPage = new FormsPage()

describe('Forms Page Tests', () => {
    beforeEach(() => {
        cy.step('Navigate to Practice Form')
        mainPage.visit()
        mainPage.clickFormsCard()
        formsPage.waitForPageToLoad()
        formsPage.clickPracticeFormItem()
        formsPage.waitPracticeFormToLoad()
    })

    students.forEach((student, index) => {
        it(`Practice Form - Submit form filling all the fields correctly for student #${index + 1}`, { tags: ['@practiceForm', '@positive'] }, () => {
            const expectedResult = {
                'Student Name': `${student.firstName} ${student.lastName}`,
                'Student Email': student.email,
                'Gender': student.gender,
                'Mobile': student.mobile,
                'Date of Birth': `${student.dayOfBirth} ${student.monthOfBirth},${student.yearOfBirth}`,
                'Subjects': student.subjects.join(', '),
                'Hobbies': student.hobbies.join(', '),
                'Picture': student.picture,
                'Address': student.address,
                'State and City': `${student.state} ${student.city}`
            }

            cy.step('Fill personal information')
            formsPage.typeFirstName(student.firstName)
            formsPage.typeLastName(student.lastName)
            formsPage.typeEmail(student.email)
            formsPage.selectGender(student.gender)
            formsPage.typeMobileNumber(student.mobile)

            cy.step('Select date of birth')
            formsPage.typeDateOfBirth(student.dayOfBirth, student.monthOfBirth, student.yearOfBirth)
            cy.step('Fill academic information')
            formsPage.addSubjects(student.subjects)
            formsPage.checkHobbies(student.hobbies)

            cy.step('Upload picture')
            formsPage.uploadFile(student.picture)

            cy.step('Validate file is attached')
            formsPage.elements.practiceForm.selectPictureChooseFile()
                .should('have.prop', 'files')
                .then(files => {
                    expect(files.length).to.eq(1)
                    expect(files[0].name).to.eq(student.picture)
                })

            cy.step('Fill address information')
            formsPage.typeCurrentAddress(student.address)
            formsPage.selectState(student.state)
            formsPage.selectCity(student.city)

            cy.step('Submit the form')
            formsPage.submitForm()

            cy.step('Validate success modal')
            formsPage.elements.thankYouModal.root()
                .should('be.visible')
            formsPage.elements.thankYouModal.title()
                .should('contain.text', 'Thanks for submitting the form')
            cy.validateModalData(formsPage.elements.thankYouModal, expectedResult)

            cy.step('Close the modal')
            formsPage.clickThankYouModalCloseButton()

            cy.step('Validate modal is closed')
            formsPage.elements.thankYouModal.root()
                .should('not.exist')
        })
    })

    it('Practice Form - Submit form filling only mandatory fields', { tags: ['@practiceForm', '@positive'] }, () => {
        const firstName = 'Marvin'
        const lastName = 'Pivaral'
        const gender = 'Male'
        const mobile = '1234567890'
        const defaultDateOfBirth = '29 December,2025'

        const expectedResult = {
            'Student Name': `${firstName} ${lastName}`,
            'Student Email': '',
            'Gender': gender,
            'Mobile': mobile,
            'Date of Birth': defaultDateOfBirth,
            'Subjects': '',
            'Hobbies': '',
            'Picture': '',
            'Address': '',
            'State and City': ''
        }

        cy.step('Fill personal information')
        formsPage.typeFirstName(firstName)
        formsPage.typeLastName(lastName)
        formsPage.selectGender(gender)
        formsPage.typeMobileNumber(mobile)

        cy.step('Submit the form')
        formsPage.submitForm()

        cy.step('Validate success modal')
        formsPage.elements.thankYouModal.root()
            .should('be.visible')
        formsPage.elements.thankYouModal.title()
            .should('contain.text', 'Thanks for submitting the form')
        cy.validateModalData(formsPage.elements.thankYouModal, expectedResult)

        cy.step('Close the modal')
        formsPage.clickThankYouModalCloseButton()

        cy.step('Validate modal is closed')
        formsPage.elements.thankYouModal.root()
            .should('not.exist')
    })

    it('Practice Form - Add multiple subjects, remove all of them one by one', { tags: ['@practiceForm', '@positive'] }, () => {
        const subjects = ['Biology', 'English', 'Maths', 'Arts', 'Civics']

        cy.step('Add multiple subjects')
        formsPage.addSubjects(subjects)

        cy.step('Remove specific subjects')
        formsPage.removeSubjects(subjects)

        cy.step('Validate all subjects are cleared')
        formsPage.elements.practiceForm.subjectsItems()
            .should('not.exist')

        formsPage.elements.practiceForm.root().screenshot(`practiceForm_subjects_all_removed`)
    })

    it('Practice Form - Add multiple subjects, remove some of them and clear all at the end', { tags: ['@practiceForm', '@positive'] }, () => {
        const subjects = ['Biology', 'English', 'Maths', 'Arts', 'Civics']
        const subjectsToRemove = ['Biology', 'Maths', 'Civics']
        const expectedRemaining = ['English', 'Arts']

        cy.step('Add multiple subjects')
        formsPage.addSubjects(subjects)

        cy.step('Remove specific subjects')
        formsPage.removeSubjects(subjectsToRemove)

        cy.step('Validate remaining subjects')
        expectedRemaining.forEach(subject => {
            cy.contains('.subjects-auto-complete__multi-value__label', subject)
                .should('exist')
        })

        cy.step('Validate removed subjects are not present')
        subjectsToRemove.forEach(subject => {
            cy.contains('.subjects-auto-complete__multi-value__label', subject)
                .should('not.exist')
        })

        cy.step('Clear all subjects')
        formsPage.clickClearAllSubjectsButton()

        cy.step('Validate all subjects are cleared')
        formsPage.elements.practiceForm.subjectsItems()
            .should('not.exist')
    })

    it('Practice Form - Try to submit form with empty fields and validate mandatory fields', { tags: ['@practiceForm', '@negative'] }, () => {
        cy.step('Try to submit the empty form')
        formsPage.submitForm()

        cy.step('Validate that success modal is NOT displayed')
        formsPage.elements.thankYouModal.root()
            .should('not.exist')

        cy.step('Validate required fields are highlighted in red')
        formsPage.elements.practiceForm.firstNameInput()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(220, 53, 69)')

        formsPage.elements.practiceForm.lastNameInput()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(220, 53, 69)')

        formsPage.elements.practiceForm.mobileNumberInput()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(220, 53, 69)')

        formsPage.elements.practiceForm.genderMaleRadioButton()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(220, 53, 69)')

        formsPage.elements.practiceForm.genderFemaleRadioButton()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(220, 53, 69)')

        formsPage.elements.practiceForm.genderOtherRadioButton()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(220, 53, 69)')

        cy.step('Validate not required fields are highlighted in green')
        formsPage.elements.practiceForm.emailInput()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(40, 167, 69)')

        formsPage.elements.practiceForm.dateOfBirthInput()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(40, 167, 69)')

        formsPage.elements.practiceForm.sportsCheckbox()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(40, 167, 69)')

        formsPage.elements.practiceForm.readingCheckbox()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(40, 167, 69)')

        formsPage.elements.practiceForm.musicCheckbox()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(40, 167, 69)')

        formsPage.elements.practiceForm.currentAddressTextarea()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(40, 167, 69)')
    })
})