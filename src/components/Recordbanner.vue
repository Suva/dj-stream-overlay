<template>
    <div :class="{ right, bottom }">
      <div class="record" :class="{ right, bottom }" :style="recordStyle">
        <img v-if="thumbnail" :src="thumbnail">
        <img v-if="!thumbnail" src="/no-image.jpg">
        <div class="text">
          <h2 class="artist">{{ artist }}</h2>
          <h2 class="title">{{title}}</h2>
          <div class="additional-info">
            {{ label }} {{ year }} {{ country }}
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="coming" class="coming-up" :class="{ right, bottom }">
          Coming up!
        </div>
      </transition>
      <transition name="fade-record">
        <div v-if="coming && image" class="record-cover" :class="{ right, bottom }">
          <img :src="image">
        </div>
      </transition>
    </div>
</template>

<script>
import * as Vibrant from 'node-vibrant'

export default {
  name: "Recordbanner",
  props: [
    "artist",
    "title",
    "label",
    "year",
    "country",
    "thumbnail",
    "image",
    "right",
    "bottom"
  ],
  data() {
    return {
      coming: false,
      lightVibrant: '#f4a209',
      darkVibrant: '#871b89',
      lightMuted: '#351c87',
      darkMuted: '#351c87',
      recordStyle: ''
    }
  },
  watch: {
  },
  async mounted(){
    this.coming = true
    if(this.thumbnail){
      const palette = await Vibrant.from(this.thumbnail).getPalette()
      this.recordStyle = `background-image: linear-gradient(249deg, ${palette.DarkMuted.hex}, ${palette.DarkVibrant.hex}, ${palette.LightMuted.hex}, ${palette.LightVibrant.hex})`
    }
    setTimeout(() => { this.coming = false }, 10000)
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.record {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.56) ;
  width: 38vw;
  border: 1px solid black;
  display: flex;
  height: 100px;
  overflow: hidden;
  border-radius: 0 0 20px 0;
  position: relative;
  z-index: 3;
  font-family: 'Abel', sans-serif;

  background: linear-gradient(249deg, #120a24, #351c87, #871b89, #f4a209);
  background-size: 800% 800%;

  animation: fading-bg 10s ease-out forwards;

  @keyframes fading-bg {
    0%{background-position:0% 0%}
    100%{background-position:100% 100%}
  }

  &.bottom {
    border-radius: 0 20px 0 0;
  }
  &.right {
    border-radius: 0 0 0 20px;
    &.bottom {
      border-radius: 20px 0 0 0;
    }
    flex-direction: row-reverse;
    .text {
      text-align: right !important;
    }
  }

  img {
    height: 100%;
  }

  .artist {
    font-size: 150%;
  }

  .title {
    font-size: 120%;
  }

  .text {
    padding: 0 20px 0;
    font-size: 100%;
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    text-shadow: 1px 1px 5px black;
    h2 {
      margin: 0;
    }
    .additional-info {
      font-weight: bold;
    }
  }
}

.coming-up {
  z-index: 2;
  font-size: 200%;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 5px;
  color: white;
  text-shadow: 0px 0px 5px black;
  &.bottom {
    position: absolute;
    bottom: 105px;
    width: 38vw;
  }
}

.record-cover {
  z-index: 1;
  font-size: 200%;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 5px;
  color: white;
  text-shadow: 0px 0px 5px black;
  img {
    max-height: 75vh;
    max-width: 30vw;
    box-shadow: 0 0 10px black;
  }

  &.bottom {
    position: absolute;
    bottom: 140px;
    width: 38vw;
  }
}

.fade-enter-active{
  transition: all 1s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0.8s;
  transform: translateY(0);
  opacity: 1;
}

.fade-leave-active {
  transition: all 1s ease;
  opacity: 1;
  transform: translateY(-50px);
  &.bottom {
    transform: translateY(50px);
  }
}

.fade-enter {
  transform: translateY(-50px);
  &.bottom {
    transform: translateY(50px);
  }
}

.fade-leave-to {
  opacity: 0;
}

.fade-record-enter-active{
  transition: all 0.6s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0.3s;
  transform: translateY(0);
  opacity: 1;
}

.fade-record-leave-active {
  transition: all 0.6s ease;
  opacity: 1;
}

.fade-record-enter {
  transform: translateY(-800px);
  &.bottom {
    transform: translateY(800px);
  }
}

.fade-record-leave-to {
  transform: translateX(-800px);
  opacity: 0;
  &.right {
    transform: translateX(800px);
  }
}

</style>
