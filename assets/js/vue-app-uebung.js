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
    VueHome : Vue.defineAsyncComponent(() =>
    loadModule('assets/js/vue-components/vue-home.vue', options))  
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

const VueNiNi = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-ni-ni.vue', options));

const VueTantOuSi = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-si-tant.vue', options));

const VueDuDeLeTemps = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-du-de-le-temps.vue', options));

const VuePronomEnMengenwort = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-pronom-en-mengenwort.vue', options));

const VueDontOuDuquel = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-dont-ou-duquel.vue', options));

const VueDontOuDuquelCresson = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/grammaire/vue-dont-ou-duquel-cresson.vue', options));

const VueEnDenDansDent = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-en-den-dans-dent.vue', options));

const VueAutre = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-autre.vue', options));

const VueConditionelle3 = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-phrase-conditionelle3.vue', options));

const VuePasseSimple = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-passe-simple.vue', options));

const VueImparfaitOuPlusQueParfait = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-imparfait-plus-que-parfait.vue', options));

const VueLionPasseSimpleOuImparfait = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-lion-passe-simple.vue', options));

const VueRajouterOuAjouter = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-rajouter-ou-ajouter.vue', options));

const VueCeluiCelle = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/grammaire/vue-celui-celle.vue', options));

const VueEncore = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/vocabulaire/vue-encore.vue', options));


const VueEven = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/english/grammar/vue-even.vue', options));

const VueEnoughToo = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/english/grammar/vue-too-enough.vue', options));

const VueFrancais = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/vue-francais.vue', options));
console.log("Logging VueFrancais");

console.log(VueFrancais);

const VueEnglish = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/english/vue-english.vue', options));

console.log(VueEnglish);

const VueComputerScience = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/informatik/vue-computer-science.vue', options));

const VueSignUp = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/vue-sign-up.vue', options));



// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    name: 'English',
    path: '/english',
    children: [
      {
        name: "Navigationsklfjk",
        path: '',
        component: VueEnglish
      },
      
      {name: 'Books', path: 'books', 
  children: [
    {name: 'Raw food',
     path: 'rawfood/:page',
     component: VueRawFood },
    
  ] }, {
    name: 'Grammar',
    path: 'grammar',
    children: [ {
      name: 'Enough and Too',
      path: 'enoughtoo',
      component: VueEnoughToo
    },
    {
      name: 'Even',
      path: 'even',
      component: VueEven
    }
  
  ]
  }]
    
  },
  {
    name: 'Français',
    path: '/french',
    
    children: [
      { name: "Nagivationsfdsdf",
        path: '',
        component: VueFrancais

      },
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
          name: 'Celui, celle, ceux ou celles',
          path: 'celuioucelle',
          component: VueCeluiCelle
        },
        {
          name: 'Rajouter ou ajouter',
          path: 'rajouterouajouter',
          component: VueRajouterOuAjouter
        },
        {
          name: 'Pronom en',
          path: 'en',
          component: VuePronomEn
        },
        {
          name: 'Pronom en mit Mengenwort',
          path: 'enmengenwort',
          component: VuePronomEnMengenwort
        },
        {
          name: 'Dont ou duquel',
          path: 'dontouduquel',
          component: VueDontOuDuquel
        },

        {
          name: 'Dont ou duquel - exercice avec des tamis de cresson',
          path: 'dontouduquelcresson',
          component: VueDontOuDuquelCresson
        },

        {
          name: 'Négation avec ne...ni...ni',
          path: 'nenini',
          component: VueNiNi
        },
        {
          name: 'Tant ou si',
          path: 'tantousi',
          component: VueTantOuSi
        },
        {
          name: 'Du,de ou le temps',
          path: 'dudeouletemps',
          component: VueDuDeLeTemps
        },
        {
          name: "En,d'en,dans ou dent",
          path: 'endendansdent',
          component: VueEnDenDansDent
        },
        {
          name: "Des autres ou d'autres",
          path: 'autre',
          component: VueAutre
        },
        {
          name: "Phrase conditionelle 3",
          path: 'conditionelle3',
          component: VueConditionelle3
        },
        {
          name: "Passe simple",
          path: 'passesimple',
          component: VuePasseSimple
        },
        {
          name: "Imparfait ou Plus-que-parfait",
          path: 'imparfaitouplusqueparfait',
          component: VueImparfaitOuPlusQueParfait
        },
        {
          name: "L'histoire d'un lion - Passé simple ou l'imparfait",
          path: 'lionpassesimpleouimparfait',
          component: VueLionPasseSimpleOuImparfait
        }


       ]},
       {
        name: 'Vocabulaire',
       path: 'vocabulaire',
       children: [
        {
          name: 'Let mot encore',
          path: 'encore',
          component: VueEncore
        },
       ]
       }

    ]
    
  },
  {
    name: 'Informatik',
    path: '/informatik',
    children: [
      {
        name: "Navigationsdfsdf",
        path: "",
        component: VueComputerScience
      },
      {
        name: 'Regular expressions',
        path: 'regex',
        component : VueRegexExercises
      }
    ],
  }
  
  /*,
  {
    name: 'Sign up',
    path: '/signup',
    component: VueSignUp
  }*/

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

