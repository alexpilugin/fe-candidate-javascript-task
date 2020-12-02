<template>
  <div v-if="!!info" class="customer-info">
    <!-- Customer Info -->
    <div v-if="info" class="card">
      <div class="row">
        <div class="col">
          <div v-if="info.isActive" class="activity-indicator" />
          <div class="header">
            <h1>{{ info.name.first}} {{ info.name.last }}</h1>
          </div>

          <div class="content">
            <h3>Phone: {{ info.phone}}</h3>
            <h3>Email: {{ info.email}}</h3>
            <hr class="line" />
            <h3>Address: {{ info.address}}</h3>
            <h3>Registered: {{ formatDate(new Date(info.registered)) }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer's Quotes -->
    <div v-if="customerQuotes && customerQuotes.length>0" class="card">
      <RowHeader><h1>Quotes</h1></RowHeader>
      <div 
        v-for="(quote, i) in customerQuotes"
        :key="i"
        class="row cblock"
      >
        <div class="col">
          <div 
              v-for="(product, j) in quote.products"
              :key="j"
            >
              <h3>{{ product.type}}</h3>
              <h4 class="price">Annual Price: <b>{{ product.price.annual }}</b></h4>
              <h4 class="price">Monthly Price: <b>{{ product.price.monthly }}</b></h4>
            </div>
        </div>
        <div class="col">
          <h4>Status: {{ quote.status }}</h4>
          <div class="header">
            <h2>Insured Entities</h2>
          </div>
            <div v-for="(entity, j) in quote.insured_entities"
              :key="j"
            >
              <h4 class="entity">Name: <b>{{ entity.name }}</b> ({{ entity.species }})</h4>
              <span>Breed: {{ entity.breed }}</span>
            </div>
        </div>
      </div>
    </div>

    <!-- Customer's Policies -->
    <div v-if="customerPolicies && customerPolicies.length>0" class="card">
      <RowHeader><h1>Policies</h1></RowHeader>
      <div 
        v-for="(policy, i) in customerPolicies"
        :key="i"
        class="row cblock"
      >
        <div class="col">
          <h2>Product: {{ policy.product.type }}</h2>
          <h4 class="price">Annual Price: <b>{{ policy.product.price.annual }}</b></h4>
          <h4 class="price">Monthly Price: <b>{{ policy.product.price.monthly }}</b></h4>
        </div>
        <div class="col">
          <h4>Status: {{ policy.status }}</h4>
          <div class="header">
            <h2>Insured Entities</h2>
          </div>
            <div v-for="(entity, j) in policy.insured_entities"
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
  name: "Customer",
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
      customerPolicies: null,
      customerQuotes: null
    };
  },
  watch: {
    customers(values) {
      if (values && values.length > 0) {
        this.info = this.customers.find((c) => c.id == this.id);
      }
    },
  },
  mounted() {
    if (this.customers && this.customers.length > 0) {
      this.info = this.customers.find((c) => c.id == this.id);
    }
    if(this.info) {
      this.customerQuotes = this.quotes.filter((c) => c.customerId == this.id);
      this.customerPolicies = this.policies.filter((c) => c.customerId == this.id);
    }
  },
  methods: {
    formatDate (date) {
      const formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      return formattedDate;
    }
  }
};
</script>

<style lang="scss">
@import "../sass/framework/framework.scss";

.card {
  @include shadow;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  justify-content: center;
  background-color: $white;
  border: 1px solid #ddd;
  padding: 20px 20px;
  margin: 10px;
  /* background: $grey-light; */
  font-family: $font-family-sans-serif;
  .row {
    display: flex;
    align-items: stretch;
    
    margin: -16px;
    &.cblock {
      border-bottom: 1px solid gray;
      margin-bottom: 25px;
    }
    .col {
      display: flex;
      flex-direction: column;
      
      flex: 1;
      
      margin: 16px;
      background: #fff;
    }
  }

  h1 {
    @include font--large;
  }
  h2 {
    @include font--medium;
  }
  h3 {
    @include font--lead;
    margin: 25px 0px 5px 0px;
  }
  h4 {
    &.price {
      padding: 0px;
      margin: 0px 0px 0px 0px;
    }
    &.entity {
      padding: 0px;
      margin: 15px 0px 0px 0px;
    }
  }
  hr.line {
    border: 1px solid $color-sailor-tint;
  }
  .activity-indicator {
    height: 25px;
    width: 25px;
    background-color: $success;
    border-radius: 50%;
    position: absolute;
    right: 30px;
    top: 30px;
  }
}
</style>
