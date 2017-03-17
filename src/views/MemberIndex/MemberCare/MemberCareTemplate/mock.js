import {randomArr, randomImg} from 'utils'
import Mock, {Random} from 'mockjs'

Mock.mock(/\/mobile-show\/boss-scene-list/, () => {
  return {
    data: randomArr(10).map((item, index) => {
      return {
        sceneName: Random.cword(2, 20),
        sceneId: Random.id(11),
        sceneCover: randomImg(60, 60, index)
      }
    })
  }
})
