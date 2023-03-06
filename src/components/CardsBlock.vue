<template lang="pug">
.block

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

  .container.container-style
    BlockTop(
      :header="block.header"
      :blockIndex="blockIndex"
    )

    .block__body(:key="reload")

      .card(v-for="(card, cardIndex) in cards" :key="cardIndex")

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
            :style="{'background-image': `url(${card.cardImg})`}"
            alt=""
          )

        .card__body

          .card__descr

            h3(v-if="!editMode" ) {{ card.cardHeader }}
            input.input.block__header-input(
              v-if="editMode"
              type="text"
              v-model="cards[cardIndex].cardHeader"
            )

            p.card__text(v-if="!editMode") {{ card.cardText }}
            textarea.textarea.block__text-input(
              v-if="editMode"
              v-model="cards[cardIndex].cardText"
            )

      .card.card-plus(v-if="editMode")
        .card-plus__img(
          @click="addCard()"
          alt="Plus"
        )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BlockTop from '@/components/BlockTop.vue';

export default {
  name: 'CardsBlock',
  props: ['block', 'blockIndex'],
  components: { BlockTop },
  data() {
    return {
      reload: 0,
      cards: [],

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
      editMode: 'editMode',
    }),
  },
  methods: {
    ...mapActions(['updateCards', 'updateCards']),
    validCards() {
      this.cards = this.cards.map((x, i) => {
        if (x.cardHeader === '') {
          return { ...x, cardHeader: this.block.cards[i].cardHeader };
        }
        if (x.cardText === '') {
          return { ...x, cardText: this.block.cards[i].cardText };
        }
        return x;
      });
    },
    saveCards() {
      this.validCards();
      this.updateCards({
        blockId: this.blockIndex,
        cards: this.cards,
      });
    },
    deleteCard(cardIndex) {
      this.cards.splice(cardIndex, 1);
    },
    addCard() {
      this.cards.push(this.defaultCard);
    },
    showInputModal(cardIndex) {
      this.showModal = true;
      this.cardIdEdit = cardIndex;
    },
    saveCardImgUrl() {
      const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
      if (regex.test(this.cardImgUrlInput)) {
        this.cardImgUrl = this.cardImgUrlInput;
        this.cards[this.cardIdEdit].cardImg = this.cardImgUrlInput;
        this.showModal = false;
      } else {
        this.showModal = false;
      }
    },
    moveCardLeft(i) {
      const c = this.cards;
      if (i !== 0) {
        console.log('asd');
        [c[i], c[i - 1]] = [c[i - 1], c[i]];
        this.reload += 1;
      }
    },
    moveCardRight(i) {
      const c = this.cards;
      const len = c.length;
      if (i !== len - 1) {
        [c[i], c[i + 1]] = [c[i + 1], c[i]];
        this.reload += 1;
      }
    },
  },
  created() {
    this.cards = this.block.cards.map((card) => ({ ...card }));
  },
  watch: {
    editMode(bool) {
      if (!bool) {
        this.saveCards();
      }
    },
    block: {
      deep: true,
      handler() {
        this.cards = this.block.cards.map((card) => ({ ...card }));
      },
    },
  },
};
</script>

<style scoped lang="sass">
@import '../styles/base/mixins.sass'

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

.block__top
  h2
    color: #fff

.card
  display: flex
  flex-direction: column
  flex-basis: calc(25% - 8px)
  margin-bottom: 10px
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6)
  p
    color: #000
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
