angular.module('appModule').service('ReviewsList', ReviewsListService);

function ReviewsListService($http) {
  const getReviews = () => {
    /**
     * NOTE: Feel free to delete this code/file and move the fetching logic to the Vue component.
     *
     * This is just an example of how you can fetch data
     * in the controller and pass it to the component.
     */
    const reviewsListEndpoint = 'dummy_url';
    return $http.get(reviewsListEndpoint);
  };

  return {
    getReviews,
  };
}
