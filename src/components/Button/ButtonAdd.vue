<template>
  <v-dialog v-model='dialog' width='400'>
    <template v-slot:activator='{ on, attrs }'>
      <v-btn v-bind='attrs' v-on='on' icon :disabled='!islogin' @click='getCreatePlaylist' style='color: inherit'>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card max-height='400' class='overflow-y-auto scrollbar-hidden' rounded='lg'>
      <template v-if='showDialog'>
        <v-overlay :value='dialog'>
          <v-progress-circular indeterminate size='64' width='10'></v-progress-circular>
        </v-overlay>
      </template>
      <template v-else>
        <v-list>
          <v-list-item v-for='item in playlist' :key='item.id' @click='addSong(item.id)' class='py-2'>
            <v-img :src='item.coverImgUrl' max-width='60' class='mr-4 rounded-lg'></v-img>
            <div class='d-flex flex-column justify-space-between py-1' style='height: 60px'>
              <div class='font-weight-bold text-truncate' style='max-width: 250px'>{{ item.name }}</div>
              <div class='font-weight-bold text-subtitle-1'>{{ item.trackCount }} 首</div>
            </div>
          </v-list-item>
        </v-list>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    id: { type: Number, required: true },
    nolove: { type: Boolean, default: false }
  },
  data: () => ({
    dialog: false,
    showDialog: false,
    // 创建的歌单 {coverImgUrl:String, id:Number, name:String, playCount:Number}
    playlist: []
  }),
  computed: {
    ...mapState({
      islogin: state => state.islogin,
      uid: state => state.user.uid
    })
  },
  methods: {
    // 向歌单添加歌曲
    addSong(params) {
      this.$http.playlist.tracks(params, this.id, true).then(res => {
        this.dialog = false
      })
    },
    // 获取用户创建的歌单
    getCreatePlaylist() {
      if (!JSON.parse(sessionStorage.getItem('userPlaylistsCached'))) {
        this.showDialog = true
      }
      this.$http.user.playlist(this.uid).then(res => {
        this.playlist = this.nolove ? res.create.filter(res => !/喜欢的音乐$/.test(res.name)) : res.create
        setTimeout(() => {
          this.showDialog = false
          sessionStorage.setItem('userPlaylistsCached', true)
        }, 600)
      })
    }
  }
}
</script>
