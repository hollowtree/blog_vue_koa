<template>
    <div>
        <ul>
            <li @click="showEditor">新建</li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        showEditor: function() {
            this.$store.state.showEditor = true
        }
    }
}
</script>

