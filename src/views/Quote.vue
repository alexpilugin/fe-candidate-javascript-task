<template>
  <div v-if="!!info" class="quote-info">
    <div v-if="info" class="card">
      <RowHeader>
        <h1>Quote: {{ info.id }}</h1> 
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
          <div 
              v-for="(product, j) in info.products"
              :key="j"
            >
              <h3>{{ product.type}}</h3>
              <h4 class="price">Annual Price: <b>{{ product.price.annual }}</b></h4>
              <h4 class="price">Monthly Price: <b>{{ product.price.monthly }}</b></h4>
            </div>
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
  name: "Quote",
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
    if (this.quotes && this.quotes.length > 0) {
      this.info = this.quotes.find(q => q.id == this.id);
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

<style lang="scss">
@import "../sass/framework/framework.scss";
span.status {
  @include font--large;
}
.customer {
  cursor: pointer;
  &:hover {
    color: $success;
  }
}
</style>