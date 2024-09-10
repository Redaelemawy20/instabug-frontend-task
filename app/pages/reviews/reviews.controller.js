angular
  .module('appModule')
  .controller('reviewsController', homePageController);

// eslint-disable-next-line
function homePageController(ReviewsList) {
  const reviewsPageVm = this;
  reviewsPageVm.reviews = [];

  activate();

  function activate() {
    /**
     * NOTE: Feel free to delete this code and move the fetching logic to the Vue component.
     *
     *
     * This is just an example of how you can fetch data
     * in the controller and pass it to the component.
     */
    // ReviewsList.getReviews()
    //   .then(({ data }) => {
    //     // eslint-disable-next-line no-console
    //     console.log(data);
    //   });
  }
}
