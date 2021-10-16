<template>
  <div class="tab">
    <div class="row">
      <div class="col-12 col-xl-4">
        <div class="card card-user card-user-info card-user-info-form">
          <div class="card-header">
            <div class="card-title">Edit personal Info</div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="shop-testing-username">Username</label>
              <b-form-input
                id="shop-testing-username"
                placeholder="John Doe"
                v-model="chromeSync.profile.shopTestingUsername.value"
                v-on:input="debouncedInputSave($event, 'shopTestingUsername')"
                trim
              ></b-form-input>
            </div>

            <div class="form-group">
              <label for="shop-testing-email">Email</label>
              <b-form-input
                id="shop-testing-email"
                placeholder="john.doe@tlgcommerce.com"
                v-model="chromeSync.profile.shopTestingEmail.value"
                v-on:input="debouncedInputSave($event, 'shopTestingEmail')"
                trim
              ></b-form-input>
            </div>

            <div class="form-group">
              <label for="shop-testing-password">Password</label>
              <b-form-input
                id="shop-testing-password"
                placeholder="Password"
                v-model="chromeSync.profile.shopTestingPassword.value"
                v-on:input="debouncedInputSave($event, 'shopTestingPassword')"
                trim
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 col-xl-4">
        <card-info-disclaimer></card-info-disclaimer>
        <card-google-sync :chromeSync="chromeSync"></card-google-sync>
      </div>
      <div class="col-12 col-lg-6 col-xl-4">
        <card-info-avatar :chromeSync="chromeSync"></card-info-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import CardInfoAvatar from "@options/pages/user/cards/CardInfoAvatar";
import CardInfoDisclaimer from "@options/pages/user/cards/CardInfoDisclaimer";
import CardGoogleSync from "@options/pages/user/cards/CardGoogleSync";

export default {
  name: "TabInfo",
  props: {
    chromeSync: Object,
  },
  components: {
    CardInfoAvatar,
    CardInfoDisclaimer,
    CardGoogleSync,
  },
  created() {
    this.debouncedInputSave = _.debounce(function(event, key) {
      this.inputSave(event, key);
    }, 500);
  },
  methods: {
    reciveShowSavedOptions() {
      this.$emit("savedOptionsParent", true);
    },
    inputSave(value, key) {
      if (value.length) {
        this.chromeSync.profile[key].actived = true;
      } else {
        this.chromeSync.profile[key].actived = false;
      }
      this.reciveShowSavedOptions();
    },
  },
};
</script>
