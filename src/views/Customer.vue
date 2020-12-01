<template>
  <div v-if="!!info">
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
  </div>
</template>

<script>

export default {
  name: "Customer",
  props: ["id", "customers"], //from a Router
  data() {
    return {
      info: null,
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
  font-family: $font-family-sans-serif;
  .row {
    display: flex;
    align-items: stretch;
    
    margin: -16px;
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
    margin: 0;
    text-align: center;
  }
  h3 {
    @include font--normal;
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
