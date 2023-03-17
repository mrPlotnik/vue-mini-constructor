import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blocks: [],
    editMode: false,
  },

  getters: {
    allBlocks(state) {
      return state.blocks;
    },
    editMode(state) {
      return state.editMode;
    },
  },

  mutations: {
    loadBlocks(state, blocks) {
      state.blocks = blocks;
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
    addBlock(state, block) {
      state.blocks.push(block);
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
    deleteBlock(state, blockIndex) {
      state.blocks.splice(blockIndex, 1);
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
    updateMoveBlocks(state, blocks) {
      state.blocks = blocks;
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
    updateCards(state, { blockId, cards }) {
      state.blocks[blockId].cards = cards;
      localStorage.setItem('blocks', JSON.stringify(state.blocks));
    },
    editModeToggle(state) {
      state.editMode = !state.editMode;
    },
  },

  actions: {
    loadBlocks(context, blocks) {
      context.commit('loadBlocks', blocks);
    },
    addBlock(context, block) {
      context.commit('addBlock', block);
    },
    deleteBlock(context, blockIndex) {
      context.commit('deleteBlock', blockIndex);
    },
    updateMoveBlocks(context, blocks) {
      context.commit('updateMoveBlocks', blocks);
    },
    updateBlockHeader(context, { blockId, header }) {
      context.commit('updateBlockHeader', { blockId, header });
    },
    updateBlockText(context, { blockId, text }) {
      context.commit('updateBlockText', { blockId, text });
    },
    updateCards(context, { blockId, cards }) {
      context.commit('updateCards', { blockId, cards });
    },
    editModeToggle(context) {
      context.commit('editModeToggle');
    },
  },
});
