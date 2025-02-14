// js/vue-app.js

const { createApp } = Vue;
const { loadModule } = window['vue3-sfc-loader'];

const options = {
  moduleCache: {
    vue: Vue,
  },
  getFile(url) {
    return fetch(url).then((resp) =>
      resp.ok ? resp.text() : Promise.reject(resp)
    );
  },
  addStyle(styleStr) {
    const style = document.createElement('style');
    style.textContent = styleStr;
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
  log(type, ...args) {
    console.log(type, ...args);
  },
};

createApp({
  components: {
    VueNutritionQuiz : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-nutrition-quiz.vue', options)),
   
  
  },
}).mount('#nutritionquiz');

createApp({
  components: {
    VueLernenLehrenQuiz : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-lernen-lehren-quiz.vue', options)),
   
  
  },
}).mount('#lernenlehren');

createApp({
  components: {
    VueConciousnessQuiz : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-conciousness-quiz.vue', options)),
   
  
  },
}).mount('#conciousness');