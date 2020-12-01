<template>
  <div id="app">
    <site-header />

    <main class="content container">
      <router-view 
        :customers="customers"
        @dataReceived="trasferData" 
      />
    </main>

    <site-footer />
  </div>
</template>

<script>

import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter,
  },
  data() {
    return {
      customers: null
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
.content {
  margin-bottom: 1em;
  margin-top: calc(90px + 1em);

  @include breakpoint(sm-up) {
    margin-bottom: 1em;
    margin-top: calc(100px + 1em);
  }
}
</style>
