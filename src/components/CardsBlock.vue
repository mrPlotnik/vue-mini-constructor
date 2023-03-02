<template lang="pug">
#cards
  .container

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

        button.btn-reset.btn.block__delete-btn(
          @click="deleteBlock()"
          v-if="editMode"
        ) Delete block

      h2.block__top-header(v-if="!editMode" ) {{ block.header }}
      input.input.block__top-header-input(
        v-if="editMode"
        type="text"
        v-model="thisBlock.header"
      )

    .block__body

      .card(v-for="(card, cardIndex) in block.cards")

        .card__head

          .card__head-btns(v-if="editMode")
            .card__arrow-btns-wrap
              button.btn-reset.btn.card__left-btn(
                @click="moveCardLeft(cardIndex)"
              ) <
              button.btn-reset.btn.card__right-btn(
                @click="moveCardRight(cardIndex)"
              ) >
            button.btn-reset.btn.card__img-btn(
              @click="showInputModal(cardIndex)"
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

      .card.card-plus(v-if="editMode")

        .card-plus__body
          .card-plus__img(
            @click="addCard()"
            alt="Plus"
          )

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CardsBlock',
  props: ['block', 'blockIndex'],
  data() {
    return {
      thisBlock: [],

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
        this.saveCardHeader();
        this.saveCardText();

        this.updateBlock({ blockId: this.blockIndex, block: this.thisBlock });

        this.editModeBtnText = 'Edit';
        this.editMode = false;
      }
    },
    saveBlockHeader() {
      if (this.thisBlock.header === '') {
        this.thisBlock.header = this.currentBlockHeader;
      }
    },
    saveCardHeader() {
      this.thisBlock.cards
        .forEach((x, i) => {
          if (this.currentCardHeaders[i] !== '') {
            // eslint-disable-next-line no-return-assign, no-param-reassign
            x.cardHeader = this.currentCardHeaders[i];
          }
        });
    },
    saveCardText() {
      this.thisBlock.cards
        .forEach((x, i) => {
          if (this.currentCardTexts[i] !== '') {
            // eslint-disable-next-line no-return-assign, no-param-reassign
            x.cardText = this.currentCardTexts[i];
          }
        });
    },
    deleteBlock() {
      this.blocksState.splice(this.blockIndex, 1);
      this.updateBlocks(this.blocksState);
    },
    deleteCard(cardIndex) {
      this.thisBlock.cards.splice(cardIndex, 1);
      this.updateBlock({ blockId: this.blockIndex, block: this.thisBlock });
      this.updateData();
    },
    addCard() {
      this.thisBlock.cards.push(this.defaultCard);
      this.updateBlock({ blockId: this.blockIndex, block: this.thisBlock });
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

        this.thisBlock.cards[this.cardIdEdit].cardImg = this.cardImgUrlInput;

        this.updateBlock({ blockId: this.blockIndex, block: this.thisBlock });
        this.updateData();

        this.showModal = false;
      } else {
        alert('Invalid URL');
      }
    },
    moveCardLeft(i) {
      const bs = this.thisBlock;

      if (i !== 0) {
        [bs.cards[i], bs.cards[i - 1]] = [bs.cards[i - 1], bs.cards[i]];
        this.updateBlock({ blockId: this.blockIndex, block: this.thisBlock });
        this.updateData();
      }
    },
    moveCardRight(i) {
      const bs = this.thisBlock;
      const len = bs.cards.length;

      if (i !== len - 1) {
        [bs.cards[i], bs.cards[i + 1]] = [bs.cards[i + 1], bs.cards[i]];
        this.updateBlock({ blockId: this.blockIndex, block: this.thisBlock });
        this.updateData();
      }
    },
    updateData() {
      this.thisBlock = this.blocksState[this.blockIndex];
      this.currentBlockHeader = this.thisBlock.header;
      this.currentCardHeaders = this.thisBlock.cards.map((x) => x.cardHeader);
      this.currentCardTexts = this.thisBlock.cards.map((x) => x.cardText);
      this.currentCardImgs = this.thisBlock.cards.map((x) => x.cardImg);
    },
  },
  created() {
    this.updateData();
  },
};
</script>

<style scoped lang="sass">
  @import '../styles/base/mixins.sass'

  #card
    background-color: #444
    padding: 10px
    padding-bottom: 20px

  .container
    max-width: 1024px

  .card-plus
    height: 250px
  .card-plus__body
    height: 100%
  .card-plus__img
    height: 100%
    height: inherit
    cursor: pointer
    background-image: url("@/assets/plus.png")
    background-size: 50%
    background-position: center
    background-repeat: no-repeat
    background-color: #e1e1e1
    +transition(background-size)
    &:hover
      background-size: 55%

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
    h2
      color: #fff
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
    height: 150px

  .card__head-btns
    position: absolute
    display: flex
    justify-content: space-between
    align-items: center
    width: 100%
    padding: 5px
    background-color: #fff6
  .card__arrow-btns-wrap
    display: flex
    align-items: center
  .card__left-btn,
  .card__right-btn
    padding: 0 5px
    border: 1px solid #555
    border-radius: 5px
    // background-color: #e6da9a
    +transition(background-color)
    &:hover
      background-color: #00c3d9
  .card__img-btn
    padding: 0 5px
    border: 1px solid #555
    border-radius: 5px
    // background-color: #a9db73
    +transition(background-color)
    &:hover
      background-color: #00c3d9
  .card__delete-btn
    padding: 0 5px
    border: 1px solid #555
    border-radius: 5px
    background-color: #e37676
    +transition(background-color)
    &:hover
      background-color: #e63d3d

  .card__img
    height: inherit
    background-size: cover
    background-position: center
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
