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
            subjectsItems: () => cy.get('.subjects-auto-complete__multi-value__label'),
            clearAllSubjectsButton: () => cy.get('.subjects-auto-complete__clear-indicator'),
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
            root: () => cy.get('.modal-content'),
            title: () => cy.get('#example-modal-sizes-title-lg'),
            body: () => cy.get('.modal-body'),
            table: () => cy.get('.table-responsive table'),
            rows: () => cy.get('.table-responsive tbody tr'),
            labels: () =>
                cy.get('.table-responsive tbody tr td:first-child'),
            values: () =>
                cy.get('.table-responsive tbody tr td:last-child'),
            valueByLabel: (labelText) =>
                cy.contains('.table-responsive tbody tr td', labelText)
                    .next(),
            closeButton: () => cy.get('#closeLargeModal')
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

    clickClearAllSubjectsButton() {
        this.elements.practiceForm.clearAllSubjectsButton()
            .click()
    }

    clickThankYouModalCloseButton() {
        this.elements.thankYouModal.closeButton()
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



    addSubjects(subjects) {
        for (let subject of subjects) {
            this.elements.practiceForm.subjectsContainer()
                .click()
                .type(`${subject}{enter}`)
        }
    }

    removeSubjects(subjects) {
        subjects.forEach(subject => {
            cy.contains('.subjects-auto-complete__multi-value__label', subject)
                .parents('.subjects-auto-complete__multi-value')
                .find('.subjects-auto-complete__multi-value__remove')
                .click()
        })
    }

    selectGender(gender) {
        if (gender === 'Male') {
            this.clickGenderMaleRadioButton()
        } else if (gender === 'Female') {
            this.clickGenderFemaleRadioButton()
        } else if (gender === 'Other') {
            this.clickGenderOtherRadioButton()
        }
    }

    checkHobbies(hobbies) {
        for (let hobby of hobbies) {
            if (hobby === 'Sports') {
                this.checkSportsCheckbox()
            } else if (hobby === 'Reading') {
                this.checkReadingCheckbox()
            } else if (hobby === 'Music') {
                this.checkMusicCheckbox()
            }
        }
    }
}

export default FormsPage