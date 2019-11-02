<template>
  <div class="inteface">
    <rekordbox-buttons></rekordbox-buttons>

    <form @submit.prevent="searchDiscogs">
      <input type="text" class="search" v-model="query">
    </form>

    <div>
      <record-list @reorder="reorder" @remove="remove" :records="records"/>
    </div>

    <div>
      <title-editor></title-editor>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import RecordList from "../components/RecordList"
import TitleEditor from "../components/TitleEditor"
import RekordboxButtons from "../components/RekordboxButtons"

export default {
  components: {RekordboxButtons, TitleEditor, RecordList},
  data() {
    return {
      query: "",
      records: []
    }
  },
  name: "Interface",
  methods: {
    recordExists(recordId) {
      return !!this.records.find(record => record.id === recordId)
    },
    async searchDiscogs() {
      let recordId = this.query.match(/([0-9]+)$/)[0]
      if(this.recordExists(recordId)){
        this.query = ""
        return
      }

      const { data } = await axios.post('/api/search', { q: recordId })
      this.query = ""
      this.addRecord(data)
    },
    addRecord(data) {
      this.records = [ ...this.records, data ]
      this.save()
    },
    remove(id) {
      this.records = this.records.filter((record, idx)=> idx !== id)
      this.save()
    },
    reorder(records) {
      this.records = records
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

<style lang="scss" scoped>
  .interface {
    padding: 0 80px;
    .buttons {
      button {
        margin: 10px;
        font-size: 20px;
        padding: 10px;
      }
    }
  }

</style>

