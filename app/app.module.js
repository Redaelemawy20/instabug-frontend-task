import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import store from './store';

import ReviewsComponent from './vue-components/reviews.vue';

import NotFoundPage from './pages/not-found/not-found.vue';

const app = angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
]);

app.config(($ngVueProvider) => {
  $ngVueProvider.setRootVueInstanceProps({ store });
});

angular.module('appModule').directive('vReviewsComponent', (createVueComponent) => {
  return createVueComponent(Vue.component('ReviewsComponent', ReviewsComponent));
});
angular.module('appModule').directive('vNotFoundPage', (createVueComponent) => {
  return createVueComponent(Vue.component('NotFoundPage', NotFoundPage));
});
