import axios from '../api'

// 获取用户播放记录
function record(uid, type = 0) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/record', {
        params: {
          uid,
          type
        }
      })
      .then(response => {
        if (response) {
          let arr = []
          const key = type === 0 ? 'allData' : 'weekData'
          response[key].forEach(element => {
            arr.push({
              playCount: element.playCount === 0 ? '-' : element.playCount,
              score: element.score,
              song: {
                id: element.song.id,
                name: element.song.name,
                artists: element.song.ar.map(res => ({
                  id: res.id,
                  name: res.name
                }))
              }
            })
          })
          resolve(arr)
        } else {
          resolve(false)
        }
      })
      .catch(error => reject(error))
  })
}

export default record
