<template>
    <div>
      <router-view></router-view>
    </div>
  <div>
    
    </div>
  
  </template>

  
  <script>
    
  export default {
    name: 'App',

    data() {
      return {    
      };
    },
  };
  </script>

<style>

:root {
  /* Variables globales pour les couleurs */
  --brown: #382525;
  --white: #e5e8f0;
  --grey: #cbcbcb;
  --clearYellow: #a59e97;
}   

body{
  margin: 0;
  margin: auto;
  padding: 0;
  background: var(--clearYellow);
}

p, h2, h1{
  font-family: "Lucida", sans-serif;
}

a{
  text-decoration: none;
  font: 1.0rem "Lucida", sans-serif;
  color: var(--white);
}

.content{
    width: 80%;
    margin: 0 auto;
  }

.button:hover{
  background-color: var(--brown);  
  color: var(--white);
}

.button{
  cursor: pointer;
  background-color: var(--grey);
  color: var(--brown);
  display: inline-block;
  width: 200px;
  padding: 20px;
  margin: 10px;
  border-radius: 20px;
  border: none;
}

/* Css de la popup personnage */
.bgPopup{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.character-popup {
  background-image: url("assets\bgPopup.jpg");
  background-size: cover;
  border-radius: 5px;
  padding: 30px;
  width: 40%;
  max-width: 50%;
  height: flex;
  max-height: 60%;
  display: inline-flex;  
}

.character-info{
  width: 70%;
}

.character-popup img{
  object-fit: contain;
  max-height: 50%;
  margin-top: 10px;
  margin-right: 5%;
}

.character-image{
  max-width: 30%;
}

.character-popup p{
  font: 1.0rem "Lucida", sans-serif;
  max-width: 70%;
}

.character-popup h2{
  max-width: 70%;
}

/* Header */
header{
  position: sticky;
  margin: 0;
  top: 0;
  z-index: 999;
}

header li{
  cursor: pointer;
  width: 20%;
  border-radius: 5px;
  padding: 8px 20px;
  align-items: center;
  display: inline;
  padding: 10px 5%;
  align-items: center;
}

header ul{
  text-decoration: none;
  background: var(--brown);
  color: var(--white);
  padding: 20px;
  margin-top: 0;
}

header li:hover{
  background-color: var(--grey);
  color: var(--brown);
}

.mobile-menu {
  display: none;
}

/* Gestion du footer */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 80vh;
}

footer{
  background: var(--brown);
  font: 1.0rem "Lucida", sans-serif;
  color: var(--white);
  width:100%;
  flex-shrink: 0;
  bottom:0;
}

footer ul{
  width:100%;  
  padding: 5px;
  margin-left: 10%;
}

footer img{
  object-fit: contain;
  width: 20%;
  align-self: right;
  margin-left: 50%;
  display: flex;  
}

footer a{
  color: var(--white);
  width: auto;
}
footer a:hover{
  color: var(--grey);
}

footer li{
  text-decoration: none;
  list-style-type: none;
  color: var(--white);
  cursor: auto;
  margin: 0;
  padding: 10px;
}

.footer{
  display: flex;
}

/* Responsive PC */
@media (min-width: 769px) {
  /* On cache le titre présent dans le menu burger */
  .burger-menu h2{
    display: none;
  }
}

/* Responsive tablettes larges */
@media (max-width: 1024px) {
  p{
    font-size: 0.9rem;
  }
  h1{
    font-size: 1.3rem;
  }
  h2{
    font-size: 1.1rem;
  }
  /* Gestion du footer */
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

  .content{
    width: 80%;
    margin: 0 auto;
  }
  .character-popup h2{
    
    font: 1.3rem "Lucida", sans-serif;
  }

.character-popup p{
    font: 1.1rem "Lucida", sans-serif;
}

.button{
    display: inline-block;
    text-align: center;
    width: 25%;
    margin: 10px 15px;
  }

.button:hover{
  background-color: var(--grey);
    color: var(--brown);
}
}

/* responsive Mobile */
@media (max-width: 768px) { 
  /* Menu burger pour le header */
  .burger-menu {
    display: block;
  }
  
  .mobile-menu {
    display: block;
  }
  
  header{
    background: var(--brown);
    margin: 0;
    padding: 10px;
  z-index: 20;
  color: var(--white);
}
  
  /* Changement des éléments de base */
  .button{
    display: block;
    width: 80%;
    padding: 5%;
    margin: 10px auto;
    border-radius: 20px;
  }
  h1, h2, p, ul, a{
    text-align: center;
  }
  p{
    font-size: 0.8rem;
  }
  h1{
    font-size: 1.2rem;
  }
  h2{
    font-size: 1.0rem;
    margin: 1.0rem 0;
  }

  .character-popup h2{
    
    font-size: 1.2rem;
  }

.character-popup p{
    font: 1.0rem "Lucida", sans-serif;
}

  /* Css pour la popup du personnage */
  .character-popup {
    margin: auto;
    padding: auto;
    max-width: 50%; 
    min-width: 50%;
    width: 50%;
    max-height: 50%;
    justify-items: center;
    height: 100%;
    display: grid;
    z-index: 9998;
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
  
  /* Gestion du footer sur écran de téléphone */
  .page-container {
    min-height: 90vh;
  }

  footer{
    text-align: left;
  }
  
  footer ul, footer a{
    width: auto;
    text-align: left;
    font-size: 0.7rem;
    padding: 0;
  }
  footer img{
    margin-left: 30%;
    width: 20%;
  }
}</style>
  