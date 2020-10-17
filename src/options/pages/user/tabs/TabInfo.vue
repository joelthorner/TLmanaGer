<template>
  <div class="tab">
    <!-- <div class="inner-text">Other options</div> -->

    <div class="row">
      <div class="col col-xs-12 col-lg-4">
        <div class="card card-option card-user card-user-info">
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
                v-on:input="debouncedInputSave"
                trim
              ></b-form-input>
            </div>
            <div class="form-group">
              <label for="shop-testing-email">Email</label>
              <b-form-input
                id="shop-testing-email"
                placeholder="john.doe@tlgcommerce.com"
                v-model="chromeSync.profile.shopTestingEmail.value"
                v-on:input="debouncedInputSave"
                trim
              ></b-form-input>
            </div>
            <div class="form-group">
              <label for="shop-testing-password">Password</label>
              <b-form-input
                id="shop-testing-password"
                placeholder="Password"
                v-model="chromeSync.profile.shopTestingPassword.value"
                v-on:input="debouncedInputSave"
                trim
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>

      <div class="col col-xs-12 col-lg-6">
        <div class="card card-option card-user card-user-info">
          <div class="card-header">
            <div class="card-title">Disclaimer!</div>
          </div>
          <div class="card-body">
            El propòsit d'aquestes dades és per eines de testeig.<br />Tot i que
            no seran mai compartides, no usar una contrasenya d'ús habitual en
            comptes reals. <br /><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "TabInfo",
  props: {
    chromeSync: Object,
  },
  created: function () {
    this.debouncedInputSave = _.debounce(this.inputSave, 500);
  },
  methods: {
    reciveShowSavedOptions() {
      this.$emit("savedOptionsParent", true);
    },
    inputSave(value) {
      if (value.length) {
        this.chromeSync.profile.shopTestingPassword.actived = true;
      } else {
        this.chromeSync.profile.shopTestingPassword.actived = false;
      }
      this.reciveShowSavedOptions();
    },
  },
};
</script>