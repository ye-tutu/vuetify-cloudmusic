<template>
  <v-row class='pa-3'>
    <!-- 专辑封面 -->
    <v-col cols='auto'>
      <image-cover :src='value.coverImgUrl' :size='180' />
    </v-col>
    <!-- 专辑信息 -->
    <v-col>
      <v-row>
        <!-- 标题 行 -->
        <v-col cols='12'>
          <span class='text-h4'>{{ value.name }}</span>
        </v-col>
        <!-- 头像 行 -->
        <v-col cols='12' class='py-0'>
          <image-avatar :uid='value.userId' :src='value.avatarUrl' />
          <span class='ml-2 text-subtitle-1'>{{ value.nickname }}</span>
          <span class='mx-10 text-subtitle-2 text--secondary'>创建于：{{ value.createTime }}</span>
          <span class='text-subtitle-2 text--secondary'>
            <span>播放：{{ value.playCount }}</span>
            <span class='mx-2'>分享：{{ value.shareCount }}</span>
            <span>收藏：{{ value.subscribedCount }}</span>
            <v-btn v-if='uid && value.userId !== uid' icon x-small class='ml-1 mb-1' @click='subscribe'>
              <v-icon :color='value.subscribed ? "success":""'>{{ value.subscribed ? 'mdi-check' : 'mdi-plus' }}</v-icon>
            </v-btn>
          </span>
        </v-col>
        <!-- 标签 行 -->
        <v-col cols='12' class='pb-0'>
          <span class='text-subtitle-2'>标签：</span>
          <song-chip v-for='item in value.tags' :key='item.id' :value='item' class='mr-2' />
        </v-col>
        <!-- 介绍 行 -->
        <v-col cols='12' class='pb-0 text-subtitle-2'>
          <div style='white-space: pre-wrap'>
            <span>介绍：{{ getDescription }}</span>
            <v-btn
              v-if='isShowBtn'
              text
              x-small
              color='success'
              class='ml-4 mt-n1'
              @click='
                showAllDescription = !showAllDescription;
                !showAllDescription &&
                  $vuetify.goTo(0, {
                    duration: 600,
                    easing: "easeOutQuad",
                  })
              '
            >{{ showAllDescription ? '收起' : '展开' }}</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import ImageAvatar from 'components/Image/ImageAvatar.vue'
import ImageCover from 'components/Image/ImageCover.vue'
import SongChip from 'components/Song/SongChip.vue'
export default {
  components: { ImageAvatar, ImageCover, SongChip },
  props: {
    value: { type: Object, required: true }
  },
  data: () => ({
    showAllDescription: false,
    isShowBtn: false
  }),
  computed: {
    ...mapState({
      uid: state => state.user.uid
    }),
    // 根据介绍文字长度返回文字
    getDescription() {
      if (this.value.description !== null) {
        if (this.value.description.length > 50) {
          this.isShowBtn = true
          return this.showAllDescription ? '\n' + this.value.description : this.value.description.substring(0, 50) + '...'
        } else {
          return this.value.description
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    // 收藏/取消收藏歌单
    subscribe() {
      this.$http.playlist.subscribe(this.value.id, !this.value.subscribed).then(() => {
        this.value.subscribed = !this.value.subscribed
      })
    }
  }
}
</script>
