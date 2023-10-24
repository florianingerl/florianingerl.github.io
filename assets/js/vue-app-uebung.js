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




const app = createApp({
  components: {
    VueNestedMenu : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-nested-menu.vue', options))  
  }
});

const VueAlimentation1 = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/alimentation/vue-alimentation1.vue', options));

const VueBhagavadGita = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/alimentation/vue-bagavad-gita.vue', options));

const VueRawFood =  Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/english/rawfood/vue-rawfood.vue', options));

const VueRegexExercises =  Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/informatik/vue-regex-exercises.vue', options));

const VuePronomEn = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-pronom-en.vue', options));

const VuePronomEnMengenwort = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-pronom-en-mengenwort.vue', options));
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    name: 'English',
    path: '/english',
    children: [ {name: 'Books', path: 'books', 
  children: [
    {name: 'Raw food',
     path: 'rawfood/:page',
     component: VueRawFood },
    
  ] }, {
    name: 'Grammar',
    path: 'grammar',
    children: []
  }]
    
  },
  {
    name: 'Français',
    path: '/french',
    children: [
      {name: 'Livres',
      path: 'livres',
      children: [
        {
          name: 'Alimentation vivante',
          path: 'alimentation/:page',
          component: VueAlimentation1
        },
        {
          name: "Bhagavad Gita",
          path: 'bhagavadgita/:page',
          component: VueBhagavadGita
        }
      ],
      },
      {name: 'Grammaire',
       path: 'grammaire',
       children: [
        {
          name: 'Pronom en',
          path: 'en',
          component: VuePronomEn
        },
        {
          name: 'Pronom en mit Mengenwort',
          path: 'enmengenwort',
          component: VuePronomEnMengenwort
        }
       ]}

    ]
    
  },
  {
    name: 'Informatik',
    path: '/informatik',
    children: [
      {
        name: 'Regular expressions',
        path: 'regex',
        component : VueRegexExercises
      }
    ],
  }
];

/*
const  routes = [
  { path: '/phraseconditionnel1', component: VueConditionnel1 },
  { path: '/phraseconditionnel2', component: PC2 },
  { path: '/emphasis1', component : EMPH1 },
  { path: '/emphasis2', component : EMPH2 },
  { path: '/alimentation1', component : VueAlimentation1 },
  { path: '/alimentation2', component : VueAlimentation2 },
  { path: '/rawfood/:page', component: VueRawFood }
]; */

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

