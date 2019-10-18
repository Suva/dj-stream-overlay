<template>
  <div class="overlay">
    <transition name="offscreen">
      <div v-if="leftVisible" class="record-display left top">
      <recordbanner v-bind="leftRecord"></recordbanner>
    </div></transition>
    <transition name="offscreen-right">
      <div v-if="rightVisible" class="record-display right top">
      <recordbanner v-bind="rightRecord" :right="true"></recordbanner>
    </div></transition>
    <transition name="offscreen">
      <div v-if="leftBottomVisible" class="record-display left bottom">
        <recordbanner v-bind="leftBottomRecord" :bottom="true"></recordbanner>
      </div></transition>
    <transition name="offscreen-right">
      <div v-if="rightBottomVisible" class="record-display right bottom">
        <recordbanner v-bind="rightBottomRecord" :right="true" :bottom="true"></recordbanner>
      </div></transition>
    <title-screen :title="title" :subtitle="subtitle"></title-screen>
  </div>
</template>

<script>
import Recordbanner from "../components/Recordbanner"
import TitleScreen from "../components/TitleScreen"
const socket = io();

function cleanName(name) {
  return name.replace(/ \([0-9]+\)/, "")
}

function mapDiscogsRecord(record) {
  return {
    artist: cleanName(record.artists.map(artist => artist.anv || artist.name + (artist.join === "&" ? " " + artist.join : artist.join)).join(" ")),
    title: record.title,
    year: record.year,
    country: record.country,
    label: record.labels.map(label => cleanName(label.name)).join(", "),
    thumbnail: record.thumb,
    image: record.images[0].uri
  }
}

export default {
  name: "Overlay",
  components: {TitleScreen, Recordbanner},
  data () {
    return {
      leftVisible: false,
      rightVisible: false,
      leftRecord: null,
      rightRecord: null,
      leftBottomVisible: false,
      rightBottomVisible: false,
      leftBottomRecord: null,
      rightBottomRecord: null,
      title: null,
      subtitle: null
    }
  },
  created() {
    socket.on('unload', (deck) => {
      if(deck === 0) {
        this.leftVisible = false
      } else if(deck === 1) {
        this.rightVisible = false
      } else if(deck === 2) {
        this.leftBottomVisible = false
      } else if(deck === 3) {
        this.rightBottomVisible = false
      }
    })
    socket.on('load', ({channel, record}) => {
      if(channel === 0) {
        this.leftVisible = false
        setTimeout(() => {
          this.leftRecord = mapDiscogsRecord(record)
          this.leftVisible = true
        }, 300)
      } else if(channel === 1) {
        this.rightVisible = false
        setTimeout(() => {
          this.rightRecord = mapDiscogsRecord(record)
          this.rightVisible = true
        }, 300)
      } else if(channel === 3) {
        this.leftBottomVisible = false
        setTimeout(() => {
          this.leftBottomRecord = record
          this.leftBottomVisible = true
        }, 300)
      } else {
        this.rightBottomVisible = false
        setTimeout(() => {
          this.rightBottomRecord = record
          this.rightBottomVisible = true
        }, 300)
      }
    })

    socket.on('title', (data) => {
      console.log(data)
      this.title = data.title
      this.subtitle = data.subtitle
      setTimeout(() => {
        this.title = null
        this.subtitle = null
      }, 20000)
    })
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

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
  &.top {
    top: 0;
  }
  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  &.bottom {
    bottom: 0;
  }
}
</style>
