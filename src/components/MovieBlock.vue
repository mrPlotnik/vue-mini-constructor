<template lang="pug">
#movies
  .container
    .block__top

      .block__top-btns
        button.btn-reset.btn.block__edit-btn(
          :class="{isActive: editMode}"
          @click="editModeF()"
        ) {{ editModeBtnText }}

        button.btn-reset.btn.block__delete-btn(
          @click="deleteBlock()"
          v-if="editMode"
        ) Delete block

      h2.block__top-header(v-if="!editMode" ) {{ thisBlock.header }}
      input.input.block__top-header-input(
        v-if="editMode"
        type="text"
        v-model="thisBlock.header"
      )

    .block__body

      .loading(v-if="isLoading === true") Loading...

      .error(v-else-if="isError === true")
        h2 Use VPN
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
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'MovieBlock',
  props: ['block', 'blockIndex'],
  data() {
    return {
      thisBlock: [],
      isLoading: true,
      isError: false,

      editMode: false,
      editModeBtnText: 'Edit',

      currentBlockHeader: '',
    };
  },
  computed: {
    ...mapGetters({
      blocksState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlocks', 'updateBlock']),
    editModeF() {
      if (!this.editMode) {
        this.editModeBtnText = 'Apply';
        this.editMode = true;
      } else {
        this.saveBlockHeader();

        this.updateBlock({ blockId: this.blockIndex, block: this.thisBlock });

        this.editModeBtnText = 'Edit';
        this.editMode = false;
      }
    },
    deleteBlock() {
      this.blocksState.splice(this.blockIndex, 1);
      this.updateBlocks(this.blocksState);
    },
    saveBlockHeader() {
      if (this.thisBlock.header === '') {
        this.thisBlock.header = this.currentBlockHeader;
      }
    },
    updateData() {
      this.thisBlock = this.blocksState[this.blockIndex];
      this.currentBlockHeader = this.thisBlock.header;
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
    this.updateData();
  },
};
</script>

<style scoped lang="sass">
@import '../styles/base/mixins.sass'

#movies
  padding: 10px
  padding-bottom: 20px
  background-color: #eee

.container
  max-width: 1024px

.block__top
  display: flex
  flex-direction: column
.block__top-btns
  display: flex
  justify-content: flex-end
  margin-bottom: 10px
.block__top-header,
.block__top-header-input
  margin-bottom: 10px
  font-weight: 600
  font-size: 20px

.block__body
  display: flex
  flex-wrap: wrap
  justify-content: center

.block__edit-btn
  padding: 3px 5px
  border: 1px solid #000
  border-radius: 5px
  background-color: #fef257
  +transition(background-color)
  &:hover
    background-color: #00c3d9
.block__delete-btn
  padding: 2px 5px
  border: 1px solid #555
  border-radius: 5px
  background-color: #e37676
  +transition(background-color)
  &:hover
    background-color: #e63d3d

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
