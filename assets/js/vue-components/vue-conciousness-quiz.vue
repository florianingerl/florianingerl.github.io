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
		question: "In welcher Situation bist du bewusster?",
questionEn:  "In which situation are you more conscious?",
		questionFr: "Dans quelle situation est-ce que tu es le plus conscient?",
		imageUrl: "assets/img/cs/atem.jpg",
		type: "multiple choice",
		options: [ {option: "Wenn du gerade deinen eigenen Atem fühlen kannst.", correct: true }, { option: "Wenn du weißt, dass dein Gegenüber gerade unrecht hat.", correct: false } ],
optionsEn:  [ {option: "When you can feel your own breath", correct: true }, { option: "When you know that the other person is wrong.", correct: false } ],
		optionsFr:  [ {option: "Quand tu peux sentir ta propre respiration", correct: true }, { option: "Quand tu sais que l'autre a tort", correct: false } ],
		correct: 0

	}
  ,

	{
		question: "In welcher Situation bist du bewusster?",
questionEn:  "In which situation are you more conscious?",

		questionFr: "Dans quelle situation est-ce que tu es le plus conscient?",
		imageUrl: "assets/img/cs/schwerkraft.jpg",
		type: "multiple choice",
		options: [{ option: "Wenn du die Schwerkraft gerade fühlen kannst.", correct: true }, { option: "Wenn du dir der globalen Probleme bewusst bist.", correct: false }],
optionsEn:  [{ option: "When you can feel the gravity.", correct: true }, { option: "When you are aware of global problems", correct: false }],
		optionsFr: [{ option: "Quand tu peux sentir la pesanteur", correct: true }, { option: "Quand tu es conscient des problèmes globales", correct: false }],
		correct: 0
	},
	
	{
		question: "Was ist wichtiger?",
questionEn:  "What is more important?",
		questionFr: "Qu'est-ce qui est le plus important?",
		imageUrl: "assets/img/cs/wald.jpg",
		type: "multiple choice",
		options: [{ option: "Die neuesten Neuigkeiten aus der Welt zu kennen.", correct: false }, { option: "Dir der Stille und des Raumes um dich herum jetzt bewusst bist zu sein.", correct: true }],
optionsEn:  [{ option: "Knowing the lastest news from the world", correct: false }, { option: "Being aware of the stillness and the space around you", correct: true }],
		optionsFr: [{ option: "Connaitre les plus dernières nouvelles des journaux", correct: false }, { option: "Être conscient de l'espace et du silence autour de toi", correct: true }],
		correct: 1
	},
	
	
	{
		question: "Was ist ein Tor zum gegenwärtigen Moment?",
questionEn:  "What is a gateway to the present moment?",
		questionFr: "Qu'est-ce qu'une porte d'éntrée vers le moment présent?",
		imageUrl: "assets/img/cs/amsel.jpg",
		type: "multiple choice",
		options: [{ option: "Der Gedanke an die nächste Mahlzeit.", correct: false }, { option: "Den Geräuschen und der Stille um dich herum zu lauschen.", correct: true }],
optionsEn:  [{ option: "Thinking of the next meal", correct: false }, { option: "Listening to the sounds and the silence around you.", correct: true }],
		optionsFr: [{ option: "La pensée au prochain repas", correct: false }, { option: "Écouter les bruits et la silence autour de toi", correct: true }],
		correct: 1
	},
	
	{
		question: "Du bist unzufrieden in deiner Arbeit. Welche der folgenden 4 Optionen ist nicht gut?",
questionEn:  "You are unssatisfied with your work. Which of the following 4 options is not good?",
		questionFr: "Tu n'est pas heureux avec ton travail. Laquelle des 4 options suivantes n'est pas bonne?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option: "Situation verändern", correct: false }, { option: "Situation komplett akzeptieren", correct: false }, { option: "Situation trotz innerer Widerstände aushalten", correct: true }, { option: "Arbeit kündigen und gehen", correct: false }],
optionsEn:  [{ option: "Change the situation", correct: false }, { option: "Accept the situation completely", correct: false }, { option: "Endure the situation despite inner resistance", correct: true }, { option: "Quit your job and leave", correct: false }],
		optionsFr: [{ option: "Changer la situation", correct: false }, { option: "Accepter complètement la situation", correct: false }, { option: "Supporter la situation malgré la résistance interne", correct: true }, { option: "quitter son emploi et partir", correct: false }],
		correct: 2
	},
	
	{
		question: "Was ist eine Emotion?",
questionEn:  "What is an emotion?",
		questionFr: "Qu'est-ce une émotion?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option: "Etwas, was man mit Tabletten betäuben kann", correct: false }, { option: "Etwas, wovon man sich mithilfe der Nachrichten ablenken kann", correct: false }, { option: "Alte Gefühle, die damals nicht bewusst verarbeitet wurden, im Körper jetzt noch feststecken und getriggert werden können", correct: true }, { option: "Sowas wie Liebe", correct: false }],
optionsEn:  [{ option: "Something that you can numb with pills", correct: false }, { option: "Something that you can distract yourself from with the help of the news", correct: false }, { option: "Old feelings that were not consciously processed at the time, that are still stuck in the body and can be triggered", correct: true }, { option: "Something like love", correct: false }],
		optionsFr: [{ option: "Quelque chose que l'on peut engourdir avec des pilules", correct: false }, { option: "Quelque chose dont on peut se distraire avec l'aide des nouvelles", correct: true }, { option: "Des anciens sentiments qui n'ont pas été consciemment traités à l'époque mais qui sont encore coincés dans le corps et peuvent être déclenchés", correct: false }, { option: "Quelque chose comme l'amour", correct: false }],
		correct: 2
	},
	
	{
		question: "Womit kann man Gefühle fühlen?",
questionEn:  "How can you feel feelings?",
		questionFr: "Comment ressentir des sentiments?",
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option: "Mit dem Verstand", correct: false }, { option: "mit dem Körper", correct: true }, { option: "mit den Ratschlägen deiner Eltern", correct: false }, { option: "mit den Ratschlägen des Staates", correct: false }],
optionsEn:  [{ option: "with your mind", correct: false }, { option: "with your body", correct: true }, { option: "with the advice of your parents", correct: false }, { option: "with the advice of the state", correct: false }],
		optionsFr: [{ option: "Avec ton esprit", correct: false }, { option: "avec le corps", correct: true }, { option: "avec les conseils de tes parents", correct: false }, { option: "avec les conseils de l'état", correct: false }],
		correct: 1
	},
	{
		question: "Warum ist es wichtig Gefühle wahrzunehmen?",
questionEn:  "Why is it important to be aware of your feelings?",
		questionFr: "Pourquoi est-ce qu'il est important de s'apercevoir de ses sentiments?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option: "Weil sie uns ins Hier und Jetzt bringen", correct: true }, { option: "Weil sie uns von unserer Pflicht ablenken", correct: false }],
optionsEn:  [{ option: "Because they bring us to the present moment", correct: true }, { option: "Because they distract us from our duty", correct: false }],
		optionsFr: [{ option: "Parce qu'ils nous amènent dans le moment présent", correct: true }, { option: "parce qu'ils nous distraient de notre travail", correct: false }],
		correct: 0
	},
	
	{
		question: "Wer bist du?",
questionEn:  "Who are you?",
		questionFr: "Qui es-tu?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option: "Die Stimme im Kopf", correct: false }, { option: "Der Körper", correct: false }, { option: "Eine Geschichte oder ein Lebenslauf", correct: false }, { option: "Der gegenwärtige Moment", correct: true }],
optionsEn:  [{ option: "The voice in your head", correct: false }, { option: "The body", correct: false }, { option: "A story or a CV", correct: false }, { option: "The present moment", correct: true }],
		optionsFr: [{ option: "La voix dans la tête", correct: false }, { option: "Le corps", correct: false }, { option: "Une histoire ou un CV", correct: false }, { option: "Le moment présent", correct: true }],
		correct: 3
	},
	
	{
		question: "Wenn jemand das feine Fühlen lernen will, womit sollte er anfangen?",
questionEn:  "If someone wants to learn how to feel, where should he begin?",
		questionFr: "Si quelqu'un veut apprendre à sentir, où doit-il commencer?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option: "Softdrinks", correct: false }, { option: "Geschlechtsverkehr", correct: false }, { option: "Alkohol", correct: false }, { option: "dem eigenen Atem", correct: true }, { option: "Zigaretten", correct: false }, { option: "laute Musik", correct: false }],
optionsEn:  [{ option: "soft drinks", correct: false }, { option: "sex", correct: false }, { option: "alcohol", correct: false }, { option: "his own breathing", correct: true }, { option: "cigarettes", correct: false }, { option: "loud music", correct: false }],
		optionsFr: [{ option: "Boissons gazeuses", correct: false }, { option: "sex", correct: false }, { option: "de l'alcool", correct: false }, { option: "sa propre respiration", correct: true }, { option: "les cigarettes", correct: false }, { option: "de la musqiue forte", correct: false }],
		correct: 3
	},

	{
		question: "Womit muss man bezahlen, wenn irgendwo (meistens beim Staat oder beim Arzt) etwas scheinbar kostenlos ist?",
questionEn:  "What do you have to pay with if something appears to be free somewhere (usually at the government or at the doctor's office)?",
		questionFr: "Avec quoi dois-tu payer si quelque chose semble être gratuit quelque part (généralement au gouvernement ou chez le médecin) ??", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option: "Mit seiner Freiheit", correct: false }, { option: "Mit seiner Gesundheit", correct: false }, { option: "Mit seiner Zeit", correct: false }, { option: "Mit seiner Fähigkeit selber zu Fühlen und zu Denken", correct: false }, { option: "Mit allem 4", correct: true }],
