<template>
  <div>
    <transition name="offscreen"><div v-if="leftVisible" class="record-display left">
      <recordbanner :record="leftRecord"></recordbanner>
    </div></transition>
    <transition name="offscreen-right"><div v-if="rightVisible" class="record-display right">
      <recordbanner :record="rightRecord" :right="true"></recordbanner>
    </div></transition>
  </div>
</template>

<script>
  import Recordbanner from "../components/Recordbanner"
  const socket = io();

  export default {
    name: "Overlay",
    components: {Recordbanner},
    data () {
      return {
        leftVisible: false,
        rightVisible: false,
        leftRecord: null,
        rightRecord: null
      }
    },
    created() {
      socket.on('unload', (deck) => {
        if(deck === 0) {
          this.leftVisible = false
        } else {
          this.rightVisible = false
        }
      })
      socket.on('load', ({channel, record}) => {
        console.log("Loading to channel ", channel, record)
        if(channel === 0) {
          this.leftVisible = false
          setTimeout(() => {
            this.leftRecord = record
            this.leftVisible = true
            this.leftComing = true
          }, 300)
        } else {
          this.rightVisible = false
          setTimeout(() => {
            this.rightRecord = record
            this.rightVisible = true
            this.rightComing = true
          }, 300)
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
.offscreen-enter-active, .offscreen-leave-active,
.offscreen-right-enter-active, .offscreen-right-leave-active {
  transition: all 0.3s ease;
  transform: translateX(0);
  opacity: 1;
}

.offscreen-enter, .offscreen-leave-to {
  transform: translateX(-50vw);
}

.offscreen-right-enter, .offscreen-right-leave-to {
  transform: translateX(50vw);
}

.offscreen-leave-to, .offscreen-right-leave-to {
  opacity: 0;
}

.record-display {
  position: absolute;
  top: 0;
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
}
</style>
