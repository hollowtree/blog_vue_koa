<template>
    <div>
        <ul>
            <li @click="showEditor" v-if="$store.state.data.isOwner">新建</li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        showEditor: function () {
            this.$store.state.editor.show = 'article'
        }
    }
}
</script>