optionsEn:  [{ option: "With your freedom", correct: false }, { option: "With your health", correct: false }, { option: "With your time", correct: false }, { option: "With your cabability to think and feel for yourself", correct: false }, { option: "All 4 options are correct", correct: true }],
		optionsFr: [{ option: "Avec ton liberté", correct: false }, { option: "Avec ta santé", correct: false }, { option: "Avec ton temps", correct: false }, { option: "Avec ton talent de sentir et réfléchir toi-même", correct: false }, { option: "Tous les 4 options sont correctes", correct: true }],
		correct: 4
	},
	{
		question: "Was bedeutet es meistens, wenn jemand die Stimme in seinem Kopf nicht hören kann?",
questionEn:  "What does it usually mean if someone can't hear the voice in his head?",
		questionFr: "Qu'est-ce que cela signifie si quelqu'un ne peut pas entendre la voix dans sa tête?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [{ option: "Dass es keine Stimme in seinem Kopf gibt", correct: false }, { option: "Dass er die Stimme im Kopf ist (d.h. komplett mit ihr identifiziert)", correct: true }],
optionsEn:  [{ option: "That there is no voice in his head", correct: false }, { option: "That he is the voice (completely identified with it)", correct: true }],
		optionsFr: [{ option: "Qu'il n'y a pas de voix dans sa tête", correct: false }, { option: "Qu'il est la voix ( complètement identifié à elle)", correct: true }],
		correct: 1
	},
	{
		question: "Welches Gefühl gehört nicht zu den 6 Primärgefühlen, die alle Säugetiere kennen?",
questionEn:  "Which feeling is not one of the 6 primary feelings that all mammals know?",
		questionFr: "Quel sentiment n'appartient pas aux 6 sentiments primaires que tous les mammifères connaissent?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Angst", correct: false }, { option: "Freude", correct: false }, { option: "Wut", correct: false }, { option: "Ekel", correct: false }, { option: "Überraschung", correct: false }, { option: "Nervosität", correct: true }, { option: "Trauer", correct: false }],
