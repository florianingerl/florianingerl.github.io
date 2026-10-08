<template>
<div :class="{ topnav: true, responsive : responsive }" id="myTopnav">
   <router-link :class="{active : $route.fullPath.includes('/french') }" to="/fr/french">Français</router-link>
   <router-link :class="{active : $route.fullPath.includes('/english') }" to="/en/english">English</router-link>
   <router-link :class="{active : $route.fullPath.includes('/deutsch') }" to="/de/deutsch">Deutsch</router-link>
   <router-link :class="{active : $route.fullPath.includes('/espagnol') }" to="/esp/espagnol">Espagnol</router-link>
   <router-link :class="{active : $route.fullPath.includes('/informatik') }" to="/informatik">Computer science</router-link>

   <router-link :class="{active : $route.fullPath.includes('/mithelfen') }" to="/mithelfen">Mithelfen</router-link>
  <a href="javascript:void(0);" class="icon" @click="responsive = !responsive">
    <i class="fa fa-bars"></i>
  </a>
</div>

<div id="main" class="pl-[16px]">

    <router-view></router-view>

</div>

<div v-if="grossesBild" class="fixed inset-0 z-[9999] cursor-pointer bg-black bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: 'url(' + grossesBild + ')' }" @click="grossesBild = null"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { grossesBild } from "./bild";

// Auf schmalen Bildschirmen klappt das Menü erst nach einem Klick auf die Balken auf
const responsive = ref(false);
</script>

<style scoped>
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
