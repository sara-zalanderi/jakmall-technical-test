<template>
  <div class="order__section">
    <div class="order__detail">
      <a class="order__back" @click="goToDelivery">
        &larr; Back to delivery
      </a>
      <h1>
        Shipment
        <div class="order__headerline"></div>
      </h1>
      <div class="order__option">
        <label class="radio__wrapper">
          <input type="radio" class="radio__custom" name="radio-shipment" value="GO-SEND" v-model="shipment.selected" @change="calculateFee()">
          <span class="radio__checkmark">
            <div class="radio__content">
              <h5>GO-SEND</h5>
              <h4>15,000</h4>
            </div>
          </span>
        </label>
        <label class="radio__wrapper">
          <input type="radio" class="radio__custom" name="radio-shipment" value="JNE" v-model="shipment.selected" @change="calculateFee()">
          <span class="radio__checkmark">
            <div class="radio__content">
              <h5>JNE</h5>
              <h4>9,000</h4>
            </div>
          </span>
        </label>      
        <label class="radio__wrapper">
          <input type="radio" class="radio__custom" name="radio-shipment" value="Personal Courier" v-model="shipment.selected" @change="calculateFee()">
          <span class="radio__checkmark">
            <div class="radio__content">
              <h5>Personal Courier</h5>
              <h4>29,000</h4>
            </div>
          </span>
        </label>
      </div>
      <h1>
        Payment
        <div class="order__headerline"></div>
      </h1>   
      <div class="order__option">   
        <label class="radio__wrapper">
          <input type="radio" class="radio__custom" name="radio-payment" value="e-Wallet" v-model="paymentSelected">
          <span class="radio__checkmark">
            <div class="radio__content">
              <h5>e-Wallet</h5>
              <h4>1,500,000 left</h4>
            </div>
          </span>
        </label>
        <label class="radio__wrapper">
          <input type="radio" class="radio__custom" name="radio-payment" value="Bank Transfer" v-model="paymentSelected">
          <span class="radio__checkmark">
            <div class="radio__content">
              <h4>Bank Transfer</h4>
            </div>
          </span>
        </label>
        <label class="radio__wrapper">
          <input type="radio" class="radio__custom" name="radio-payment" value="Virtual Account" v-model="paymentSelected">
          <span class="radio__checkmark">
            <div class="radio__content">
              <h4>Virtual Account</h4>
            </div>
          </span>
        </label>
      </div>
    </div>
    <div class="summary__section"> 
      <h2>Summary</h2>
      <p>10 items purchased</p>
      <hr class="summary__line">
      <p class="summary__delivery">Delivery estimation</p>
      <p class="summary__estimation">{{ shipment.estimation }} by {{ shipment.selected }}</p>
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
            <strong>{{ shipment.selected }}</strong> Shipment
          </p>
          <p class="summary__number">{{ shipment.fee | toCurrencyFormat }}</p>
        </div>
        <div class="summary__price">
          <h2>Total</h2>
          <h2><strong>{{ totalFee | toCurrencyFormat }}</strong></h2>
        </div>
        <button class="summary__button" @click="goToFinish">
          Pay with {{ paymentSelected }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentPage',
  data(){
    return{
      shipment: {
        selected: 'GO-SEND',
        fee: 15000,
        estimation: 'today',
      },
      paymentSelected: 'e-Wallet',
      totalFee: 0,
    }
  },
  mounted(){
    this.totalFee = this.$store.state.totalPrice + this.shipment.fee;
  },
  methods: {
    goToDelivery(){
      this.$store.state.indexPage = 1;
      this.$store.commit('mutateIndexPage');
    },
    goToFinish(){
      this.$store.state.indexPage = 3;
      this.$store.commit('mutateIndexPage');
      this.$store.state.totalPrice = this.totalFee;
      this.$store.commit('mutateTotalPrice');
      this.$store.state.shipmentSelected = this.shipment.selected;
      this.$store.commit('mutateShipmentSelected');
      this.$store.state.shipmentEstimation = this.shipment.estimation;
      this.$store.commit('mutateShipmentEstimation');
      this.$store.state.shipmentFee = this.shipment.fee;
      this.$store.commit('mutateShipmentFee');
      this.$store.state.paymentSelected = this.paymentSelected;
      this.$store.commit('mutatePaymentSelected');      
      this.$store.state.orderID = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 4);
      this.$store.commit('mutateOrderID');
    },
    calculateFee(){
      if(this.shipment.selected == 'GO-SEND'){
        this.shipment.fee = 15000;
        this.shipment.estimation = 'today';
      }
      if(this.shipment.selected == 'JNE'){
        this.shipment.fee = 9000;
        this.shipment.estimation = '2 days';
      }
      if(this.shipment.selected == 'Personal Courier'){
        this.shipment.fee = 29000;
        this.shipment.estimation = '1 day';
      }
      this.totalFee = this.$store.state.totalPrice + this.shipment.fee;
    }
  }
}
</script>

<style lang="stylus" scoped>
  .order
    &__back
      margin-top -10px
      position absolute
    &__option
      width 100%
      display flex
  .radio
    &__wrapper 
      display inline-block
      position relative
      margin-bottom 12px
      cursor pointer
      padding-right 15px
      width 25%
      -webkit-user-select none
      -moz-user-select none
      -ms-user-select none
      user-select none
    &__custom 
      position absolute
      opacity 0
      cursor pointer
      height 0
      width 0
    &__checkmark 
      position relative
      display flex
      align-items center
      top 0
      left 0
      width 100%
      padding 10px
      border 1px solid #ccc
      background-color transparent
    &__content 
      height 48px
      font-weight 700
      display grid
      align-items center
    &__checkmark:after 
      content ""
      position absolute
      display none
      right 9px
      width 5px
      height 10px
      border solid #1BD97B
      border-width 0 3px 3px 0
      -webkit-transform rotate(45deg)
      -ms-transform rotate(45deg)
      transform rotate(45deg)
    &__custom:checked ~ &__checkmark 
      background-color #E8FBF2
      border 2px solid #1BD97B
      color black
    &__custom:checked ~ &__checkmark:after 
      display flex
      align-items center
  @media only screen and (max-width: 720px)
    .order__option
      width 100%
      display block
    .radio__wrapper
      width 100%
      display block
      padding 0
</style>