<template>
    <div class="container-fluid role-edit">
        <div class="row">
            <div class="col-sm-12">
                <div class="operate-form-title">
                    <p>{{pageInfo.title}}</p>
                </div>
                <div class="operate-form-list">
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">编码<span class="form-required-mark">*</span></label>
                        <input v-model="query.Code" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">名称<span class="form-required-mark">*</span></label>
                        <input v-model="query.Name" type="text" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">设置权重<span class="form-required-mark">*</span></label>
                        <input v-model="query.Power" type="number" class="form-control">
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text">备注</label>
                        <textarea v-model="query.Note | nullToString" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="form-group form-limit-width">
                        <label class="form-group-text"></label>
                        <div class="checkbox-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" :true-value=1 :false-value=0 v-model="query.Status">
                                    启用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="operate-form-buttons">
                        <a href="javascript:void(0)" class="btn btn-default" v-on:click="save">保存</a>
                        <a v-link="{name:'member-grade'}" class="btn btn-default">返回列表>></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var servers = require('../../../js/servers/servers');
    var NProgress = servers.NProgress;
    module.exports = {
        data: function () {
            return {
                pageInfo: {
                    title: '',
                    isEdit: false
                },
                query: {
                    Code: '',
                    Name: '',
                    Power: '',
                    Note: '',
                    Status: '1',
                    MemberGradeID: ''
                }
            }
        },
        methods: {
            //重置列表
            resetForm:function () {
                if (this.pageInfo.isEdit) {
                    return ;
                } else {
                    this.query = {
                        Code: '',
                        Name: '',
                        Power: '',
                        Note: '',
                        Status: '1'
                    };
                }
            },
            //保存
            save: function () {
                var self = this;
//                self.$dispatch('transmit', 'tip', {
//                    name: '提示:',
//                    contentText: '确定要保存吗？',
//                    events: {
//                        confirm: 'save'
//                    }
//                });
                NProgress.start();
                servers.postAjax.bind(this)({
                    url: '/BasMemberGrade/ErpSaveBasMemberGrade',
                    data: self.query
                }).done(function (result) {
                    NProgress.done();
                    if (result.ResultCode == 1) {
                        self.resetForm();
                        self.$dispatch('transmit', 'tip', {
                            name: '成功:',
                            contentText: '成功保存'
                        });

                    }
                });
            }
        },
        components: {
            pagination: require('../../../components/pagination.vue')
        },
        route: {
            data: function (transition) {
                var self = this;
                var name = transition.to.name;
                if (name == 'member-grade-edit') {
                    self.pageInfo.title = '修改会员等级';
                    self.pageInfo.isEdit = true;
                    var query = transition.to.query;
//                    console.log(query);
                    if ( query.MemberGradeID ) {
                        var memberGrade = self.query;
//                        console.log(query.Code);
                        memberGrade.Code = query.Code;
                        memberGrade.Name = query.Name;
                        memberGrade.Power = query.Power;
                        memberGrade.Note = query.Note;
                        memberGrade.Status = query.Status;
                        memberGrade.MemberGradeID = query.MemberGradeID;
                    } else {
                        transition.abort();
                    }
                } else {
                    self.pageInfo.isEdit = false;
                    self.pageInfo.title = '新建会员等级';
                    self.resetForm();
                }
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less" >

</style>