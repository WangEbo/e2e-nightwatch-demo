<template>
    <div class="product-list">
        <search-bar @search="getData" v-model="keywords" @input="searchInput"></search-bar>
        <com-list :list="list">
            <template v-slot:listItem="{itemMsg}">
                <span class="p-name">{{itemMsg.product_name}}</span> <span class="p-price">$ {{itemMsg.product_price}}</span>
            </template>
        </com-list>
    </div>
</template>

<script>

import SearchBar from '@/components/SearchBar'
import ComList from '@/components/ComList'

export default {
    components: {
        SearchBar, ComList
    },
    data(){
        return {
            list: [],
            keywords: ''
        }
    },
    created(){
        this.getData()
    },
    methods:{
        searchInput(str){
            this.keywords = str
        },
        getData(){
            return this.$request({
                type: 'get',
                url: '/productList',
                data: {
                    keywords: this.keywords
                }
            }).then( res => {
                if(res.success){
                    this.list = res.data;
                }
            })
        }
    }
}


</script>

<style lang="less">
    .product-list{
        .list-ul,.list-li{
            .p-name,.p-price{
                display: inline-block;
            }
            .p-name{
                margin-right: 50px;
            }
        }
    }
</style>