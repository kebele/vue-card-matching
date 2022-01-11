<template>
  <div class="card" @click="selectCard" :class="flippedStyles">
    <!-- <div v-if="visible" class="card-face is-front"> -->
    <div class="card-face is-front">
      <img :src="`/images/${value}.png`" :alt="value" class="card-image" />
      <img
        src="/images/checkmark.svg"
        v-if="matched"
        alt=""
        class="icon-checkmark"
      />
    </div>
    <!-- <div v-else class="card-face is-back">back</div> -->
    <!-- <div v-else class="card-face is-back"></div> -->
    <!-- <div class="card-face is-back" style="color: black">{{ position }}</div> -->
    <div class="card-face is-back" style="color: black"></div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    position: {
      type: Number,
      required: true,
    },
    // value: {
    //   type: Number,
    //   required: true,
    // },
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    matched: {
      type: Boolean,
      defalt: false,
    },
  },
  setup(props, context) {
    const flippedStyles = computed(() => {
      if (props.visible) {
        return "is-flipped";
      }
    });

    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };

    return {
      flippedStyles,
      selectCard,
    };
  },
};
</script>

<style scoped>
.card {
  /* border: 5px solid #ccc; */
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
}
.card.is-flipped {
  transform: rotateY(180deg);
}
.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}
.card-face.is-front {
  /* background-color: red; */
  background-image: url("/images/card-bg.png");
  color: whitesmoke;
  transform: rotateY(180deg);
}
.card-face.is-back {
  /* background-color: blue; */
  background-image: url("/images/card-bg-empty.png");
  color: whitesmoke;
}
.card-image {
  max-width: 80%;
}
.icon-checkmark {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
