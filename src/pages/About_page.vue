<template>
  
  <div class="page-container">
  <header>
      <div class="navbar">
        <!-- Bouton du menu burger -->
        <div class="burger-menu" v-on:click="toggleMenu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="titre"><h2>Harry Potter App</h2></div>
        </div>
      </div>
    <nav class="mobile-menu" v-if="isMenuOpen">
      <ul>
        <router-link to="/"><li>Home</li></router-link>
      <router-link to="/pageChar"><li>The characters</li></router-link>
      <router-link to="/pageGame"><li>Game</li></router-link>
      <router-link to="/pageAbout"><li>About</li></router-link>
      </ul>
    </nav>
    <!-- </nav> -->
  </header>
  <div class="content">
    <!-- <h2>About</h2> -->

    <h2>Welcome to the Harry Potter-themed website!</h2>
    <p>As a student at IMAC School, I've poured my passion for the Harry Potter universe into every aspect of this site. From character profiles to a spellbinding quiz, immerse yourself in the magic of J.K. Rowling's creation.</p>

    <h2>What is that website ?</h2>
    <p>Character Information: Dive deep into the world of Harry Potter with detailed information about your favorite characters. Learn about their backgrounds, personalities, and roles in the wizarding world.</p>
    <p>Spell Quiz: Put your magical knowledge to the test with our spell quiz! Challenge yourself to identify spells from the beloved Harry Potter books and movies. Can you achieve a perfect score?</p>

    <h2>The code</h2>
    <p>I created the website using HTML, CSS, and Vue.js – the progressive JavaScript framework. This allows us to create a seamless and interactive user experience, bringing the magic of Harry Potter to life on your screen.</p>

    <h2>Illustrations</h2>
    <p>The differents illustrations were created by the AI artist Lexica Aperture, adding a touch of magic to every page of the website.</p>
    <p>The real pictures of some of the characters were provided by the API itself.</p>

  </div>
</div>
  <footer>
  <div class="footer">
  <li>
      <ul>
        API :
        <a href="https://hp-api.onrender.com">Link to the API</a>
      </ul>
      <ul>
        © 2024, Enora Couron
      </ul>
      <ul>
        <router-link to="/pageAbout">About</router-link>
      </ul>
    </li>
    <img src="..\assets\imgFooter.png" alt="" />
  </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    }
  },
  mounted() {
    if (window.innerWidth >= 769) {
      this.isMenuOpen = true;
    }

    // Vérifier la taille de l'écran lors du chargement de la page
    this.checkScreenSize();

    // Écouter les événements de redimensionnement de la fenêtre
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeDestroy() {
    // Retirer l'écouteur d'événement lors de la destruction du composant
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    // Mettre à jour la variable isMenuOpen en fonction de la taille de l'écran
    checkScreenSize() {
        if (window.innerWidth >= 769) {
          this.isMenuOpen = true;
        } else {
          this.isMenuOpen = false;
        }
      }
  },
}
</script>

<style scoped>
h2{
  color: var(--brown);
}

.burger-menu h2{
  color: var(--white);
}

.content{
  margin-bottom: 20px;
}
/* responsive mobile */
@media (max-width: 768px) {
  /* Css header */
  header{
    background: var(--brown);
    margin: 0;
    padding: 10px;
  }
  .burger-menu .bar {
  width: 25px;
  height: 3px;
  background-color: var(--white);
  margin: 5px 0;
}

  .HomePage{
  display: block;
  width: 80%;
}
header{
  z-index: 20;
}
li{
  display: block;
  width: fit-content;
}
.burger-menu {
    display: block;
  }

  nav {
    display: block;
  }
}

/* Responsive Tablettes et PC */
@media (min-width: 769px) {
  nav {
    display: block;
  }
}
</style>
