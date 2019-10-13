<template>
  <div class="recordlist">
    <draggable v-model="recordList" @end="$emit('reorder', recordList)">
    <div class="loader" :key="record.id" v-for="record in recordList">
      <div class="load-button" @click="loadLeft(record)"> <i class="fas fa-caret-square-left"></i> </div>
      <div class="record">
      <div class="image"><img :src="record.thumb"></div>
      <div class="text">
        <h2>{{ record.artists_sort }} - {{ record.title }}</h2>
        <br>
        <button @click="remove(record.id)">Remove</button>
      </div>

    </div>
      <div class="load-button" @click="loadRight(record)"> <i class="fas fa-caret-square-right"></i> </div>
    </div>
    </draggable>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'record-list',
    components: {
      draggable
    },
    data() {
      return {
        recordList: []
      }
    },
    props: {
      records: {}
    },
    methods: {
      loadLeft(record) {
        this.$emit('load', { channel: 0, record })
      },
      loadRight (record) {
        this.$emit('load', { channel: 1, record })
      },
      remove(id) {
        this.$emit('remove', id)
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
    }
  }
</script>

<style lang="scss" scoped>
  .recordlist {
    width: 1200px;
    margin: 20px auto 0;
  }
  .loader {
    display: flex;
    padding-bottom: 5px;
    .load-button {
      width: 120px;
      height: 120px;
      font-size: 700%;
      margin: 0 5px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
    }
  }
  .record {
    border: 1px solid black;
    width: 100%;
    display: flex;
    background: #b9b9b9;
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
