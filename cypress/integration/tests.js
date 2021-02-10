describe('Cookie Consent Banner', () => {
	it('Load page', () => {
		cy.visit('/');
	});

	it('Renders', () => {
        cy.wait(1000);
		cy.get('cookie-consent-banner').should('not.be.empty');
	});

	it('Closes correctly', () => {
        cy.wait(1000);
		cy.get('cookie-consent-banner .ccb-actions button').click();
        cy.wait(1000);
        cy.get('cookie-consent-banner').should('not.exist');
	});
});