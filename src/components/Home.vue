<template>
    <div class="home" @scroll="onScrollChange" ref="home">
        <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
            <template v-slot:nav-left>
                <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
            </template>
            <template v-slot:nav-center>
                <search :bgColor="navBarCurrentSlotStyle.search.bgColor" :hintColor="navBarCurrentSlotStyle.search.hintColor" :icon="navBarCurrentSlotStyle.search.icon"></search>
            </template>
            <template v-slot:nav-right>
                <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
            </template>
        </navigation-bar>
        <div class="home-content">
            <my-swiper :swiperImgs="swiperData.map(item=>item.icon)" :height="swiperHeight"></my-swiper>
            <!--            活动-->
            <activity>
                <div class="activity-520"><img v-for="(item,index) in activityDatas" :key="index" :src="item.icon"
                                               alt=""></div>
            </activity>
            <!--            功能模块-->
            <mode-options></mode-options>
<!--            秒杀-->
            <seconds :dataSource="secondsDatas"></seconds>
<!--            拼购-->
            <activity>
                <div class="activity-pin-gou-jie">
                    <img src="@img/pinGouJie.gif" alt="">
                </div>
            </activity>
<!--            商品-->
            <goods></goods>
        </div>
    </div>
</template>

<script>
    import MySwiper from "./swiper/MySwiper";
    import Activity from "./Activity";
    import ModeOptions from "./ModeOptions";
    import Seconds from "./Seconds";
    import Goods from "./Goods";
    import NavigationBar from "./NavigationBar";
    import Search from "./Search";
    export default {
        data() {
            return {
                swiperData: [],
                swiperHeight: '183px',
                activityDatas: [],
                secondsDatas:[],
                navBarSlotStyle:{
                    normal:{
                        leftIcon:require('@img/more-white.svg'),
                        search:{
                            bgColor:'#fff',
                            hintColor: '#999',
                            icon:require('@img/search.svg')
                        },
                        rightIcon:require('@img/message-white.svg')
                    },
                    highlight:{
                        leftIcon:require('@img/more.svg'),
                        search:{
                            bgColor:'#d7d7d7',
                            hintColor: '#fff',
                            icon:require('@img/search-white.svg')
                        },
                        rightIcon:require('@img/message.svg')
                    }
                },
                navBarCurrentSlotStyle:{

                },
                navBarStyle:{
                    position:'fixed',
                    backgroundColor:''
                },
                scrollTopValue:-1,
                anchorScrollTop:160
            }
        },
        components: {
            MySwiper,
            Activity,
            ModeOptions,
            Seconds,
            Goods,
            NavigationBar,
            Search
        },
        created() {
            this.navBarCurrentSlotStyle=this.navBarSlotStyle.normal;
            this.initData()
        },
        activated() {
            this.$refs.home.scrollTo=this.scrollTopValue;
        },
        methods: {
            //获取数据
            initData() {
                this.axios.all([
                    this.axios.get('/json/swiper.json'),
                    this.axios.get('/json/activitys.json'),
                    this.axios.get('/json/seconds.json')
                ]).then(this.axios.spread((swiper, activity,seconds) => {
                    this.swiperData = swiper.list;
                    this.activityDatas = activity.list
                    this.secondsDatas=seconds.list;
                }))
            },
            onScrollChange($event){
                this.scrollTopValue=$event.target.scrollTop;
                let opacity=this.scrollTopValue/this.anchorScrollTop;
                if(opacity>=1){
                    this.navBarCurrentSlotStyle=this.navBarSlotStyle.highlight;
                }else{
                    this.navBarCurrentSlotStyle=this.navBarSlotStyle.normal;
                }
                this.navBarStyle.backgroundColor=`rgba(255,255,255,${opacity})`
            }
        }

    }
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";

    .home {
        width: 100%;
        background-color: $bgColor;
        overflow: auto;
        margin-bottom: px2rem(44);
        &-content {
            height: 100%;

            .activity-520 {
                margin-top: px2rem(-8);
                border-top-left-radius: px2rem(8);
                border-top-right-radius: px2rem(8);

                img {
                    display: inline-block;
                    width: 33.33%;
                }
            }

            .activity-pin-gou-jie{
                background: #ffffff;
                margin-top: $marginSize;
                img{
                    width: 100%;

                }
            }
        }
    }
</style>