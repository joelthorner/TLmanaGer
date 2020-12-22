<template>
  <div class="tab">
    <div class="row">
      <div class="col col-xs-12 col-lg-4">
        <div class="card card-user card-user-info">
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

      <div class="col col-xs-12 col-lg-4">
        <div class="card card-user card-user-info">
          <div class="card-header">
            <div class="card-title text-danger">
              <span class="icon" v-html="infoIcon"></span>Disclaimer!
            </div>
          </div>
          <div class="card-body">
            El propòsit d'aquestes dades és per eines de testeig.<br /><br />Tot
            i que no seran mai compartides, no useu una contrasenya d'ús
            habitual en comptes reals.
          </div>
        </div>
      </div>

      <div class="col col-xs-12 col-lg-4">
        <div class="card card-user card-user-info card-user-info-avatar">
          <div class="card-header">
            <div class="card-title">Avatar</div>
          </div>
          <div class="card-body">
            <div class="avatar-card-img">
              <router-link to="/user/avatar" title="Change avatar">
                <img
                  :src="chromeSync.profile.avatar.value"
                  alt="User avatar"
                  v-b-tooltip.hover
                />
                <span class="icon hover" v-html="penIcon"></span>
                <div class="rippleJS"></div>
              </router-link>
            </div>

            <div class="avatar-name">
              <strong>{{ chromeSync.profile.avatar.name }}</strong>
              <p v-if="chromeSync.profile.avatar.description.length">
                {{ chromeSync.profile.avatar.description }}
              </p>
              <router-link to="/user/avatar" class="btn btn-primary">
                Change avatar
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { info as infoIcon, pen as penIcon } from "@/data/icons";

export default {
  name: "TabInfo",
  props: {
    chromeSync: Object,
  },
  data() {
    return {
      infoIcon,
      penIcon,
    };
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