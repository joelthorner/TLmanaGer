<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link to="/options/logicommerce" :class="customActiveNavItem">
        <span class="icon" v-html="icons.shoppingCart"></span>
        Logicommerce
        <div class="rippleJS"></div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "UserNav",
};
</script>
