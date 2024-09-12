import { GET_REVIEWS } from '../utils/action-types';
import { v4 as uuidv4 } from 'uuid';
const actions = {
  [GET_REVIEWS]({ commit, state }) {
    commit('set_loading', true);
    fetch(`https://frontend-task.instabug-dev.com/api/web/reviews?page=${state.currentPage}`)
      .then(res => res.json().then(reviewsData => {
        commit('set_loading', false);
        commit('set_reviews', reviewsData.reviews);
        commit('set_has_next', reviewsData.has_next);
        commit('set_current_page', reviewsData.current_page + 1);
      })).catch((e) => commit('set_error', e));
  },
};

const mutations = {
  set_loading(state, loadingStatus) {
    state.isLoading = loadingStatus;
  },
  set_error(state, error) {
    state.isError = error;
  },
  set_reviews(state, reviews) {
    // unique id for each review
    const recentReviews = reviews.map((review) => Object.assign(review, { id: uuidv4() }));
    state.reviews = [...state.reviews, ...recentReviews];
    state.recentReviews = recentReviews;
  },
  set_has_next(state, hasNext) {
    state.hasNext = hasNext;
  },
  set_current_page(state, currentPage) {
    state.currentPage = currentPage;
  },
};

const getters = {};

const state = () => ({
  reviews: [], // all reviews for searching
  recentReviews: [],
  isLoading: true,
  currentPage: 1,
  hasNext: false,
  isError: false,
});

export const reviews = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
