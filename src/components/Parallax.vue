<template>
    <div class="parallax" @scroll="onScrollChange">
        <div class="parallax-slow" :style="{top:slowTop}">
            <slot name="parallax-slow"></slot>
        </div>
        <div class="parallax-content z-index-2">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                speed_diff:2,
                parallaxScroll:0
            }
        },
        methods:{
            onScrollChange($event){
                this.parallaxScroll=$event.target.scrollTop;
                this.$emit('onScrollChange',this.parallaxScroll)
            }
        },
        computed:{
            slowTop(){
                return (this.parallaxScroll-(this.parallaxScroll/this.speed_diff))+'px'
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";
    .parallax{
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;

        &-slow{
            width: 100%;
            position: relative;
        }
        &-content{
            width: 100%;
            position: relative;
        }
    }
</style>