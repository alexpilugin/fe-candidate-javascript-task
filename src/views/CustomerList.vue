<template>
  <div>
    <h1>Customers</h1>
    <div class="col custom-select" style="width:200px;">
      <select v-model="selectedPerson">
          <option 
            v-for="(customer, i) in customers"
            :key="i"
            :value="`${customer.name.first} ${customer.name.last}`" 
          >
            {{ customer.name.first }} {{ customer.name.last }}
          </option>
      </select>
    </div>
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
        context.customers = response.data
      })
      .catch(function(e) {
        console.log(e)
      })
  }
}
</script>

<style lang="scss">
</style>