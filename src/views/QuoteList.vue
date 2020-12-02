<template>
  <div>
    <h1>Quotes</h1>

    <ul>
      <li 
        v-for="(quote, i) in quotes" 
        :key="i" 
        class="quote"
        @click="navigate(quote)"
      >
        {{ quote.id }} <span><b>{{ quote.status }}</b></span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'QuoteList',
  props: {
    /* from a Router */
    quotes: {
      type: Array,
      default: null
    }
  },
  methods: {
    navigate(quote) {
      const route = `/quote/${quote.id}`
      this.$router.push({ path: route })
    }
  }
}
</script>

<style lang="scss">
@import "../sass/framework/framework.scss";
.quote {
  cursor: pointer;
  &:hover {
    color: $success;
  }
}
</style>