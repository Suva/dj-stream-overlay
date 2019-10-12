<template>
  <div class="inteface">
    <div class="buttons">
      <button @click="unload(0)">UNLOAD A</button>
      <button @click="unload(1)">UNLOAD B</button>
    </div>
    <form @submit.prevent="searchDiscogs">
      <input type="text" class="search" v-model="query">
    </form>

    <div>
      <record-list @remove="remove" @load="load" :records="records"/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import RecordList from "../components/RecordList"
  const socket = io();

  export default {
    components: {RecordList},
    data() {
      return {
        query: "",
        records: []
      }
    },
    name: "Interface",
    methods: {
      async searchDiscogs() {
        console.log(this.query)
        const { data } = await axios.post('/api/search', { q: this.query.match(/([0-9]+)$/)[0] })
        this.query = ""
        this.addRecord(data)
      },
      addRecord(data) {
        this.records.push(data)
        this.save()
      },
      load(record) {
        socket.emit('load', record)
      },
      unload(deck) {
        socket.emit('unload', deck)
      },
      remove(id) {
        this.records = this.records.filter(record => record.id !== id)
        this.save()
      },
      save() {
        window.localStorage.setItem("records", JSON.stringify(this.records))
      }
    },
    created() {
      const records = window.localStorage.getItem("records")
      if(records) {
        this.records = JSON.parse(records)
      }
    }
  }
</script>

<style lang="scss">
  .buttons {
    button {
      margin: 10px;
      font-size: 20px;
      padding: 10px;
    }
  }
</style>

