<style lang="less">
.ht-music {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #aed2e2;
  font-size: 14px;
}
#htMusic {
  display: none;
}
.current-music {
  height: 80px;
  border-bottom: 1px solid #aed2e2;
  padding-left: 80px;
  position: relative;
  .music-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    height: 80px;
  }
  .music-ctrl-btn {
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;
    border-radius: 50%;
    transition: left 0.3s ease, top 0.3s ease;
    &.play {
      width: 40px;
      height: 40px;
      left: 40px;
      top: 40px;
      transform: translate(-50%, -50%);
      border: 3px solid rgba(174, 210, 226, 0.6);
      &:before {
        position: absolute;
        left: 13px;
        top: 10px;
        content: "";
        display: table;
        border: 12px solid transparent;
        border-top-width: 8px;
        border-bottom-width: 8px;
        border-left-color: rgba(174, 210, 226, 0.6);
      }
    }
    &.pause {
      width: 20px;
      height: 20px;
      left: 65px;
      top: 65px;
      transform: translate(-50%, -50%);
      border: 2px solid rgba(174, 210, 226, 0.6);
      &::before,
      &::after {
        position: absolute;
        top: 4px;
        content: "";
        display: table;
        background: rgba(174, 210, 226, 0.6);
        width: 2px;
        height: 8px;
      }

      &:before {
        left: 5px;
      }
      &:after {
        right: 5px;
      }
    }
  }

  .music-title {
    line-height: 40px;
    margin-left: 20px;
  }
  .music-time {
    font-size: 12px;
    vertical-align: middle;
    line-height: 40px;
    margin-right: 20px;
    float: right;
  }
  .music-bar-container {
    // border: 1px solid rgba(174, 210, 226, 0.6);
    background: rgba(174, 210, 226, 0.4);
    height: 6px;
    border-radius: 3px;
    width: e("calc(100% - 120px)");
    position: absolute;
    bottom: 15px;
    right: 20px;
  }
  .music-bar {
    height: 6px;
    background: #aed2e2;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    position: relative;
  }
  .music-bar-btn {
    width: 14px;
    height: 14px;
    border-radius: 7px;
    display: block;
    background: #fff;
    border: 2px solid #aed2e2;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: -4px;
  }
}
.song-list {
  li {
    padding: 0 15px;
    line-height: 28px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background: #fff;
    }
  }
}
.song-index {
  margin-right: 18px;
  display: inline-block;
  float: left;
}
.song-title {
  max-width: 50%;
  display: inline-block;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song-singer {
  float: right;
  max-width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 1024px) {
  .ht-music {
    .song-list {
      li {
        font-size: 2rem;
        line-height: 4rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
<template>
    <div class="ht-music">
        <audio controls autoplay loop id="htMusic" :src="audioSrc">
        </audio>
        <div class="current-music">
            <div class="music-cover">

            </div>
            <i class="music-ctrl-btn" :class="play ? 'pause' : 'play'" @click="playOrPause"></i>
            <p>
                <span class="music-title">{{musicTitle}}</span>
                <span class="music-time">{{musicTime}}</span>
            </p>
            <div class="music-bar-container">
                <div class="music-bar" :style="{width: progress + '%'}">
                    <i class="music-bar-btn"></i>
                </div>
            </div>
        </div>
        <div class="song-list-container">
            <ul class="song-list">
                <li v-for="(item, i) in musicList" :key="i" @click="startPlay(item)" class="clearfix">
                    <span class="song-index">{{i + 1}}</span>
                    <span class="song-title">{{item.title}}</span>
                    <span class="song-singer">{{item.singer}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        musicList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            audioSrc: '',
            musicTitle: '',
            musicTime: '00:00/00:00',
            play: false,
            progress: 0
        }
    },
    methods: {
        startPlay(item) {
            if (!item) {
                if (this.musicList.length) {
                    item = this.musicList[0]
                } else {
                    return
                }
            }
            this.audioSrc = item.audioSrc
            this.musicTitle = item.title + ' - ' + item.singer
            this.play = true
            setTimeout(() => {
                let el = document.getElementById('htMusic')
                el.currentTime = 0
                el.play()
                this.updateTime()
            }, 0)
        },
        updateTime() {
            let el = document.getElementById('htMusic')
            let currentTime = el.currentTime
            let duration = el.duration

            this.musicTime = this.formatTime(currentTime) + '/' + this.formatTime(duration)
            if (duration) {
                this.progress = currentTime * 100 / duration
            } else {
                this.progress = 0
            }
            if (this.play) {
                setTimeout(() => {
                    this.updateTime()
                }, 300)
            }
        },
        formatTime(val) {
            let mm = Math.floor(val / 60) || 0
            let ss = Math.floor(val % 60) || 0
            return (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss)
        },
        playOrPause() {
            let el = document.getElementById('htMusic')
            if (!this.audioSrc) {
                this.startPlay()
                return
            }
            setTimeout(() => {
                this.play = !this.play
                if (this.play) {
                    el.play()
                    this.updateTime()
                } else {
                    el.pause()
                }
            }, 0)
        }
    }
}
</script>

