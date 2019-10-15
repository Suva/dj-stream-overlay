<template>
    <div :class="{ right, bottom }">
      <div class="record" :class="{ right, bottom }">
        <img v-if="thumbnail" :src="thumbnail">
        <div class="text">
          <h2>{{ artist }} - {{ title }}</h2>
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
    }
  },
  watch: {
  },
  mounted(){
    this.coming = true
    setTimeout(() => { this.coming = false }, 10000)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.record {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.36);
  width: 48vw;
  border: 1px solid black;
  display: flex;
  height: 100px;
  overflow: hidden;
  background: linear-gradient(#0c1821, #043453);
  border-radius: 0 0 20px 0;
  position: relative;
  z-index: 3;
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

  .text {
    padding: 0 20px 0;
    font-size: 100%;
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
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
    width: 48vw;
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
    max-width: 50vw;
    box-shadow: 0 0 10px black;
  }

  &.bottom {
    position: absolute;
    bottom: 140px;
    width: 48vw;
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
