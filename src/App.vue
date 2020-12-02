<template>
  <div id="app">
    <site-header />

    <main class="content container">
      <router-view 
        :customers="customers"
        :quotes="quotes"
        :policies="policies"
      />
    </main>

    <site-footer />
  </div>
</template>

<script>
import axios from 'axios'

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter
  },
  data() {
    return {
      customers: null,
      quotes: null,
      policies: null
    }
  },
  created() {
    const context = this
    if (!this.customers) {
      axios.get('http://localhost:3000/customers')
        .then(function(response) {
          context.customers = response.data.sort( (a,b) => {
              if (a.isActive > b.isActive) return -1;
              if (b.isActive < a.isActive) return 1;
              if (b.isActive == a.isActive) return 0;
          })
        })
        .catch(function(e) {
          console.log(e)
        })
    }
    if (!this.quotes) {
      axios.get('http://localhost:3000/quotes')
        .then(function(response) {
          context.quotes = response.data
        })
        .catch(function(e) {
          console.log(e)
        })
    }
    if (!this.policies) {
      axios.get('http://localhost:3000/policies')
        .then(function(response) {
          context.policies = response.data
        })
        .catch(function(e) {
          console.log(e)
        })
    }
  },
  methods: {
    trasferData (payload) {
      this.customers = payload
    }
  }
}
</script>

<style lang="scss">
@import "./sass/framework/framework.scss";

.content {
  margin-bottom: 1em;
  margin-top: calc(90px + 1em);

  @include breakpoint(sm-up) {
    margin-bottom: 1em;
    margin-top: calc(100px + 1em);
  }
}
</style>