optionsEn:  [ { option: "fear", correct: false }, { option: "joy", correct: false }, { option: "anger", correct: false }, { option: "disgust", correct: false }, { option: "surprise", correct: false }, { option: "nervousness", correct: true }, { option: "sadness", correct: false }],
		optionsFr: [ { option: "peur", correct: false }, { option: "joie", correct: false }, { option: "colère", correct: false }, { option: "dégoût", correct: false }, { option: "ivresse", correct: false }, { option: "nervosité", correct: true}, { option: "tristesse", correct: false }],
		correct: 5
	},
	{
		question: "Was kann man tun, um klarer zwischen seinen eigenen Gedanken und Emotionen und denen anderer unterscheiden zu können?",
questionEn:  "What can you do to differentiate more clearly between your own thoughts and emotions and those of others?",
		questionFr: "Qu'est qu'on peut faire pour être capable de distinguer plus clairement entre ses propres pensées et émotions et celles des autres? ", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Fernseher verschrotten", correct: false }, { option: "Zeitung nicht lesen", correct: false }, { option: "Von zuhause ausziehen", correct: false }, { option: "Alle 3 Optionen sind richig", correct: true }],
optionsEn:  [ { option: "get rid of the TV", correct: false }, { option: "not read the newspaper", correct: false }, { option: "move out from home", correct: false }, { option: "All 3 options", correct: true }],
		optionsFr: [ { option: "n'avoir pas de télé", correct: false }, { option: "ne lire pas les nouvellles", correct: false }, { option: "avoir son propre appartement", correct: false }, { option: "Toutes les 3 options sont correctes", correct: true }],
		correct: 3
	},
	{
		question: "Welches Buch solltest du eher lesen, wenn du ein selbstbestimmtes Leben führen willst?",
questionEn:  "Which book should you read if you want to lead a self-determined life?",
		questionFr: "Quel livre devrais-tu lire si tu veux mener une vie libre?", 
		imageUrl: "assets/img/cs/powerofnow.png",
		type: "multiple choice",
		options: [ { option: "Eckhart Tolle - The power of Now", correct: true }, { option: "Klaus Schwab - Coronna und der Great Reset", correct: false }, { option: "Kochrezepte Andrenochrom", correct: false }],
optionsEn:  [ { option: "Eckhart Tolle - The power of Now", correct: true }, { option: "Klaus Schwab - Coronna und der Great Reset", correct: false }, { option: "cooking recipe Andrenochrom", correct: false }],
		optionsFr: [ { option: "Eckhart Tolle - Le pouvoir du moment présent", correct: true }, { option: "Klaus Schwab - Coronna et le Great Reset", correct: false }],
		correct: 0
	},

	{
		question: "Woran bemerkst du, ob es dir selbst gut geht?",
questionEn:  "How do you know if you are doing well?",
		questionFr: "De quoi est-ce que tu te rends compte que tu vas bien?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "An dem Ton deiner Stimme", correct: false }, { option: "deinem Atem", correct: false }, { option: "der Schwerkraft", correct: false }, { option: "deinem Gesichtsausdruck", correct: false }, { option: "alle 4 Optionen sind richtig", correct: true }],
optionsEn:  [ { option: "By the sound of your voice", correct: false }, { option: "by your breathing", correct: false }, { option: "by the gravity", correct: false }, { option: "by the expresssion on your face", correct: false }, { option: "all 4 options are correct", correct: true }],
		optionsFr:  [ { option: "de ta voix", correct: false }, { option: "de ta respiration", correct: false }, { option: "de la pesanteur", correct: false }, { option: "de l'expression sur ton visage", correct: false }, { option: "toutes les 4 options sont correctes", correct: true }],
		correct: 4
	},
	{
		question: "Woran bemerkst du, dass es deinem Gegenüber gut geht?",
questionEn:  "How do you know that the other one is doing well?",
		questionFr: "Comment savoir si ton interlocuteur va bien?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Kannst du nur bemerken wenn du dich selbst fühlen kannst", correct: false }, { option: "dem Ton seiner Stimme", correct: false }, { option: "seinem Gesichtsausdruck", correct: false }, { option: "seiner Körperhaltung", correct: false }, { option: "seinem Atem", correct: false }, { option: "alle 5 Optionen sind richtig", correct: true }],
