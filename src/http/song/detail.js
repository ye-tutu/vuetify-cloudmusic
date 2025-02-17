import time from 'common/time'
import axios from '../api'

function once(ids) {
  return new Promise((resolve, reject) => {
    axios
      .get('/song/detail', {
        params: {
          ids: ids.join(',')
        }
      })
      .then(response => {
        let arr = []
        response.songs.forEach(element => {
          arr.push({
            id: element.id,
            name: element.name,
            picUrl: element.al.picUrl,
            artists: element.ar.map(res => ({
              id: res.id,
              name: res.name
            })),
            albumID: element.al.id,
            album: element.al.name ? '《' + element.al.name + '》' : '',
            dt: element.dt,
            duration: time.song(element.dt)
          })
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

// 获取歌曲详情
function detail(ids) {
  return new Promise((resolve, reject) => {
    // 每500首请求一次，数量过多会报错
    const count = Math.ceil(ids.length / 500)
    // 存放请求函数的数组
    let funcHttp = []
    for (let i = 0; i < count; i++) {
      funcHttp.push(once(ids.slice(500 * i, 500 * (i + 1))))
    }
    let arr = []
    // 开始请求
    axios
      .all(funcHttp)
      .then(response => {
        response.forEach(element => {
          arr = arr.concat(element)
        })
        resolve(arr)
      })
      .catch(error => reject(error))
  })
}

export default detail
