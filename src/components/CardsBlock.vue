<template lang="pug">
div
  .block__top

    .block__top-btns
      button.btn-reset.btn.block__edit-btn(
        :class="{isActive: editMode}"
        @click="editModeF()"
      ) {{ editModeBtnText }}

      button.btn-reset.btn.block__add-btn(
        v-if="editMode"
        @click="addCard()"
      ) Add card

      button.btn-reset.btn.block__delete-btn(
        @click="deleteBlock(blockIndex)"
        v-if="editMode"
      ) Delete block

    h2.block__top-header(v-if="!editMode" ) {{ block.header }}
    input.input.block__top-header-input(
      v-if="editMode"
      type="text"
      v-model="currentBlockHeader"
    )

  .block__body

    .card(v-for="(card, cardIndex) in block.cards")

      .card__head

        .card__head-btns
          button.btn-reset.btn.card__delete-btn(
            @click="deleteCard(blockIndex, cardIndex)"
            v-if="editMode"
          ) X

        img.card__img(src="img/01.jpg" alt="Aventador")

      .card__body

        .card__descr

          h3(v-if="!editMode" ) {{ card.cardHeader }}
          input.input.block__header-input(
            v-if="editMode"
            type="text"
            v-model="currentCardHeaders[cardIndex]"
          )

          p.card__text(v-if="!editMode") {{ card.cardText }}
          textarea.input.block__text-input(
            v-if="editMode"
            v-model="currentCardTexts[cardIndex]"
          )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CardsBlock',
  props: ['block', 'blockIndex'],
  data() {
    return {
      editMode: false,
      editModeBtnText: 'Edit',
      currentBlockHeader: '',
      currentCardHeaders: [],
      currentCardTexts: [],
      defaultCard: {
        cardHeader: 'Card header',
        cardText: 'Card text',
      },
    };
  },
  computed: {
    ...mapGetters({
      blockState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlocks']),
    editModeF() {
      if (!this.editMode) {
        this.editModeBtnText = 'Apply';
        this.editMode = true;
      } else {
        this.saveBlockHeader();
        this.saveCardHeader();
        this.saveCardText();
        this.editModeBtnText = 'Edit';
        this.editMode = false;
      }
    },
    saveBlockHeader() {
      this.blockState[this.blockIndex].header = this.currentBlockHeader;
      this.updateBlocks(this.blockState);
    },
    saveCardHeader() {
      this.blockState[this.blockIndex].cards
        // eslint-disable-next-line no-return-assign, no-param-reassign
        .forEach((x, i) => x.cardHeader = this.currentCardHeaders[i]);
      this.updateBlocks(this.blockState);
    },
    saveCardText() {
      this.blockState[this.blockIndex].cards
        // eslint-disable-next-line no-return-assign, no-param-reassign
        .forEach((x, i) => x.cardText = this.currentCardTexts[i]);
      this.updateBlocks(this.blockState);
    },
    deleteBlock(blockIndex) {
      const blocksArr = this.blockState;
      blocksArr.splice(blockIndex, 1);
      this.updateBlocks(blocksArr);
    },
    deleteCard(blockIndex, cardIndex) {
      const blocksArr = this.blockState;
      blocksArr[blockIndex].cards.splice(cardIndex, 1);
      this.updateBlocks(blocksArr);
      this.updateData();
    },
    addCard() {
      const blocksArr = this.blockState;
      blocksArr[this.blockIndex].cards.push(this.defaultCard);
      this.updateBlocks(blocksArr);
      this.updateData();
    },
    updateData() {
      this.currentBlockHeader = this.blockState[this.blockIndex].header;
      this.currentCardHeaders = this.blockState[this.blockIndex].cards.map((x) => x.cardHeader);
      this.currentCardTexts = this.blockState[this.blockIndex].cards.map((x) => x.cardText);
    },
  },
  created() {
    this.updateData();
  },

};
</script>

<style scoped lang="sass">

  .input
    display: flex
    width: 100%
    border: none
    // outline: 1px solid #2f4ab5
    background-color: #a3dfdf

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
    justify-content: flex-start

  .block__edit-btn
    padding: 3px 5px
    border: 1px solid #000
    border-radius: 5px
    background-color: #e6da9a
  .block__delete-btn
    padding: 2px 5px
    border: 1px solid #555
    border-radius: 5px
    background-color: #e37676
  .block__add-btn
    padding: 2px 5px
    border: 1px solid #555
    border-radius: 5px
    background-color: #a9db73

  .card
    display: flex
    flex-direction: column
    flex-basis: calc(25% - 8px)
    margin-bottom: 10px
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.6)
  .card:not(:nth-child(4n))
    margin-right: 10px
  .card__body
    display: flex
    flex-direction: column
    flex-grow: 1
    justify-content: space-between
    height: 150px
    padding: 20px
    background-color: #e1e1e1
  .card__head
    display: flex
    flex-direction: column
  .card__head-btns
    display: flex
    justify-content: flex-end
    background-color: #e1e1e1
  .card__delete-btn
    margin: 5px
    padding: 0 5px
    border: 1px solid #555
    border-radius: 5px
    background-color: #e37676
  .card__img
  .card__descr
    max-height: 200px
    margin-bottom: 10px
    font-size: 0.85em
    overflow: auto
  .card__descr > *:not(:last-child)
    margin-bottom: 5px
  .card__descr ul
    padding-left: 15px
  .descr__title
    font-size: 0.9em
    line-height: 1.5em
</style>
