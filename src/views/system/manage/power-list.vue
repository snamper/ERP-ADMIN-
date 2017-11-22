<template>
    <td class="role-first-category">
        <div class="checkbox">
            <label @click.prevent="menuRolePowerChange(menu)">
                <span class="fadeCheckbox"><span v-if="menu.checked">√</span></span>
                <!--<input type="checkbox"  v-model="menu.checked">-->
                {{menu.Text}}
            </label>
        </div>
    </td>
    <td>
        <div class="checkbox">
            <label class="checkbox-inline" v-for="menuPower in menu.MenuPowerJson" @click="menuPowerJsonChange(menuPower,menu)">
                <span class="fadeCheckbox"><span v-if="menuPower.checked">√</span></span>
                <!--<input type="checkbox" v-model="menuPower.checked" @change="menuPowerJsonChange(menuPower,menu)">-->
                {{menuPower.Text}}
            </label>
        </div>
    </td>
</template>

<script>
    var commonMethods = require('../../../js/common');
    module.exports = {
        props: ['menu'],
        methods: {
            //主菜单选中状态更改,更改子功能状态
            menuChange: function (menu) {
                var MenuPowerJson = menu.MenuPowerJson;
                if (!menu.checked) {
                    MenuPowerJson.forEach(function (menuPower) {
                        menuPower.checked = false;
                    })
                } else {
                    MenuPowerJson.forEach(function (menuPower) {
                        menuPower.checked = true;
                    })
                }
            },
            //去除角色权限时,给出警告
            menuRolePowerChange: function (menu) {
                if (menu.checked && menu.ModuleID == '00000000-0000-0000-1020-000000000000') {
                    this.$dispatch('transmit','tip',{
                        name: '提示:',
                        contentText: '确定要取消角色权限吗?取消后将无法再进行权限管理!',
                        btnName: '确定',
                        events: {
                            confirm: 'cancelRolePower'
                        }
                    });
                    this.$off('cancelRolePower');

                    this.$once('cancelRolePower',function () {
                        menu.checked = false;
                        this.menuChange(menu);
                    });
                } else {
                    menu.checked = !menu.checked ;
                    this.menuChange(menu);
                }
            },
            //子功能选中,选中时,菜单也处于选中状态
            menuPowerJsonChange: function (menuPower,menu) {
                menuPower.checked = !menuPower.checked;
                if (menuPower.checked) {
                    menu.checked = true;
                }
            }
        },
    }
</script>

<style rel="stylesheet/less" lang="less">
    .fadeCheckbox {
        display: inline-block;
        vertical-align: middle;
        width: 12px;
        height: 12px;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-right: 4px;
        color: #000;
        line-height: 12px;
    }

</style>