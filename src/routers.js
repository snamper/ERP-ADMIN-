module.exports = function (router) {
    // 注册全局路由跳转激活之后的处理函数
    // router.afterEach(require('./js/routerAfterEach.coffee'));
    router.map({
        '/': {
            name: 'index',
            component: function (resolve) {
                require(['./views/index.vue'], resolve);
            },
            auth: true,
            subRoutes: {

                // 罗盘页
                '/index': {
                    name: 'compass',
                    component: function (resolve) {
                        require(['./views/system/compass/index.vue'], resolve);
                    },
                },
                '/dashboard': {
                    name: 'dashboard',
                    component: function (resolve) {
                        require(['./views/system/dashboard/index.vue'], resolve);
                    },
                },
                // 公告信息
                '/notice': {
                    name: 'notice',
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/purchase/JXC.vue'], resolve);
                    },
                    subRoutes: {
                        '/list': {
                            isShowInTab: true,
                            name: 'notice-list',
                            component: function (resolve) {
                                require(['./views/system/notice/list.vue'], resolve);
                            },
                        },
                        '/add': {
                            isShowInTab: true,
                            name: 'notice-add',
                            component: function (resolve) {
                                require(['./views/system/notice/editor.vue'], resolve);
                            },
                        },
                        '/edit': {
                            isShowInTab: true,
                            name: 'notice-edit',
                            component: function (resolve) {
                                require(['./views/system/notice/editor.vue'], resolve);
                            },
                        },
                        '/see': {
                            isShowInTab: true,
                            name: 'notice-see',
                            component: function (resolve) {
                                require(['./views/system/notice/see.vue'], resolve);
                            },
                        },
                    },
                },
                //消息列表
                'information/list': {
                    isShowInTab: true,
                    name: 'information-list',
                    component: function (resolve) {
                        require(['./views/system/information/list.vue'], resolve);
                    },
                },
                //查看消息
                'information/edit': {
                    isShowInTab: true,
                    name: 'information-edit',
                    component: function (resolve) {
                        require(['./views/system/information/edit.vue'], resolve);
                    },
                },
                //查看消息
                'information/add': {
                    isShowInTab: true,
                    name: 'information-add',
                    component: function (resolve) {
                        require(['./views/system/information/edit.vue'], resolve);
                    },
                },
                //查看消息
                'information/see': {
                    isShowInTab: true,
                    name: 'information-see',
                    component: function (resolve) {
                        require(['./views/system/information/edit.vue'], resolve);
                    },
                },
                // 代理审核
                '/agent': {
                    component: function (resolve) {
                        require(['./views/distribution/agent/agent.vue'], resolve);
                    },
                    subRoutes: {
                        // 代理审核列表
                        '/checkList': {
                            isShowInTab: true,
                            name: 'agentCheckList',
                            component: function (resolve) {
                                require(['./views/distribution/agent/checkList.vue'], resolve);
                            },
                        },
                        '/superiorCheckList': {
                            isShowInTab: true,
                            name: 'agentSuperiorCheckList',
                            component: function (resolve) {
                                require(['./views/distribution/agent/superiorCheckList.vue'], resolve);
                            },
                        },
                        '/process': {
                            isShowInTab: true,
                            name: 'agentSuperiorCheckProcess',
                            component: function (resolve) {
                                require(['./views/distribution/agent/process.vue'], resolve);
                            },
                        },
                        '/managementBlackList': {
                            isShowInTab: true,
                            name: 'managementBlackList',
                            component: function (resolve) {
                                require(['./views/distribution/agent/managementBlackList.vue'], resolve);
                            },
                        },
                    },
                },
                // 充值审核
                'audit-top-up': {
                    name: 'audit-top-up',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/topUp/auditTopUp.vue'], resolve);
                    },
                },
                // 查看充值凭证
                'audit-view': {
                    name: 'audit-view',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/topUp/viewPic.vue'], resolve);
                    },
                },
                // 充值审核流水
                'top-up-record': {
                    name: 'top-up-record',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/topUp/record.vue'], resolve);
                    },
                },
                // 育成设置
                'rebates/set-up-list': {
                    name: 'rebates-set-up-list',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/rebates/rebateSetUpList.vue'], resolve);
                    },
                },
                // 育成计算
                'rebates/calculate': {
                    name: 'rebates-calculate',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/rebates/calculate.vue'], resolve);
                    },
                },
                // 育成计算记录
                'rebates/calculate-flow': {
                    name: 'rebates-calculate-flow',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/rebates/calculate-flow.vue'], resolve);
                    },
                },
                // 添加改育成设置
                'rebates/set-up-add': {
                    name: 'rebates-set-up-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/rebates/SetUp.vue'], resolve);
                    },
                },
                // 修改育成设置
                'rebates/set-up-edit': {
                    name: 'rebates-set-up-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/rebates/SetUp.vue'], resolve);
                    },
                },
                // 查看育成设置
                'rebates/set-up-see': {
                    name: 'rebates-set-up-see',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/embranchment/rebates/SetUp.vue'], resolve);
                    },
                },
                // 总体业绩奖励设置
                'results/rebates': {
                    name: 'results-rebates',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/results-rebates.vue'], resolve);
                    },
                },
                // 新增总体业绩奖励设置
                'results/rebates-add': {
                    name: 'results-rebates-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/results-rebates-edit.vue'], resolve);
                    },
                },
                // 修改总体业绩奖励设置
                'results/rebates-edit': {
                    name: 'results-rebates-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/results-rebates-edit.vue'], resolve);
                    },
                },
                // 查看总体业绩奖励设置
                'results/rebates-see': {
                    name: 'results-rebates-see',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/results-rebates-edit.vue'], resolve);
                    },
                },
                // 商品分类
                '/categories': {
                    name: 'categories',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/property/categories.vue'], resolve);
                    },
                },
                '/category-add': {
                    name: 'category-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/property/category-edit.vue'], resolve);
                    },
                },
                '/category-edit': {
                    name: 'category-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/property/category-edit.vue'], resolve);
                    },
                },              
                // 员工
                '/employees': {
                    name: 'employees',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/employees.vue'], resolve);
                    },
                },
                '/employee-add': {
                    name: 'employee-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/employee-edit.vue'], resolve);
                    },
                },
                '/employee-edit': {
                    name: 'employee-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/employee-edit.vue'], resolve);
                    },
                },
                '/employee-auth': {
                    name: 'employee-auth',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/employee-auth.vue'], resolve);
                    },
                },
                // 园区管理
                // 商户管理列表
                '/propertyList': {
                    name: 'propertyList',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/propertyManage/propertyList.vue'], resolve);
                    },
                },
                //商户管理编辑
                '/propertyEdit': {
                    name: 'propertyEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/propertyManage/propertyEdit.vue'], resolve);
                    },
                },
                // 收费管理列表
                '/shopList': {
                    name: 'shopList',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/shopManage/shopList.vue'], resolve);
                    },
                },
                //收费管理编辑
                '/shopEdit': {
                    name: 'shopEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/shopManage/shopEdit.vue'], resolve);
                    },
                },
                //dan
                // 租赁费
                '/rental': {
                    name: 'rental',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/rental/list.vue'], resolve);
                    },
                },
                //租赁费编辑
                '/rentalEdit': {
                    name: 'rentalEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/rental/edit.vue'], resolve);
                    },
                },
                // 物业管理费
                '/propertyRent': {
                    name: 'propertyRent',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/propertyRent/list.vue'], resolve);
                    },
                },
                //物业管理费编辑
                '/propertyRentEdit': {
                    name: 'propertyRentEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/propertyRent/edit.vue'], resolve);
                    },
                },
                // 仓储费
                '/strorageRent': {
                    name: 'strorageRent',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/strorageRent/list.vue'], resolve);
                    },
                },
                //仓储费编辑
                '/strorageRentEdit': {
                    name: 'strorageRentEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/strorageRent/edit.vue'], resolve);
                    },
                },
                // 快递物流费
                '/expressRent': {
                    name: 'expressRent',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/expressRent/list.vue'], resolve);
                    },
                },
                //快递物流费编辑
                '/expressRentEdit': {
                    name: 'expressRentEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/expressRent/edit.vue'], resolve);
                    },
                },
                // 电费费
                '/electricRent': {
                    name: 'electricRent',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/electricRent/list.vue'], resolve);
                    },
                },
                //电费编辑
                '/electricRentEdit': {
                    name: 'electricRentEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/electricRent/edit.vue'], resolve);
                    },
                },
                // 水费
                '/waterRent': {
                    name: 'waterRent',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/waterRent/list.vue'], resolve);
                    },
                },
                //水费编辑
                '/waterRentEdit': {
                    name: 'waterRentEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/waterRent/edit.vue'], resolve);
                    },
                },
                // 杂费
                '/incidentalRent': {
                    name: 'incidentalRent',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/incidentalRent/list.vue'], resolve);
                    },
                },
                //杂费编辑
                '/incidentalRentEdit': {
                    name: 'incidentalRentEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/parkManage/incidentalRent/edit.vue'], resolve);
                    },
                },
                //dan
                // 角色管理
                '/role': {
                    name: 'role',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/manage/role.vue'], resolve);
                    },
                },
                '/role-add': {
                    name: 'role-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/manage/role-edit.vue'], resolve);
                    },
                },
                '/role-edit': {
                    name: 'role-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/manage/role-edit.vue'], resolve);
                    },
                },
                // 商品属性
                '/property/:propertyName': {
                    name: 'property',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/property/property.vue'], resolve);
                    },
                },
                '/property-add/:propertyName': {
                    name: 'property-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/property/property-edit.vue'], resolve);
                    },
                },
                '/property-edit/:propertyName': {
                    name: 'property-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/property/property-edit.vue'], resolve);
                    },
                },
                // 快递公司
                '/merchant-deliveries': {
                    name: 'merchant-deliveries',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/merchant-deliveries.vue'], resolve);
                    },
                },
                '/merchant-delivery-add': {
                    isShowInTab: true,
                    name: 'merchant-delivery-add',
                    component: function (resolve) {
                        require(['./views/archives/firm/merchant-delivery-edit.vue'], resolve);
                    },
                },
                '/merchant-delivery-edit': {
                    isShowInTab: true,
                    name: 'merchant-delivery-edit',
                    component: function (resolve) {
                        require(['./views/archives/firm/merchant-delivery-edit.vue'], resolve);
                    },
                },
                '/merchant-delivery-config': {
                    name: 'merchant-delivery-config',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/merchant-delivery-config.vue'], resolve);
                    },
                },
                '/merchant-group': {
                    name: 'merchant-group-list',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/group/merchant-group-list.vue'], resolve);
                    },
                },
                '/merchant-group-add': {
                    name: 'merchant-group-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/group/merchant-group-edit.vue'], resolve);
                    },
                },
                '/merchant-group-edit': {
                    name: 'merchant-group-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/group/merchant-group-edit.vue'], resolve);
                    },
                },
                // 促销政策-买满送
                '/bonuspacks': {
                    name: 'bonuspacks',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/promotion/bonuspacks/bonuspacks-list.vue'], resolve);
                    },
                },
                '/bonuspacks-record': {
                    name: 'bonuspacks-record',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/promotion/bonuspacks/bonuspacks-record.vue'], resolve);
                    },
                },
                '/bonuspacks-add': {
                    name: 'bonuspacks-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/promotion/bonuspacks/bonuspacks-edit.vue'], resolve);
                    },
                },
                '/bonuspacks-edit': {
                    name: 'bonuspacks-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/promotion/bonuspacks/bonuspacks-edit.vue'], resolve);
                    },
                },
                // 库存调整单
                '/inv-adjust-add': {
                    name: 'inv-adjust-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/inventory/inv-adjust-edit.vue'], resolve);
                    },
                },
                '/inv-adjust-edit': {
                    name: 'inv-adjust-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/inventory/inv-adjust-edit.vue'], resolve);
                    },
                },
                '/inv-adjust': {
                    name: 'inv-adjust',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/inventory/inv-adjust.vue'], resolve);
                    },
                },
                // 商品调仓单
                '/transfer-stock-add': {
                    name: 'transfer-stock-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/inventory/transfer-stock-edit.vue'], resolve);
                    },
                },
                '/transfer-stock-edit': {
                    name: 'transfer-stock-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/inventory/transfer-stock-edit.vue'], resolve);
                    },
                },
                '/transfer-stock': {
                    name: 'transfer-stock',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/inventory/transfer-stock.vue'], resolve);
                    },
                },
                // 采购入库单
                '/purchase/instock': {
                    name: 'purchase-instock',
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/purchase/instock/instock.vue'], resolve);
                    },
                    subRoutes: {
                        '/': {
                            name: 'instock-purchase-list',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/instock/instock-list.vue'], resolve);
                            },
                        },
                    },
                },
                '/purchase/instock-add': {
                    name: 'purchase-instock-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/purchase/instock/instock-edit.vue'], resolve);
                    },
                },
                '/purchase/instock-edit': {
                    name: 'purchase-instock-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/purchase/instock/instock-edit.vue'], resolve);
                    },
                },
                '/refund/instock': {
                    name: 'refund-instock',
                    component: function (resolve) {
                        require(['./views/orders/refund/instock/instock.vue'], resolve);
                    },
                    subRoutes: {
                        '/': {
                            name: 'instock-refund-list',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/orders/refund/instock/instock-list.vue'], resolve);
                            },
                        },
                    },
                },
                '/refund/instock-add': {
                    name: 'refund-instock-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/orders/refund/instock/instock-edit.vue'], resolve);
                    },
                },
                '/refund/instock-edit': {
                    name: 'refund-instock-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/orders/refund/instock/instock-edit.vue'], resolve);
                    },
                },
                // 仓库
                '/entrepot': {
                    name: 'entrepot',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/entrepot.vue'], resolve);
                    },
                },
                // 仓库api配置
                '/entrepot-api': {
                    name: 'entrepot-api',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/repot-delivery-config.vue'], resolve);
                    },
                },
                // 添加或者修改仓库
                '/entrepot-add': {
                    name: 'entrepot-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/entrepot-add.vue'], resolve);
                    },
                },
                // 添加或者修改仓库
                '/entrepot-edit': {
                    name: 'entrepot-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/entrepot-add.vue'], resolve);
                    },
                },
                // 配置运费
                '/deploy-freight': {
                    name: 'deploy-freight',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/deploy-freight.vue'], resolve);
                    },
                },
                // 配置快递
                '/deploy-courier': {
                    name: 'deploy-courier',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/deploy-courier.vue'], resolve);
                    },
                },
                // 配置快递不到区域
                '/deploy-place': {
                    name: 'deploy-place',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/firm/deploy-place.vue'], resolve);
                    },
                },
                // 商品列表
                '/merchant': {
                    name: 'merchant',
                    component: function (resolve) {
                        require(['./views/archives/merchant/merchant.vue'], resolve);
                    },
                    subRoutes: {
                        '/list': {
                            name: 'merchant-list',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/merchant-list.vue'], resolve);
                            },
                        },
                        '/:pagetype': {
                            name: 'merchant-list-operate',
                            component: function (resolve) {
                                require(['./views/archives/merchant/merchant-list-edit.vue'], resolve);
                            },
                        },
                        '/stock': {
                            name: 'merchant-stock',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/merchant-stock.vue'], resolve);
                            },
                        },
                        // 配置SKU
                        '/sell-deploy': {
                            name: 'sell-deploy',
                    isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/sell-deploy.vue'], resolve);
                            },
                        },
                    },
                },
                // 供应商
                '/vender': {
                    name: 'vender',
                    component: function (resolve) {
                        require(['./views/archives/merchant/merchant.vue'], resolve);
                    },
                    subRoutes: {
                        '/': {
                            name: 'vender-index',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/vender.vue'], resolve);
                            },
                        },
                        '/add': {
                            name: 'vender-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/vender-add.vue'], resolve);
                            },
                        },
                        '/edit': {
                            name: 'vender-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/vender-edit.vue'], resolve);
                            },
                        },
                    },
                },
                // 供应商价管理
                '/vender-price': {
                    name: 'vender-price',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/vender-price.vue'], resolve);
                    },
                },
                // 新增供应商价
                '/vender-price-add': {
                    name: 'vender-price-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/vender-price-add.vue'], resolve);
                    },
                },
                // 修改供应商价
                '/vender-price-edit': {
                    name: 'vender-price-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/vender-price-add.vue'], resolve);
                    },
                },
                // 客户
                '/client': {
                    name: 'client',
                    component: function (resolve) {
                        require(['./views/archives/merchant/merchant.vue'], resolve);
                    },
                    subRoutes: {
                        '/': {
                            name: 'client-index',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/client.vue'], resolve);
                            },
                        },
                        '/add': {
                            name: 'client-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/client-add.vue'], resolve);
                            },
                        },
                        '/edit': {
                            name: 'client-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/client-edit.vue'], resolve);
                            },
                        },
                    },
                },
                //
                '/commodity': {
                    name: 'commodity',
                    component: function (resolve) {
                        require(['./views/archives/merchant/merchant.vue'], resolve);
                    },
                    subRoutes: {
                        '/': {
                            name: 'commodity-index',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/commodity.vue'], resolve);
                            },
                        },
                        add: {
                            name: 'commodity-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/commodity-add.vue'], resolve);
                            },
                        },
                        edit: {
                            name: 'commodity-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/commodity-edit.vue'], resolve);
                            },
                        },
                        config: {
                            name: 'merchant-list-config',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/configration-interface.vue'], resolve);
                            },
                        },
                        result:{
                            name:'commodity-result',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/commodity-result.vue'], resolve);
                            },
                        }
                    },
                },

                // sku模块
                '/sku': {
                    name: 'sku',
                    component: function (resolve) {
                        require(['./views/archives/merchant/sku.vue'], resolve);
                    },
                    subRoutes: {
                        //  sku首页
                        '/index': {
                            name: 'sku-index',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/sku-index.vue'], resolve);
                            },
                        },
                        '/see': {
                            name: 'see',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/sku-see.vue'], resolve);
                            },
                        },
                        '/edit': {
                            name: 'sku-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/merchant/sku-edit.vue'], resolve);
                            },
                        },
                    },
                },
                // 货位
                '/space': {
                    name: 'storage',
                    component: function (resolve) {
                        require(['./views/archives/merchant/sku.vue'], resolve);
                    },
                    subRoutes: {
                        //  仓库货位
                        '/': {
                            name: 'storage-space',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/storage/STWarehouse.vue'], resolve);
                            },
                        },
                        '/see': {
                            name: 'storage-see',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/storage/storage-see.vue'], resolve);
                            },
                        },
                        '/add': {
                            name: 'storage-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/storage/storage-add.vue'], resolve);
                            },
                        },
                        '/edit': {
                            name: 'storage-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/storage/storage-edit.vue'], resolve);
                            },
                        },
                        '/query': {
                            name: 'storage-query',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/archives/storage/storage-query.vue'], resolve);
                            },
                        },
                    },
                },
                // 进销存 模块
                '/JXC': {
                    name: 'JXC',
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/purchase/JXC.vue'], resolve);
                    },
                    subRoutes: {
                        // 通知
                        '/inform': {
                            name: 'inform',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/inform.vue'], resolve);
                            },
                        },
                        // 添加通知
                        '/inform-add': {
                            name: 'inform-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/inform-add.vue'], resolve);
                            },
                        },
                        // 修改通知
                        '/inform-edit': {
                            name: 'inform-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/inform-edit.vue'], resolve);
                            },
                        },
                        // 修改通知
                        '/inform-see': {
                            name: 'inform-see',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/inform-see.vue'], resolve);
                            },
                        },
                        // 采购计划
                        '/plan': {
                            name: 'plan',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/plan.vue'], resolve);
                            },
                        },
                        '/plan-edit': {
                            name: 'plan-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/plan-edit.vue'], resolve);
                            },
                        },
                        '/plan-see': {
                            name: 'plan-see',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/plan-see.vue'], resolve);
                            },
                        },
                        // 添加采购计划
                        '/plan-add': {
                            name: 'plan-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/plan-add.vue'], resolve);
                            },
                        },
                        // 采购退货单
                        '/sales-return': {
                            name: 'sales-return',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/sales-return.vue'], resolve);
                            },
                        },
                        // 新增采购退货单
                        '/sales-return/:pageType': {
                            name: 'sales-return-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/stockSaleAndStore/purchase/sales-return-add.vue'], resolve);
                            },
                        },
                    },
                },

                // 报表
                '/report-form': {
                    name: 'report-form',
                    component: function (resolve) {
                        require(['./views/stockSaleAndStore/purchase/JXC.vue'], resolve);
                    },
                    subRoutes: {
                        // 首页
                        '/': {
                            name: 'report-form-index',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/reportForm/index.vue'], resolve);
                            },
                        },
                        // 添加页面
                        '/add': {
                            name: 'report-form-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/reportForm/add.vue'], resolve);
                            },
                        },
                        // 添加页面
                        '/edit': {
                            name: 'report-form-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/reportForm/edit.vue'], resolve);
                            },
                        },
                        // 执行报表
                        '/run/:ReportID': {
                            name: 'report-form-run',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/reportForm/runReport.vue'], resolve);
                            },
                        },
                    },
                },

                // 待处理订单
                '/order-todo': {
                    name: 'order-todo-index',
                    component: function (resolve) {
                        require(['./views/orders/orderTodo/index.vue'], resolve);
                    },
                    isShowInTab: true,
                    subRoutes: {
                        '/': {
                            name: 'order-todo',
                            component: function (resolve) {
                                require(['./views/orders/orderTodo/order-todo.vue'], resolve);
                            },
                            subRoutes: {
                                invalid: {
                                    name: 'invalid',
                                    group: 'order-todo',
                                    component: function (resolve) {
                                        require(['./views/orders/orderTodo/order-list.vue'], resolve);
                                    },
                                },
                                pick: {
                                    name: 'pick',
                                    group: 'order-todo',
                                    component: function (resolve) {
                                        require(['./views/orders/orderTodo/order-list.vue'], resolve);
                                    },
                                },
                                finish: {
                                    name: 'finish',
                                    group: 'order-todo',
                                    component: function (resolve) {
                                        require(['./views/orders/orderTodo/order-list.vue'], resolve);
                                    },
                                },
                                exception: {
                                    name: 'exception',
                                    group: 'order-todo',
                                    component: function (resolve) {
                                        require(['./views/orders/orderTodo/order-list.vue'], resolve);
                                    },
                                },
                                lack: {
                                    name: 'lack',
                                    group: 'order-todo',
                                    component: function (resolve) {
                                        require(['./views/orders/orderTodo/order-list.vue'], resolve);
                                    },
                                },
                                pause: {
                                    name: 'pause',
                                    group: 'order-todo',
                                    component: function (resolve) {
                                        require(['./views/orders/orderTodo/order-list.vue'], resolve);
                                    },
                                },
                                empty: {
                                    name: 'empty',
                                    group: 'order-todo',
                                    component: function (resolve) {
                                        require(['./views/orders/orderTodo/order-list.vue'], resolve);
                                    },
                                },
                            },
                        },
                        'type-order': {
                            name: 'type-order',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/orders/orderTodo/type-order.vue'], resolve);
                            },
                        },

                    },
                },
                // 退单
                '/refund': {
                    name: 'refund-index',
                    component: function (resolve) {
                        require(['./views/orders/refund/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/': {
                            name: 'refund',
                            component: function (resolve) {
                                require(['./views/orders/refund/refund.vue'], resolve);
                            },
                            isShowInTab: true,
                            subRoutes: {
                                '/all': {
                                    name: 'refund-all',
                                    isShowInTab: true,
                                    component: function (resolve) {
                                        require(['./views/orders/refund/refund-list.vue'], resolve);
                                    },
                                },
                                '/empty': {
                                    name: 'refund-empty',
                                    group: 'refund',
                                    component: function (resolve) {
                                        require(['./views/orders/refund/refund-list.vue'], resolve);
                                    },
                                },
                                '/confirm': {
                                    name: 'refund-confirm',
                                    group: 'refund',
                                    component: function (resolve) {
                                        require(['./views/orders/refund/refund-list.vue'], resolve);
                                    },
                                },
                                '/receive': {
                                    name: 'refund-receive',
                                    group: 'refund',
                                    component: function (resolve) {
                                        require(['./views/orders/refund/refund-list.vue'], resolve);
                                    },
                                },
                                '/finish': {
                                    name: 'refund-finish',
                                    group: 'refund',
                                    component: function (resolve) {
                                        require(['./views/orders/refund/refund-list.vue'], resolve);
                                    },
                                },
                                '/invalid': {
                                    name: 'refund-invalid',
                                    group: 'refund',
                                    component: function (resolve) {
                                        require(['./views/orders/refund/refund-list.vue'], resolve);
                                    },
                                },
                            },

                        },
                    },
                },
                // 销售订单
                '/order-sale': {
                    name: 'order-sale',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/orders/orderSale/order-sale.vue'], resolve);
                    },
                },
                // 发货管理
                '/delivery': {
                    name: 'delivery',
                    component: function (resolve) {
                        require(['./views/assortAndDeliveryGoods/deliveryGoods/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/weigh': {
                            name: 'delivery-weigh',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/deliveryGoods/weigh.vue'], resolve);
                            },
                        },
                        '/pick': {
                            name: 'delivery-pick',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/deliveryGoods/pick.vue'], resolve);
                            },
                        },
                        '/callback': {
                            name: 'delivery-callback',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/deliveryGoods/callback.vue'], resolve);
                            },
                        },
                        '/weighing': {
                            name: 'delivery-weighed',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/deliveryGoods/weighing.vue'], resolve);
                            },
                        },
                        '/pack': {
                            name: 'delivery-pack',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/deliveryGoods/pack.vue'], resolve);
                            },
                        },
                        '/scan': {
                            name: 'delivery-scan',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/deliveryGoods/scan.vue'], resolve);
                            },
                        },
                    },
                },
                // 配货管理
                '/assort': {
                    name: 'assort',
                    component: function (resolve) {
                        require(['./views/assortAndDeliveryGoods/assortGoods/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/lack': {
                            name: 'assort-lack',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/assortGoods/lack.vue'], resolve);
                            },
                        },
                        '/circular': {
                            name: 'assort-circular',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/assortGoods/circular/index.vue'], resolve);
                            },
                            subRoutes: {
                                '/outstock': {
                                    name: 'circular-outstock',
                                    group: 'assort-circular',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/circular/outstock.vue'], resolve);
                                    },
                                },
                                refund: {
                                    name: 'circular-refund',
                                    group: 'assort-circular',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/circular/refund.vue'], resolve);
                                    },
                                },
                            },
                        },
                        '/pick-list': {
                            name: 'assort-pick-list',
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/assortGoods/pick-list.vue'], resolve);
                            },
                            isShowInTab: true,
                            subRoutes: {
                                '/empty': {
                                    name: 'assort-pick-list-empty',
                                    group: 'pick-list',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/pick-list-detail.vue'], resolve);
                                    },
                                },
                                '/pick': {
                                    name: 'assort-pick-list-pick',
                                    group: 'pick-list',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/pick-list-detail.vue'], resolve);
                                    },
                                },
                                '/finish': {
                                    name: 'assort-pick-list-finish',
                                    group: 'pick-list',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/pick-list-detail.vue'], resolve);
                                    },
                                },
                                '/invalid': {
                                    name: 'assort-pick-list-invalid',
                                    group: 'pick-list',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/pick-list-detail.vue'], resolve);
                                    },
                                },
                                '/back': {
                                    name: 'assort-pick-back',
                                    group: 'pick-back',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/pick-back.vue'], resolve);
                                    },
                                },                             
                            },
                        },
                        '/pick-edit': {
                            name: 'assort-pick-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/assortGoods/pick-edit.vue'], resolve);
                            },
                            subRoutes: {
                                '/:outStockBatchID': {
                                    name: 'assort-pick-edit-list',
                                    group: 'pick-edit',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/pick-edit-list.vue'], resolve);
                                    },
                                },
                                '/merchant/:outStockBatchID': {
                                    name: 'assort-pick-edit-merchant',
                                    group: 'pick-edit',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/pick-edit-merchant.vue'], resolve);
                                    },
                                },
                            },
                        },
                        //查看
                        '/pick-back': {
                            name: 'assort-pick-back',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/assortGoods/pick-back.vue'], resolve);
                            },
                            subRoutes: {
                                '/:outStockBatchID': {
                                    name: 'assort-pick-back-list',
                                    group: 'pick-back',
                                    component: function (resolve) {
                                        require(['./views/assortAndDeliveryGoods/assortGoods/pick-back-list.vue'], resolve);
                                    },
                                },
                            },
                        },                                                                    
                    },
                },
                //消息管理
                '/megManage': {
                    name: 'megManage',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/megManage/meg-manage.vue'], resolve);
                    },
                    subRoutes: {
                        '/empty': {
                            name: 'meg-manage-list',
                            group: 'megManage',
                            component: function (resolve) {
                                require(['./views/mesFunction/megManage/meg-manage-list.vue'], resolve);
                            },
                        },
                        '/pick': {
                            name: 'meg-manage-pick',
                            group: 'megManage',
                            component: function (resolve) {
                                require(['./views/mesFunction/megManage/meg-manage-list.vue'], resolve);
                            },
                        },

                    },                    
                }, 
                //消息回复页面
                '/megManageBack': {
                    name: 'meg-manage-back',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/megManage/meg-back.vue'], resolve);
                    },
                }, 
                //消息查看详情页面
                '/megManageCheck': {
                    name: 'meg-manage-check',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/megManage/meg-check.vue'], resolve);
                    },
                },
                //消息黑名单
                '/msgBlacklist': {
                    name: 'msgBlacklist',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgBlacklist/blacklist.vue'], resolve);
                    },
                }, 
                //消息黑名单详情
                '/msgBlacklist-detail': {
                    name: 'blackDetail',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgBlacklist/blackDetail.vue'], resolve);
                    },
                },   
                //客服分类
                '/msgClassify': {
                    name: 'classify',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgClassify/classify.vue'], resolve);
                    },
                },
                //客服分类新增
                '/msgClassify/add': {
                    name: 'classify-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgClassify/edit.vue'], resolve);
                    },
                },
                //客服分类修改
                '/msgClassify-update': {
                    name: 'classify-update',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgClassify/update.vue'], resolve);
                    },
                },  
               // 客服分配                 
                '/msgDistribution': {
                    name: 'distribution',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgDistribution/distribution.vue'], resolve);
                    },
                },
               // 客服分配新增                
                '/msgDistribution/add': {
                    name: 'distribution-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgDistribution/edit.vue'], resolve);
                    },
                },
                //客服管理
                '/msgServiceManage': {
                    name: 'serviceManage',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgServiceManage/service-manage.vue'], resolve);
                    },  
                },
                //客服管理添加
               '/msgServiceManage/add': {
                    isShowInTab: true,
                    name: 'msgServiceManage-add',
                    component: function (resolve) {
                        require(['./views/mesFunction/msgServiceManage/edit.vue'], resolve);
                    },
                },
                //客服管理修改
               '/msgServiceManage/update': {
                    isShowInTab: true,
                    name: 'msgServiceManage-update',
                    component: function (resolve) {
                        require(['./views/mesFunction/msgServiceManage/update.vue'], resolve);
                    },
                },                
                //快捷回复
                '/msgReply': {
                    name: 'msgReply',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/mesFunction/msgReply/reply.vue'], resolve);
                    },
                },
                //快捷回复添加
               '/msgReply-Add': {
                    isShowInTab: true,
                    name: 'msgReply-Add',
                    component: function (resolve) {
                        require(['./views/mesFunction/msgReply/edit.vue'], resolve);
                    },
                },
                 //快捷回复添加
               '/msgReply-Modify': {
                    isShowInTab: true,
                    name: 'msgReply-Modify',
                    component: function (resolve) {
                        require(['./views/mesFunction/msgReply/edit.vue'], resolve);
                    },
                },
                // 入库管理
                '/instorage': {
                    name: 'instorage',
                    component: function (resolve) {
                        require(['./views/assortAndDeliveryGoods/instorage/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/scan': {
                            name: 'instorage-scan',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/assortAndDeliveryGoods/instorage/instorage-scan.vue'], resolve);
                            },
                        },
                    },
                },
                // 接口
                '/api': {
                    name: 'api',
                    component: function (resolve) {
                        require(['./views/API/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/merchant': {
                            name: 'api-merchant',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/API/merchant.vue'], resolve);
                            },
                        },
                        '/order': {
                            name: 'api-order',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/API/order.vue'], resolve);
                            },
                        },
                        '/sku': {
                            name: 'api-sku',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/API/sku.vue'], resolve);
                            },
                        },
                        '/refund': {
                            name: 'api-refund',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/API/refund.vue'], resolve);
                            },
                        },
                    },
                },

                // 客户等级
                '/client-grade': {
                    name: 'client-grade',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/client-grade.vue'], resolve);
                    },
                },
                // 客户等级新增
                '/client-grade-add': {
                    name: 'client-grade-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/client-grade-add.vue'], resolve);
                    },
                },
                // 客户等级修改
                '/client-grade-edit': {
                    name: 'client-grade-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/merchant/client-grade-add.vue'], resolve);
                    },
                },
                 // 商家管理
                // 等级商品价
                '/product-grade-price': {
                    name: 'product-grade-price',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/client/product-grade-price.vue'], resolve);
                    },
                },
                // 客户商品价
                '/client-product-price': {
                    name: 'client-product-price',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/client/client-product-price.vue'], resolve);
                    },
                },
                // 新增客户商品价
                '/client-product-price-add': {
                    name: 'client-product-price-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/client/client-product-price-add.vue'], resolve);
                    },
                },
                // 修改客户商品价
                '/client-product-price-edit': {
                    name: 'client-product-price-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/client/client-product-price-add.vue'], resolve);
                    },
                },
                // 新增等级商品价
                '/product-grade-add': {
                    name: 'product-grade-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/client/product-grade-add.vue'], resolve);
                    },
                },
                '/product-grade-edit': {
                    name: 'product-grade-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/client/product-grade-add.vue'], resolve);
                    },
                },
                // 会员等级
                '/member-grade': {
                    name: 'member-grade',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/members/member-grade.vue'], resolve);
                    },
                },
                // 新建会员等级
                '/member-grade-add': {
                    name: 'member-grade-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/members/member-grade-add.vue'], resolve);
                    },
                },
                // 修改会员等级
                '/member-grade-edit': {
                    name: 'member-grade-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/members/member-grade-add.vue'], resolve);
                    },
                },
                // 会员信息
                '/member': {
                    name: 'member',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/members/member.vue'], resolve);
                    },
                },
                // 新增会员
                '/member-add': {
                    name: 'member-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/members/member-add.vue'], resolve);
                    },
                },
                // 修改会员
                '/member-edit': {
                    name: 'member-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/members/member-add.vue'], resolve);
                    },
                },
                // 会员订单
                '/member-order': {
                    name: 'member-order',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/archives/members/member-order.vue'], resolve);
                    },
                },
                // 结算账户
                '/client-balance-account': {
                    name: 'client-balance-account',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/client-balance-account.vue'], resolve);
                    },
                },
                // 新建结算账户
                '/balance-account-add': {
                    name: 'balance-account-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/client-balance-account-add.vue'], resolve);
                    },
                },
                // 修改结算账户
                '/balance-account-edit': {
                    name: 'balance-account-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/client-balance-account-add.vue'], resolve);
                    },
                },
                // 交易流水
                '/deal-flow': {
                    name: 'deal-flow',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/deal-flow.vue'], resolve);
                    },
                },
                // 结算方式
                '/account-way': {
                    name: 'account-way',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/account-way.vue'], resolve);
                    },
                },
                // 新建结算方式
                '/account-way-add': {
                    name: 'account-way-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/account-way-add.vue'], resolve);
                    },
                },
                // 修改结算方式
                '/account-way-edit': {
                    name: 'account-way-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/finance/account-way-add.vue'], resolve);
                    },
                },
                // 返点结算
                '/rebates': {
                    name: 'rebates',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/rebates/rebatesBalance/rebates.vue'], resolve);
                    },
                },
                // 返还记录
                '/return-record': {
                    name: 'returnRecord',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/rebates/rebatesBalance/returnRecord.vue'], resolve);
                    },
                },
                // 提成记录
                '/rebate-record': {
                    name: 'rebateRecord',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/rebates/rebatesBalance/returnRecord.vue'], resolve);
                    },
                },
                // 供应商库存
                '/supplier-stock': {
                    name: 'supplierStock',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/rebates/supplierStock/supplierStock.vue'], resolve);
                    },
                },
                // 商品库存
                '/product-stock': {
                    name: 'productStock',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/rebates/supplierStock/productStock.vue'], resolve);
                    },
                },
                // 条码管理
                'code-manage': {
                    name: 'barCodeManage',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/barCode/codeManage/barCodeManage.vue'], resolve);
                    },
                },
                // 生成条码
                'generate-code': {
                    name: 'generateBarCode',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/barCode/codeManage/generateBarCode.vue'], resolve);
                    },
                },
                '/trade-manage': {
                    name: 'trade-manage',
                    component: function (resolve) {
                        require(['./views/system/systemManage/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/index': {
                            name: 'trade-manage',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/system/systemManage/trade-manage.vue'], resolve);
                            },
                        },
                        '/add': {
                            name: 'trade-manage-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/system/systemManage/trade-manage-add.vue'], resolve);
                            },
                        },
                        '/combo-edit': {
                            name: 'trade-manage-combo-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/system/systemManage/trade-manage-combo.vue'], resolve);
                            },
                        },
                        '/function': {
                            name: 'trade-manage-function',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/system/systemManage/trade-manage-function.vue'], resolve);
                            },
                        },
                        '/menu': {
                            name: 'trade-manage-menu',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/system/systemManage/trade-manage-menu.vue'], resolve);
                            },
                        },
                        '/edit': {
                            name: 'trade-manage-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/system/systemManage/trade-manage-edit.vue'], resolve);
                            },
                        },
                        '/wechat': {
                            name: 'wechat-config',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/system/systemManage/wechat-config.vue'], resolve);
                            },
                        },
                        '/wechat-model': {
                            name: 'wechat-model',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/system/systemManage/wechat-model.vue'],resolve)
                            }
                        }

                    },
                },

                // 供应商
                '/supplier': {
                    name: 'supplier',
                    component: function (resolve) {
                        require(['./views/supplier/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/': {
                            name: 'supplier',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/supplier/index.vue'], resolve);
                            },
                        },
                        '/shop': {
                            name: 'supplier-shop',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/supplier/supplier-shop.vue'], resolve);
                            },
                        },

                        '/store': {
                            name: 'supplier-store',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/supplier/supplier-store.vue'], resolve);
                            },
                        },
                        '/clientIssued': {
                            name: 'clientIssued',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/supplier/clientIssued.vue'], resolve);
                            },
                        },
                        '/commodityIssued': {
                            name: 'commodityIssued',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/supplier/commodityIssued.vue'], resolve);
                            },
                        },
                        '/entrepotIssued': {
                            name: 'entrepotIssued',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/supplier/entrepotIssued.vue'], resolve);
                            },
                        },
                        '/shopIssued': {
                            name: 'shopIssued',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/supplier/shopIssued.vue'], resolve);
                            },
                        },
                        '/supplierIssued': {
                            name: 'supplierIssued',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/supplier/supplierIssued.vue'], resolve);
                            },
                        },


                    },
                },
                //微信配置
                '/wechat-comfir': {
                    name: 'wechat-comfir',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/weChatComfir/we-chat-comfir.vue'], resolve);
                    },
                },
                //裂变海报
                'fission-poster': {
                    name: 'fission-poster',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/fissionPoster/fissionPosterList.vue'], resolve);
                    },
                },
                //新增裂变海报
                'poster-add': {
                    name: 'poster-add',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/fissionPoster/posterEdit.vue'], resolve);
                    },
                },
                //修改裂变海报
                'poster-edit': {
                    name: 'poster-edit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/fissionPoster/posterEdit.vue'], resolve);
                    },
                },
                //查看参加裂变海报人员
                'agent-team': {
                    name: 'agent-team',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/fissionPoster/agentTeam.vue'], resolve);
                    },
                },
                // 留言
                '/message': {
                    name: 'message',
                    component: function (resolve) {
                        require(['./views/subject/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/': {
                            name: 'message-index',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/subject/message.vue'], resolve);
                            },
                        },
                        '/add': {
                            name: 'message-add',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/subject/message-add.vue'], resolve);
                            },
                        },
                        '/edit': {
                            name: 'message-edit',
                            isShowInTab: true,
                            component: function (resolve) {
                                require(['./views/subject/message-edit.vue'], resolve);
                            },
                        },
                    },
                },

                '/print-template': {
                    name: 'print-template',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/print/print-template.vue'], resolve);
                    },
                },
                'reset-password': {
                    name: 'reset-password',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/log/reset-password.vue'], resolve);
                    },
                },
                // 分销分销订货单管理
                '/distribution/order-todo': {
                    name: 'distributionOrderTodo',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/orders/order-todo.vue'], resolve);
                    },
                },
                // 分销订货单处理
                '/distribution/order-do': {
                    name: 'distributionOrderdo',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/ordersList/order-todo.vue'], resolve);
                    },
                },
                // 关联订单
                '/distribution/relevant': {
                    name: 'relevanceOrder',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/relevanceOrder/relevanceOrder.vue'], resolve);
                    },
                },
                // 分销二维码
                '/distribution/qrcode': {
                    name: 'qrcode',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/qrcode/qrcode.vue'], resolve);
                    },
                    subRoutes: {
                        '/large': {
                            name: 'qrcode-large',
                            group: 'qrcode',
                            component: function (resolve) {
                                require(['./views/distribution/qrcode/qrcodeList.vue'], resolve);
                            },
                        },
                        '/small': {
                            name: 'qrcode-small',
                            group: 'qrcode',
                            component: function (resolve) {
                                require(['./views/distribution/qrcode/qrcodeList.vue'], resolve);
                            },
                        },
                    },
                },
                // 分销二维码
                '/distribution/queryCode': {
                    name: 'queryCode',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/queryCode/qrcode.vue'], resolve);
                    },
                },
                '/distribution/qrcodeFlow': {
                    name: 'qrcodeFlow',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/qrcode/qrcodeFlow.vue'], resolve);
                    },
                },
                // 分销返点配置
                '/distribution/pointConfig': {
                    name: 'pointConfig',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/pointConfig/pointConfig.vue'], resolve);
                    },
                },
                // 分销返点配置新增
                '/distribution/pointConfig-add': {
                    name: 'pointConfigAdd',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/pointConfig/pointConfig-add.vue'], resolve);
                    },
                },
                // 分销返点配置修改
                '/distribution/pointConfig-edit': {
                    name: 'pointConfigEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/pointConfig/pointConfig-add.vue'], resolve);
                    },
                },
                // 分销代理商档案
                '/distribution/agentArchives': {
                    name: 'agentArchives',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/agentArchives/agentArchives.vue'], resolve);
                    },
                },
                // 代理商档案-新增
                '/distribution/agentArchives-add': {
                    name: 'agentArchivesAdd',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/agentArchives/agentArchives-add.vue'], resolve);
                    },
                },
                // 代理商档案-新增
                '/distribution/agentArchives-edit': {
                    name: 'agentArchivesEdit',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/agentArchives/agentArchives-add.vue'], resolve);
                    },
                },
                //
                '/distribution/repGoods': {
                    name: 'repGoods',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/distribution/agent/repGoods.vue'], resolve);
                    },
                },
                // 全局配置
                '/config': {
                    name: 'global-config',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/config/config.vue'], resolve);
                    },
                },
                '/imageConfig': {
                    name: 'imageConfig',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/config/imageConfigList.vue'], resolve);
                    },
                },
                '/articleConfig': {
                    name: 'articleConfig',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/config/articleConfig.vue'], resolve);
                    },
                },
                'articleEdite': {
                    name: 'articleEdite',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/system/config/articleEdite.vue'], resolve);
                    },
                },
                // 出库单
                outstock: {
                    name: 'outstock',
                    isShowInTab: true,
                    component: function (resolve) {
                        require(['./views/outstock/index.vue'], resolve);
                    },
                    subRoutes: {
                        '/notify': {
                            name: 'outstockNotify',
                            group: 'outstock',
                            component: function (resolve) {
                                require(['./views/outstock/outstockList.vue'], resolve);
                            },
                        },
                        '/pick': {
                            name: 'outstockPick',
                            group: 'outstock',
                            component: function (resolve) {
                                require(['./views/outstock/outstockList.vue'], resolve);
                            },
                        },
                        '/scan': {
                            name: 'outstockScan',
                            group: 'outstock',
                            component: function (resolve) {
                                require(['./views/outstock/outstockList.vue'], resolve);
                            },
                        },
                        '/weigh': {
                            name: 'outstockWeigh',
                            group: 'outstock',
                            component: function (resolve) {
                                require(['./views/outstock/outstockList.vue'], resolve);
                            },
                        },
                        '/finish': {
                            name: 'outstockFinish',
                            group: 'outstock',
                            component: function (resolve) {
                                require(['./views/outstock/outstockList.vue'], resolve);
                            },
                        },
                        '/cancel': {
                            name: 'outstockCancel',
                            group: 'outstock',
                            component: function (resolve) {
                                require(['./views/outstock/outstockList.vue'], resolve);
                            },
                        },
                        // '/pause': {
                        //  name: 'outstockPause',
                        //  group: 'outstock',
                        //  component: function (resolve) {
                        //      require(['./views/outstock/outstockList.vue'],resolve);
                        //  }
                        // },
                        // '/exception': {
                        //  name: 'outstockException',
                        //  group: 'outstock',
                        //  component: function (resolve) {
                        //      require(['./views/outstock/outstockList.vue'],resolve);
                        //  }
                        // }
                    },
                },
            },

        },
        '/log': {
            component: function (resolve) {
                require(['./views/login/log.vue'], resolve);
            },
            subRoutes: {
                '/find-password': {
                    name: 'find-password',
                    component: function (resolve) {
                        require(['./views/login/reset-password.vue'], resolve);
                    },
                },

                '/login': {
                    name: 'login',
                    component: function (resolve) {
                        require(['./views/login/login.vue'], resolve);
                    },
                },
                // '/find-password': {
                //     name: 'find-password',
                //     component: function (resolve) {
                //         require(['./views/log/find-password.vue'],resolve)
                //     }
                // }
            },
        },
        // 打印拣货单
        '/print-pick': {
            name: 'print-pick',
            component: function (resolve) {
                require(['./views/system/print/print-pick.vue'], resolve);
            },
            auth: true,
        },
        // 打印装箱单
        '/print-pack': {
            name: 'print-pack',
            component: function (resolve) {
                require(['./views/system/print/print-pack.vue'], resolve);
            },
            auth: true,
        },
        // 打印单据
        '/print-order': {
            name: 'print-order',
            component: function (resolve) {
                require(['./views/system/print/print-order.vue'], resolve);
            },
            auth: true,
        },
        // 打印快递单
        '/print-delivery': {
            name: 'print-delivery',
            component: function (resolve) {
                require(['./views/system/print/print-delivery.vue'], resolve);
            },
            auth: true,
        },
        // 打印二维码
        '/print-code': {
            name: 'print-code',
            component: function (resolve) {
                require(['./views/system/print/print-code.vue'], resolve);
            },
            auth: true,
        },
        // 注册
        '/registration': {
            component: function (resolve) {
                require(['./views/log/registration/registration.vue'], resolve);
            },
            subRoutes: {
                '/register': {
                    name: 'register',
                    component: function (resolve) {
                        require(['./views/log/registration/register.vue'], resolve);
                    },
                },
                '/account-information': {
                    name: 'account-information',
                    component: function (resolve) {
                        require(['./views/log/registration/account-information.vue'], resolve);
                    },
                },
                '/register-next': {
                    name: 'register-next',
                    component: function (resolve) {
                        require(['./views/log/registration/register-next.vue'], resolve);
                    },
                },
                '/register-success': {
                    name: 'register-success',
                    component: function (resolve) {
                        require(['./views/log/registration/register-success.vue'], resolve);
                    },
                },
            },
        },
        // 授权
        empower: {
            component: function (resolve) {
                require(['./views/empower/empower.vue'], resolve);
            },
            subRoutes: {
                '/empowerFailure': {
                    name: 'empowerFailure',
                    component: function (resolve) {
                        require(['./views/empower/empowerFailure.vue'], resolve);
                    },
                },
                '/empowerSuccess': {
                    name: 'empowerSuccess',
                    component: function (resolve) {
                        require(['./views/empower/empowerSuccess.vue'], resolve);
                    },
                },
            },
        },

    });
};
