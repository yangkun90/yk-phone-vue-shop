<template>
<!--    路由主页-->
    <div class="main"  >
        <keep-alive>
            <component :is="currentComponent"></component>
        </keep-alive>
        <tool-bar ref="toolbar" @onChangeFragment="onChangeFragment"></tool-bar>
    </div>
</template>

<script>
    import toolbar from '@c/ToolBar'
    export default {
        activated() {
            this.pushFragment()
        },
        name:'yk',
        data(){
            return {
                currentComponent:'home'
            }
        },
        components:{
            'tool-bar':toolbar,
            //异步主件引入  异步方式的需要展示的时候才会渲染
            "home":()=>import('@c/Home'),
            "shopping":()=>import('@c/Shopping'),
            "my":()=>import('@c/My'),
        },
        methods:{
            onChangeFragment(componentName){
                this.currentComponent=componentName;
            },
            pushFragment(){
                let componentIndex=this.$route.params.componentIndex
                if(componentIndex===undefined) return;
                this.$refs.toolbar.pushFragment(componentIndex)
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";
    .main{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-bottom: px2rem(46);
    }
</style>