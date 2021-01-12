<template>
    <div class="search-bar">
        <a-input placeholder="输入搜索" type="text" @input="input" :value="value" />
        <a-button type="primary"  @click="search">搜索</a-button>
    </div>
</template>

<script>

export default {
    name:'search-bar',
    props:{
        value:{
            type: String
        }
    },
    data(){
        return {
            
        }
    },
    mounted() {
        
    },
    methods:{
        search(){
            this.$emit('search',this.value)
        },
        input(e){
            this.$emit('input', e.target.value)
        }
    }
}
</script>

<style lang="less">
    .search-bar{
        width: 100%;
        line-height: 32px;
        font-size: 14px;
        text-align: left;
        input.ant-input{
            width: 100%;
            box-sizing: border-box;
            padding: 0 10px;
            width: calc(100% - 70px);
        }
        button.ant-btn-primary{
            margin-left: 5px;
        }
    }
</style>