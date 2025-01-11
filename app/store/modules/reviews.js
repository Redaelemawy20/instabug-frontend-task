import { FILTER_RATE, SEARCH_TEXT, GET_REVIEWS } from '../utils/action-types';
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
  [FILTER_RATE]({ commit, state }, rate) {
    if (rate === -1 && state.filters.searchKey === '') {
      commit('reset_filters');
    } else if (state.filters.searchKey !== '') {
      if (state.filters.rate === -1) {
        commit('filter_rate', [state.filteredReviews, rate]);
      } else {
        commit('filter_search', [state.reviews, state.filters.searchKey]);
        commit('filter_rate', [state.filteredReviews, rate]);
      }
    } else {
      commit('filter_rate', [state.reviews, rate]);
    }
  },
  [SEARCH_TEXT]({ commit, state }, searchKey) {
    if (searchKey === '' && state.filters.rate === -1) {
      commit('reset_filters');
    } else if (state.filters.rate !== -1) {
      if (state.filters.searchKey === '') {
        commit('filter_search', [state.filteredReviews, searchKey]);
      } else {
        commit('filter_search', [state.reviews, searchKey]);
        commit('filter_rate', [state.filteredReviews, state.filters.rate]);
      }
    } else {
      commit('filter_search', [state.reviews, searchKey]);
    }
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
  filter_rate(state, update) {
    const [whereToFilter, rate] = update;
    const filteredReviews = rate === -1 ? whereToFilter :
      whereToFilter.filter(r => r.rating === rate);
    state.filteredReviews = filteredReviews;
    state.isSearching = 'searching';
    state.filters.rate = rate;
  },
  filter_search(state, update) {
    const [whereToFilter, searchKey] = update;
    const searchTerm = searchKey.toLowerCase();
    state.filteredReviews = searchKey === '' ? whereToFilter : whereToFilter.filter((review) => {
      const name = review.user_id.toLowerCase();
      const content = review.content.toLowerCase();
      return name.includes(searchTerm) || content.includes(searchTerm);
    });
    state.isSearching = 'searching';
    state.filters.searchKey = searchKey;
  },
  reset_filters(state) {
    state.isSearching = 'reset';
  },
};

const getters = {};

const state = () => ({
  reviews: [], // all reviews for searching
  recentReviews: [],
  filteredReviews: [],
  isLoading: true,
  currentPage: 1,
  hasNext: false,
  isError: false,
  filters: {
    searchKey: '',
    rate: -1,
  },
  isSearching: null,
});

export const reviews = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
