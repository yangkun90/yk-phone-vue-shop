<template>
    <div class="goods-wrap">
        <div class="goods" :class="layoutClass" :style="{height:goodsViewHeight}" ref="goods" @scroll="onScrollChange">
            <div class="goods-item" :class="layoutItemClass" ref="goodsItem" v-for="(item,index) in sortGoodsData"
                 :key="index" :style="goodsItemStyles[index]" @click="onItemClick(item)">
                <img class="goods-item-img" :src="item.img" alt="" :style="imgStyles[index]">
                <div class="goods-item-desc">
                    <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint':!item.isHave}">
                        <direct v-if="item.isDirect"></direct>
                        <no-have v-if="!item.isHave"></no-have>
                        {{item.name}}
                    </p>
                    <div class="goods-item-desc-data">
                        <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
                        <p class="goods-item-desc-data-volume">销量{{item.volume}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * 自动计算图片宽度进行计算，实际上不需要这样，因为数据都是后台提供，图片宽度设置一定，高度适应，我们的图片可以确定一个固定值，即宽度一定，高度响应
     *
     */
    import Direct from "./Direct";
    import NoHave from "./NoHave";
    import {mapMutations} from 'vuex'
    export default {
        props: {
            layoutType: {
                type: String,
                default: '1'
            },
            sort:{
                type:String,
                default:'1'
            }
        },
        watch: {
            layoutType() {
                this.initLayout()
            },
            sort(){
                this.setSortGoodsData()
            }
        },
        components: {
            Direct,
            NoHave
        },
        data() {
            return {
                dataSource: [],
                sortGoodsData:[],
                maxHeight: 210,//图片高度最大区间
                minHeight: 185,//图片高度最小区间
                imgStyles: [],//随机图片处理好的高度
                itemMarginSize: 8,//列表边距
                goodsItemStyles: [],//根据业务逻辑处理好的每个商品项的样式，其实就是定位的值
                goodsViewHeight: '100%',//高度设置，这里必须设置高度是因为内部的商品盒子脱离文档流定位，需要手动设置计算高度
                layoutClass: 'goods-list',
                layoutItemClass: 'goods-list-item',
                scrollTopValue:0
            }
        },
        activated() {
          this.$refs.goods.scrollTop=this.scrollTopValue;
        },
        name: "goods",
        created() {
            this.initData()
        },

        methods: {
            ...mapMutations([
                'setGoodsDetail'
            ]),
            onItemClick(item){
                if(!item.isHave){
                    alert('无货')
                    return;
                }
                this.$router.push({
                    name:'goodsdetail',
                    params:{
                        routerType:'push',
                        good:item,
                    }
                })
                this.setGoodsDetail(item)
            },
            initData() {
                this.axios.get('/json/goods.json').then(data => {
                    this.dataSource = data.list
                    //设置布局
                    this.initLayout()
                    //设置排序
                    this.setSortGoodsData()
                })
            },
            setSortGoodsData(){
                switch (this.sort) {
                    case '1':
                        this.sortGoodsData=this.dataSource.slice(0)
                        break;
                    case '1-2':
                        this.getSortGoodsDataFromKey('price')
                        break;
                    case '1-3':
                        this.getSortGoodsDataFromKey('volume')
                        break
                    case '2':
                        this.getSortGoodsDataFromKey('isHave')
                        break
                    case '3':
                        this.getSortGoodsDataFromKey('isDirect')
                        break
                }
            },
            getSortGoodsDataFromKey(key){
                this.sortGoodsData.sort((goods1,goods2)=>{
                    let v1=goods1[key],v2=goods2[key];
                    if(typeof v1==='boolean'){
                        if(v1){
                            return -1;
                        }
                        if(v2){
                            return 1;
                        }
                        return 0;
                    }
                    if(parseFloat(v1)>=parseFloat(v2)){
                        return -1;
                    }
                    return 1;

                })

            },
            //初始化布局
            initLayout() {
                this.goodsViewHeight = '100%'
                this.goodsItemStyles = []
                this.imgStyles = []
                switch (this.layoutType) {
                    case '1':
                        this.layoutClass = 'goods-list'
                        this.layoutItemClass = 'goods-list-item'
                        break
                    case '2':
                        this.layoutClass = 'goods-grid'
                        this.layoutItemClass = 'goods-grid-item'
                        break
                    case '3':
                        this.layoutClass = 'goods-waterfall'
                        this.layoutItemClass = 'goods-waterfall-item'
                        //修改图片样式和进行布局
                        this.initImgStyles();
                        this.$nextTick(() => {
                            this.initWaterfall()
                        })
                        break
                }
            },
            //给图片设置随机宽度
            imgHeight() {
                let result = Math.floor(Math.random() * (this.maxHeight - this.minHeight) + this.minHeight);
                return result
            },
            //给需要展示的商品列表图片设置随机高度
            initImgStyles() {
                this.dataSource.forEach(item => {
                    let img = this.imgHeight() + 'px'
                    this.imgStyles.push({
                        height: img
                    })
                })
            },
            initWaterfall() {
                let $goodsItems = this.$refs.goodsItem;
                if (!$goodsItems) return;
                let leftHeightTotal = 0, rightHeightTotal = 0;
                $goodsItems.forEach(($el, index) => {
                    let goodsItemStyle = {}
                    let elHeight = $el.clientHeight + this.itemMarginSize;
                    if (leftHeightTotal <= rightHeightTotal) {
                        goodsItemStyle = {
                            left: '0px',
                            top: leftHeightTotal + 'px'
                        }
                        leftHeightTotal += elHeight;
                    } else {
                        goodsItemStyle = {
                            right: '0px',
                            top: rightHeightTotal + 'px'
                        }
                        rightHeightTotal += elHeight;
                    }
                    this.goodsItemStyles.push(goodsItemStyle)
                });
                this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px';
            },
            onScrollChange($event){
                this.scrollTopValue=$event.target.scrollTop;
            }
        },

    }
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";
    .goods-wrap{
        overflow: hidden;
        overflow-y: scroll;
        margin-bottom: px2rem(46);;
    }
    .goods {
        background-color: $bgColor;
        overflow: hidden;
        overflow-y: scroll;
        &-item {
            background-color: #ffffff;
            padding: $marginSize;
            box-sizing: border-box;

            &-desc {
                width: 100%;

                &-name {
                    font-size: $infoSize;
                    line-height: px2rem(18);

                    &-hint {
                        color: $hintColor;
                    }
                }

                &-data {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: $marginSize;

                    &-price {
                        font-size: $titleSize;
                        color: $mainColor;
                        font-weight: 500
                    }

                    &-volume {
                        font-size: $infoSize;
                        color: $hintColor;
                    }
                }
            }
        }
    }

    /*默认样式*/
    .goods-list {
        &-item {
            display: flex;
            border-bottom: 1px solid $lineColor;

            .goods-item-img {
                width: px2rem(120);
                height: px2rem(120);
            }

            .goods-item-desc {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: $marginSize;
            }
        }
    }

    /*网格*/
    .goods-grid {
        padding: $marginSize;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &-item {
            width: 49%;
            border-radius: $radiusSize;
            margin-bottom: $marginSize;

            .goods-item-img {
                width: 100%;
            }
        }
    }

    /*流动*/
    .goods-waterfall {
        position: relative;
        margin: $marginSize;

        &-item {
            position: absolute;
            width: 49%;
            border-radius: $radiusSize;

            .goods-item-img {
                width: 100%;
            }
        }
    }


</style>