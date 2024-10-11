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

const VueLivreSurFred = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/livres/vue-marie-histoire.vue', options));

const VueDeuxGamins = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/breveshistoires/vue-deux-gamins.vue', options));

const VueRawFood =  Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/english/rawfood/vue-rawfood.vue', options));

const VueInversionSujetVerbe = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/grammaire/vue-inversion-sujet.vue', options));

const VueMonumentPoisson = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/breveshistoires/vue-monument-poisson.vue', options));

const VueSonO = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/prononciation/vue-son-o.vue', options));

const VueLionSimba = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/breveshistoires/vue-histoire-max.vue', options));

const VueConjunctions = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/english/vocabulary/vue-conjunctions.vue', options));

const VueFred =  Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/english/books/vue-anna-story.vue', options));

const VueFr = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/vue-fr.vue', options));

const VueDict =   Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/vue-dict.vue', options));

const VueEn = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/english/vue-en.vue', options));

const VueConduireOuCourir = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/vocabulaire/vue-conduireoucourir.vue', options));

const VueRegexExercises =  Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/informatik/vue-regex-exercises.vue', options));

const VueMithelfen =  Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/vue-mithelfen.vue', options));

const VuePronomEn = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-pronom-en.vue', options));

const VueNiNi = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/grammaire/vue-ni-ni.vue', options));

const VueSonE = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/prononciation/vue-son-e.vue', options));

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

const VueNeExpletif = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/grammaire/vue-ne-expletif.vue', options));

const VueEncore = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/vocabulaire/vue-encore.vue', options));


const VueEven = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/english/grammar/vue-even.vue', options));

const VueEnoughToo = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/english/grammar/vue-too-enough.vue', options));

const VueParentheses = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/informatik/regex/vue-parentheses.vue', options));

const VueFrancais = Vue.defineAsyncComponent(() =>
loadModule('assets/js/vue-components/french/vue-francais.vue', options));
console.log("Logging VueFrancais");

const VueDeutsch = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/deutsch/vue-deutsch.vue', options));

const VueRegexPointDExclamation = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/informatik/regex/vue-point-dexclamation.vue', options));

const VueLabelSetTextTextAreaAppend = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/informatik/regex/vue-labelsettext-textareaappend.vue', options));

const VueConnaitreOuSavoir = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/vocabulaire/vue-connaitre-ou-savoir.vue', options));

const VueMettre = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/vocabulaire/vue-mettre.vue', options));

const VueAnnaCat = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/english/shortstories/vue-anna-cat.vue', options));

const VueAnnaLaraAndHerBird = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/english/shortstories/vue-bird-story.vue', options));

const VueDeuxOiseauxAmoureux = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/french/breveshistoires/vue-marie-deux-oiseaux.vue', options));

const VueAnnaTurtoises = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/english/shortstories/vue-anna-turtoise.vue', options));

const VueGuillemetsFrancais = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/informatik/regex/vue-guillements.vue', options));

const VueKatzeMagFisch =  Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/deutsch/kurzgeschichten/vue-katze-vanessa.vue', options));

const VueVogelEichhoernchen =  Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/deutsch/kurzgeschichten/vue-vogel-und-eichhoernchen.vue', options));

const VueVogelMarcia =  Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/deutsch/kurzgeschichten/vue-marcia-vogel.vue', options));

