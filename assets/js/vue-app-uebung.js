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



// 5. Create and mount the root instance.
const VueConditionnel1 = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/conditionnel/vue-conditionnel1.vue', options));

const VueAlimentation1 = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/alimentation/vue-alimentation1.vue', options));

const VueAlimentation2 =  Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/alimentation/vue-alimentation2.vue', options));

const VueRawFood =  Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/english/rawfood/vue-rawfood.vue', options));

const VueExercise =  Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/vue-exercise.vue', options));

const app = createApp({
  components: {
    VueGaps : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-gaps.vue', options)),
    VueNestedMenu : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-nested-menu.vue', options)),
    VueNestedMenuTest : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-nested-menu-test.vue', options)),
    VueConditionnel1,
    VueAlimentation1,
    VueAlimentation2,
    VueRawFood,
    VueExercise
  
  },
});

// 1. Define route components.
// These can be imported from other files
const PC1 = { template: '<div>Konditionalsätze vom Typ 1</div>' };
const PC2 = { template: '<div>Konditionalsätze vom Typ 2</div>' };
const EMPH1 = { template: '<div>Emphasis 1</div>' };
const EMPH2 = { template: '<div>Emphasis 2</div>'};

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/phraseconditionnel1', component: VueConditionnel1 },
  { path: '/phraseconditionnel2', component: PC2 },
  { path: '/emphasis1', component : EMPH1 },
  { path: '/emphasis2', component : EMPH2 },
  { path: '/alimentation1', component : VueAlimentation1 },
  { path: '/alimentation2', component : VueAlimentation2 },
  { path: '/rawfood/:page', component: VueRawFood }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

app.use(router);
app.mount("#gaps");

