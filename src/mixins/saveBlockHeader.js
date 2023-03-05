import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      thisBlock: [],
      editMode: false,
      currentBlockHeader: '',
    };
  },
  computed: {
    ...mapGetters({
      state: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlock']),
    saveBlockHeader() {
      if (this.thisBlock.header === '') {
        this.thisBlock.header = this.currentBlockHeader;
      }
    },
    updateMainData() {
      this.thisBlock = this.state[this.blockIndex];
      this.currentBlockHeader = this.thisBlock.header;
    },
  },
};
