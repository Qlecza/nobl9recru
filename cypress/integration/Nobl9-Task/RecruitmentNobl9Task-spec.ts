// Hi!
// At my current work/project i used to work with Pop. We got folder with pages and another for specs, using custom commands for cypress was new to me. I try to create simple functions for every step in cypress spec.
// For example:
// goToExampleSomething(offerType) {
//     switch (Type) {
//       case 'a1':
//         this.getFirstType('something')
//           .find(Selector.editButton)
//           .eq(1)
//           .click({ force: true });
//       break;
//       case 'a2':
//         this.getFirstType('something2')
//           .find(Selector.editButton)
//           .eq(1)
//           .click({ force: true });
//         break;
//     }
//   }
//   and i use 'goToExampleSomething' etc in spec. I think is better/nicer way to write code for this TextTrackList, but i never automate tests without source code.  

// Task: Create a simple automated test visiting https://nobl9.com/ then going to blog tab, verifying if "WHY DO I NEED SLOS IF I ALREADY HAVE MONITORING?" entry is there, opening it, then clicking "GET STARTED" button at the bottom of the page, then checking "Talk to a Nobl9 SLOgician", filling all the fields and closing the form. Do NOT click SUBMIT button!

// I think layout of website was changed and this task isn't up to date, i'll try to fill sign up and contact form. I've decieded to not split code into small tests to prevent copy lines of code, especially that is not 'normal' environment of E2E tests.

describe('Nobl9 Tech Challenge - QA', () => {
    before(() => {
        cy.visit('https://nobl9.com/')
    })

    it('Recruitment test automation', () => {
    // Here we select and go to 'Blog' tab with simple assertion
        cy.get('#menu-primary-menu')
          .findByText('Blog')
          .should('have.text', 'Blog')
          .click()
        cy.url().should('contain', '/resources')
        // Looking for specific arrticle and removing attribute to prevent new tab in cypress
        cy.findByText("Why do I need SLOs if I already have monitoring?")
        cy.get('article').contains('Why do I need SLOs if I already have monitoring?')
          .should('have.attr', 'target', '_blank')
          .invoke('removeAttr', 'target')
          .click()
        // Catching button
        cy.get('a.button').contains('Get Started')
          .click()
        // Filling sign up form
        cy.get('input[placeholder="First name"]')
          .type('Mateusz')
        cy.get('input[placeholder="Last name"]')
          .type('Kulesza')
        cy.get('input[placeholder="Work email address"]')
          .type('fakemMKQA@gmail.com')
        cy.get('input[placeholder="Company name"]')
          .type('Nobl9 pls')
        cy.get('.iti__flag-container').click()
        cy.get('li[data-country-code="pl"]').click()
        cy.get('input[placeholder="Phone number"]')
          .type('123123123')
        // Catching and going to contact form
        cy.findByText("Contact Nobl9 Sales").click()
        // Here is my workaround with iframe, had some problems to 'get' selectors from that form.
        cy.get('iframe[id="hs-form-iframe-0"]', { timeout: 3000}).then(iframe => {
            cy.wrap(iframe)
              .its('0.contentDocument.body')
              .should('not.be.empty')
              .as('iframeBody')
        })
        // Filling contact form
        cy.get('@iframeBody')
          .find('input[name="firstname"]')
          .type('Mateusz')
        cy.get('@iframeBody')
          .find('input[name="lastname"]')
          .type('Kulesza')
        cy.get('@iframeBody')
          .find('input[name="company"]')
          .type('Maybe Nobl9')
        cy.get('@iframeBody')
          .find('input[name="email"]')
          .type('fakemMKQA@gmail.com')
        cy.get('@iframeBody')
          .find('textarea[name="dk_long_text"]')
          .type('I dont know that is correct way but i got problem with baypassing iframe')
        // Simple button assertion
        cy.get('@iframeBody')
          .find('input[type="submit"]').should('value', 'Contact Our Team')
    }) 
})