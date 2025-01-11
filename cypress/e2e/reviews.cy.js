/* eslint-disable no-undef */
import { stubReviews } from '../utils/stubs';

describe('Home Page', () => {
  beforeEach(() => {
    // Apply the stub
    stubReviews();

    // Visit the home page

    cy.visit('/');
  });

  it('should display the correct data for the first review', () => {
    // Wait for the stubbed request to complete
    cy.wait('@getReviews');

    // Assert on the first review
    cy.get('.name:first')
      .should('contain', 'lancaster');
  });

  it('should display correct aggregations based on the mocked reviews', () => {
    // Wait for the stubbed request to complete
    // cy.wait('@getReviews');

    // Assert on the average rating (assuming you have an element with class `.average-rating`)
    cy.get('.rate_count')
      .should('contain', '4.2'); // Average of [5, 4] is 4.0

    // Assert on the number of reviews (assuming you have an element with class `.review-count`)
    cy.get('.percentage:first')
      .should('contain', '40%'); // Total reviews count
  });
});
describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('/');

    cy.intercept('GET', '/reviews', { fixture: 'reviews' }).as('getReviews');
  });

  it('should show skeleton while loading reviews', () => {
    // Scroll down to the reviews list
    cy.get('.clients_reviews').scrollTo('bottom');
    // cy.scrollTo('bottom', { duration: 500 });

    // Validate that the skeleton is shown (adjust the selector based on your skeleton element)
    cy.get('.review.skeleton').should('be.visible');
  });
});
