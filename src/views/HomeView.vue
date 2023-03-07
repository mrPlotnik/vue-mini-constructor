<template lang="pug">
div
  header.header
    .container.container-style
      h1 Mini-constructor

      button.btn-reset.btn.btn--edit.block__edit-btn(
        @click="editModeBtn()"
      ) {{ btnText }}

  main
    div
      section(
        v-for="(block, blockIndex) in state"
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
  footer
    .container
      .btn-wrap
        button.btn-reset.btn.btn--edit(
          @click="add(0)"
        ) Add Content Block
        button.btn-reset.btn.btn--edit(
          @click="add(1)"
        ) Add Cards Block
        button.btn-reset.btn.btn--edit(
          @click="add(2)"
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
      btnText: 'Edit',
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
              header: '1 card header',
              text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officiis fuga ut, tempore et quae autem molestiae porro excepturi asperiores amet consectetur adipisicing elit. Ipsum dolor sit amet consectetur adipisicing',
              img: 'img/01.jpg',
            },
            {
              header: '2 card header ',
              text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officiis fuga ut, tempore et quae.',
              img: 'img/01.jpg',
            },
            {
              header: '3 card header',
              text: 'Card text',
              img: 'img/01.jpg',
            },
            {
              header: '4 card header',
              text: 'Card text',
              img: 'img/01.jpg',
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
      state: 'allBlocks',
      editMode: 'editMode',
    }),
  },
  methods: {
    ...mapActions(['addBlock', 'editModeToggle']),
    add(index) {
      const newArr = this.defaultBlocks[index];
      this.addBlock(newArr);
    },
    editModeBtn() {
      this.editModeToggle();
      if (this.editMode) {
        this.btnText = 'Apply';
      } else {
        this.btnText = 'Edit';
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
.block__edit-btn
  width: fit-content

.btn-wrap
  display: flex
  justify-content: flex-end
  button:not(:last-child)
    margin-right: 5px

</style>
