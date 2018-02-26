<template>
    <div>
        <navigation-bar></navigation-bar>
        <ht-music :musicList="musicList"></ht-music>
    </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar'

import htMusic from '@/components/htMusicPlayer'

export default {
    components: {
        NavigationBar,
        htMusic
    },
    data() {
        return {
            musicList: []
        }
    },
    created() {
        fetch('/static/data/music.json').then(res => {
            return res.json()
        }).then(data => {
            this.musicList = data
        })
    }
}
</script>

