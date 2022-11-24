<script>
import firebaseapp from './firebaseconfig';

import { RouterLink, RouterView } from 'vue-router'
export default {
  data() {
    return {
     
    };
  },
  methods: {
   
    
  },
  mounted() {

   
  },

};

</script>

<template>

  <section class="hero is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link to="/" class="navbar-item ">Swanky Restraunt</router-link>
            <span class="navbar-burger" data-target="navbarMenuHeroC">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <router-link to="/" class="navbar-item is-active">Home</router-link>
              <router-link to="/summarydashboard" class="navbar-item is-active">Summary</router-link>
            </div>
          </div>
        </div>
      </header>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">

        <p class="subtitle">
          <router-view></router-view>
        </p>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <!-- <ul>
          <li class="is-active"><a>Overview</a></li>
          <li><a>Modifiers</a></li>
          <li><a>Grid</a></li>
          <li><a>Elements</a></li>
          <li><a>Components</a></li>
          <li><a>Layout</a></li>
        </ul> -->
          <!-- TODO: Handle some content in the footer later. -->
        </div>
      </nav>
    </div>
  </section>
</template>
<style scoped>

</style>