optionsEn:  [ { option: "You can only notice this when you are you conscious of yourself", correct: false }, { option: "the sound of his voice", correct: false }, { option: "the expression on this face", correct: false }, { option: "his posture", correct: false }, { option: "his breathing", correct: false }, { option: "all 5 options are correct", correct: true }],
		optionsFr:  [ { option: "Tu ne peux le remarquer que si tu peux sentir toi-même", correct: false },{ option: "de sa voix", correct: false }, { option: "de l'expression sur son visage", correct: false }, { option: "de sa posture", correct: false }, { option: "toutes les 5 options sont correctes", correct: true }],
		correct: 5
	},

	{
		question: "Wie lernt man Mathe, Physik oder Informatik?",
questionEn:  "How do you learn maths, physics or computer science?",
		questionFr: "Comment est-ce que tu apprends les maths, la physique ou l'informatique?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Mit der Angst und Blockierung, eine nicht vom staatlichen Lehrer anerkannte Notation oder Lösungweg zu verwenden.", correct: false }, { option: "Mit dem Motto: Alles, was begründet ist und was mein Gegenüber versteht, ist korrekt.", correct: true }, { option: "mit Neugier, neue Sachen auf die eigene Art auszuprobieren", correct: true }],
optionsEn:  [ { option: "With the fear and blockage of using a notation or solution that is not recognized by the state teacher.", correct: false }, { option: "With the motto: Everything that is justified and what the other person understands is correct.", correct: true }, { option: "with curiosity to try new things in your own way", correct: true }],
		optionsFr:  [ { option: "Avec la peur et le blocage d'utiliser une notation ou une solution qui n'est pas reconnue par le professeur d'état.", correct: false },{ option: "Avec la devise : Tout ce qui est justifié et ce que l'autre comprend est correct.", correct: true }, { option: "Avec curiosité d'essayer de nouvelles choses à ta manière", correct: true }],
		correct: 5
	},

	{
		question: "Wie lernt man Hatha-Yoga?",
questionEn:  "How do you learn Hatha-Yoga?",
		questionFr: "Comment est-ce que tu apprends Hatha-Yoga?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Mit der Angst und Blockierung, eine nicht vom Buch oder Lehrer anerkannte Bewegung mit der genau richtigen Reihenfolge und Dauer zu machen.", correct: false }, { option: "Mit Neugier probiert man aus, wo welche (selbst variierte/ausgedachte) Übung dehnt, kräftigt, etc...", correct: true }],
		
