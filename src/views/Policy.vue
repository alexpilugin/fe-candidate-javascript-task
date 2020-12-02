<template>
  <div v-if="!!info" class="quote-info">
    <div v-if="info" class="card">
      <RowHeader>
        <h1>Policy: {{ info.id }}</h1> 
      </RowHeader>
      <RowHeader>
        <h2 
          class="customer"
          @click="navigateToCustomer(customer.id)"
        >
          {{ customer.name.first}} {{ customer.name.last }}
        </h2>
      </RowHeader>
      <div class="row cblock">
        <div class="col">
          <h3>{{ info.product.type}}</h3>
          <h4 class="price">Annual Price: <b>{{ info.product.price.annual }}</b></h4>
          <h4 class="price">Monthly Price: <b>{{ info.product.price.monthly }}</b></h4>
          </div>
        <div class="col">
          <h4>Status: {{ info.status }}</h4>
          <div class="header">
            <h2>Insured Entities</h2>
          </div>
            <div v-for="(entity, j) in info.insured_entities"
              :key="j"
            >
              <h4 class="entity">Name: <b>{{ entity.name }}</b> ({{ entity.species }})</h4>
              <span>Breed: {{ entity.breed }}</span>
            </div>
        </div>
      </div>
    </div>
  </div>     
</template>

<script>
import RowHeader from '@/components/RowHeader'
export default {
  name: "Policy",
  props: [
    /* from a Router */
    "id", 
    "customers",
    "quotes",
    "policies"
  ],
  components: {
    RowHeader
  },
  data() {
    return {
      info: null,
      customer: null
    };
  },
  mounted() {
    if (this.policies && this.policies.length > 0) {
      this.info = this.policies.find(p => p.id == this.id);
    }
    if(this.info) {
      const customerId = this.info.customerId;
      if (this.customers && this.customers.length > 0) {
        this.customer = this.customers.find(c => c.id == customerId);
      }
    }
  },
  methods: {
    navigateToCustomer(customerId) {
      const route = `/customer/${customerId}`
      this.$router.push({ path: route })
    },
  }
}
</script>