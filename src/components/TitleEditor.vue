<template>
  <div class="title-editor">
    <div class="inputs">
      <input v-model="title" class="title">
      <input v-model="subtitle">
      <button @click="addTitle">Add Title</button>
    </div>
    <div class="titles">
      <div v-for="(t, idx) in titles" class="title">
        <div>Title: {{t.title}}</div>
        <div>Subtitle: {{t.subtitle}}</div>
        <div class="buttons">
          <button @click="triggerTitle(t)" class="trigger">Trigger</button>
          <button @click="deleteTitle(idx)" class="delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const socket = window.socket;

  export default {
    data() {
      return {
        title: null,
        subtitle: null,
        titles: []
      }
    },
    name: "TitleEditor",
    methods: {
      addTitle() {
        this.titles.push({
          title: this.title,
          subtitle: this.subtitle
        })
        this.title = ''
        this.subtitle = ''
        window.localStorage.setItem("titles", JSON.stringify(this.titles))
      },
      deleteTitle (idx) {
        this.titles = this.titles.filter((title, i) => i !== idx)
        window.localStorage.setItem("titles", JSON.stringify(this.titles))
      },
      triggerTitle(title) {
        socket.emit("title", title)
      }
    },
    created() {
      const titles = window.localStorage.getItem("titles")
      if(titles) {
        this.titles = JSON.parse(titles)
      }
    }
  }
</script>

<style lang="scss" scoped>
.title-editor {
  max-width: 600px;
  margin: 40px auto;
  .inputs {
    display: flex;
    flex-direction: column;
    input, button {
      font-size: 120%;
      margin: 5px 0;
    }
  }
  .title {
    background: white;
    margin: 5px 0;
    text-align: left;
    font-size: 200%;
    button {
      font-size: 120%;
    }
    .buttons {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
}

</style>
