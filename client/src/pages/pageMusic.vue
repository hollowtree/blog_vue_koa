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
        fetch('/static/data/music.json')
            .then(res => res.json())
            .then(data => {
                data.forEach(val => {
                    val.audioSrc = `http://music.smalltree.me/${val.file_name}.mp3`
                })
                this.musicList = data
            })
    }
}
</script>

