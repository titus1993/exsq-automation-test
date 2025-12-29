class FormsPage {

    /* =========================
       SELECTORS
    ========================== */
    elements = {
        logo: () => cy.get('#app').find('header').find('img'),
        practiceFormItem: () => cy.contains('.element-list li', 'Practice Form'),
        practiceForm: {
            root: () => cy.get('.practice-form-wrapper'),
            firstNameInput: () => cy.get('#firstName'),
            lastNameInput: () => cy.get('#lastName'),
            emailInput: () => cy.get('#userEmail'),
            genderMaleRadioButton: () => cy.contains('label.custom-control-label', 'Male'),
            genderFemaleRadioButton: () => cy.contains('label.custom-control-label', 'Female'),
            genderOtherRadioButton: () => cy.contains('label.custom-control-label', 'Other'),
            mobileNumberInput: () => cy.get('#userNumber'),
            dateOfBirthInput: () => cy.get('#dateOfBirthInput'),
            subjectsContainer: () => cy.get('#subjectsContainer'),
            sportsCheckbox: () => cy.contains('label.custom-control-label', 'Sports'),
            readingCheckbox: () => cy.contains('label.custom-control-label', 'Reading'),
            musicCheckbox: () => cy.contains('label.custom-control-label', 'Music'),
            selectPictureChooseFile: () => cy.get('#uploadPicture'),
            currentAddressTextarea: () => cy.get('#currentAddress'),
            stateDropdown: () => cy.get('#state'),
            cityDropdown: () => cy.get('#city'),
            submitButton: () => cy.get('#submit'),
        },
        thankYouModal: {
            root: () => cy.get('.modal-dialog.modal-lg'),
        }
    }

    /* =========================
       ACTIONS
    ========================== */
    clickPracticeFormItem() {
        this.elements.practiceFormItem()
            .should('be.visible')
            .click()
    }

    typeFirstName(firstName) {
        this.elements.practiceForm.firstNameInput()
            .clear()
            .type(firstName)
    }

    typeLastName(lastName) {
        this.elements.practiceForm.lastNameInput()
            .clear()
            .type(lastName)
    }

    typeEmail(email) {
        this.elements.practiceForm.emailInput()
            .clear()
            .type(email)
    }

    clickGenderMaleRadioButton() {
        this.elements.practiceForm.genderMaleRadioButton()
            .click()
    }

    clickGenderFemaleRadioButton() {
        this.elements.practiceForm.genderFemaleRadioButton()
            .click()
    }

    clickGenderOtherRadioButton() {
        this.elements.practiceForm.genderOtherRadioButton()
            .click()
    }

    typeMobileNumber(mobileNumber) {
        this.elements.practiceForm.mobileNumberInput()
            .clear()
            .type(mobileNumber)
    }

    typeDateOfBirth(day, month, year) {
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__year-select').select(year)
        cy.get('.react-datepicker__month-select').select(month)
        cy.get('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
            .contains(day)
            .click()
    }



    checkSportsCheckbox() {
        this.elements.practiceForm.sportsCheckbox()
            .click()
    }

    checkReadingCheckbox() {
        this.elements.practiceForm.readingCheckbox()
            .click()
    }

    checkMusicCheckbox() {
        this.elements.practiceForm.musicCheckbox()
            .click()
    }

    typeCurrentAddress(address) {
        this.elements.practiceForm.currentAddressTextarea()
            .clear()
            .type(address)
    }

    selectState(state) {
        this.elements.practiceForm.stateDropdown()
            .click()
        this.elements.practiceForm.stateDropdown()
            .find('input')
            .type(`${state}{enter}`)
    }

    selectCity(city) {
        this.elements.practiceForm.cityDropdown()
            .click()
        this.elements.practiceForm.cityDropdown()
            .find('input')
            .type(`${city}{enter}`)
    }

    addSubject(subject) {
        this.elements.practiceForm.subjectsContainer()
            .click()
            .type(`${subject}{enter}`)
    }

    uploadFile(fileName) {
        this.elements.practiceForm.selectPictureChooseFile()
            .selectFile(`cypress/fixtures/${fileName}`)
    }

    submitForm() {
        this.elements.practiceForm.submitButton()
            .click()
    }


    /* =========================
       METHODS (Flows)
    ========================== */
    visit() {
        cy.visit('/forms')
    }

    waitForPageToLoad() {
        cy.location('pathname').should('eq', '/forms')
        this.elements.logo()
            .and('be.visible')
    }

    waitPracticeFormToLoad() {
        cy.location('pathname').should('eq', '/automation-practice-form')
        this.elements.logo()
            .and('be.visible')

        this.elements.practiceForm.root()
            .should('be.visible')
    }


}

export default FormsPage