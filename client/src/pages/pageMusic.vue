<template>
    <div>
        <navigation-bar></navigation-bar>
        <ht-music></ht-music>
    </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar'

import htMusic from '@/components/htMusicPlayer'

export default {
    components: {
        NavigationBar,
        htMusic
    }
}
</script>

