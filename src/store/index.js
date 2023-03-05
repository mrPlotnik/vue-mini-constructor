import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blocks: [],
    editMode: false,
  },

  getters: {
    // Получаем информацию о блоках
    blockInfo(state) {
      return state.blocks;
    },
    editMode(state) {
      return state.editMode;
    },
  },

  mutations: {
    updateBlocks(state, blocks) {
      state.blocks = blocks;
      // state.blocks.splice(0, 1, blocks);
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
    updateBlockHeader(state, { blockId, header }) {
      state.blocks[blockId].header = header;
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
    updateBlockText(state, { blockId, text }) {
      state.blocks[blockId].text = text;
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },

    loadMovies(state, { blockId, movies }) {
      // Записываем в state
      state.blocks[blockId].movies = movies;
      // Записываем в localStorage
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },

    editModeStart(state) {
      if (state.editMode === false) {
        state.editMode = true;
      }
    },
    editModeFinish(state) {
      if (state.editMode === true) {
        state.editMode = false;
      }
    },
    deleteBlock(state, blockIndex) {
      state.currentBlocks.splice(blockIndex, 1);
    },
  },

  actions: {
    updateBlocks(context, blocks) {
      context.commit('updateBlocks', blocks);
    },
    updateBlock(context, { blockId, block }) {
      context.commit('updateBlock', { blockId, block });
    },
    updateBlockHeader(context, { blockId, header }) {
      context.commit('updateBlockHeader', { blockId, header });
    },
    updateBlockText(context, { blockId, text }) {
      context.commit('updateBlockText', { blockId, text });
    },

    loadMovies(context, { blockId, block }) {
      context.commit('loadMovies', { blockId, movies: block });
    },

    editModeStart(context) {
      context.commit('editModeStart');
    },
    editModeFinish(context) {
      context.commit('editModeFinish');
    },
    deleteBlock(context, blockIndex) {
      context.commit('deleteBlock', blockIndex);
    },
  },

  modules: {},
});
