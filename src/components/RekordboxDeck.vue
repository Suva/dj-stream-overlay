<template>
    <div @click="trigger" class="rekordbox-deck" :class="{ fresh, announced, loaded: !!track }">
      <template v-if="track">
        <div class="text">
          <div class="artist">{{ track.artist }}</div>
          <div class="title">{{ track.title }}</div>
        </div>
        <img v-if="track.image" :src="'data:image/jpeg;base64,' + track.image">
        <img v-if="!track.image" src="/no-image.jpg">
      </template>
    </div>
</template>
<script>
  const socket = window.socket;

  export default {
    name: 'rekordbox-deck',
    data() {
        return {
          announced: false,
          fresh: true
        }
    },
    props: {
        track: {
            type: Object
        },
    },
    watch: {
      track() {
        if(this.announced) {
          this.unload()
        }
        this.announced = false
        this.fresh = true
      }
    },
    methods: {
      trigger() {
        if(!this.track) return

        if (this.announced) {
          this.announced = false
          this.unload()
        } else {
          this.announced = true
          this.fresh = false
          this.load()
        }
      },
      load() {
        socket.emit('load', {
          channel: this.track.deck < 3 ? 3 : 4,
          record: {
            artist: this.track.artist,
            title: this.track.title,
            thumbnail: this.track.image && 'data:image/jpeg;base64,' + this.track.image
          }
        })
      },
      unload() {
        socket.emit('unload',  this.track.deck < 3 ? 2 : 3)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .rekordbox-deck {
    width: 200px;
    height: 115px;
    border: 1px solid white;
    margin: 5px;
    padding: 5px;
    color: white;
    background: dimgray;
    opacity: 0.2;
    font-size: 80%;
    text-align: center;

    .text {
      padding-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-align: left;
    }


    img {
      margin: 0 auto;
      width: 80px;
    }

    &.loaded {
      opacity: 1;
      background: #333333;
      &.fresh {
        animation: pulsing-red 1s infinite;
      }
      &.announced {
        animation: pulsing-green 3s infinite;
      }
    }

    @keyframes pulsing-red {
      0% { background: #500000; }
      50% { background: #ae0000; }
      100% { background: #500000; }
    }

    @keyframes pulsing-green {
      0% { background: #005000; }
      50% { background: #007a00; }
      100% { background: #005000; }
    }


    .title {
      font-weight: bold;
    }
  }
</style>
