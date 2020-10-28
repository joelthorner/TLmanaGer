import icons from "@/data/icons";

export default {
  data() {
    return {
      iconInfo: icons.info,
    };
  },
  props: {
    chromeSync: Object,
    title: String,
    scope: String,
    itemKey: String,
  },
  computed: {
    disabledOptionMessage() {
      return this.chromeSync[this.scope][this.itemKey].actived ? '' : 'Click top right switch to activate option';
    },
    checkboxName() {
      return `switch-${this.scope}-${this.itemKey}`;
    },
  },
  methods: {
    optionChangeActived(checked, scope, option) {
      this.chromeSync[scope][option].actived = checked;
      this.$emit("savedOptions", true);
    },
    openModalClick(value) {
      this.$bvModal.show('options-help-modal');
      this.$emit("savedHelpKey", value);
    },
  },
}
