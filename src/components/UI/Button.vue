<template>
  <router-link class="btn" :to="to" v-if="to && to[0] === '/'">
    <slot />
  </router-link>
  <a target="_blank" class="btn" :href="to" v-else-if="to">
    <slot />
  </a>
  <button class="btn" v-else>
    <slot />
  </button>
</template>

<script>
export default {
  props: ["to"],
};
</script>

<style lang="scss">
.btn {
  border: 1px solid #fff;
  padding: 10px 30px;
  background: $purple;
  font-size: 20px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
  width: fit-content;

  &:hover {
    background: #fff;
    color: $purple;
    border-color: $purple;
  }
}
</style>
