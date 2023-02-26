import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blocks: [],
  },

  getters: {
    // Получаем информацию о блоках
    blockInfo(state) {
      return state.blocks;
    },
  },

  mutations: {
    updateBlocks(state, blocks) {
      // Записываем в localStorage
      localStorage.setItem('blocks', JSON.stringify(blocks));
      // Записываем в state
      state.blocks = blocks;
    },
  },

  actions: {
    updateBlocks(context, blocks) {
      context.commit('updateBlocks', blocks);
    },
  },

  modules: {},
});
