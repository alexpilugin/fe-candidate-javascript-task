<template>
  <div>
    <h1>Quotes</h1>

    <ul>
      <li v-for="(quote, i) in quotes" :key="i">
        {{ quote.id }}
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
}
</script>
