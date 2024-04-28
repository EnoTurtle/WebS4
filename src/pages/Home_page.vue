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
  </header>

  <div class="HP-title"><h1>Harry Potter website</h1></div>
    <div class="HomePage">
      <!-- Images qui renvoient sur différentes pages -->
      <router-link to="/pageChar"><img src="..\assets\HomeBdd.jpg" alt="clic to discover the characters"></router-link>
      <router-link to="/pageGame"><img src="..\assets\HomeSort.jpg" alt="clic to play the spell game"></router-link>
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
      // Si on n'est pas sur un téléphone on affiche le header
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
      // Fonction pour afficher ou cacher le menu
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
  }
}
</script>

<style scoped>
.HP-title{
  color: var(--brown);
  font: 1.3rem "Lucida", sans-serif;
  text-align: center
}

.HomePage{
  position: inline;
  margin: auto;
  display: ruby;
  width: 80%;
}

.HomePage img{
  transition: transform .3s;
  object-fit: contain;
  width: 30%;
  margin: 15px;
  border-radius: 15px;
}

.HomePage img:hover{
  transform: scale(1.05);
  transition: transform .3s;
}

/* Responsive tablettes paysage */
@media (max-width: 1024px) {
  .HomePage img{
  width: 45%;
  margin: 20px 2%;
}
.page-container{
  display: block;
}
}

/* responsive mobile */
@media (max-width: 768px) {
  .HP-title{
    display: none;
  }

  /* Header */
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

.burger-menu h2{
  color: var(--white);
}

  li{
    display: block;
    width: fit-content;
  }
  .burger-menu {
    display: block;
    width: 100%;
  }

  .titre{
    width: auto;
  }


  .navbar{
    display: flex;
  }
}

/* Responsive Tablettes et PC */
@media (min-width: 769px) {
  nav {
    display: block;
  }
}
</style>
