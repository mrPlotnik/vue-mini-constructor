import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

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
    loadMovie(state, { blockId, movies }) {
      // Записываем в state
      state.blocks[blockId].movies = movies;
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
    loadMovie(context, blockId) {
      return axios
        .get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: 'c645acdf2e5fdf61fd0544322ae288ed',
          },
        })
        .then((response) => {
          const resp = response.data.results;
          const arr = [];
          resp.forEach((x) => {
            const obj = {};
            obj.id = x.id;
            obj.title = x.title;
            obj.poster_path = `https://www.themoviedb.org/t/p/w220_and_h330_face/${x.poster_path}`;
            obj.average = x.vote_average * 10;
            arr.push(obj);
          });
          context.commit('loadMovie', { blockId, movies: arr });
        })
        .catch(() => {
          // Если будет ошибка
        });
    },
  },

  modules: {},
});
