# Nobl9 Recruitment Task - QA

**Instal Cypress with npm**
```
npm install cypress --save-dev
```
**Instal TypeScript with npm**
```
npm install --save-dev typescript
```
**Add and configure tsconfig.json**
```
Create tsconfig.json inside your cypress folder. Recommended configuration:
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "@testing-library/cypress"]
  },
  "include": ["**/*.ts"]
}
```
**Instal Cypress Testing Library**
```
npm install --save-dev cypress @testing-library/cypress
```
**Add `Cypress Testing Library` in `cypress/support/commands.js`**
```
import '@testing-library/cypress/add-commands';
```
**In `cypress.json` add:**
```
{
    "chromeWebSecurity": false
  }
```
## Run Cypress with
`npx cypress open`
