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
		cy.get('.button').click()
		cy.findByText("Testing's game");
	});
   it("Creates a new Room, selects and reveals Assassination", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".splash__buttons > .button").click();
    cy.get(".rooms__buttons > .button").click();
    cy.get("#playerName").clear();
    cy.get("#playerName").type("Testing");
    cy.get("#player-name-form-form > :nth-child(2) > .button").click();
    cy.get(' .button').click()
    cy.findByText("Testing's game");
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".room-item__buttons > .button--positive").click();
    cy.get(":nth-child(2) > [data-testid=player-card__card]").click();
    cy.get(".queue__endzone--left > .queue__arrow").click();
    cy.get("[data-testid=onYes-button] > .qc-buttons__button-icon").click();
    /* ==== End Cypress Studio ==== */
  });
	it('Creates a new Room, plays and discards Conspiracy', () => {
		/* ==== Generated with Cypress Studio ==== */
		cy.get('.splash__buttons > .button').click();
		cy.get('.rooms__buttons > .button').click();
		cy.get('#playerName').clear();
		cy.get('#playerName').type('Testing');
		cy.get('#player-name-form-form > :nth-child(2) > .button').click();
		cy.get('.button').click();
		cy.findByText("Testing's game");
		/* ==== End Cypress Studio ==== */
		/* ==== Generated with Cypress Studio ==== */
		cy.get('.room-item__buttons > .button--positive').click();
		cy.get(':nth-child(3) > [data-testid=player-card__card]').click();
		cy.get('.queue__endzone--left > .queue__arrow').click();
		cy.get('[data-testid=onYes-button] > .qc-buttons__button-icon').click();
		cy.get('.qc-buttons__button-icon').click();
		/* ==== End Cypress Studio ==== */
	});
	it('Creates a new Room, plays and discards every card, doesn\'t target Assassination with Spy', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.splash__buttons > .button').click();
        cy.get('.rooms__buttons > .button').click();
        cy.get('#playerName').clear();
        cy.get('#playerName').type('Testing');
        cy.get('#player-name-form-form > :nth-child(2) > .button').click();
        cy.get('.button').click();
        cy.findByText("Testing's game");
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.room-item__buttons > .button--positive').click();
        cy.get(':nth-child(3) > [data-testid=player-card__card]').click();
        cy.get('.queue__endzone--left > .queue__arrow').click();
        cy.get('[data-testid=onYes-button] > .qc-buttons__button-icon').click();
        cy.get('.qc-buttons__button-icon').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > [data-testid=player-card__card]').click();
        cy.get('.queue__endzone--left > .queue__arrow').click();
        cy.get('[data-testid=onYes-button] > .qc-buttons__button-icon').click();
        cy.get('.qc-buttons__button-icon').click();
        cy.get(':nth-child(3) > [data-testid=player-card__card]').click();
        cy.get('.queue__endzone--right > .queue__arrow').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.queue__endzone--right > .queue__arrow').click();
        cy.get('.qc-buttons__button-icon').click();
        cy.get('[data-testid=onYes-button] > .qc-buttons__button-icon').click();
        cy.get('.qc-buttons__button-icon').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > [data-testid=player-card__card]').click();
        cy.get('.queue__endzone--left > .queue__arrow').click();
        cy.get('[data-testid=onYes-button] > .qc-buttons__button-icon').click();
        cy.get('.qc-buttons__button-icon').click();
        cy.get('.qc-buttons__button-icon').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > [data-testid=player-card__card]').click();
        cy.get('.queue__endzone--right > .queue__arrow').click();
        cy.get('.qc-buttons__button-icon').click();
        cy.get('[data-testid=onYes-button] > .qc-buttons__button-icon').click();
        cy.get(':nth-child(1) > .qc-buttons__prompt > .qc-buttons__buttons > [data-testid=onYes-button] > .qc-buttons__button-icon').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > [data-testid=player-card__card]').click();
        cy.get('.queue__endzone--right > .queue__arrow').click();
        cy.get(':nth-child(2) > .qc-buttons__prompt > .qc-buttons__buttons > [data-testid=onYes-button] > .qc-buttons__button-icon').click();
        cy.get('[data-testid=player-card__card]').click();
        cy.get('.queue__endzone--right > .queue__arrow').click();
        cy.get(':nth-child(2) > .qc-buttons__prompt > .qc-buttons__buttons > [data-testid=onYes-button] > .qc-buttons__button-icon').click();
        /* ==== End Cypress Studio ==== */
    });

    it('Creates a new Room, plays and discards every card, doesn\'t target Assassination with Spy', () => {
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.splash__buttons > .button').click();
      cy.get('.rooms__buttons > .button').click();
      cy.get('#playerName').clear();
      cy.get('#playerName').type('Testing');
      cy.get('#player-name-form-form > :nth-child(2) > .button').click();
      cy.get('.button').click();
      cy.findByText("Testing's game");
      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.room-item__buttons > .button--positive').click();
      cy.get(':nth-child(3) > [data-testid=player-card__card]').click();
      cy.get('.queue__endzone--left > .queue__arrow').click();
      cy.get('[data-testid=onYes-button] > .qc-buttons__button-icon').click();
      cy.get('.qc-buttons__button-icon').click();
      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.get(':nth-child(3) > [data-testid=player-card__card]').click();
      cy.get('.queue__endzone--left > .queue__arrow').click();
      cy.get('[data-testid=onYes-button] > .qc-buttons__button-icon').click();
      cy.get('.qc-buttons__button-icon').click();
      cy.get(':nth-child(3) > [data-testid=player-card__card]').click();
      cy.get('.queue__endzone--right > .queue__arrow').click();
  });

});
