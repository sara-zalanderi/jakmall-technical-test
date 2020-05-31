<template>
  <div id="app">
    <div class="stepper__wrapper">
      <div class="stepper__section">
        <div class="stepper__steps">
          <span class="stepper__number--active">1</span>
          Delivery
        </div>
        <div class="stepper__arrow">></div>
        <div class="stepper__steps">
          <span :class="{'stepper__number--active': this.$store.state.indexPage !== 1,'stepper__number--inactive': this.$store.state.indexPage === 1}">
            2
          </span>
          Payment
        </div>
        <div class="stepper__arrow">></div>
        <div class="stepper__steps">
          <span :class="{'stepper__number--active': this.$store.state.indexPage === 3,'stepper__number--inactive': this.$store.state.indexPage !== 3}">
            3
          </span>
          Finish
        </div>
      </div>
    </div>
    <div class="order__wrapper">
      <div class="order__content">
        <delivery-page
          v-if="this.$store.state.indexPage == 1" 
        />
        <payment-page
          v-if="this.$store.state.indexPage == 2" 
        />
        <finish-page
          v-if="this.$store.state.indexPage == 3" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import DeliveryPage from './components/DeliveryPage.vue'
import PaymentPage from './components/PaymentPage.vue'
import FinishPage from './components/FinishPage.vue'

export default {
  name: 'App',
  components: {
    DeliveryPage,
    PaymentPage,
    FinishPage,
  },
}
</script>

<style lang="stylus">
  @font-face
    font-family Inter
    src url('/src/assets/fonts/Inter-Regular.ttf')
  *
    box-sizing border-box
  body
    font-family Inter, Avenir, Helvetica, Arial, sans-serif
    margin 0
    background-color #FFFAE6
  #app
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #888
  h1, h2
    color #FF8A00
  p, h4, h5
    margin 5px 0
  button
    border-radius 4px
    border none
    outline none
    cursor pointer
  textarea
    resize none
  input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active
    -webkit-box-shadow 0 0 0 30px white inset !important    
  .stepper
    &__wrapper
      padding 15px 0
    &__section
      position absolute
      width 50%
      margin 0 25%
      text-align center
      color #FF8A00
      display flex
      align-items center
      background-color #FFFAE6
      padding 15px 0
      border-radius 50px
    &__steps
      width 30%
    &__arrow
      width 5%
      font-size 24px
      transform scale(.5, 1)
    &__number--active
      margin-right 5px
      background-color #FF8A00
      padding 5px 9px
      color white
      border-radius 50%
      display inline-block
    &__number--inactive
      margin-right 5px
      background-color #FFE4B8
      padding 5px 9px
      color #FF8A00
      border-radius 50%
      display inline-block
  .order
    &__wrapper
      padding 15px 45px 45px
    &__content
      background-color white
      padding 45px 15px 15px 45px
    &__section
      width 100%
      display table
    &__detail
      width 75%
      display table-cell
      padding-bottom 130px
    &__back
      cursor pointer
      font-size 14px
    &__headerline
      width 250px
      height 8px
      background-color #eee
      margin-top -12px
  .summary
    &__bottom
      position absolute
      bottom 0
      width 100%
      padding-right 15px
    &__price
      display flex
      justify-content space-between
    &__number
      color black
      font-weight 700
    &__button
      width 100%
      padding 15px 0
      background-color #FF8A00
      font-size 16px
      color white
    &__section
      width 25%
      display table-cell
      border-left 2px solid #FFFAE6
      padding-left 15px
      position relative
      vertical-align top
    &__line
      width 30%
      margin-right 70%
      margin 20px 0
    &__delivery
      color black
    &__estimation
      color #1BD97B
      font-weight 700
  @media only screen and (max-width: 720px)
    .stepper
      &__section
        width calc(100% - 90px)
        margin 0 45px
        border-radius 0
      &__steps
        width 25%
        display block
        text-align center
      &__arrow
        width 12.5%
      &__number--active, &__number--inactive
        display block
        width fit-content
        margin 5px auto
    .order
      &__section
        width 100%
        display block
      &__content
        padding 15px    
      &__detail
        padding 60px 0 0
    .summary
      &__section
        width 100%
        display block
        border-left none
        padding 0
      &__bottom
        position relative
        padding 0
</style>
