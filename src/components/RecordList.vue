<template>
  <div class="recordlist">
    <div class="buttons">
      <button @click="unload(0)">UNLOAD A</button>
      <button @click="unload(1)">UNLOAD B</button>
    </div>

    <draggable v-model="recordList" @end="$emit('reorder', recordList)">
    <div :id="'loader'+idx" class="loader" :key="record.id" v-for="(record, idx) in recordList">
      <div class="load-button" :class="{loaded: loadedLeft === record}" @click="loadLeft(record)"> <i class="fas fa-caret-square-left"></i> </div>
      <div class="record" :class="{selected: selectedColumn === idx}">
      <div class="image"><img :src="record.thumb"></div>
      <div class="text">
        <h2>{{ record.artists_sort }} - {{ record.title }}</h2>
        <br>
        <button @click="remove(idx)">Remove</button>
      </div>

    </div>
      <div class="load-button" :class="{loaded: loadedRight === record}" @click="loadRight(record)"> <i class="fas fa-caret-square-right"></i> </div>
    </div>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
const socket = io()
const isInViewport = function (elem) {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
export default {
  name: 'record-list',
  components: {
    draggable
  },
  data() {
    return {
      loadedLeft: null,
      loadedRight: null,
      selectedColumn: 0,
      recordList: []
    }
  },
  props: {
    records: {}
  },
  methods: {
    loadLeft(record) {
      this.loadedLeft = record
      this.load({ channel: 0, record })
    },
    loadRight (record) {
      this.loadedRight = record
      this.load({ channel: 1, record })
    },
    remove(id) {
      this.$emit('remove', id)
    },
    load(record) {
      socket.emit('load', record)
    },
    unload(deck) {
      if(deck === 0) {
        this.loadedLeft = null
      } else {
        this.loadedRight = null
      }
      socket.emit('unload', deck)
    }
  },
  watch: {
    records(newValue) {
      console.log("records update")
      this.recordList = [...newValue]
    }
  },
  created() {
    this.recordList = [...this.records]
    window.onkeydown = (ev) => {
      if(ev.key.toLowerCase() === 'w') {
        this.selectedColumn = Math.max(this.selectedColumn - 1, 0)
        const el = document.getElementById('loader'+this.selectedColumn)
        if(!isInViewport(el)) {
          el.scrollIntoView()
        }
      }
      if(ev.key.toLowerCase() === 's') {
        this.selectedColumn = Math.min(this.selectedColumn + 1, this.recordList.length - 1)
        const el = document.getElementById('loader'+this.selectedColumn)
        if(!isInViewport(el)) {
          el.scrollIntoView()
        }
      }
      if(ev.key.toLowerCase() === 'a') {
        this.loadLeft(this.recordList[this.selectedColumn])
      }
      if(ev.key.toLowerCase() === 'd') {
        this.loadRight(this.recordList[this.selectedColumn])
      }
      if(ev.key.toLowerCase() === 'q') {
        this.unload(0)
      }
      if(ev.key.toLowerCase() === 'e') {
        this.unload(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .recordlist {
    max-width: 1200px;
    margin: 20px auto 0;
  }
  .loader {
    display: flex;
    padding-bottom: 5px;
    .load-button {
      width: 120px;
      height: 120px;
      font-size: 138px;
      margin: 0 5px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      &.loaded {
        color: green
      }
    }
  }
  .record {
    border: 1px solid black;
    width: 100%;
    display: flex;
    background: #b9b9b9;
    border-radius: 10px;
    &.selected {
      background: #86b986;
    }
    .image {
      padding: 0;
      margin: 0;
      height: 120px;

      img {
        height: 120px;
        padding: 0;
        margin: 0;
      }
    }
    .text {
      padding: 5px;
      text-align: left;
    }

    h2 {
      margin: 0;
      font-size: 110%;
    }
  }
</style>
