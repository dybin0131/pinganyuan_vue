import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        CredibleValue: 0,
        praisePR:0,
    },
    mutations: {
        updateCredibleValue(state, value) {
            state.CredibleValue = value;
        },
//PR的赞和踩
        PraisePRIncrement(state) {
            state.praisePR++;
        },
        PraisePRDecrement(state) {
            state.praisePR--;
        },
    },
    actions: {
        setCredibleValue({ commit }, value) {
            commit('updateCredibleValue', value);
        },
        //
        PraisePRIncrement({ commit }) {
            console.log('调用了 increment 方法');
            commit('PraisePRIncrement');
        },
        PraisePRDecrement({ commit }) {
            commit('PraisePRDecrement');
        },
    },
});