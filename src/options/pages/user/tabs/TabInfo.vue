<template>
  <div class="tab">
    <!-- <div class="inner-text">Other options</div> -->

    <div class="row">
      <div class="col col-xs-12 col-lg-6">
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
              ></b-form-input>
            </div>
            <div class="form-group">
              <label for="shop-testing-email">Email</label>
              <b-form-input
                id="shop-testing-email"
                placeholder="john.doe@tlgcommerce.com"
                v-model="chromeSync.profile.shopTestingEmail.value"
              ></b-form-input>
            </div>
            <div class="form-group">
              <label for="shop-testing-password">Password</label>
              <b-form-input
                id="shop-testing-password"
                placeholder="Password"
                v-model="chromeSync.profile.shopTestingPassword.value"
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis iure,
            minus deserunt libero unde eligendi, dolores reprehenderit ex alias
            ducimus distinctio officiis illum temporibus inventore qui
            blanditiis nostrum animi. Quos.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabInfo",
  props: {
    chromeSync: Object,
  },
  methods: {
    reciveShowSavedOptions(value) {
      this.$emit("savedOptionsParent", true);
    },
  },
};
</script>