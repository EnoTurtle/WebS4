<template>
  <header>
    <div>
      <router-view></router-view>
    </div>
  </header>
  <div>
    
    </div>
  <footer>
  <div class="footer">
  <li>
      <ul>
        API :
        <a href="https://hp-api.onrender.com">Link to the API</a>
      </ul>
      <ul>
        © April 2024, Enora Couron
      </ul>
      <ul>
        About
      </ul>
    </li>
    <img src=".\assets\imgFooter.png" alt="" />
  </div>
  </footer>
  </template>

  
  <script>
    
  export default {
    name: 'App',

    data() {
      return {    
        // Jeu avec les sorts
      };
    },
  };
  </script>

<style>

:root {
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

p{
  font: 1.0rem "Lucida", sans-serif;
}

a{
  text-decoration: none;
  font: 1.0rem "Lucida", sans-serif;
  color: var(--white);
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
  /* position: fixed; */
  /* width: 100%; */
  background: var(--brown);
  color: var(--white);
  padding: 20px;
  margin-top: 0;
  /* margin: auto; */
}

header li:hover{
background-color: var(--grey);
color: var(--brown);
}

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


.gallery{
  width: 80%;
  height: auto;
  margin-left: 20%;
  padding: 16px;
  align-self: right;
}

.filters{
  display: block;
  position:fixed;
  justify-content: left;
  align-items: left;
  padding: 20px;
  width: 15%;
  height: 80%;
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

.bgPopup{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center; /* Centrer horizontalement */
  align-items: center; /* Centrer verticalement */
}
.character-popup {
  background-image: url("assets\bgPopup.jpg");
  background-size: cover;
  -webkit-text-stroke:#736767 0.5px;
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

header{
  position: sticky;
  margin: 0;
  top: 0;
  z-index: 999;
}

.errorMsg{
  margin-left: 20%;
  height: 100px;
  padding: 90px;
}

.content{
  width: 70%;
  margin: auto;
  margin-top: 0px;
}

button{
  background-color: var(--grey);
  display: inline-block;
  width: 200px;
  padding: 20px;
  /* centred */
  margin: 10px;
  border-radius: 20px;
  border: none;
}

/* Quand on survole le bouton on a une autre couleur de fond */
.button:hover{
  background-color: var(--brown);
  color: var(--white);
}

footer{
  background: var(--brown);
  font: 1.0rem "Lucida", sans-serif;
  color: var(--white);
  position: relative;
  bottom: 0;
  display: flex;
  bottom:0;
  width:100%;  
}

footer img{
  width: 20%;
  align-self: right;
  /* display: inline; */

  /* margin: auto; */
}

footer a{
  color: var(--white);
  text-decoration: none;
}

footer li{
  color: var(--white);
  text-decoration: none;
}

/* responsive */
@media (max-width: 768px) {
  .footer-distributed{
    font: bold 14px sans-serif;
    width: 100%;
    height: 100%;
  }
  .button{
    display: block;
    width: 80%;
    padding: 5%;
    /* centred */
    margin: 10px auto;
    border-radius: 20px;
  }
  h1, h2, p, ul, a{
    text-align: center;
  }
  h1{
    size: 0.8rem;
  }
  h2{
    margin: 16px 0;
  }
  ul{
    size: 0.5rem;
  }
  footer{
    text-align: left;
  }
  body img{
    /* display: block; */
    /* width: 0%; */
  }
}</style>
  