optionsEn:  [ { option: "With the fear and blockage of doing a movement that is not recognized by the book or teacher and with exactly the right order and duration.", correct: false }, { option: "With curiosity you try out which (self-varied/thought-up) exercise where stretches, strengthens, etc...", correct: true }],
		optionsFr:  [ { option: "Avec la peur et le blocage de faire un mouvement qui n'est pas reconnu par le livre ou le professeur et avec exactement le bon ordre et la bonne durée.", correct: false }, { option: "Avec curiosité, vous essayez lequel (auto-varié/pensé -up) exercice où s'étire, se renforce, etc...", correct: true }],
		correct: 5
	},

	{
		question: "Was bewirkt es, mehr Aufmerksamkeit auf die Ausatmung zu lenken?",
questionEn:  "What does bringing more attention to exhalation do?",
		questionFr: "À quoi sert d’accorder davantage d’attention à l’expiration?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "mehr Entspannung", correct: true }, { option: "Langeweile", correct: false },{ option: "Man verliert den Verstand dabei", correct: false }],
optionsEn:  [ { option: "more relaxation", correct: true }, { option: "boredom", correct: false },{ option: "You loose your mind", correct: false }],
		optionsFr:  [ { option: "plus de détente", correct: true }, { option: "d'ennui", correct: false }, {option: "Tu perds la tête.", correct: false}],
		correct: 0
	},
	
	{
		question: "Was bewirkt es, mehr Aufmerksamkeit auf die Einatmung zu lenken?",
questionEn:  "What does bringing more attention to inhalation do?",
		questionFr: "À quoi sert d’accorder davantage d’attention à l’inhalation?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "mehr Wachheit", correct: true }, { option: "Langeweile", correct: false }, { option: "Verlust von Bewusstein", correct: false }],
optionsEn:  [ { option: "more alterness", correct: true }, { option: "boredom", correct: false }, { option: "You loose consciousness", correct: false }],
		optionsFr:  [ { option: "plus de vigilance", correct: true }, { option: "d'ennui", correct: false }, { option: "Tu perds connaissance", correct: false }],
		correct: 0
	},

	{
		question: "Wo ist dein größter Feind?",
questionEn:  "Where is your greates enemy?",
		questionFr: "Où est ton plus grand enemie?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "zwischen deinen Ohren (wenn unbeobachtet)", correct: true }, { option: "dein Chef", correct: false }, { option: "deine Schwester", correct: false }, { option: "dein Bruder", correct: false }, { option: "dein Vater", correct: false }, { option: "deine Mutter", correct: false }],
optionsEn:  [ { option: "between your ears (if unobserved)", correct: true }, { option: "your boss", correct: false }, { option: "your sister", correct: false }, { option: "your brother", correct: false }, { option: "your father", correct: false }, { option: "your mother", correct: false }],
		optionsFr:  [ { option: "entre tes oreilles (si non surveilé)", correct: true }, { option: "ton patron", correct: false }, { option: "ta soeur", correct: false }, { option: "ton frère", correct: false }, { option: "ton père", correct: false }, { option: "ta mère", correct: false }],
		correct: 0
	},

		{
		question: "Was hilft dir dabei, ruhelos, oberflächlich und gestresst zu werden?",
questionEn:  "What helps you become restless, superficial, and stressed?",
		questionFr: "Qu’est-ce qui vous aide à devenir agité, superficiel et stressé ?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Facebook", correct: true }, { option: "Spam", correct: true }, { option: "Nachrichten", correct: true }, { option: "Ein gutes Buch", correct: false }, { option: "Ein Handy und Whatsapp", correct: true }, { option: "Ein Waldspaziergang", correct: false } ],
