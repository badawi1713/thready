/**
 * - E2E Login spec
 *   - should display login page correctly
 *   - should display homepage when username and password are correct
 *   - should display error invalid email message when email was invalid
 *   - should display error required message when email was empty
 *   - should display error required message when password was empty
 *   - should display error toast message (email or password is wrong) when email/password was wrong
 *   - should display home page when login action was successful
 */

describe('Login spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
    });

    it('should display login page correctly', () => {
        cy.visit('http://localhost:5173/login');

        cy.get('input[placeholder="Enter your email"]').should('be.visible');
        cy.get('input[placeholder="Enter your password"]').should('be.visible');
        cy.get('button')
            .contains(/^Login$/)
            .should('be.visible');
    });

    it('should display error invalid email message when email was invalid', () => {
        cy.get('input[placeholder="Enter your email"]').type(
            'john.doemail.com'
        );
        cy.get('p')
            .contains(/^Email must be valid, example: john.doe@mail.com$/)
            .should('be.visible');
    });

    it('should display error required message when email was empty', () => {
        cy.get('button')
            .contains(/^Login$/)
            .click();
        cy.get('p')
            .contains(/^Email is required$/)
            .should('be.visible');
    });

    it('should display error required message when password was empty', () => {
        cy.get('button')
            .contains(/^Login$/)
            .click();
        cy.get('p')
            .contains(/^Password is required$/)
            .should('be.visible');
    });

    it('should display error toast message (email or password is wrong) when email/password was wrong', () => {
        cy.get('input[placeholder="Enter your email"]').type('ymir@gmail.com');
        cy.get('input[placeholder="Enter your password"]').type('fun123456');
        cy.get('button')
            .contains(/^Login$/)
            .click();
        cy.get('div')
            .contains(/^email or password is wrong$/)
            .should('be.visible');
    });

    it('should display home page when login action was successful', () => {
        cy.get('input[placeholder="Enter your email"]').type(
            'john.doe@gmail.com'
        );
        cy.get('input[placeholder="Enter your password"]').type('fun123');
        cy.get('button')
            .contains(/^Login$/)
            .click();
        cy.get('h2')
            .contains(/^Home$/)
            .should('be.visible');
        cy.get('button[aria-label="logout"]').should('be.visible');
    });
});
