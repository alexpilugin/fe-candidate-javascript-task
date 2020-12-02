<template>
  <div>
    <h1>Policies</h1>

    <ul>
      <li 
        v-for="(policy, i) in policies" 
        :key="i"
        class="policy"
        @click="navigate(policy)"
      >
        {{ policy.id }} <span><b>{{ policy.status }}</b></span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'PolicyList',
  props: {
    /* from a Router */
    policies: {
      type: Array,
      default: null
    }
  },
  methods: {
    navigate(policy) {
      const route = `/policy/${policy.id}`
      this.$router.push({ path: route })
    }
  }
}
</script>

<style lang="scss">
@import "../sass/framework/framework.scss";
.policy {
  cursor: pointer;
  &:hover {
    color: $success;
  }
}
</style>
