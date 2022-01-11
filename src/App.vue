<template>
  <!-- 
    
THANKS TO BENCODEZEN
https://www.youtube.com/watch?v=_uwZSWTAZ8c
https://github.com/bencodezen/peek-a-vue

 -->
  <h1 class="sr-only">card matching</h1>
  <img src="/images/peek-a-vue-title.png" alt="peek-a-vue" class="title" />

  <!-- <section class="game-board" name="shuffle-card">
      <Card
        v-for="card in cardList"
        :key="`${card.value}-${card.variant}`"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        @select-card="flipCard"
        :matched="card.matched"
      />
    </section> -->
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="flipCard"
      :matched="card.matched"
    />
  </transition-group>

  <!-- <h2>{{ userSelection }}</h2> -->
  <!-- <h2>{{ status }}</h2> -->
  <p>{{ remainingPairs }}</p>
  <!-- <button @click="shuffleCards">shuffle cards</button> -->
  <button v-if="newPlayer" @click="startGame" class="button">
    <img src="/images/play.svg" alt="restart-icon" /> start game
  </button>
  <button v-else @click="restartGame" class="button">
    <img src="/images/restart.svg" alt="restart-icon" /> restart game
  </button>
</template>

<script>
import { ref, watch } from "vue";
import createDeck from "./features/createDeck";
import createGame from "./features/createGame";
import halloweenDeck from "./data/halloweenDeck.json";
import Card from "./components/Card.vue";
import { launchConfetti } from "./utilities/confetti";

export default {
  name: "App",
  components: {
    Card,
  },
  setup() {
    const { cardList } = createDeck(halloweenDeck);
    const { newPlayer, startGame, restartGame, matchesFound, status } =
      createGame(cardList);
    const userSelection = ref([]);

    const flipCard = (payload) => {
      cardList.value[payload.position].visible = true;

      if (userSelection.value[0]) {
        if (
          userSelection.value[0].position === payload.position &&
          userSelection.value[0].faceValue === payload.faceValue
        ) {
          return;
        } else {
          userSelection.value[1] = payload;
        }
      } else {
        userSelection.value[0] = payload;
      }
    };

    watch(matchesFound, (currentValue) => {
      if (currentValue === 8) {
        launchConfetti();
      }
    });

    watch(
      userSelection,
      (currentValue) => {
        if (currentValue.length === 2) {
          // console.log("iki tane seçildi");
          const cardOne = currentValue[0];
          const cardTwo = currentValue[1];

          if (cardOne.faceValue === cardTwo.faceValue) {
            // status.value = "Matched";
            cardList.value[cardOne.position].matched = true;
            cardList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
              // status.value = "Mismatched";
              cardList.value[cardOne.position].visible = false;
              cardList.value[cardTwo.position].visible = false;
            }, 2000);
          }

          userSelection.value.length = 0;
        }
      },
      { deep: true }
    );
    return {
      cardList,
      flipCard,
      userSelection,
      status,
      matchesFound,
      // shuffleCards,
      restartGame,
      // cardItems,
      startGame,
      newPlayer,
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("../public/images/page-bg.png");
  background-color: #00070c;
  height: 100vh;
  color: mintcream;
  padding-top: 60px;
}
h1 {
  margin-top: 0;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(4, 120px);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  justify-content: center;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.title {
  padding-bottom: 30px;
}
.button {
  background-color: orange;
  color: mintcream;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  border: none;
  border-radius: 10px;
}
.button img {
  padding-right: 10px;
}
.shuffle-card-move {
  transition: transform 0.8s ease-in;
}

@media screen and (max-width: 768px) {
  .game-board {
    display: grid;
    grid-template-columns: repeat(4, 80px);
    grid-template-rows: repeat(4, 80px);
    grid-column-gap: 14px;
    grid-row-gap: 14px;
    justify-content: center;
  }
}
</style>
