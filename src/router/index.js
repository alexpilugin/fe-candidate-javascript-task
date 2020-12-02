import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerList from '../views/CustomerList.vue'
import Customer from '../views/Customer.vue'
import QuoteList from '../views/QuoteList.vue'
import PolicyList from '../views/PolicyList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/customers',
    name: 'Customers',
    component: CustomerList,
    props: true
  },
  {
    path: '/customer/:id',
    name: 'Customer',
    component: Customer,
    props: true
  },
  {
    path: '/quotes',
    name: 'Quotes',
    component: QuoteList,
    props: true
  },
  {
    path: '/policies',
    name: 'Policies',
    component: PolicyList,
    props: true
  },
  {
    path: '/',
    redirect: {
      name: 'Customers'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
