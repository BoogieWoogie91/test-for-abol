<template>
  <div class="tree-node">
    <div class="input-grp">
      <input type="text" ref="input" v-model="name">
      <select v-model="newItemType">
        <option value="dir">Dir</option>
        <option value="file">File</option>
      </select>
      <button @click="startCommit">OK</button>
    </div>

    <TreeNode :folders="folders" @deleteItem="deleteItem" @editItem="editItem" @addItem="addItem" :parentIndex="[-1]" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import TreeNode from './components/TreeNode.vue';
export default {
  components: {
    TreeNode,
  },

  data() {
    return {
      folders: this.$store.state.folders,
      name: '',
      currentTask: null,
      modifiedItem: {},
      newItemType: '',
    }
  },

  computed: {
    ...mapMutations([
      'deleteFolder',
      'editFolder',
      'addFolder',
      'addRootFolder'
    ]),

    ...mapActions([
      'findFolder'
    ])
  },

  methods: {
    addItem(item) {
      this.modifiedItem = item;
      this.currentTask = 'add'
      this.$refs.input.focus()
    },

    editItem(item) {
      this.modifiedItem = item;
      this.currentTask = 'edit'
      this.$refs.input.focus()
    },

    deleteItem(item) {
      this.$store.dispatch('findFolder', { searchFolder: item });
    },

    editItemCommit(item) {
      this.$store.commit('editFolder', item);
    },

    addItemCommit(item) {
      this.$store.commit('addFolder', item);
    },

    addRootCommit(item) {
      this.$store.commit('addRootFolder', item);
    },

    startCommit() {
      if (this.currentTask == 'add') {
        this.addItemCommit({ item: this.modifiedItem, name: this.name, type: this.newItemType })
      } else if (this.currentTask == 'edit') {
        this.editItemCommit({ item: this.modifiedItem, name: this.name, type: this.newItemType })
      } else {
        this.addRootCommit({ name: this.name, type: this.newItemType })
      }

      this.clearInputs();
    },

    clearInputs() {
      this.newItemType = '';
      this.name = '';
      this.currentTask = null;
    }
  }
}


</script>

<style lang="scss">
html {
  background: black;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.tree-node {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 30%;
  margin: 0 auto;

  .input-grp {
    width: 100%;
    display: flex;

    input {
      width: 60%;
    }

    select {
      width: 20%;
    }

    button {
      width: 20%;
    }
  }
}
</style>
