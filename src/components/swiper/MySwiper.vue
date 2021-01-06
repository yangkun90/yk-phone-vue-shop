<template>
    <!--    swiper添加-->
    <div>
        <swiper :options="swiperOption" >
            <swiper-slide v-for="(item,index) in swiperImgs" :key="index">
                <img class="swiper-slide-img" :style="{height:height}" :src="item" alt="">
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        props: {
            height: {
                type: String,
                default: 'auto'
            },
            //数据源
            swiperImgs: {
                type: Array,
                required: true,
                default: function () {
                    return []
                }
            },
            paginationType:{
                type:String,
                default:'1'
            }
        },
        created() {
          this.initPaginnationLayout()
        },
        methods:{
          initPaginnationLayout(){
              switch (this.paginationType) {
                case '1':
                    this.swiperOption.pagination={
                        el: '.swiper-pagination',
                        bulletClass : 'custom-bullet-class',
                        type:'bullets'
                    }
                    break
                case '2':
                    this.swiperOption.pagination={
                        el: '.swiper-pagination',
                        type:'fraction'
                    }
                    break
              }
          }
        },
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                //swiper配置
                swiperOption: {
                    autoplay: {
                        disableOnInteraction: false,
                        delay: 1500,
                    },
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        bulletClass : 'custom-bullet-class',
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "@css/style.scss";
    .swiper-slide-img{
        width: 100%;
    }
    .swiper-slide {
        display: flex;
        justify-content: center;
    }

    .swiper-pagination {
        bottom: px2rem(12);
        .custom-bullet-class {
            box-sizing: border-box;
            border-radius: 100%;
            height: px2rem(6);
            width: px2rem(6);
            border: px2rem(1) solid #fff;
            margin: 0 px2rem(4);
            display: inline-block;
            opacity: 1;
        }
        .swiper-pagination-bullet-active{
            background: white;
        }
    }

    .swiper-slide-img{
        width: 100%;
    }
    /*数字分页*/
    .swiper-pagination-fraction{
        left:auto;
        right: 0;
        width: auto;
        font-size:$infoSize;
        background-color: rgba(0,0,0,.3);
        padding: px2rem(6) px2rem(18);
        border-top-left-radius: px2rem(16);
        border-bottom-left-radius: px2rem(16);
        bottom: px2rem(32);
        color: white;
        .swiper-pagination-current{
            font-size: $titleSize;
            font-weight: bold;
        }
    }


</style>