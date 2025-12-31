# 🧪 Cypress End-to-End Automation Framework — DemoQA
**Autor:** _Marvin Pivaral — QA Automation Engineer_

Automation framework based on **Cypress**, applying Page Object Model (POM) architecture, data-driven testing, UI validations and tag segmentation with Cypress Grep.

This project automates key DemoQA functionalities: Forms, Checkbox Tree, Radio Buttons, Alerts, Windows Browser, among others.

---

## 🧱 Project Architecture
```
cypress/
│── e2e/                   → Test files (specs)
│── fixtures/              → Test data in JSON
│── pages/                 → Page Object Model (POM)
│── reports/               → Mochawesome reports
│── screenshots/           → Screenshots (only if a test fails)
│── videos/                → Recordings (if enabled)
support/
│── commands.js            → Custom Cypress Commands
│── e2e.js                 → Hooks globales
docs/
│── images/                → Captures for documentation
```

---

## ⚙️ Installation and Execution

### Install dependencies
```bash
npm install
```

### Run Cypress UI
```bash
npm run cypress:open
```

### Run Headless Tests (Chrome)
```bash
npx cypress run --browser chrome
```

---

## 🧪 Run Tests by Tags (cypress-grep)
```js
it('Form submit', { tags: ['@forms', '@positive'] }, () => {})
```

Run checkbox only:
```bash
npx cypress run --env grep=@checkbox
```

Run only negative cases:
```bash
npx cypress run --env grep=@negative
```

---

## 🧰 Available scripts (package.json)

You can run tests using the following preconfigured commands:

Open Cypress UI Mode:
```bash
npm run cypress:open
```

Run all the tests in headless mode:
```bash
npm run cypress:run:chrome
```
You can take a look into package.json file to see other available commands to run tests


## 📂 Page Object Model — Example

```js
export class FormsPage {
  elements = {
    firstNameInput: () => cy.get('#firstName'),
    submitBtn:      () => cy.get('#submit')
  }

  fillForm(data) {
    this.elements.firstNameInput().type(data.firstName)
  }
}
```

Use:
```js
const formsPage = new FormsPage()
formsPage.fillForm(testUser)
formsPage.elements.submitBtn().click()
```

---

## 🛠 Custom Commands (support/commands.js)

```js
Cypress.Commands.add('validateBorderColor', (element, rgb) => {
  element.should('have.css', 'border-color', rgb)
})
```

---

## 🖼 Captures and Reports

| Type | Path |
|------|------------|
| Screenshots | /cypress/screenshots |
| Mochawesome Reports | /cypress/reports |
| Documenation's Images | /docs/images |

---

## 🚦 Testing Strategy

| Component | Covered Tests |
|------------|--------------------|
| Forms | Validations, fixture data, modal |
| Alerts | Alert, Confirm & Prompt with stubs |
| Browser Windows | New Tab, New Window, Window Message |
| Checkbox Tree | Expand/Collapse, select deep children |
| Radio Button | States, UI Validations |

---

## 👤 About the Author

**Marvin Pivaral — QA Automation Engineer**  
Passionate about automation, scalable frameworks and continuous quality.

---

## 🤝 Contributions

Pull requests and suggestions are welcome.
