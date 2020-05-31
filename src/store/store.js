import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist/dist/umd';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'user-data',
  storage: window.localStorage
})
export const store = new Vuex.Store({
	state: {
    indexPage: 1,
    totalPrice: 500000,
    sendDropship: false,
    shipmentSelected: 'GO-SEND',
    shipmentEstimation: 'today',
    shipmentFee: 15000,
    paymentSelected: 'e-Wallet',
    orderID: 'XXKYB',
	},
	mutations: {
		mutateIndexPage: state => {
			state.indexPage;
		},
		mutateTotalPrice: state => {
			state.totalPrice;
		},
		mutateSendDropship: state => {
			state.sendDropship;
		},
		mutateShipmentSelected: state => {
			state.shipmentSelected;
		},
		mutateShipmentEstimation: state => {
			state.shipmentEstimation;
		},
		mutateShipmentFee: state => {
			state.shipmentFee;
		},
		mutatePaymentSelected: state => {
			state.paymentSelected;
		},
		mutateOrderID: state => {
			state.orderID;
		},
	},
	plugins: [vuexPersist.plugin],
});
