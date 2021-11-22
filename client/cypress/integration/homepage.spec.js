//Test
describe('renders the home page', () => {
	beforeEach(() => {
		cy.visit('/');
	});
	it('Renders correctly', () => {
		cy.contains('div', 'The King is dead. Long live the King!');
	});
	it('Creates a new Room', () => {
		/* ==== Generated with Cypress Studio ==== */
		cy.get('.splash__buttons > .button').click();
		cy.get('.rooms__buttons > .button').click();
		cy.get('#playerName').clear();
		cy.get('#playerName').type('Testing');
		cy.get('#player-name-form-form > :nth-child(2) > .button').click();
		cy.get('.button').click();
		cy.findByText("Testing game");
		/* ==== End Cypress Studio ==== */
	});
});
