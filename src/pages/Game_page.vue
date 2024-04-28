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
    
      <div class="content">
      <h1>What sort is it?</h1>
      <!-- On joue tant qu'on a pas fait 10 manches -->
      <div v-if="!gameOver">
        <!-- Afficher le numéro de la question actuelle -->
        <p>Question {{ numberOfQuestions+1 }}/10</p>
        <!-- Affichage de la description -->
        <p>{{ descSort }}</p>
        <a id="proposition">
          <!-- Affichage des propositions avc vérification de si le clic est sur la bonne réponse -->
          <div class="button" v-for="(choice, index) in shuffledSpellList" :key="index" v-on:click="checkAnswer(choice)">
            {{ choice }}
          </div>
        </a>
      </div>
      <!-- Affichage du score -->
      <p v-if="gameOver">Your score: {{ score }}/10</p>
      <!-- affichage du récapitulatif des questions avec réponse donnée et bonne réponse -->
      <div v-if="gameOver" class="réponses">
        <p class ="button" v-on:click="playAgain()">Play again</p>
        <h2 >Answers</h2>
        <p :class="getAnswer(question)" v-for="(question, index) in questions">Question {{ index+1 }} : {{ question.question }} 
          {{ question.answer == question.goodAnswer ? " : " + question.goodAnswer : " - It is not " + question.answer + " but : " + question.goodAnswer }}</p>
          <!-- Affichage du bouton pour rejouer -->
          <p class ="button" v-on:click="playAgain()">Play again</p>
      </div>
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
    name: 'App',

    data() {
      return {  
        // Variables utilisées pour le jeu 
        descSort: '',
        gameOver: false,
        spellList: [],
        shuffledSpellList: [],
        score: 0,
        numberOfQuestions : 0,
        goodAnswer: [],
        questions: [],
        // Variable utilisées pour le menu responsive
        isMenuOpen: false,
      };
    },
    mounted() {
      // Appel de la fonction qui récupère les sorts
      this.fetchSorts();
      // Appel de la fonction qui affiche le menu responsive
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
    computed: {
      
    },
    methods: {
      // Fonction qui affiche ou masque le menu responsive
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },

      // Fonction qui charge les sorts et lance la partie
      async fetchSorts() {
        try {
          // const response = await fetch('https://hp-api.onrender.com/api/spells'); // ancien lien
          const response = await fetch('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/spells');
          // Tableau contenant tous les sorts
          const dataSorts = await response.json();
          // On appelle la fonction qui crée une question
          this.newQuestion(dataSorts);
        } catch (error) {
          console.error('Error fetching spells:', error);
        }
      },

      // Création de la question
      newQuestion(dataSorts){
        // On récupère le nom de chaque sort
        const spellNames = dataSorts.map(spell => spell.name);
        // On choisit quatre noms de sort aléatoirement
        this.spellList = this.shuffleArray(spellNames).slice(0, 4);
        // On choisit la description du permier sort choisi
        this.descSort = dataSorts.find(spell => spell.name === this.spellList[0]).description;
        // On mémorise la bonne réponse
        this.goodAnswer = this.spellList[0];
        // On mélange les réponses
        this.shuffledSpellList= this.shuffleArray(this.spellList).slice(0, 4);
      },

      // Fonction pour conserver les données de la partie et incrémenter le score
      checkAnswer(choice) {
        // On mémorise la question et la bonne réponse
        this.questions[this.numberOfQuestions] = {
          question: this.descSort,
          answer: choice,
          goodAnswer: this.goodAnswer,
        };
        // On vérifie que la réponse est bien la bonne pour incrémenter le score
        if (choice === this.goodAnswer) {
          this.score++;
        }
        this.nextQuestion();
      },
        
      // Fonction qui affiche la prochaine question tant qu'on n'a pas fait 10 question
      nextQuestion(){
        this.numberOfQuestions++;
        if (this.numberOfQuestions < 10) {
          // On récupère de nouvelles données et on initialise la prochaine question
          this.fetchSorts();
          this.gameOver = false;
        } else {
          // Si toutes les questions ont été posées
          this.gameOver = true;
        }
      },

      // Fonction pour mélanger un tableau
      shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },

      // Affichage des réponses en fonction de si on a bon ou pas
      getAnswer(question) {
        return question.answer == question.goodAnswer ? 'correct' : 'incorrect';
      },

      // Réinitialiser toutes les variables du jeu pour pouvoir rejouer
      playAgain() {
        this.gameOver = false;
        this.score = 0;
        this.numberOfQuestions = 0;
        this.questions = [];
        // Lancer la prochaine partie
        this.fetchSorts();
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
  };
</script>

<style scoped>
/* couleur de la réponse qui change en fonction de si on a juste ou faux */
.correct {
  background: rgb(170, 198, 170);
  padding: 15px;
  border-radius: 5px;
}

.incorrect {
  background: rgb(203, 169, 169);
  padding: 15px;
  border-radius: 5px;
}

/* responsive mobile */
@media (max-width: 768px) {
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

  /* Contenu du site */
  h1{
  font-size: 1.6rem;
}
p{
  font-size: 1.3rem;
}

.button{
  font-size: 1.1rem;
}
}

/* Responsive Tablettes et PC */
@media (min-width: 769px) {
  nav {
    display: block;
  }
}
</style>
