<!-- <template> Hello world</template> -->

<template>
    <h1>Harry Potter API</h1>
    <ul id="charactersList">
        The characters from the Hogwarts History
    </ul>
    <!-- choisir d'afficher que des étudiants, profs, maison d'appartenance, patronus, encore en vie -->
      <h2>What sort is it ?</h2>
      <p id="spellList"></p>
      <!-- <form action="POST"> -->
        <p>{{descSort}}</p>
      <a id="proposition">
        <div v-for="choice in choicesProps">
        {{ choicesProps.innerHTML }}
        </div>
    </a>
      <!-- </form> -->
      <p id="answer"></p>
      <p id="end"></p>
    <!-- <li v-for="item in items"> -->
  <!-- {{ item.message }} -->
<!-- </li> -->
    <!-- <div>My site</div> -->
    <div v-for="quest in questions">
        {{ quest.innerHTML }}
    </div>

    <div v-for="ans in goodAnswer">
        {{ ans }}
    </div>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
        nb_victory: 0,
        nb_lose: 0,
        questions: [],
        descSort : "",
        choicesProps : [],
        goodAnswer: []
    };
  },
  mounted() {
    this.fetchSorts();
  },
  methods: {
    async fetchSorts() {
      try {
        // On appelle les sorts de l'API
        const sorts = await fetch('https://hp-api.onrender.com/api/spells');
        const dataSorts = await sorts.json();

        // const spellList = document.getElementById('spellList');
        // const proposition = document.getElementById('proposition');

        var size = dataSorts.length;
        var descSort;
        var questions = [];
        var goodAnswer = [];
        var juste;

        // On crée la question avec les différentes propositions faites
        this.newQuestions(size, spellList, proposition, dataSorts, questions, goodAnswer);
        
        // Gestion des actions de l'utilisateur
        document.getElementById('proposition').addEventListener('click', (event) => {
            var clickedElement = event.target;
            if (clickedElement.tagName === 'BUTTON') {
                var id = clickedElement.id;
            }
            // const answer = document.getElementById('answer');
            // On vérifie si l'utilisateur a trouvé la bonne réponse, dans ce cas on ajoute +1 à son score et on détruit l'ancienne question
            if (id == '00') {
                this.printWinLose(true, answer);
                this.nb_victory += 1;
                this.destroyOldQuestion();
                this.newQuestions(size, spellList, proposition, dataSorts, questions, goodAnswer, descSort);
            } else {
                this.printWinLose(false, answer);
                this.nb_lose += 1;
                this.destroyOldQuestion();
                this.newQuestions(size, spellList, proposition, dataSorts, questions, goodAnswer, descSort);
            }
            // Après 10 bonnes réponses l'utilisateur a gagné la partie
            if (this.nb_victory + this.nb_lose == 10) {
                this.destroyOldQuestion();
                this.loadEndPage(this.victory);
            }
        });
        
        // Catch de si l'API n'est pas chargé
    } catch (error) {
        console.error('Error fetching data:', error);
    }
},

// Fonction qui mélange le tableau de propositions
async shuffleAnswer(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
},

// Fonction newQuestions qui affiche les propositions fausses aléatoirement dans les données de l'API et empêche d'avoir des sorts en double
async newQuestions(size, spellList, proposition, dataSorts, questions, goodAnswer, descSort) {
    const randomIndex = Math.floor(Math.random() * size);
    
    // Proposition 01
    var randomIndexFalse01 = Math.floor(Math.random() * size);
    if(randomIndexFalse01 == randomIndex && randomIndexFalse01 != size){
        randomIndexFalse01 = randomIndexFalse01 + 1;
    }else if(randomIndexFalse01 == randomIndex){
        randomIndexFalse01 = randomIndexFalse01 - 1;
    }
    
    // Proposition 02
    var randomIndexFalse02 = Math.floor(Math.random() * size);
    if((randomIndexFalse02 == randomIndex || randomIndexFalse02 == randomIndexFalse01) && randomIndexFalse02 != size){
        randomIndexFalse02 = randomIndexFalse02 + 1;
    }else if(randomIndexFalse02 == randomIndex || randomIndexFalse02 == randomIndexFalse01){
        randomIndexFalse02 = randomIndexFalse02 - 1;
    }
    
    // Proposition 03
    var randomIndexFalse03 = Math.floor(Math.random() * size);
    if((randomIndexFalse03 == randomIndex || randomIndexFalse03 == randomIndexFalse01 || randomIndexFalse03 == randomIndexFalse02) && randomIndexFalse03 != size){
        randomIndexFalse03 = randomIndexFalse03 + 1;
    }else if(randomIndexFalse03 == randomIndex || randomIndexFalse03 == randomIndexFalse01 || randomIndexFalse03 == randomIndexFalse02){
        randomIndexFalse03 = randomIndexFalse03 - 1;
    }
    
    // const rndSpell = document.getElementById('aleatoire');
    
    // Mettre les propositions dans un tableau permet d'afficher aléatoirement les fausses réponses et la bonne réponse
    let choices = [randomIndex, randomIndexFalse01, randomIndexFalse02, randomIndexFalse03];
    
    this.shuffleAnswer(choices);
    

    this.printAnswers(choices, randomIndex, size, dataSorts, spellList, questions, goodAnswer, descSort);
},

// Test de si l'utilisateur clique sur la bonne réponse
async printWinLose(win, answer) {
    if(win == true){
        const victory = document.createElement('p');
        victory.textContent = "You Won !";
        answer.appendChild(victory);
    }else{
        const loose = document.createElement('p');
        loose.textContent = "You lost...";
        answer.appendChild(loose);
    }
},

// Efface l'ancienne question afin de ne pas surcharger le site
async destroyOldQuestion() {
    this.questions = [];
    // this.goodAnswer = [];
    this.descSort = [];
},


// On affiche à chaque fois les sorts et on vérifie lequel est la bonne réponse pour indiquer qu'on doit également aficher la description
async printAnswers(array, randomIndex, size, dataSorts, spellList, questions, goodAnswer, descSort){
    if(array[0] == randomIndex){
        this.printRandSort(size, array[0], spellList, proposition, dataSorts, 1, 1,  '00', questions, descSort);
        // this.goodAnswer.push(proposition[1]);
    }else{
        this.printRandSort(size, array[0], spellList, proposition, dataSorts, 0, 1,  '01', questions, descSort);
    }
    
    if(array[1] == randomIndex){
        this.printRandSort(size, array[1], spellList, proposition, dataSorts, 1, 1,  '00', questions, descSort);
        // this.goodAnswer.push(proposition[1]);
    }else{
        this.printRandSort(size, array[1], spellList, proposition, dataSorts, 0, 1,  '01', questions, descSort);
    }
    
    if(array[2] == randomIndex){
        this.printRandSort(size, array[2], spellList, proposition, dataSorts, 1, 1,  '00', questions, descSort);
        // this.goodAnswer.push(proposition[2]);
    }else{
        this.printRandSort(size, array[2], spellList, proposition, dataSorts, 0, 1,  '01', questions, descSort);
        }

        if(array[3] == randomIndex){
            this.printRandSort(size, array[3], spellList, proposition, dataSorts, 1, 1,  '00', questions, descSort);
            // this.goodAnswer.push(proposition[3]);
        }else{
            this.printRandSort(size, array[3], spellList, proposition, dataSorts, 0, 1,  '01', questions, descSort);
        }   

        console.log(this.goodAnswer);
    },

    // Fonction affiche en html la description du sort et les propositions de réponses
    async printRandSort(size, randomIndex, spellList, proposition, dataSorts, description, name, idStr, questions, descSort){
        for(var i = 0; i<size; i++){
            if (i === randomIndex){
                const spell = dataSorts[i];
                // On affiche la description du sort si besoin
                if(description == 1){
                    this.descSort  = spell.description;
                }
                
                // On affiche le nom du sort
                if(name == 1){
                    this.choicesProps.push = spell.name;
                    // const sortRnd = document.createElement('button');
                    // sortRnd.textContent = spell.name;
                    // proposition.appendChild(sortRnd);
                    // sortRnd.id = idStr;
                }
                return;
            }
        }
    },

    // Fonction appelée à la fin lors de la "victoire" de l'utilisateur afin de mettre fin aux questions et afficher le message de fin
    async loadEndPage(victory){
        // const endPhrase = document.getElementById('end');
        // const end = document.createElement('p');
        // end.textContent = "WIIIN !! THE END MUGGLE";
        // // Affiche le score
        // const score = document.createElement('p');
        // score.textContent = `Your score: ${this.nb_victory}/10`;
        // endPhrase.appendChild(score);

    }
  }
};
</script>

<!-- Pour les personnages -->
<!-- <script>
export default {
  name: 'App',
  data() {
    return {
      nb_victory: 0,
      nb_lose: 0,
      questions: [] 
    };
  },
  mounted() {
    this.fetchSorts();
  },
  methods: {
    async fetchSorts() {
      try {
        // On appelle les sorts de l'API
        const sorts = await fetch('https://hp-api.onrender.com/api/characters');
        const dataPersos = await persos.json();
        
//         // Serpentard
//         // const persoSerpentard = dataPersos.filter    (character => character.house.toLowerCase().startsWith('s'));
//         // Afficher tous les personnages
//         const charactersList = document.getElementById('charactersList');
        
        // Tous les afficher
        dataPersos.forEach((character) => {
            const li = document.createElement('li');
            li.textContent = character.name;
            // console.log(character.name);
            charactersList.appendChild(li);
        });

//         persoSerpentard.forEach((character) => {
//                 const li = document.createElement('li');
//                 li.textContent = character.name
//                 charactersList.appendChild(li);
//             });

      }
    }
}
}; -->
<!-- </script>   -->