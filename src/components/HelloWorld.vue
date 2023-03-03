<template lang="pug">

main
  .blocks
    header.header
      .container
        h1 Mini-constructor
    main
      section(
        v-for="(block, blockIndex) in blockState"
      )
        BlocksWrap(
          :block="block"
          :blockIndex="blockIndex"
        )

  .container
    .btn-wrap
      button.btn-reset.btn.btn--edit(
        @click="addBlock(0)"
      ) Add Content Block
      button.btn-reset.btn.btn--edit(
        @click="addBlock(1)"
      ) Add Cards Block
      button.btn-reset.btn.btn--edit(
        @click="addBlock(2)"
      ) Add Films Block

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BlocksWrap from './BlocksWrap.vue';

export default {
  name: 'HelloWorld',
  components: { BlocksWrap },
  data() {
    return {
      defaultBlocks: [
        {
          id: 0,
          header: 'Content',
          text: 'Some text.',
        },
        {
          id: 1,
          header: 'Cards',
          cards: [
            {
              cardHeader: '1 card header',
              cardText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officiis fuga ut, tempore et quae autem molestiae porro excepturi asperiores amet consectetur adipisicing elit. Ipsum dolor sit amet consectetur adipisicing',
              cardImg: 'img/01.jpg',
            },
            {
              cardHeader: '2 card header ',
              cardText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officiis fuga ut, tempore et quae.',
              cardImg: 'img/01.jpg',
            },
            {
              cardHeader: '3 card header',
              cardText: 'Card text',
              cardImg: 'img/01.jpg',
            },
            {
              cardHeader: '4 card header',
              cardText: 'Card text',
              cardImg: 'img/01.jpg',
            },
          ],
        },
        {
          id: 2,
          header: 'Popular movies',
          movies: [],
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      blockState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlocks']),
    // добавить новый блок
    addBlock(blockIndex) {
      this.blockState.push(this.defaultBlocks[blockIndex]);
      this.updateBlocks(this.blockState);
    },
  },
};
</script>

<style scoped lang="sass">
@import '../styles/base/mixins.sass'

.header
  padding: 15px 0
h1
  font-size: 2.5em

.blocks
  margin-bottom: 10px

</style>
