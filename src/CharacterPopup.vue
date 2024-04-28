<template>
  <!-- Création de la popup contenant les infos du personnage -->
    <div class="character-popup">
        <div class="character-info">
        <h2>{{ name }}</h2>
        <!-- On vérifie à chaque fois que l'attribut sout rempli pour n'afficher que les éléments utiles -->
      <p> {{ species === "" ? '' : ' Is a ' + species }}</p>
      <p> {{ gender === "" ? '' : ' Gender: ' + gender }}</p>
      <p> {{ house === "" ? ' ' : 'Belongs to: ' + house }}</p>
      <p> {{ dateOfBirth === null ? yearOfBirth === null ? '' : 'Born on: ' + yearOfBirth : 'Born on: ' + dateOfBirth }} </p>
      <p> {{ ancestry === "" ? '' : ' Ancestry: ' + ancestry }}</p>
      <p> {{ eyeColour === "" ? '' : eyeColour + ' eyes ' }} {{ hairColour === "" ? '' : hairColour + ' hair' }}</p>
      <p>{{ wand.length === null ? '' : 'Wand: ' + wand.wood + ' wood with ' + wand.core + ' core, '  + wand.length + ' cm' }}</p>
      <p> {{ patronus === "" ? '' : gender === 'female' ? ' Her patronus is a ' + patronus : ' His patronus is a ' + patronus }}</p>
      <p> {{ actor === "" ? '' :  gender === 'female' ? ' Her role was played by ' + actor : ' His role was played by ' + actor   }}</p>
    </div>
    <div class="character-image">
      <!-- On charge l'image de l'API. S'il n'y en a pas, on récupère l'image prévue en local -->
      <img v-if="pictureUrl" :src="pictureUrl" alt="Character Image">
      <img v-else src="\src\assets\defaultPic.jpg" alt="Default Character Image">
    </div>
    </div>
  </template>
  
  <script>

  export default {
    props: {
      name: String,
      house: String,
      patronus: String,
      species: String,
      gender: String,
      dateOfBirth: String,
      yearOfBirth: Number,
      ancestry: String,
      eyeColour: String,
      hairColour: String,
      wand: Object,
      actor: String,
      pictureUrl: String,

    },
    methods: {
      
    }
  };
  </script>
  
  <style>
  
  </style>
  