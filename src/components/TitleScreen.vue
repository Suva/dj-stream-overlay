<template>
  <transition name="fade">
    <div v-if="title || subtitle"class="screen">
        <div class="title-block">
          <h1 class="title">{{ title }}</h1>
          <h2 class="subtitle">{{ subtitle }}</h2>
        </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ["title", "subtitle"],
    data() {
      return {

      }
    },
    name: "TitleScreen"
  }
</script>

<style lang="scss" scoped>
.screen {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 0 100px black;
  background: rgba(0,0,0,0.5);

  h1, h2 {
    font-family: 'Abel', sans-serif;
    color: white;
    padding: 0;
    margin: 0;
    text-shadow: 0 0 30px black;
  }
  h1 {
    font-size: 10vw;
    letter-spacing: 0.5vw;
    padding: 0;
    margin-top: -20px;
  }
  h2 {
    font-size: 3vw;
  }

}

.fade-enter-active{
  transition: all 5s ease-in;
  opacity: 1;
}

.fade-leave-active {
  transition: all 5s ease;
  opacity: 1;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
