<template>
    <ul v-for="(folder) in folders" :key="folder.name">
        <li>
            {{ folder.name }}

            <TreeNode v-if="folder.children" :folders="folder.children" @deleteItem="deleteItem" @editItem="editItem"
                @addItem="addItem" />

            <div class='btn-grp'>
                <button v-if="folder.children" @click="addItem(folder)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </button>
                <button @click="editItem(folder)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-pencil" viewBox="0 0 16 16">
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                </button>
                <button @click="deleteItem(folder)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                </button>
            </div>
        </li>
    </ul>
</template>

<script>
import TreeNode from './TreeNode.vue';
export default {
    components: {
        TreeNode,
    },
    props: {
        folders: Object,
        parentIndex: Array,
    },

    methods: {
        folderReturner(item) {
            if (item.children) {
                return true
            } else {
                return false
            }
        },

        addItem(item) {
            this.$emit("addItem", item)
        },

        editItem(item) {
            this.$emit("editItem", item)
        },

        deleteItem(item) {
            this.$emit("deleteItem", item)
        }
    }
}
</script>

<style lang="scss">
ul {
    box-sizing: border-box;
    border-left: 1px solid white;
    width: 100%;
    margin: 3px 0;

    li {
        position: relative;
        width: 100%;
        text-align: left;

        .btn-grp {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;

            button {
                width: 20px;
                height: 20px;
                padding: 0;
                margin: 1px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: white;
                border: 1px solid white;
                border-radius: 5px;
                cursor: pointer;
                transition: 300ms ease-in-out;

                &:hover {
                    background: black;
                }

                &:hover svg path {
                    fill: white;
                }

                svg {
                    width: 16px;
                    height: 16px;

                    path {
                        transition: 300ms ease-in-out;
                    }
                }
            }
        }
    }
}
</style>