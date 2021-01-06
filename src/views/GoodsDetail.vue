<template>
    <div class="goods-detail">
        <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
            <template v-slot:nav-left>
                <div class="goods-detail-nav-left" @click="onBackClick">
                    <img src="@img/back-2.svg" alt="" :style="{opacity:leftImgOpacity}">
                    <img src="@img/back-white.svg" alt="" :style="{opacity: navBarSlotOpacity}">
                </div>
            </template>
            <template v-slot:nav-center>
                <p class="goods-detail-nav-title" :style="{opacity:navBarSlotOpacity}">商品详情</p>
            </template>
        </navigation-bar>
        <div class="goods-detail-content" >
            <parallax @onScrollChange="onScrollChange">
<!--                缓慢区域-->
                <template v-slot:parallax-slow>
                    <my-swiper :height="swiper_image_height+'px'" :swiperImgs="goodsData.swiperImgs" :pagination-type="'2'"></my-swiper>
                </template>
<!--                默认速度区域-->
                <template v-slot:default>
                    <div class="goods-detail-content-desc">
                        <div class="goods-detail-content-desc-item">
                            <p class="goods-detail-content-desc-item-price">{{goodsData.price | priceValue}}</p>
                            <p class="goods-detail-content-desc-item-name"><direct v-if="goodsData.isDirect"></direct>{{goodsData.name}}</p>
                        </div>
                        <div class="goods-detail-content-desc-item">
                            <p class="goods-detail-content-desc-item-select">已选<span class="single-row-text">{{goodsData.name}}</span></p>
                            <div class="goods-detail-content-desc-item-support">
                                <ul class="goods-detail-content-desc-item-support-list">
                                    <li class="goods-detail-content-desc-item-support-list-item" v-for="(item,index) in attachDatas" :key="index">
                                        <img src="@img/support.svg" alt="">
                                        <span>{{item}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="goods-detail-content-desc-detail">
                            <img :src="item" :key="index" v-for="(item,index) in goodsData.detailImgs" alt="">
                        </div>
                    </div>
                </template>
            </parallax>
        </div>
        <div class="goods-detail-buy">
            <div class="goods-detail-buy-add" @click="onAddGoodsClick">
                加入购物车
            </div>
            <div class="goods-detail-buy-now" @click="onBuyClick">
                立即购买
            </div>
        </div>
    </div>
</template>

<script>
    import NavigationBar from "../components/NavigationBar";
    import MySwiper from "../components/swiper/MySwiper";
    import Direct from "../components/Direct";
    import Parallax from "../components/Parallax";
    import {mapGetters} from 'vuex'
    export default {
        name:'goodsdetail',
        components:{
            NavigationBar,
            MySwiper,
            Direct,
            Parallax
        },

        data(){
            return {
                scrollValue:0,
                anchor_scroll_top:310,
                swiper_image_height:364,

                goodsData:{},
                attachDatas:[
                    '可配送海外',
                    '京东发货&售后',
                    '京准达',
                    '221限时达',
                    '可自提',
                    '不可使用优惠券'
                ]
            }
        },
        methods:{
            onBackClick(){
                this.$router.go(-1)
            },
            onScrollChange(scrollValue){
                this.scrollValue=scrollValue;
            },
            onBuyClick(){
                this.$router.push({
                    name:'buy',
                    params:{
                        routerType:'push'
                    },
                    query:{
                        goodsId:this.goodsData.id
                    }
                })
            },
            onAddGoodsClick(){
                //保存到购物车
                this.$store.commit('addShoppingData',this.goodsData)
                this.$router.push({
                    name:'home',
                    params:{
                        routerType:'push',
                        componentIndex:1,
                        clearTask:true,
                    }
                })
            }
        },
        created() {
            if(this.$route.params.good){
                this.goodsData=this.$route.params.good
            }else{
                this.goodsData=this.getGoodsDetail;
            }

        },
        computed:{
            ...mapGetters([
                'getGoodsDetail'
            ]),
            leftImgOpacity(){
                return 1-this.scrollValue/this.anchor_scroll_top
            },
            navBarStyle(){
                return {
                    backgroundColor:'rgba(216,30,6,'+this.navBarSlotOpacity+')',
                    position: 'fixed',
                    top:0
                }
            },
            navBarSlotOpacity(){
                return 1-this.leftImgOpacity;
            }
        }

    }
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
    .goods-detail{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column;

        &-nav-left{
            width: 100%;
            display: flex;
            position: relative;
            img{
                position: absolute;
                align-self: center;
            }
        }
        &-nav-title{
            width: 100%;
            height: 100%;
            font-size: $titleSize;
            font-weight: bold;
            text-align: center;
            color: #ffffff;
        }
        &-content{
            height: 100%;

            &-desc{
                width: 100%;
                background-color: $bgColor;
                box-shadow: 0 0 px2rem(16) 0 rgba(0,0,0,0.2);
                &-item{
                    background-color: #ffffff;
                    padding: $marginSize;
                    margin-bottom: $marginSize;
                    &-price{
                        font-size: px2rem(20);
                        color: $mainColor;
                        font-weight: 500;
                    }
                    &-name{
                        margin-top: $marginSize;
                        font-size: $titleSize;
                        font-weight: 500;
                        line-height: px2rem(20);
                    }
                    &-select{
                        font-size: $infoSize;
                        color: $hintColor;
                        height: px2rem(44);
                        display: flex;
                        align-items: center;
                        border-bottom: px2rem(1) solid $lineColor;
                        span{
                            color:$textColor;
                            font-size: $titleSize;
                            font-weight: bold;
                            margin-left: px2rem(4);
                        }
                    }
                    &-support{
                        margin-top: $marginSize;
                        &-list{
                            display: flex;
                            flex-wrap: wrap;
                            &-item{
                                display: flex;
                                align-items: center;
                                padding: px2rem(6) 0;
                                margin-right: $marginSize;
                                img{
                                    width: px2rem(12);
                                    margin-right: px2rem(4);
                                }
                                span{
                                    font-size: $minInfoSize;
                                    color: $hintColor;
                                }
                            }
                        }
                    }
                }
                &-detail{
                    img{
                        width: 100%;
                        vertical-align: bottom;
                    }
                }
            }
        }

        &-buy{
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 999;
            background-color: #fff;
            border-top: px2rem(1) solid $lineColor;
            height: px2rem(46);
            line-height: px2rem(46);
            text-align: right;
            div{
                display: inline-block;
                width: px2rem(100);
                text-align: center;
                font-size: $infoSize;
                color: white;
            }
            &-add{
                background-color: $mainColor;
            }
            &-now{
                background-color: darkgoldenrod;
            }
        }
    }
</style>