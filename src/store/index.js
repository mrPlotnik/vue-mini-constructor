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
      // Записываем в state
      state.blocks = blocks;
      // Записываем в localStorage
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
    updateBlock(state, { blockId, block }) {
      // Записываем в state
      state.blocks[blockId] = block;
      // Записываем в localStorage
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
  },

  actions: {
    updateBlocks(context, blocks) {
      context.commit('updateBlocks', blocks);
      console.log('Update all bloks');
    },
    updateBlock(context, { blockId, block }) {
      context.commit('updateBlock', { blockId, block });
      console.log('Update block');
    },
  },

  modules: {},
});
