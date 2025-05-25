<template>
    <vue-quiz :lg="lg" :questions="questions"></vue-quiz>
</template>

<script>
import VueQuiz from "./vue-quiz.vue";

export default {

  components: {
    
    VueQuiz ,
  
  },

  props: ['lg'],

  setup(){
     console.log("The setup function is executed!");
     
  },
  
  data() {
    return {
       questions: 
      [
		
	{
		question: "Wo kann man Nachhilfeunterricht für Sprachen und MINT-Fächer kostenlos anbieten?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Kleinanzeigen", correct: true }, { option : "An den Türen von Toiletten.", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
    {
		question: "Wo kann man eigene Tests für romanische Fremdsprachen ins Internet stellen?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Beim Gymnasium Gröbenzell auf der Homepage", correct: false }, { option : "Auf francaisfacile.com, anglaisfacile.com, espagnolfacile.com...", correct: true }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
     {
		question: "Was sollte man am Tag vor einer Prüfung tun?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Nur noch Waldspaziergang und andere meditative, entspannende Tätigkeiten, um in der Prüfung einen frischen Kopf zu haben", correct: true }, { option : "Bis zur letzten Sekunde vor der Prüfung Stoff in den Schädel stopfen!", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
    {
		question: "Sollte man vor einer Prüfung um ca. 9 Uhr frühstücken?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Nein, sonst ist die Energie im Bauch und nicht voll im Kopf", correct: true }, { option : "Ja, denn bei leerem Magen kann man doch nicht denken. Außerdem braucht das Gehirn viel Zucker.", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
	{
		question: "Was könnte dich dazu motivieren, besser Englisch zu lernen?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Du kannst eine teure Reise ins verregnete England machen", correct: false }, { option : "Du kannst dann Engländern Deutsch-Nachhilfe verkaufen", correct: true }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
	{
		question: "Was könnte dich dazu motivieren, besser Französisch zu lernen?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Du kannst vielleicht mal nach Südfrankreich auswandern, wo es mehr Sonne als hier gibt", correct: true }, { option : "Du kannst Franzosen Deutsch-Nachhilfe verkaufen", correct: true }, { option : "Du kannst in Frankreich teuren Urlaub machen und weißt wie man im Restaurant teuren Schrott bestellt.", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
	{
		question: "Wenn dein Hobby (wie z.B. Schach oder Bücherlesen) langweilig geworden ist, wie belebst du es neu?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Lerne dein Hobby auf Englisch, Französisch oder Spanisch", correct: true }, { option : "Lass dir die Regeln von deinem Hobby nochmal von einem Staatsdiener erklären", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
	{
		question: "Was könnte dich noch zum besser Englisch-Lernen motivieren?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Eine gute deutsche Psychaterin kostest 150 Euro/h. Einer Englischnachhilfelehrerin kann man auch alles erzählen und die kostet nur 25Euro/h", correct: true }, { option : "Um Hollywood-Filme und anderes Gift in der Orginal-Sprache sehen zu können", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},

	{
		question: "Was könnte dich noch mehr zum Spanisch-Lernen motivieren?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Spanisch-Nachhilfe von einer spanischen Doktorin der Chemie kostest nur 20 Euro/h", correct: true }, { option : "Um die Filme auf Netflix jetzt auch in Spanisch verstehen zu können", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},

	{
		question: "Was könnte dich noch mehr zum Spanisch, Englisch und Französisch-Lernen motivieren?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Eine gute deutsche Psychaterin kostest 150 Euro/h, wohingegen eine Englisch,Spanisch oder Französisch-Nachhilfelehrerin aus Ghana,Venezuela oder Kamerun nur 7 Euro/h kostet und auch gut zuhören kann.", correct: true }, { option : "Du kannst in diesen Ländern Urlaub machen und dort im Restaurant Schrott auf Englisch,Französisch und Spanisch bestellen.", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
	{
		question: "Ab wann kannst du Tutor an der Uni machen?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Erst, sobald du deinen Bachelor-Abschluss hast und genügend kompetent bist.", correct: false }, { option : "Gleich nach dem ersten Semester", correct: true }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},
	{
		question: "Wo kannst du deine eigenen MINT-Aufgaben online publizieren?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Auf der Homepage von der LMU München", correct: false }, { option : "Auf MaxAcademy", correct: true }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},

	{
		question: "Ab wann kannst du Englisch-Nachhilfe geben?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option : "Ab der 6.Klasse kannst du 5.Klässlern und Klassenkameraden bezahlte Nachhilfe geben", correct: true }, { option : "Erst mit einer abgeschlossenen Ausbildung zur Fremdsprachenkorrespondentin", correct: false }, { option : "Erst mit einem abgeschlossenen Lehramt-Studium in Englisch", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},

	{
		question: "In welcher Haltung kann man im Winter lange lesen, ohne dass einem müde oder kalt wird?",
		questionFr : "Comment s'appelle ce légume?",
		questionEn : "What is the name of this vegetable?",
		imageUrl: "assets/img/rawfood/krabbeln.png",
		type: "multiple choice",
		options: [{ option : "Am Boden hin und her krabbelnd", correct: true }, { option : "Im Stehen", correct: false }, { option : "Spazieren gehend in der Kälte draußen", correct: false }, { option : "Fahrad fahrend in der Kälte draußen", correct: false }],
		optionsFr : [{ option : "tomate", correct: false }, { option : "betterave rouge", correct: true }],
		optionsEn : [{ option : "tomato", correct: false }, { option : "beetroot", correct: true }],
		correct: 1

	},

	{
		question: "Welche Körperhaltung ist zum Lernen am besten?",
		questionFr : "Quelle posture est la meilleure pour apprendre ?",
		questionEn : "What posture is best for learning?",
		imageUrl: "assets/img/rawfood/krabbeln.png",
		type: "multiple choice",
		options: [{ option : "Eine wechselnde Haltung mit viel Bewegung", correct: true }, { option : "Unbeweglich im Sitzen", correct: false }],
		optionsFr : [{ option : "Une posture changeante avec beaucoup de mouvement", correct: false }, { option : "Immobile en position assise", correct: true }],
		optionsEn : [{ option : "A changing posture with plenty of movement", correct: false }, { option : "Sitting motionless", correct: false }],
		correct: 1

	}


]
    };
  },
 
};
</script>

<style scoped>

</style>