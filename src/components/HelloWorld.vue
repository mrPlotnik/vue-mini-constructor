<template lang="pug">
div
  header.header
    .container
      h1 Mini-constructor
  main
    div
      section(
        v-for="(block, blockIndex) in blocksState"
      )

        div(v-if="block.id === 0")
          ContentBlock(
            :block="block"
            :blockIndex="blockIndex"
          )
            BlockMoveBtns(
              :blockIndex="blockIndex"
            )
        div(v-if="block.id === 1")
          CardsBlock(
            :block="block"
            :blockIndex="blockIndex"
          )
            BlockMoveBtns(
              :blockIndex="blockIndex"
            )
        div(v-if="block.id === 2")
          MovieBlock(
            :block="block"
            :blockIndex="blockIndex"
          )
            BlockMoveBtns(
              :blockIndex="blockIndex"
            )
  footer
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
import BlockMoveBtns from '@/components/btns/BlockMoveBtns.vue';
import ContentBlock from '@/components/ContentBlock.vue';
import CardsBlock from '@/components/CardsBlock.vue';
import MovieBlock from '@/components/MovieBlock.vue';

export default {
  name: 'HelloWorld',
  components: {
    BlockMoveBtns, ContentBlock, CardsBlock, MovieBlock,
  },
  data() {
    return {
      defaultBlocks: [
        {
          id: 0,
          header: 'Content',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad qui placeat laudantium quas molestiae autem eligendi minima eos, obcaecati deleniti nulla est dignissimos, aut voluptatibus nam dolorum soluta, animi architecto eum? Eligendi, expedita id eveniet vel incidunt quaerat nemo reprehenderit accusantium eius magnam, saepe aliquid tempora fuga, aspernatur placeat itaque.',
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
      blocksState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlocks']),
    // добавить новый блок
    addBlock(blockIndex) {
      this.blocksState.push(this.defaultBlocks[blockIndex]);
      this.updateBlocks(this.blocksState);
    },
    moveBlockUp(i) {
      const bs = this.blocksState;

      if (i !== 0) {
        const newArr = bs.slice(0);
        [newArr[i], newArr[i - 1]] = [newArr[i - 1], newArr[i]];
        this.updateBlocks(newArr);
      }
    },
    moveBlockDown(i) {
      const bs = this.blocksState;
      const len = bs.length;

      if (i !== len - 1) {
        const newArr = bs.slice(0);
        [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
        this.updateBlocks(newArr);
      }
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

.btn-wrap
  display: flex
  justify-content: flex-end
  button:not(:last-child)
    margin-right: 5px

</style>
