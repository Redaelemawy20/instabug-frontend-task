// * TODO: Add stubs here (if needed)
export function stubReviews() {
  // eslint-disable-next-line no-undef
  cy.intercept('GET', 'https://frontend-task.instabug-dev.com/api/web/reviews?page=1', { fixture: 'reviews.json' }).as('getReviews');
}
