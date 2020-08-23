import icons from "@/data/icons";
import HelpModal from "@options/components/HelpModal";

export default {
  components: {
    HelpModal
  },
  data() {
    return {
      iconInfo: icons.info,
    };
  },
  props: {
    chromeSync: Object,
    title: String,
    help: Object,
    scope: String,
    itemKey: String,
  },
  computed: {
    disabledOptionMessage() {
      return this.chromeSync[this.scope][this.itemKey].active ? '' : 'Click top right switch to activate option';
    },
    thisModalId() {
      return `help-modal-${this.itemKey}`;
    },
    checkboxName() {
      return `switch-${this.scope}-${this.itemKey}`;
    },
  },
  created: function () {
    this.debouncedOptionChangeActived = _.debounce(
      this.optionChangeActived,
      1000
    );
  },
  methods: {
    optionChangeActived(checked, scope, option) {
      this.chromeSync[scope][option].active = checked;
      this.$emit("savedOptions", true);
    },
  },
}
