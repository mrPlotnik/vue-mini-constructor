<template lang="pug">
#movies
  .container.container-style
    .block__top

      .block__header
        h2.block__top-header(v-if="!editMode" ) {{ thisBlock.header }}
        input.input.block__top-header-input(
          v-if="editMode"
          type="text"
          v-model="thisBlock.header"
        )

      .block__top-btns
        slot(v-if="!editMode")
        BlockTopBtns(@editMode="editModeF()")

    .block__body

      .loading(v-if="isLoading === true") Loading...

      .error(v-else-if="isError === true")
        span Use VPN
        button(@click="loadMovies(blockIndex)") Try again

      .card(
        v-else
        v-for="(movie, movieIndex) in thisBlock.movies"
      )
        .card__head
          .card__img(
            :style="{'background-image': `url(${movie.poster_path})`}"
            alt="Poster"
          )
          .card__average
            span {{ movie.average }}%
</template>

<script>
import axios from 'axios';
import saveBlockHeader from '@/mixins/saveBlockHeader';
import BlockTopBtns from '@/components/btns/BlockTopBtns.vue';

export default {
  name: 'MovieBlock',
  props: ['block', 'blockIndex'],
  components: { BlockTopBtns },
  mixins: [saveBlockHeader],
  data() {
    return {
      isLoading: true,
      isError: false,
    };
  },
  methods: {
    editModeF() {
      if (!this.editMode) {
        this.editMode = true;
      } else {
        this.saveBlockHeader();
        this.updateBlock({ blockId: this.blockIndex, block: this.thisBlock });
        this.editMode = false;
      }
    },
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
    this.updateMainData();
  },
};
</script>

<style scoped lang="sass">
@import '../styles/base/mixins.sass'

#movies
  padding: 10px 0

.block__body
  display: flex
  flex-wrap: wrap
  justify-content: center

.error
  display: flex
  flex-direction: row
  span
    margin-right: 10px

.card
  display: flex
  flex-direction: column
  // flex-basis: calc(20% - 10px)
  margin-right: 10px
  margin-bottom: 20px
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6)
.card__head
  position: relative
  display: flex
  flex-direction: column
  width: 110px
  height: 165px

.card__head-btns
  position: absolute
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  padding: 5px
  background-color: #fff6

.card__img
  height: inherit
  background-size: cover
  background-position: center
.card__average
  position: absolute
  display: flex
  justify-content: center
  align-items: center
  height: 40px
  width: 40px
  bottom: -15px
  left: 10px
  color: #fff
  // border: 3px solid #00c3d9
  border-radius: 50%
  font-size: 0.7em
  font-weight: 600
  background-color: #262626
  span
    display: flex
    justify-content: center
    align-items: center
    height: 32px
    width: 32px
    border-radius: 50%
    border: 2px solid #00c3d9
    background-color: #262626

</style>
