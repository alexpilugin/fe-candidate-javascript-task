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
        {{ customer.name.first }} {{ customer.name.last }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CustomerList',
  data() {
    return {
      customers: [],
      selectedPerson: null
    }
  },
  created() {
    const context = this

    axios.get('http://localhost:3000/customers')
      .then(function(response) {
        context.customers = response.data.sort( (a,b) => {
            if(a.isActive > b.isActive) return -1;
            if(b.isActive < a.isActive) return 1;
            if(b.isActive == a.isActive) return 0;
        })
        context.$emit("dataReceived", response.data)
      })
      .catch(function(e) {
        console.log(e)
      })
  },
  methods: {
    navigate(customerInfo) {
      const route = `/customer/${customerInfo.id}`
      this.$router.push({ path: route })
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