const VueKatzeVanessa = Vue.defineAsyncComponent(() =>
  loadModule('assets/js/vue-components/deutsch/kurzgeschichten/vue-katze-vanessa.vue', options));

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
    name: 'Mithelfen',
    path: '/mithelfen',
    component: VueMithelfen
  },
  {
    name: 'English',
    path: '/en/:language',
    component: VueDict,
    children: [
      {
        name: "Navigationsklfjk",
        path: '',
        component: VueEnglish
      },

      {
        name: 'Vocabulary', path: 'vocabulary',
        children: [
          {
            name: 'Conjunctions',
            path: 'conjunctions',
            component: VueConjunctions
          }
        ]
      },
      
      {name: 'Books', path: 'books', 
  children: [
    {name: 'Raw food',
     path: 'rawfood/:page',
     component: VueRawFood },

     {name: 'Fred',
      path: 'fred/:page',
      component: VueFred },
    
  ] },
  {
    name: 'Short stories',
    path: 'shortstories',
    children: [
      {
        name: 'The cat detective',
        path: 'thecatdetective',
        component: VueAnnaCat

      },
      {
        name: 'Lara and her bird',
        path: 'laraandherbird',
        component: VueAnnaLaraAndHerBird
      },
      {
        name: 'Advertisement and turtoises',
        path: 'annaturtoises',
        component: VueAnnaTurtoises
      }
  ]
  },
  
  
  {
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
    name: 'Deutsch',
    path: '/de/:language',
    component: VueDict,
    children: [
      {
        name: "NavDeutsch",
        path: '',
        component: VueDeutsch
      },
      {
        name: "Kurzgeschichten",
        path: 'kurzgeschichten',
        children: [
          {
            name:'Ein Vogel und ein Eichhörnchen',
            path: 'vogelundeichhoernchen',
            component: VueVogelEichhoernchen
          },
          {
            name: 'Eine Katze, die Fisch mag',
            path: 'katzemagfisch',
            component: VueKatzeMagFisch
          },
          {
            name: 'Mit Vögeln Äpfel teilen',
            path: 'vogelmarcia',
            component: VueVogelMarcia
          }
        ]

      }
    ]
  },
  {
    name: 'Français',
    path: '/fr/:language',
    component: VueDict,
    
    children: [
      { name: "Nagivationsfdsdf",
        path: '',
        component: VueFrancais

      },
      {
        name: 'Brèves histoires',
        path: 'breveshistoires',
        children: [
          {
            name: "Antoine et Fred, meilleurs ami",
            path: 'deuxgamins',
            component: VueDeuxGamins
          },
          {
            name: "L'histoire d'amour de deux oiseaux",
            path: 'deuxoiseauxamoureux',
            component: VueDeuxOiseauxAmoureux
          },
          {
            name: "Monument d'un poisson",
            path: 'monumentpoisson',
            component: VueMonumentPoisson
          },
          {
            name: "Le lion Simba et sa femme Alexandra",
            path: "lelionsimba",
            component: VueLionSimba
          }
        ]
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
        },
        {
          name: "Livre sur Fred",
          path: 'livresurfred/:page',
          component: VueLivreSurFred
        }
      ],
      },
      {
        name: 'Prononciation',
        path: 'prononciation',
        children: [
          {
            name: 'Le son é',
            path: "sone",
            component: VueSonE
          },
          {
            name: 'Le son o',
            path: "sono",
            component: VueSonO
          }
        ]
      },
      {name: 'Grammaire',
       path: 'grammaire',
       children: [
        {
            name: 'Inversion du sujet et verbe',
            path: 'inversionsujetverbe',
            component: VueInversionSujetVerbe
        },
        {
          name: 'Ne explétif',
          path: 'neexpletif',
          component: VueNeExpletif
        },
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
        {
          name: 'Conduire ou courir à tous les temps et modes',
          path: 'conduireoucourir',
          component: VueConduireOuCourir
        },
        {
          name: 'Connaître ou savoir à présent de l\'indicatif',
          path: 'connaitreousavoir',
          component: VueConnaitreOuSavoir
        },
        {
          name: 'Mettre à présent de l\'indicatif',
          path: 'mettre',
          component: VueMettre
        }
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
      },
      {
        name: "Regex exercises",
        path: 'regexexercises',
        children : [
          {
            name: 'Appending text to text area instead of setting text of label',
            path: 'labelsettexttextareaappend',
            component: VueLabelSetTextTextAreaAppend
          },
          {
            name: 'Exclamation mark in French',
            path: 'pointdexclamationfr',
            component: VueRegexPointDExclamation
          },
          {
            name: 'Guillemets en francais',
            path: 'guillemetsfrancais',
            component: VueGuillemetsFrancais
          },
          {
            name: 'Parentheses en francais',
            path: 'parenthesesfrancais',
            component: VueParentheses
          }
        ]
        
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
});

router.$window = window;
router.$stupidProp = { age: 30, name: "Florian" };

router.window2 = window;
router.stupidProp2 = { age: 30, name: "Florian" };

/*
Vue.prototype.$window = window;
Vue.prototype.$stupidprop = { stupid: "This is a stupid object", age: 12 }; */
app.config.globalProperties.stupidProp = { age : 30, name: "Florian" };
console.log(app.config.globalProperties.stupidProp);

app.config.globalProperties.window = window;
console.log(app.config.globalProperties.window);

console.log(window);



app.use(router);
app.mount("#gaps");

