<template>
  
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

  <div class="page-container">
    <!-- Filtres de recherche dans les personnages harry Potter -->
    <div>
      <div class="gallery-options">
        <div class="filters">
          <!--Zone de recherche -->
          <input v-model="search" class="recherche" type="text" name="search" placeholder="Search a character">
          <div class="btnMobile">
            <button class="filter-toggle-btn" v-on:click="toggleFilters">Filters</button>
          </div>

          <!-- Les filtres -->
          <div class="mobileFilter" :class="{ 'filters-open': isFilterOpen }">
            <!-- Trier par nom -->
            <label for="character-sort">Sort by : </label>
            <select v-model="characterSortType" id="character-sort">
              <option value="AZName">Names from A to Z</option>
              <option value="ZAName">Names from Z to A</option>
            </select>
            <!-- Trier par maison -->
            <label for="character-sort">House : </label>
            <select v-model="characterSortHouse" id="character-sort">
              <option value="AllHouses">All houses</option>
              <option value="InGryf">Gryffindor</option>
              <option value="InHuffle">Hufflepuff</option>
              <option value="InRaven">Ravenvlaw</option>
              <option value="InSlyt">Slytherin</option>
              <option value="Nowhere">Not in a house</option>
            </select>
            <!-- Trier par espèce -->
            <label for="character-sort">Species : </label>
            <select v-model="characterSortSpecies" id="character-sort">
              <option value="AllSpecies">All species</option>
              <option value="Human">Human</option>
              <option value="Spider">Spider</option> 
              <option value="Ghost">Ghost</option> <!-- contient : ghost, poltergeist -->
              <option value="Goblin">Goblin</option>
              <option value="Centaur">Centaur</option>
              <option value="Hippogriff">Hippogriff</option>
              <option value="House-Elf">House elf</option>
              <option value="Werewolf">Werewolf</option>
              <option value="Giant">Giant</option>
              <option value="HalfGiant">HalfGiant</option>
              <option value="Vampire">Vampire</option>
              <option value="Animal">Animal</option> <!-- contient : owl, cat, dragon, three-headed-dog -->
            </select>
          </div>
        </div>

        <!-- Affichage de la gallerie de cartes personnages -->
        <div class="gallery">
          <CharacterCard 
          class="character_card"
          v-for="character in sortCharacter"
          v-on:click="openPopUp(character)" 
          :name="character.name" 
          :house="character.house" 
          :gender = "character.gender"
          :species  ="character.species"/>

          <!-- Afficher la popup contenant toutes les infos sur un personnage après un clic sur une carte de la gallerie -->
          <div class = "bgPopup" v-if="showPopup" 
          v-on:click="showPopup = false" >
          <CharacterPopup class="character-popup" v-bind="filterPopupAttributes(selectedCharacter)"
          :name="selectedCharacter.name" 
          :species="selectedCharacter.species" 
          :gender="selectedCharacter.gender"
          :house="selectedCharacter.house" 
          :dateOfBirth="selectedCharacter.dateOfBirth"
          :yearOfBirth="selectedCharacter.yearOfBirth"
          :ancestry="selectedCharacter.ancestry"
          :eyeColour="selectedCharacter.eyeColour"
          :hairColour="selectedCharacter.hairColour"
          :wand="selectedCharacter.wand"
          :patronus="selectedCharacter.patronus" 
          :actor="selectedCharacter.actor"
          :pictureUrl="selectedCharacter.image"/>
        </div>
      </div>
    </div>
    <!-- S'il n'y a rien à afficher dans la gallerie on prévient l'utilisateur avec une petite phrase -->
    <div v-if="sortCharacter.length === 0"><p class="errorMsg">Uh oh, looks like we couldn't find anything to display with these filters...</p></div>
    </div>
  </div>

  <!-- FOOTER -->
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
  // Importation des composants
  import CharacterPopup from '../CharacterPopup.vue';
  import CharacterCard from '../CharacterCard.vue';
  export default {
    name: 'App',


    components: {
    CharacterCard,
    CharacterPopup,
  },
    data() {
      return {
        // Variables utilisées pour les filtres
        characters: [],
        search: "",
        characterSortType: "AZName",
        characterSortHouse: "AllHouses",
        characterSortSpecies: "AllSpecies",
        showPopup: false,
        selectedCharacter: "",
        // Varibles utilisées dans les versions mobile et tablettes pour cacher des menus
        isMenuOpen: false,
        isFilterOpen: false,
      };
    },
    mounted() {
      // On charge les données des personnages de l'API
      this.fetchCharacters();
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
    computed: {
      // On filtre les personnages selon les filtres
      // Zone de recherche
      searchCharacters(){
        return this.characters.filter(character =>
          character.name.toLowerCase().includes(this.search.toLowerCase())
        );
      },
      // Affichage par ordre croissant ou décroissant
      sortCharacter(){
        let sortedCharacters = [...this.searchCharacters];
        switch (this.characterSortType) {
          case "AZName":
            sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
            break;
            case "ZAName":
              sortedCharacters.sort((a, b) => b.name.localeCompare(a.name));
              break;
              default:
                // Aucun tri
                break;
              }
        // Filtre par maison
        switch (this.characterSortHouse) {
          case "InGryf":
            sortedCharacters = sortedCharacters.filter(character => character.house === "Gryffindor");
            break;
          case "InHuffle":
            sortedCharacters = sortedCharacters.filter(character => character.house === "Hufflepuff");
            break;
          case "InRaven":
            sortedCharacters = sortedCharacters.filter(character => character.house === "Ravenclaw");
            break;
          case "InSlyt":
            sortedCharacters = sortedCharacters.filter(character => character.house === "Slytherin");
            break;
          case "Nowhere":
            sortedCharacters = sortedCharacters.filter(character => character.house === "");
            break;
        default:
              // Aucun tri
              break;
            }
        // Filtre par espèce
        switch (this.characterSortSpecies) {
          case "AllSpecies":
            break;
          case "Human":
            sortedCharacters = sortedCharacters.filter(character => character.species === "human");
            break;
          case "Spider":
            sortedCharacters = sortedCharacters.filter(character => character.species === "acromantula");
            break;
          case "Ghost":
            sortedCharacters = sortedCharacters.filter(character => character.species === "ghost" || character.species === "poltergeist");
            break;
          case "Goblin":
            sortedCharacters = sortedCharacters.filter(character => character.species === "goblin");
            break;
          case "Centaur":
            sortedCharacters = sortedCharacters.filter(character => character.species === "centaur");
            break;
          case "Hippogriff":
            sortedCharacters = sortedCharacters.filter(character => character.species === "hippogriff");
            break;
          case "House-Elf":
            sortedCharacters = sortedCharacters.filter(character => character.species === "house-elf");
            break;
          case "Werewolf":
            sortedCharacters = sortedCharacters.filter(character => character.species === "werewolf");
            break;
          case "Giant":
            sortedCharacters = sortedCharacters.filter(character => character.species === "giant");
            break;
          case "HalfGiant":
            sortedCharacters = sortedCharacters.filter(character => character.species === "half-giant");
            break;
          case "Vampire":
            sortedCharacters = sortedCharacters.filter(character => character.species === "vampire");
            break;
          case "Animal":
            sortedCharacters = sortedCharacters.filter(character => character.species === "cat" || character.species === "dragon" || character.species === "three-headed dog" || character.species === "owl");
                  
                default:
              // Aucun tri
              break;
            }
          return sortedCharacters.filter(character =>
          character.name.toLowerCase().includes(this.search.toLowerCase())
          );
      }
    },
    methods: {
      // Fonction pour afficher ou cacher le menu
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      // Fonction pour afficher ou cacher les filtres
      toggleFilters() {
        this.isFilterOpen = !this.isFilterOpen; // Inversion de l'état des filtres
      },
      
      // Pour l'affichage des personnages
      async fetchCharacters() {
        try {
          // const response = await fetch('https://hp-api.onrender.com/api/characters'); // ancien lien
          const response = await fetch('https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters');
          this.characters = await response.json();
        } catch (error) {
          console.error('Error fetching characters:', error);
        }
      },

      // Afifcher la Popup
      openPopUp(character){
        this.selectedCharacter = character;
        this.showPopup = true;
      },

      // Fonction pour filtrer les attributs pour n'afficher que les champs remplis dans l'API
      filterPopupAttributes(character) {
        let filteredAttributes = {};
        for (const i in character) {
          if (character[i] && character[i] !== "") {
            filteredAttributes[i] = character[i];
          }
        }
        return filteredAttributes;
      },

      // Fermer la Popup
      closePopup() {
        this.showPopup = false;
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
  /* On masque le bouton filtre pour la vue PC */
  .btnMobile{
    display: none;
  }

  /* Css des inputs */
label{
  display: inline-block;
  width: 100%;
  margin: 8px 0;
  font: 1.0rem "Lucida", sans-serif;
}

input, select{
  max-height: 30px;
  margin-bottom: 16px;
  font: 1.0rem "Lucida", sans-serif;
border-radius: 5px;
background: var(--brown);
color: var(--white)
}

/* Css des filtres */
.filters{
  display: block;
  position:fixed;
  justify-content: left;
  align-items: left;
  padding: 20px;
  width: 15%;
  height: 80%;
}

/* Affichage des cards des personnages */
.gallery{
  width: 80%;
  height: auto;
  margin-left: 20%;
  padding: 16px;
  align-self: right;
}

/* Texte quand il n'y a rien à afficher */
.errorMsg{
  margin-left: 20%;
  height: 100px;
  padding: 90px;
}

/* Responsive tablettes paysage */
@media (max-width: 1024px) {
/* Gestion du filtre pour la vue mobile */
header ul{
  margin-bottom: 0;
}

.btnMobile{
    display: block;
  }

  .mobileFilter{
    display: none;
    margin: auto;
    margin-top: 20px;
    align-items: center;
  }

  .filters{
    width: 100%;
    padding: 0;
    background: var(--clearYellow);
    height: auto;
    display: inline-block;
    margin-bottom: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  label, select{
    display: block;
    width: 30%;
    margin: auto;
    margin-top: 5px
  }

  button{
    width: 40%;
    height: 20px;
    padding: 0;
    margin: auto;
    display: block;
    border-radius: 5px;
    border: none;
    background-color: var(--white);
  }

  .recherche{
    margin: 20px auto;
    display: block;
    width: 80%;
  }

.filters-open {
  display: block;
}

/* Css pour les cards des personnages */
.character-card{
    width: 30%;
    height: 150px;
    margin: 5px;
    padding: 5px;
  }
  .gallery{
    margin-top: 50px;
    display: block;
    margin: auto;
    padding-top: 130px;
  }

  /* Gestion de la popup */
  .character-popup {
    margin: auto;
    max-width: 80%;
    min-width: 80%;
    width: 80%;
    max-height: 40%;
    padding: 50px;
    height: 100%;
    display: flex;
    z-index: 50;
  }

  .character-popup p{
    max-width: 70%;
    width: auto;
    display: block;
    text-align: left;
  }
  .character-info{
  width: 70%;
}
  .character-popup img{
  object-fit: contain;
  max-height: 10%;
  margin-top: 10px;
  margin-right: 5%;
}
.character-image{
  max-width: 30%;
}
}

/* responsive mobile */
@media (max-width: 768px) {
  /* Menu burger */
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

  nav {
    display: block;
  }

  /* Gestion du filtre pour la vue mobile */
  .btnMobile{
    display: block;
  }

  .mobileFilter{
    display: none;
    margin-top: 20px;
  }

  .filters{
    width: 100%;
    margin: 0;
    padding: 0;
    background: var(--clearYellow);
    height: auto;
    display: block;
    margin-bottom: 10px;
    padding-bottom: 20px;
  }

  label{
    display: inline-block;
    width: 30%;
    margin: 5px;
    margin-left: 10%;
  }

  button{
    width: 40%;
    height: 20px;
    padding: 0;
    margin: auto;
    display: block;
    border-radius: 5px;
    border: none;
    background-color: var(--white);
  }

  .recherche{
    margin: 20px auto;
    display: block;
    width: 80%;
  }

.filters-open {
  display: block;
}

/* Css pour les cards des personnages */
  .character-card{
    width: 45%;
    display: inline-table;
    height: 150px;
    margin: 5px 2px;
    padding: 5px;
  }
  .gallery{
    margin-top: 50px;
    display: block;
    margin: auto;
    padding-top: 110px;
  }

    
  /* Centrer le message */
  .errorMsg{
    margin: auto;
  }
  
  /* Css pour la popup du personnage */
  .character-popup {
    margin: auto;
    padding: auto;
    max-width: 70%; 
    min-width: 70%;
    width: 70%;
    max-height: 50%;
    justify-items: center;
    height: 100%;
    display: grid;
    z-index: 50;
  }
  
  .character-info{
    margin: auto;
    padding: auto;
    width: 100%;
  }
  
  .character-popup p{
    max-width: 100%;
    width: auto;
    display: block;
    text-align: left;
  }
  
  .character-popup img{
    display: none;
  }
  
  .character-popup h2{
    max-width: 100%;
    font-size: 1.2rem;
  }
}

/* Responsive Tablettes et PC */
@media (min-width: 769px) {
  nav {
    display: block;
  }
}
  </style>
  