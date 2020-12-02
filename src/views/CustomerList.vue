<template>
  <div>
    <h1>Customers</h1>
    <ul>
      <li 
        v-for="(customer, i) in customers"
        :key="i"
        @click="navigate(customer)"
        :class="customer.isActive?'active':'passive'"
      >
        <b>{{ customer.name.first }} {{ customer.name.last }} </b><br>
        <span v-if="getPolicyStatuses(customer)" style="padding-left: 30px;">
          Policy: {{ getPolicyStatuses(customer).status }},
          Product: {{ getPolicyStatuses(customer).product.type }}
        </span>
        <!-- <span v-if="getQuotesStatuses(customer)"> Quotes: {{ getQuotesStatuses(customer) }}</span>  --> 
              
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'CustomerList',
  props: [
    /* from a Router */
    "customers",
    "quotes",
    "policies"
  ],
  data() {
    return {
      selectedPerson: null
    }
  },

  methods: {
    navigate(customerInfo) {
      const route = `/customer/${customerInfo.id}`
      this.$router.push({ path: route })
    },
    getQuotesStatuses(customerInfo) {
      let customerQuotes = null;
      let quotesStatuses = null;
      if (this.quotes && this.quotes.length > 0) {
        customerQuotes = this.quotes.filter(c => c.customerId == customerInfo.id);
        quotesStatuses = customerQuotes.map(q => q.status);
        quotesStatuses = quotesStatuses.length && quotesStatuses.length > 0 ? quotesStatuses.join() : null;
      }
      return quotesStatuses;
    },
    getPolicyStatuses(customerInfo) {
      let customerPolicy = null;
      let policyStatuses = null;
      if (this.policies && this.policies.length > 0) {
        customerPolicy = this.policies.filter(p => p.customerId == customerInfo.id)[0];
      }
      return customerPolicy;
    }
  }
}
</script>

<style lang="scss">
  ul {
    list-style: none
  }
  li {
    cursor: pointer;
    &::before {
      display: inline-block; width: 1em;
      margin-left: -1em;
    }
    &.active {
      &::before {
        color: $success;
        content: "•"; 
      }
      &:hover {
        color: $success;
      }
    }
    &.passive {
      &::before {
        color: $grey-mid;
        content: "⚬";
      }
      &:hover {
        color: $grey-mid;
      }
    }
  }
</style>