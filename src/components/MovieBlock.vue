<template lang="pug">
#movies.block
  .container.container-style
    BlockTop(
      :header="block.header"
      :blockIndex="blockIndex"
    )

    .block__body

      .loading(v-if="isLoading === true") Loading...

      .error(v-else-if="isError === true")
        span Use VPN
        button(@click="loadMovies(blockIndex)") Try again

      .mcard(
        v-else
        v-for="(movie, movieIndex) in block.movies"
      )
        .mcard__img(
          :style="{'background-image': `url(${movie.poster_path})`}"
          alt="Poster"
        )
        .mcard__average
          span {{ movie.average }}%
</template>

<script>
import axios from 'axios';
import BlockTop from '@/components/BlockTop.vue';

export default {
  name: 'MovieBlock',
  props: ['block', 'blockIndex'],
  components: { BlockTop },
  data() {
    return {
      isLoading: true,
      isError: false,
    };
  },
  methods: {
    loadMovies(blockIndex) {
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
          this.$store.dispatch('loadMovies', { blockId: blockIndex, block: arr });
          this.isLoading = false;
          this.isError = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
        });
    },
  },
  created() {
    this.loadMovies(this.blockIndex);
  },
};
</script>

<style scoped lang="sass">
@import '../styles/base/mixins.sass'

.block__body
  display: flex
  flex-wrap: wrap
  justify-content: center

.loading
  color: #fff
.error
  display: flex
  flex-direction: row
  span
    margin-right: 10px
    color: #fff

</style>
