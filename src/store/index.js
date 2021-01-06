import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState  from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  //持久化插件
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
        goodDetail: val.goodDetail,
        shoppingDatas:val.shoppingDatas
      }
    }
  })],
  state: {
    shoppingDatas:[],
    goodDetail:{}
  },
  getters:{
    // 获取goods数据 缓冲解决
    getGoodsDetail(state){
      return state.goodDetail;
    }
  },
  mutations: {
    //设置goods缓冲
    setGoodsDetail(state,goodsDetail){
      state.goodDetail=goodsDetail;
    },
    addShoppingData(state,goods){
      const isExist= state.shoppingDatas.some(item=>{
        if(item.id===goods.id){
          item.number+=1;
          return true;
        }
      })
      if(!isExist){
        Vue.set(goods,'isCheck',false)
        Vue.set(goods,'number',1)
        state.shoppingDatas.push(goods)
      }

    },
    changeShoppingDataNumber(state,data){
      state.shoppingDatas[data.index].number=data.number
    }
  },
  actions: {
  },
  modules: {
  }
})
