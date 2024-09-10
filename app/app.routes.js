angular.module('appModule')
  .config(($locationProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
    });
  })
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state({
        name: 'reviews',
        url: '/',
        templateUrl: './pages/reviews/reviews.html',
        controller: 'reviewsController',
        controllerAs: 'reviewsPageVm',
      })
      .state({
        name: 'not-found',
        url: '/not-found',
        template: '<v-not-found-page></v-not-found-page>',
      });

    $urlRouterProvider.otherwise('/not-found');
  });
