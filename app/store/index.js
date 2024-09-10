import Vue from 'vue';
import Vuex from 'vuex';
import { reviews } from './modules/reviews';

Vue.use(Vuex);

// * NOTE: Feel free to not use this store and use the Vue component's local state + fetch logic.
export default new Vuex.Store({
  modules: {
    reviews,
  },
});
