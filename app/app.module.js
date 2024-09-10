import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import store from './store';

import HelloWorldComponent from './vue-components/hello-world.vue';
import NotFoundPage from './pages/not-found/not-found.vue';

const app = angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
]);

app.config(($ngVueProvider) => {
  $ngVueProvider.setRootVueInstanceProps({ store });
});

angular.module('appModule').directive('vHelloWorldComponent', (createVueComponent) => {
  return createVueComponent(Vue.component('HelloWorldComponent', HelloWorldComponent));
});

angular.module('appModule').directive('vNotFoundPage', (createVueComponent) => {
  return createVueComponent(Vue.component('NotFoundPage', NotFoundPage));
});
