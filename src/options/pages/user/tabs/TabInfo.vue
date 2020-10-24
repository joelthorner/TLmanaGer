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
            <div class="card-title text-danger">
              <svg
                class="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
                ></path></svg
              >Disclaimer!
            </div>
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