<template>
  <div class="rekordbox-buttons">
    <rekordbox-deck :track="track" v-for="track in decks"/>
  </div>
</template>

<script>
import RekordboxDeck from "./RekordboxDeck"

const socket = window.socket;

export default {
  name: "RekordboxButtons",
  components: {RekordboxDeck},
  data() {
      return {
          decks: [null, null, null, null]
      }
  },
  created() {
    socket.on('rekordbox-load', (track) => {
      this.decks = this.decks.map((deck, idx) => {
        if(idx + 1 === track.deck){
          if(deck && deck.image && (Number(new Date()) - deck.imageTime > 2000)) {
            delete deck.image
          }
          return { ...deck, ...track}
        }

        return deck
      })
    })
    socket.on('rekordbox-image', (image) => {
      this.decks = this.decks.map((deck, idx) =>
        idx + 1 === image.deck ? { ...(deck||{}), image: image.data, imageTime: Number(new Date()) }: deck)
    })
  }

}
</script>

<style lang="scss" scoped>
  .rekordbox-buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
  }
</style>

