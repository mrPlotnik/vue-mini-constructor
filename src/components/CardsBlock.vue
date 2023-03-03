<template lang="pug">
#cards

  .modal(v-if="showModal")
    .modal-wrap
    .modal__content
      p Enter URL image for {{ cardIdEdit + 1 }} cards
      input(
        type="text"
        @input="cardImgUrlInput = $event.target.value"
      )
      div
        button.btn-reset.btn.btn--edit(
          @click="saveCardImgUrl()"
        ) Save

  .container

    .block__top

      .block__header
        h2.block__top-header(v-if="!editMode" ) {{ block.header }}
        input.input.block__top-header-input(
          v-if="editMode"
          type="text"
          v-model="thisBlock.header"
        )

      .block__top-btns
        div(v-if="editMode")
          button.btn-reset.btn.btn--edit(
            :class="{isActive: editMode}"
            @click="moveBlockUp(blockIndex)"
          ) Up
          button.btn-reset.btn.btn--edit(
            :class="{isActive: editMode}"
            @click="moveBlockDown(blockIndex)"
          ) Down

        button.btn-reset.btn.btn--edit(
          :class="{isActive: editMode}"
          @click="editModeF()"
        ) {{ editModeBtnText }}

        div
          button.btn-reset.btn.btn--delete(
            @click="deleteBlock()"
            v-if="editMode"
          ) Delete block

    .block__body

      .card(v-for="(card, cardIndex) in block.cards")

        .card__head

          .card__head-btns(v-if="editMode")
            .card__arrow-btns-wrap
              button.btn-reset.btn.btn--edit(
                @click="moveCardLeft(cardIndex)"
              ) <
              button.btn-reset.btn.btn--edit(
                @click="moveCardRight(cardIndex)"
              ) >
            button.btn-reset.btn.btn--edit(
              @click="showInputModal(cardIndex)"
            ) Img
            button.btn-reset.btn.btn--delete(
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
    moveBlockUp(i) {
      const bs = this.blocksState;

      if (i !== 0) {
        const qwe = bs.slice(0);
        [qwe[i], qwe[i - 1]] = [qwe[i - 1], qwe[i]];
        this.updateBlocks(qwe);
      }
    },
    moveBlockDown(i) {
      const bs = this.blocksState;
      const len = bs.length;

      if (i !== len - 1) {
        const qwe = bs.slice(0);
        [qwe[i], qwe[i + 1]] = [qwe[i + 1], qwe[i]];
        this.updateBlocks(qwe);
      }
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
        // alert('Invalid URL');
        this.showModal = false;
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

#cards
  position: relative
  padding: 20px 0
  background-color: #444

.container
  max-width: 1024px

.card-plus
  height: 300px
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
  margin-right: 10px
  border: none
  resize: none
  background-color: #aeaeae

.textarea
  flex-basis: 100%

.block__top
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 10px
  h2
    color: #fff
.block__header
  width: 100%
  margin-right: 10px
  input
    margin-bottom: 0
.block__top-btns
  display: flex
  justify-content: flex-end
  flex-shrink: 0

.block__top-header,
.block__top-header-input
  margin-bottom: 10px
  font-weight: 600
  font-size: 20px

.block__body
  display: flex
  flex-wrap: wrap
  justify-content: flex-start

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
  .btn--edit
    padding: 0 5px
  .btn--delete
    padding: 0 5px
.card__arrow-btns-wrap
  display: flex
  align-items: center

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

.modal-wrap
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  opacity: 0.5
  background-color: #000
  z-index: 1
.modal__content
  position: absolute
  width: 300px
  top:50%
  left:50%
  transform: translate(-50%, -50%)
  padding: 10px
  border-radius: 5px
  background-color: #fff
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6)
  z-index: 2
  p
    margin-bottom: 5px
  input
    width: 100%
    height: fit-content
    margin-bottom: 10px
    font-size: 10px
    z-index: 2
  div
    display: flex
    justify-content: flex-end

</style>
