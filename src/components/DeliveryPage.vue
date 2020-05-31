<template>
  <div class="order__section">
    <div class="order__detail">
      <div class="order__header">
        <h1>
          Delivery details
          <div class="order__headerline"></div>
        </h1>
        <label class="checkbox__wrapper">Send as dropshipper
          <input type="checkbox" class="checkbox__custom" v-model="sendDropshipper" @click="calculateDropship()">
          <span class="checkbox__checkmark"></span>
        </label>
      </div>
      <div class="order__info">
        <div class="order__personal">
          <div class="form__wrapper" :class="{'form__wrapper--valid': email.valid, 'form__wrapper--invalid': email.valid === false}">
            <div class="form__group field">
              <input type="text" class="form__field" placeholder="Email" name="email" id="email" required v-model="email.address" @blur="checkEmail" />
              <label for="email" class="form__label">Email</label>
            </div>
            <div v-show="!email.valid" class="form__message">{{ email.message }}</div>
          </div>
          <div class="form__wrapper" :class="{'form__wrapper--valid': phone.valid, 'form__wrapper--invalid': phone.valid === false}">
            <div class="form__group field">
              <input type="text" class="form__field" placeholder="Phone Number" name="phone" id="phone" required v-model="phone.number" @blur="checkPhone" @keypress="checkPhoneChar(event)" />
              <label for="phone" class="form__label">Phone Number</label>
            </div>
            <div v-show="!phone.valid" class="form__message">{{ phone.message }}</div>
          </div>
          <div class="form__wrapper" :class="{'form__wrapper--valid': address.valid, 'form__wrapper--invalid': address.valid === false}">
            <div class="form__group field">
              <textarea class="form__field" rows="4" placeholder="Delivery Address" name="deliveryaddress" id="deliveryaddress" required v-model="address.delivery" @blur="checkAddress" @keyup="checkAddressChar" />
              <label for="deliveryaddress" class="form__label">Delivery Address</label>
            </div>
            <div v-show="!address.valid" class="form__message">{{ address.message }}</div>
            <div class="form__counter">{{ address.counter }}/120</div>
          </div>
        </div>
        <div class="order__dropshipper">
          <div class="form__wrapper" :class="{'form__wrapper--disabled': !sendDropshipper, 'form__wrapper--valid': dropshipperName.valid, 'form__wrapper--invalid': dropshipperName.valid === false}">
            <div class="form__group field">
              <input type="text" class="form__field" placeholder="Dropshipper Name" name="dropshippername" id="dropshippername" :disabled="!sendDropshipper" required v-model="dropshipperName.name" @blur="checkDropshipperName" />
              <label for="dropshippername" class="form__label">Dropshipper Name</label>
            </div>
            <div v-show="!dropshipperName.valid" class="form__message">{{ dropshipperName.message }}</div>
          </div>
          <div class="form__wrapper" :class="{'form__wrapper--disabled': !sendDropshipper, 'form__wrapper--valid': dropshipperPhone.valid, 'form__wrapper--invalid': dropshipperPhone.valid === false}">
            <div class="form__group field">
              <input type="text" class="form__field" placeholder="Dropshipper Phone Number" name="dropshipperphone" id="dropshipperphone" :disabled="!sendDropshipper" required v-model="dropshipperPhone.number" @blur="checkDropshipperPhone" @keypress="checkPhoneChar(event)" />
              <label for="dropshipperphone" class="form__label">Dropshipper Phone Number</label>
            </div>
            <div v-show="!dropshipperPhone.valid" class="form__message">{{ dropshipperPhone.message }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="summary__section"> 
      <h2>Summary</h2>
      <p>10 items purchased</p>
      <div class="summary__bottom">
        <div class="summary__price">
          <p>Cost of goods</p>
          <p class="summary__number">500,000</p>
        </div>
        <div class="summary__price" v-show="sendDropshipper">
          <p>Dropshipping Fee</p>
          <p class="summary__number">5,900</p>
        </div>
        <div class="summary__price">
          <h2>Total</h2>
          <h2><strong>{{ totalPrice | toCurrencyFormat }}</strong></h2>
        </div>
        <button class="summary__button" @click="goToPayment">
          Continue to Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeliveryPage',
  data(){
    return{
      sendDropshipper: '',
      totalPrice: 500000,
      email: {
        address: '',
        valid: '',
        message: '',
      },
      phone: {
        number: '',
        valid: '',
        message: '',
      },
      address: {
        delivery: '',
        valid: '',
        message: '',
        counter: 120,
      },
      dropshipperName: {
        name: '',
        valid: '',
        message: '',
      },
      dropshipperPhone: {
        number: '',
        valid: '',
        message: '',
      },
      event: '',
      //eslint-disable-next-line
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    }
  },
  methods: {
    goToPayment(){
      if(this.email.valid == true && this.phone.valid == true && this.address.valid == true){
        if(this.sendDropshipper == true){
          if(this.dropshipperName.valid == true && this.dropshipperPhone.valid == true){
            this.$store.state.indexPage = 2;
            this.$store.commit('mutateIndexPage');
            this.$store.state.totalPrice = this.totalPrice;
            this.$store.commit('mutateTotalPrice');
            this.$store.state.sendDropship = this.sendDropshipper;
            this.$store.commit('mutateSendDropship');
          }
          else{
            this.dropshipperName.valid = false;
            this.dropshipperName.message = "Dropshipper name should not be empty";
            this.dropshipperPhone.valid = false;
            this.dropshipperPhone.message = "Dropshipper phone number should not be empty";
          }
        }
        else{
          this.$store.state.indexPage = 2;
          this.$store.commit('mutateIndexPage');
          this.$store.state.totalPrice = this.totalPrice;
					this.$store.commit('mutateTotalPrice');
          this.$store.state.sendDropship = this.sendDropshipper;
					this.$store.commit('mutateSendDropship');
        }
      }
      else{
        if(this.email.valid == ''){
          this.email.valid = false;
          this.email.message = "Email address should not be empty";
        }
        if(this.phone.valid == ''){
          this.phone.valid = false;
          this.phone.message = "Phone number should not be empty";
        }
        if(this.address.valid == ''){
          this.address.valid = false;
          this.address.message = "Delivery address should not be empty";
        }
        if(this.sendDropshipper == true){
          if(this.dropshipperName.valid == ''){
            this.dropshipperName.valid = false;
            this.dropshipperName.message = "Dropshipper name should not be empty";
          }
          if(this.dropshipperPhone.valid == ''){
            this.dropshipperPhone.valid = false;
            this.dropshipperPhone.message = "Dropshipper phone number should not be empty";
          }
        }
      }
    },
    calculateDropship(){
      if(!this.sendDropshipper){
        this.totalPrice += 5900;
      }
      else{
        this.totalPrice -= 5900;
        this.dropshipperName.name = '';
        this.dropshipperName.valid = '';
        this.dropshipperName.message = '';
        this.dropshipperPhone.number = '';
        this.dropshipperPhone.valid = '';        
        this.dropshipperPhone.message = '';
      }
    },
    checkEmail(){
      if(this.email.address && this.reg.test(this.email.address) == true){
        this.email.valid = true;
      }
      else{
        this.email.valid = false;
        if(this.reg.test(this.email.address) == false){
          this.email.message = "Email address is not in valid format";
          if(this.email.address.length < 1){
            this.email.message = "Email address should not be empty";
          }
        }
      }
    },
    checkPhone(){
      if(this.phone.number && this.phone.number.length > 5 && this.phone.number.length < 21){
        this.phone.valid = true;
      }
      else{
        this.phone.valid = false;
        if(this.phone.number.length < 1){
          this.phone.message = "Phone number should not be empty";
        }
        if((this.phone.number.length > 0 && this.phone.number.length < 6) || this.phone.number.length > 20){
          this.phone.message = "Phone number should be between 6 and 20 characters";
        }
      }
    },
    checkPhoneChar(evt){
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 40 && charCode !== 41 && charCode !== 43 && charCode !== 45){
        evt.preventDefault();
      }
      else{
        return true;
      }
    },
    checkAddress(){
      if(this.address.delivery && this.address.delivery.length < 121){
        this.address.valid = true;
      }
      else{
        this.address.valid = false;
        if(this.address.delivery.length < 1){
          this.address.message = "Delivery address should not be empty";
        }
        if(this.address.delivery.length > 120){
          this.address.message = "Delivery address should not be more than 120 characters";
        }
      }
    },
    checkAddressChar(){
      this.address.counter = 120 - (this.address.delivery.length+1);
    },
    checkDropshipperName(){
      if(this.dropshipperName.name){
        this.dropshipperName.valid = true;
      }
      else{
        this.dropshipperName.valid = false;
        this.dropshipperName.message = "Dropshipper name should not be empty";
      }
    },
    checkDropshipperPhone(){
      if(this.dropshipperPhone.number){
        this.dropshipperPhone.valid = true;
      }
      else{
        this.dropshipperPhone.valid = false;
        this.dropshipperPhone.message = "Dropshipper phone number should not be empty";
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
  .order
    &__header
      display flex
      justify-content space-between
      align-items center
      padding-right 45px
    &__info
      width 100%
      display table
    &__personal
      width 55%
      display table-cell
      padding-right 45px
    &__dropshipper
      width 45%
      display table-cell
      padding-right 45px
  .form
    &__wrapper
      border 1px solid #ccc
      padding 2px 15px 10px
      margin-bottom 25px
      color #9b9b9b
      position relative
      display flex
      align-items center
      justify-content space-between
    &__wrapper
      &--disabled
        background-color #eee
        color #ccc
      &--valid
        border 1px solid #1BD97B
        color #1BD97B  
      &--valid:after
        content ""
        width 5px
        height 10px
        border solid #1BD97B
        border-width 0 3px 3px 0
        -webkit-transform rotate(45deg)
        -ms-transform rotate(45deg)
        transform rotate(45deg)
      &--invalid
        border 1px solid #FF8A00
        color #FF8A00  
      &--invalid:after
        content "x"
        width 10px
        height 10px
        font-weight 700
    &__message
      position absolute
      bottom -20px
      left 0
      background transparent
      border transparent
      width 100%
      font-size 12px
      color #FF8A00
    &__counter
      position absolute
      font-size 12px
      color #888
      right 0
      bottom -20px
    &__group
      position relative
      padding 15px 0 0
      margin-top 10px
      width 100%
    &__field
      font-family inherit
      width 100%
      border 0
      outline 0
      font-size 1rem
      padding 7px 0
      background transparent
      font-weight 700
    &__field::placeholder
      color transparent
    &__label
      position absolute
      top 0
      display block
      transition 0.2s
      font-size 0.8rem
    &__field:focus
      padding-bottom 6px  
    &__field:placeholder-shown ~ &__label
      font-size 1rem
      cursor text
      top 20px
    &__field:focus ~ &__label
      position absolute
      top 0
      display block
      transition 0.2s
      font-size 0.8rem
    &__field:required, &__field:invalid 
      box-shadow none 
  .checkbox
    &__wrapper
      display block
      position relative
      padding-left 30px
      cursor pointer
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
      position absolute
      top -3px
      left 0
      height 20px
      width 20px
      border 2px solid #CCC
    &__checkmark:after
      content ""
      position absolute
      display none
      left 4px
      top 0
      width 5px
      height 10px
      border solid #1BD97B
      border-width 0 3px 3px 0
      -webkit-transform rotate(45deg)
      -ms-transform rotate(45deg)
      transform rotate(45deg)
    &__custom:checked ~ &__checkmark
      background-color transparent
      border 2px solid #1BD97B
    &__custom:checked ~ &__checkmark:after
      display block
  @media only screen and (max-width: 720px)
    .order
      &__header
        display block
        padding 0 0 30px
      &__personal, &__dropshipper, &__info
        width 100%
        display block
      &__personal, &__dropshipper
        padding 0
    .form__wrapper
      width 100%
      display flex
</style>