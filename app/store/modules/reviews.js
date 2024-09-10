import { GET_REVIEWS } from '../utils/action-types';

const actions = {
  [GET_REVIEWS](context) {
    console.log('GET_REVIEWS action called', context);
  },
};

const mutations = {};

const getters = {};

const state = () => ({
  reviewsData: {},
});

export const reviews = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
