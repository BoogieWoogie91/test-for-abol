import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      folders: [
        {
          name: 'Dir 1',
          children: [          
            {
              name: 'Dir 1-1',
              children: [
                {
                  name: 'File 1-1-1'
                }
              ]
            },
            {
              name: 'File 1-2'
            }
          ]
        },
        {
          name: 'Dir 2',
          children: [
            {
              name: 'Dir 2-1',
              children: [],
            },
            {
              name: 'File 2-2'
            }
          ]
        },
        {
          name: 'File 3'
        }
      ],
    }
  },
  mutations: {
    deleteFolder(state, obj) {
      if (obj.parent) {
        obj.parent.children.splice(obj.index, obj.index + 1)
      } else {
        state.folders.splice(obj.index, obj.index + 1)
      }
    },

    editFolder(state, obj) {
      state;
      obj.item.name = obj.name;      
    },

    addFolder(state, obj) {
      state;
      if (obj.type == 'dir') {
        obj.item.children.push({
          name: obj.name,
          children: [],
        })
      } else {
        obj.item.children.push({
          name: obj.name,
        })
      }    
    },

    addRootFolder(state, obj) {
      if (obj.type == 'dir') {
        state.folders.push({
          name: obj.name,
          children: [],
        })
      } else {
        state.folders.push({
          name: obj.name
        })
      }    

    }
  },

  actions: {
    findFolder({ commit, dispatch, state }, obj) {
      if (!obj.parent) {
        state.folders.map((item, index) => {
          if (item == obj.searchFolder) {
            commit('deleteFolder', {index: index})
          } else {
            if (item.children) {
              dispatch('findFolder', {parent: item, searchFolder: obj.searchFolder})
            }            
          }
        })
      } else {
        obj.parent.children.map((item, index) => {
          if (item == obj.searchFolder) {
            commit('deleteFolder', {parent:obj.parent, index: index})
          } else {
            if (item.children) {
              dispatch('findFolder', {parent: item, searchFolder: obj.searchFolder})
            }            
          }
        })
      }
    }
  }
})
