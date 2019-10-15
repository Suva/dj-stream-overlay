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
        <recordbanner :thumbnail="leftThumb" v-bind="leftBottomRecord" :bottom="true"></recordbanner>
      </div></transition>
    <transition name="offscreen-right">
      <div v-if="rightBottomVisible" class="record-display right bottom">
        <recordbanner :thumbnail="rightThumb" v-bind="rightBottomRecord" :right="true" :bottom="true"></recordbanner>
      </div></transition>
  </div>
</template>

<script>
import Recordbanner from "../components/Recordbanner"
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

function mapRekordboxRecord(record) {
  return {
    artist: record.artist,
    title: record.title,
  }
}

export default {
  name: "Overlay",
  components: {Recordbanner},
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
      leftThumb: null,
      rightThumb: null
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
      if(channel === 0) {
        this.leftVisible = false
        setTimeout(() => {
          this.leftRecord = mapDiscogsRecord(record)
          this.leftVisible = true
        }, 300)
      } else {
        this.rightVisible = false
        setTimeout(() => {
          this.rightRecord = mapDiscogsRecord(record)
          this.rightVisible = true
        }, 300)
      }
    })
    socket.on('rekordbox-load', (record) => {
      console.log(record)
      if(record.deck === 2) {
        this.leftBottomRecord = false
        setTimeout(() => {
          this.leftBottomRecord = mapRekordboxRecord(record)
          this.leftBottomVisible = true
        }, 300)
      } else {
        this.rightBottomVisible = false
        setTimeout(() => {
          this.rightBottomRecord = mapRekordboxRecord(record)
          this.rightBottomVisible = true
        }, 300)
      }
    })
    socket.on('rekordbox-image', (image) => {
      if(image.deck === 2) {
        setTimeout(() => {
          this.leftThumb = 'data:image/jpeg;base64,' + image.data
        }, 300)
      } else {
        setTimeout(() => {
          this.rightThumb = 'data:image/jpeg;base64,' + image.data
        }, 300)
      }
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
