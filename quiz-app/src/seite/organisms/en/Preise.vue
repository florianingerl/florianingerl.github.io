<template>
  <VueSection id="preise" titel="Prices, appointments and payment">
    <div class="row">

      <div class="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content">

        <h3>Prices</h3>
        <p>4*30 euros for 4*60 min of private tutoring <br>
          Or you can bring your friend, learn together and the price will still be the same: 30 euro for 2 people.</p>
          <p></p>

        <p>
          If the private lesson takes longer than 60 minutes, the following formula applies:<br> Price
          = Duration / (60 min) * (Price
          for 60 min)
        </p>

        <h3>Appointments and Cancellation Policy</h3>
        The process of making an appointment is as follows:
        <ol>
          <li>You send me your exercises and your associated theory script.
          </li>
          <li>If I am familiar with exercises like these, I will let you know and you can
            transfer the
            money in advance (via Paypal with the "Send money to friends" option*).
            In the subject line, please include your name and your appointment availability, for
            example something like "Math tutoring Elif free on Wed 1st Nov from 3 p.m. to 9 p.m or Saturday 1st Dec
            between 8 a.m. and 12 p.m. or Sunday all day"

          </li>
          <li>After your payment, I will give you an appointment confirmation
            according to your preferences (if it suits me) or I will suggest 2-3 appointments for the
            next few days</li>
          <li>We are looking forward to our meeting and you may send any missing or additional exercises/lecture notes.</li>
        </ol>
        <p><span style="font-weight: bold">!!!Attention!!! !!!Cancellation conditions!!!</span>
        </p><p> In case of a cancellation (before the start of the tutoring), technical problems (e.g. unstable internet for
          more than 10 minutes) or a delay of more than 10 minutes on your part, the fee is due and I
          am not obligated to wait any longer - regardless of the duration of the booked appointment.
        </p>

        <p>In the event of short-term cancellations or an internet failure on my part, you will receive
          an alternative appointment or a refund.</p>

        <p>*Without the "Send money to a friend" option, there is a 2 euro fee for Paypal.</p>
        <p></p>

      </div>
    </div>
  </VueSection>
</template>

<script setup lang="ts">
import VueSection from "../../atoms/VueSection.vue";
</script>