optionsEn:  [ { option: "Facebook", correct: true }, { option: "spam messages", correct: true }, { option: "a good book", correct: false }, { option: "a cell phone and WhatsApp", correct: true }, { option: "a walk in the forest", correct: false } ],
		optionsFr:  [ { option: "Facebook", correct: true }, { option: "les spams", correct: true }, { option: "un bon livre", correct: false }, { option: "un téléphone portable et WhatsApp", correct: true }, { option: "une balade en forêt", correct: false } ],
		correct: 0
	},



	{
		question: "Was bedeutet Manifestieren?",
questionEn:  "What does manifesting mean?",
		questionFr: "Que signifie manifester?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Wahrnehmen und schätzen der guten Dinge, die jetzt hier sind", correct: true }, { option: "sich etwas wünschen, was jetzt nicht da ist", correct: false }],
optionsEn:  [ { option: "Notice and appreciate the good things that are around you now", correct: true }, { option: "wishing for something that isn't here now", correct: false }],
		optionsFr:  [ { option: "remarquer les bonnes choses qui sont là ici et maintenant", correct: true }, { option: "souhaiter quelque chose qui n'est pas là ici et maintenant", correct: false }],
		correct: 0
	},
	{
		question: "Was macht die Stimme im Kopf, wenn du ihr zuhörst?",
questionEn:  "What does the voice in your head do when you listen to it?",
		questionFr: "Quoi la voix dans la tête fait-elle quand tu l'écoutes?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Die Stimme verstummt, weil sie das Bewusstsein nicht aushält", correct: true }, { option: "Sie sagt mir nichts mehr, also mach ich lieber den Fernseher an.", correct: false }],
optionsEn:  [ { option: "The voice falls silent because it can't bear consciousness", correct: true }, { option: "It doesn't tell me anything anymore, so I have to turn on the TV.", correct: false }],
		optionsFr:  [ { option: "Elle se taise parce qu'elle ne peut pas supporter la conscience", correct: true }, { option: "Elle ne me parle plus, donc j'allume la télé.", correct: false }],
		correct: 0
	},	{
		question: "Du hast große Pläne, um die Welt zu retten oder besser zu machen. Was ist günstiger, als es umzusetzen?",
questionEn:  "You have big plans to save the world or make it better. What is cheaper than implementing it?",
		questionFr: "Vous avez de grands projets pour sauver le monde ou le rendre meilleur. Qu’est-ce qui coûte moins cher que de le mettre en œuvre?", 
		imageUrl: "assets/img/cs/fragezeichen.jpg",
		type: "multiple choice",
		options: [ { option: "Mit deiner Psychaterin darüber sprechen", correct: true }, { option: "Mit deiner Englisch-Nachhilfelehrerin darüber sprechen", correct: true }, { option: "Mit deiner Französisch-Nachhilfelehrerin darüber sprechen", correct: true }, { option: "Die eigene Wohnung durchputzen", correct: true }],
optionsEn:  [ { option: "Talk to your psychiatrist about it", correct: true }, { option: "Talk to your English tutor about it", correct: true }, { option: "Talk to your French tutor about it", correct: true }, { option: "Clean your own flat", correct: true } ],
		optionsFr:  [ { option: "Parle-en à ton psychiatre", correct: true }, { option: "Parle-en à ta prof privée d'anglais", correct: true }, { option: "Parle-en à ta prof privée de francais", correct: true }, { option: "Nettoyer ton propre appartement", correct: true }],
		correct: 0
	}

	

]
    };
  },
 
};
</script>

<style scoped>

</style>