<template>
  <div class="order__section">
    <div class="order__detail">
      <h1>
        Thank you
        <div class="order__headerline"></div>
      </h1>
      <br>
      <p class="order__code">
        Order ID : {{ this.$store.state.orderID }}
      </p>
      <p>Your order will be delivered today with {{ this.$store.state.shipmentSelected }}</p>
      <br><br>
      <a class="order__back" @click="goToHome">
        &larr; Go to homepage
      </a>
    </div>
    <div class="summary__section"> 
      <h2>Summary</h2>
      <p>10 items purchased</p>
      <hr class="summary__line">
      <p class="summary__delivery">Delivery estimation</p>
      <p class="summary__estimation">
        {{ this.$store.state.shipmentEstimation }} by {{ this.$store.state.shipmentSelected }}
      </p>
      <hr class="summary__line">
      <p class="summary__delivery">Payment method</p>
      <p class="summary__estimation">
        {{ this.$store.state.paymentSelected }}
      </p>
      <div class="summary__bottom">
        <div class="summary__price">
          <p>Cost of goods</p>
          <p class="summary__number">500,000</p>
        </div>
        <div class="summary__price" v-show="this.$store.state.sendDropship">
          <p>Dropshipping Fee</p>
          <p class="summary__number">5,900</p>
        </div>
        <div class="summary__price">
          <p>
            <strong>{{ this.$store.state.shipmentSelected }}</strong> Shipment
          </p>
          <p class="summary__number">{{ this.$store.state.shipmentFee | toCurrencyFormat }}</p>
        </div>
        <div class="summary__price">
          <h2>Total</h2>
          <h2><strong>{{ this.$store.state.totalPrice | toCurrencyFormat }}</strong></h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinishPage',
  methods: {
    goToHome(){
      this.$store.state.indexPage = 1;
      this.$store.commit('mutateIndexPage');
    },
  }
}
</script>

<style lang="stylus" scoped>
  .order
    &__detail
      padding 130px 20%
    &__code
      color black
</style>