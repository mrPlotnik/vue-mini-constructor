<template lang="pug">
div

  .modal(v-if="showModal")
    .modal__content
      p Enter URL image for {{ cardIdEdit + 1 }} cards
      input(
        type="text"
        @input="cardImgUrlInput = $event.target.value"
      )
      div
        button(
          @click="saveCardImgUrl()"
        ) Save

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
        @click="deleteBlock()"
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
          button.btn-reset.btn.card__img-btn(
            @click="showInputModal(cardIndex)"
            v-if="editMode"
          ) Img
          button.btn-reset.btn.card__delete-btn(
            @click="deleteCard(cardIndex)"
            v-if="editMode"
          ) X

        .card__img(
          :style="{'background-image': `url(${currentCardImgs[cardIndex]})`}"
          alt=""
        )

      .card__body

        .card__descr

          h3(v-if="!editMode" ) {{ card.cardHeader }}
          input.input.block__header-input(
            v-if="editMode"
            type="text"
            v-model="currentCardHeaders[cardIndex]"
          )

          p.card__text(v-if="!editMode") {{ card.cardText }}
          textarea.textarea.block__text-input(
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
      currentCardImgs: [],

      defaultCard: {
        cardHeader: 'Card header',
        cardText: 'Card text',
        cardImg: 'img/01.jpg',
      },

      showModal: false,
      cardIdEdit: '',
      cardImgUrl: '',
      cardImgUrlInput: '',
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
    deleteBlock() {
      const blocksArr = this.blockState;
      blocksArr.splice(this.blockIndex, 1);
      this.updateBlocks(blocksArr);
    },
    deleteCard(cardIndex) {
      const blocksArr = this.blockState;
      blocksArr[this.blockIndex].cards.splice(cardIndex, 1);
      this.updateBlocks(blocksArr);
      this.updateData();
    },
    addCard() {
      const blocksArr = this.blockState;
      blocksArr[this.blockIndex].cards.push(this.defaultCard);
      this.updateBlocks(blocksArr);
      this.updateData();
    },
    showInputModal(cardIndex) {
      this.showModal = true;
      this.cardIdEdit = cardIndex;
    },
    saveCardImgUrl() {
      const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

      if (regex.test(this.cardImgUrlInput)) {
        this.cardImgUrl = this.cardImgUrlInput;

        this.blockState[this.blockIndex].cards[this.cardIdEdit].cardImg = this.cardImgUrlInput;

        this.updateBlocks(this.blockState);
        this.updateData();

        this.showModal = false;
      } else {
        alert('Invalid URL');
      }
    },
    updateData() {
      this.currentBlockHeader = this.blockState[this.blockIndex].header;
      this.currentCardHeaders = this.blockState[this.blockIndex].cards.map((x) => x.cardHeader);
      this.currentCardTexts = this.blockState[this.blockIndex].cards.map((x) => x.cardText);
      this.currentCardImgs = this.blockState[this.blockIndex].cards.map((x) => x.cardImg);
    },
  },
  created() {
    this.updateData();
  },

};
</script>

<style scoped lang="sass">

  .input,
  .textarea
    width: 100%
    border: none
    resize: none
    background-color: #aeaeae

  .textarea
    flex-basis: 100%

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
    padding: 10px
    background-color: #e1e1e1
  .card__head
    position: relative
    display: flex
    flex-direction: column
    height: 100px
  .card__head-btns
    display: flex
    justify-content: flex-end
    background-color: #e1e1e1
  .card__img-btn
    margin: 5px
    padding: 0 5px
    border: 1px solid #555
    border-radius: 5px
    background-color: #a9db73
  .card__delete-btn
    margin: 5px
    padding: 0 5px
    border: 1px solid #555
    border-radius: 5px
    background-color: #e37676
  .card__img
    height: inherit
    background-size: cover
  .card__descr
    display: flex
    flex-direction: column
    height: 100%
    margin-bottom: 10px
    font-size: 0.85em
    overflow-x: hidden
  .card__descr > *:not(:last-child)
    margin-bottom: 5px
  .card__descr ul
    padding-left: 15px
  .descr__title
    font-size: 0.9em
    line-height: 1.5em

  .qwe
    position: absolute
    width: 100%
    top: 0
    left: 0
    right: 0
    bottom: 0

  .modal
    position: absolute
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    top: 0
    left: 0
    // background-color: #000
    // opacity: 0.5
    z-index: 1
  .modal__content
    width: 300px
    padding: 10px
    border-radius: 5px
    background-color: #fff
    p
      margin-bottom: 5px
    input
      width: 100%
      height: fit-content
      margin-bottom: 5px
      font-size: 10px
      z-index: 2
    div
      display: flex
      justify-content: flex-end

</style>
