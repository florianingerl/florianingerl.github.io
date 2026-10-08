<template>
  <VueSection id="preise" titel="Prix, rendez-vous et paiement">
    <div class="row">

      <div class="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content">

        <h3>Prix</h3>
        <p>4*25 euros pour 4*60 min de cours pour toi ou pour toi et un ami</p>
        <p>30 euros pour un seul cours de 60 min</p>
        <p></p>

        <p>
          Si le cours a duré plus que 60 minutes, il faut appliquer la formule:<br> Prix = Temps / (60
          min) * (Prix pour 60 min)
        </p>

        <p>
          Tu peux obtenir le prix le moins cher pour un forfait de 4*60 minutes si tu as suffisamment d'exercices intéressants.
          Pour le forfait, il faut prendre au moins une heure de cours chaque semaine. Je suis disponible tous les jours de la semaine de 8h à 21h et peux t'aider dans de nombreuses matières.
          !!! Attention !!! Si pour une raison quelconque tu ne peux pas ou n'en ressens pas le besoin pendant une semaine,
          l'argent serait toujours dû. Sinon, les mêmes conditions d'annulations que ci-dessous s'appliquent à chacune des 4 rendez-vous d'un paquet.
        </p>

        <h3>Rendez-vous, paiement et conditions d'annulation</h3>
        Je ne conviens de la première heure de cours que par mail. Je me tiens à disposition ensuite par Skype. Merci de suivre le processus de prise de rendez-vous suivant:

        <ol>
          <li>Tu m'envoies tes exercices et tes notes de cours.</li>
          <li>Si je connais ce genre d'exercices, je te dirai que tu peux effectuer le paiement
            via
            Paypal avec l'option "Envoyer de l'argent à vos proches"* ou virement bancaire +
            Screenshot. Dans l'intitulé du virement, merci d'inscrire ton nom et tes préférences de
            rendez-vous, par exemple quelque chose comme "Tutorat en mathématiques Elif souhaité le
            mercredi 11.1 à partir de 15h jusqu'à 21h  ou le samedi 12.1 entre 8h et 12h ou dimanche toute la journée".
          </li><li>Après avoir reçu le paiement, je te donnerai une confirmation de rendez-vous selon
            tes préférences (si c'est possible) ou je te proposerai 2-3 rendez-vous pour les
            prochains jours</li>
          <li>Nous attendons avec impatience notre rencontre et tu peux m'envoyer des exercices/notes de cours manquants ou supplémentaires.</li>
        </ol>

        <p><span style="font-weight: bold">!!!Attention aux conditions d'annulation, pas de report de rendez-vous!!!</span>
          Lors d'une annulation de rendez-vous (n'importe quand avant le cours) ou de problèmes techniques (par exemple une connection d'Internet instable, l'impossibilité d'utiliser Skype,Zoom,le microphone ou les haut-parleurs ) ou après un retard de plus de 10 minutes de ton côté, l'argent est quand-même dû et je ne suis plus tenu d'attendre.
        </p>

        <p>Lors d'une annulation ou une panne d'Internet de mon côté, tu recevras un autre rendez-vous
          ou ton
          argent.</p>
        <p>*Sans l'option "Envoyer de l'argent à vos proches", il y a 2 euros de frais pour Paypal.</p>
      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
</script>
