<template>
  <div class="recordlist">
    <div class="loader" v-for="record in records">
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
  </div>
</template>
<script>
  export default {
    name: 'record-list',
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
