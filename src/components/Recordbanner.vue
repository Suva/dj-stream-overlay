<template>
    <div>
      <div class="record" :class="{ right }">
        <img :src="record.thumb">
        <div class="text">
          <h2>{{ cleanName(record.artists.map(artist => artist.anv || artist.name + (artist.join === "&" ? " " + artist.join : artist.join)).join(" ")) }} - {{ record.title }}</h2>
          <div class="additional-info">
            {{ record.labels.map(label => cleanName(label.name)).join(", ") }} {{ record.year }}
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="coming" class="coming-up">
          Coming up!
        </div>
      </transition>
    </div>
</template>

<script>
  export default {
    name: "Recordbanner",
    props: ["record", "right"],
    data() {
      return {
        coming: false
      }
    },
    watch: {
    },
    mounted(){
      this.coming = true
      setTimeout(() => this.coming = false, 5000)
      console.log("mounted")
    },
    methods: {
      cleanName(name) {
        return name.replace(/ \([0-9]+\)/, "")
      }
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
  z-index: 2;
  &.right {
    border-radius: 0 0 0 20px;
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
  z-index: 1;
  font-size: 200%;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 5px;
  color: white;
  text-shadow: 0px 0px 5px black;
}

.fade-enter-active{
  transition: all 1s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-delay: 0.3s;
  transform: translateY(0);
  opacity: 1;
}

.fade-leave-active {
  transition: all 5s ease;
  opacity: 1;
}

.fade-enter {
  transform: translateY(-50px);
}

.fade-leave-to {
  opacity: 0;
}



</style>
