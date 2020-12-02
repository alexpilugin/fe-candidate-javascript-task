<template>
  <div>
    <h1>Policies</h1>

    <ul>
      <li v-for="(policy, i) in policies" :key="i">
        {{ policy.id }}
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
}
</script>
