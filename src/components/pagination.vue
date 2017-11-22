<template>
    <nav class="pagination-group" v-if="paginationOptions.all > 0">
        <div class="pagination-perPageNum">
            <label>
                每页显示
                <select v-model="paginationOptions.pageSize"  v-if="!paginationOptions.manual">
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <input type="text" v-model="paginationOptions.pageSize" v-if="paginationOptions.manual">
                条
            </label>
        </div>
        <ul class="pagination">
            <li>
                <a href="javascript:void(0)" @click.prevent="firstPage">
                    <span class="iconfont icon-double-left"></span>
                </a>
            </li>
            <li :class="{ 'disabled': !showFirst}">
                <a href="javascript:void(0)" @click.prevent="prePage($event)">
                    <span class="glyphicon glyphicon-menu-left"></span>
                </a>
            </li>
            <li v-for="index in indexs" :class="{ 'active': paginationOptions.cur == index }"><a href="javascript:void(0)" @click.prevent="btnClick(index)">{{ index }}</a></li>
            <li :class="{ 'disabled': !showLast}">
                <a href="javascript:void(0)" @click.prevent="nextPage($event)">
                    <span class="glyphicon glyphicon-menu-right"></span>
                </a>
            </li>
            <li>
                <a href="javascript:void(0)" @click.prevent="lastPage">
                    <span class="iconfont icon-double-right"></span>
                </a>
            </li>
        </ul>
        <div class="page-count">
            <span>共{{paginationOptions.all ? paginationOptions.all : 0 }}页</span>
            <span>共{{paginationOptions.totalRecords ? paginationOptions.totalRecords : 0}}条数据</span>
        </div>
    </nav>
</template>

<script>
    module.exports = {
//        data: function () {
//            return {
//                all: 20,
//                cur: 1
//            }
//        },
        props: ['paginationOptions'],
        computed: {
            indexs: function () {
                var left = 1;
                var right = this.paginationOptions.all;
                var ar = [];
                if ( this.paginationOptions.all >= 11) {
                    if ( this.paginationOptions.cur > 5 && this.paginationOptions.cur < this.paginationOptions.all -4 ) {
                        left = this.paginationOptions.cur - 5;
                        right = this.paginationOptions.cur + 4;
                    } else {
                        if (this.paginationOptions.cur <= 5) {
                            left = 1;
                            right = 10;
                        } else {
                            right = this.paginationOptions.all;
                            left = this.paginationOptions.all - 9;
                        }
                    }
                }
                while ( left <= right ) {
                    ar.push(left);
                    left++;
                }
                return ar;
            },
            showLast: function () {
                if ( this.paginationOptions.cur == this.paginationOptions.all ) {
                    return false;
                }
                return true;
            },
            showFirst: function () {
                if ( this.paginationOptions.cur == 1 ) {
                    return false;
                }
                return true;
            }
        },
        methods: {
            btnClick: function (data) {
                if ( data!= this.paginationOptions.cur ) {
                    this.paginationOptions.cur = data;
                }
            },
            prePage: function (e) {
                if ( this.paginationOptions.cur === 1 ) {
                    this.paginationOptions.cur = 1;

                } else {
                    this.paginationOptions.cur--;
                }
            },
            nextPage: function (e) {
                if ( this.paginationOptions.cur === this.paginationOptions.all ) {
                    this.paginationOptions.cur = this.paginationOptions.all;
                    console.log(e);
                    e.preventDefault();
                } else {
                    this.paginationOptions.cur++;
                }
            },
            firstPage: function () {
                this.paginationOptions.cur = 1;
            },
            lastPage: function () {
                this.paginationOptions.cur = this.paginationOptions.all;
            }
        },
        watch: {
            'paginationOptions.cur': function ( oldValue, newValue ) {
                this.$dispatch('page-change');
            },
            'paginationOptions.pageSize': function (oldValue, newValue) {
                this.$dispatch('page-change');
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .pagination-group {
        margin: 20px 0;
    }
    .icon-double-right {
        line-height: 1;
        &:before {
            content: '\e607';
        }
    }
    .icon-double-left {
        line-height: 1;
        &:before {
            content: '\e606';
        }
    }
    .pagination-perPageNum {
        display: inline-block;
        vertical-align: middle;
        color: #666;
        margin-right: 28px;
        select {
            width: 70px;
            height: 28px;
            text-align: center;
            padding-left: 14px;
            border-radius: 5px;
        }
    }
    .pagination {
        margin: 0;
        vertical-align: middle;
    }
    .page-count {
        display: inline-block;
        span {
            padding-left: 14px;
        }
    }
</style>
