<template>
  <!-- Création de la card contenant le nom, l'espèce et le genre du personnage -->
  <div class="character-card"  :class="getHouseClass(house)">
    <h2>{{ name }}</h2>
    <p>Species: {{ species }}</p>
    <p> Gender: {{ gender}}</p>
  </div>
</template>
  
<script>
  export default {
    props: {
      name: String,
      gender: String,
      house: String,
      species: String,
    },
    methods: {
      // Fonction qui retourne la classe correspondant à la maison du personnage
      getHouseClass(house) {
    switch (house) {
      case "Gryffindor":
        return "gryffindor";
      case "Hufflepuff":
        return "hufflepuff";
      case "Ravenclaw":
        return "ravenclaw";
      case "Slytherin":
        return "slytherin";
      default: // Pour les autres
        return "other"; 
    }
  }
    }
  };
  
  </script>
  
  <style scoped>
  /* Css de la card avec animation au survol */
  .character-card {
    transition: transform .3s;
    border-radius: 5px;
    padding: 10px;
    align-items: center;
    margin: 1%;
    width: 25%;
    display: inline-block;
  }
  
  .character-card:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform .3s;
  }

  .character-card.gryffindor {
    background: rgba(177, 135, 135);
  }

  .character-card.gryffindor:hover {
    background: rgb(220, 190, 190);
  }

  .character-card.other {
    background: #c8c8c8;
  }

  .character-card.other:hover {
    background: #dcdcdc;
  }

  .character-card.hufflepuff {
    background: rgb(188, 188, 158);
  }

  .character-card.hufflepuff:hover {
    background: rgb(211, 211, 188);
  }

  .character-card.ravenclaw {
    background: rgb(165, 165, 190);
  }

  .character-card.ravenclaw:hover {
    background: rgb(193, 193, 213);
  }

  .character-card.slytherin {
    background: #9bbfa0;
  }

  .character-card.slytherin:hover {
    background: #b3d2b7;
  }
</style>
