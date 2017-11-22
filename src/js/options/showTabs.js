/**
 * 1.tab页的配置,以路由中的name作为key,text是需要在tab上显示的文本
 * 2.如果共用同一个模板,以params区分不同的页面,依旧以name作为key,但需要配置textGroup
 * 3.如果多个页面共用一个tab,以路由中的group作为key
 */
module.exports = {
    //商品分类
    "categories": {
        text: '商品分类'
    },
    "category-add": {
        text: '新建商品分类'
    },
    "category-edit": {
        text: '修改商品分类'
    },
    //操作员
    "employees": {
        text: '操作员管理'
    },
    "employee-add": {
        text: '新建操作员'
    },
    "employee-edit": {
        text: '修改操作员'
    },
    "employee-auth": {
        text: '操作员权限管理'
    },
    //消息功能
    "megManage": {
        text: '消息管理'
    },
    "meg-manage-back": {
        text:'回复消息'
    },
    "meg-manage-check":{
        text:'查看消息'
    },
    "msgBlacklist": {
        text: '消息黑名单'
    },
    "blackDetail": {
        text: '查看消息'
    },//dan
    "classify": {
        text: '消息分类'
    },
    "classify-add": {
        text: '新增分类'
    },//dan
    "classify-update": {
        text: '修改分类'
    },//dan
    "distribution": {
        text: '消息分配'
    },
    "distribution-add": {
        text: '新增首字母'
    },//dan
    "serviceManage": {
        text: '客服管理'
    },
    "msgServiceManage-add" :{
        text:'新增客服'
    },
    "msgServiceManage-update":{
        text:'修改客服'
    },
    "msgReply": {
        text: '快捷回复'
    },
    
    "msgReply-Modify": {
        text: '修改快捷回复'
    },
    "msgReply-Add": {
        text: '新增快捷回复'
    },
    //角色
    "role": {
        text: '角色'
    },
    "role-add": {
        text: '新建角色'
    },
    "role-edit": {
        text: '修改角色'
    },
    //商品属性
    "property": {
        textGroup: [
            {
                text: '颜色管理',
                params: {
                    propertyName: 'color'
                }
            },
            {
                text: '品牌管理',
                params: {
                    propertyName: 'brand'
                }
            },
            {
                text: '季节管理',
                params: {
                    propertyName: 'season'
                }
            },
            {
                text: '性别管理',
                params: {
                    propertyName: 'sex'
                }
            },
            {
                text: '尺码管理',
                params: {
                    propertyName: 'size'
                }
            }
        ]
    },
    "property-add": {
        textGroup: [
            {
                text: '新增颜色',
                params: {
                    propertyName: 'color'
                }
            },
            {
                text: '新增品牌',
                params: {
                    propertyName: 'brand'
                }
            },
            {
                text: '新增季节',
                params: {
                    propertyName: 'season'
                }
            },
            {
                text: '新增性别',
                params: {
                    propertyName: 'sex'
                }
            },
            {
                text: '新增尺码',
                params: {
                    propertyName: 'size'
                }
            }
        ]
    },
    "property-edit": {
        textGroup: [
            {
                text: '修改颜色',
                params: {
                    propertyName: 'color'
                }
            },
            {
                text: '修改品牌',
                params: {
                    propertyName: 'brand'
                }
            },
            {
                text: '修改季节',
                params: {
                    propertyName: 'season'
                }
            },
            {
                text: '修改性别',
                params: {
                    propertyName: 'sex'
                }
            },
            {
                text: '修改尺码',
                params: {
                    propertyName: 'size'
                }
            }
        ]
    },
    //快递公司
    "merchant-deliveries": {
        text: '快递公司'
    },
    "merchant-delivery-add": {
        text: '新增快递公司'
    },
    "merchant-delivery-edit": {
        text: '修改快递公司'
    },
    "merchant-delivery-config": {
        text: '快递公司配置'
    },
    //商品组合
    "merchant-group-list": {
        text: '商品组合'
    },
    "merchant-group-add": {
        text: '新增商品组合'
    },
    "merchant-group-edit": {
        text: '修改商品组合'
    },
    //买满送活动
    "bonuspacks": {
        text: '买满送活动'
    },
    "bonuspacks-record": {
        text: '赠送记录'
    },
    "bonuspacks-add": {
        text: '新增买满送活动'
    },
    "bonuspacks-edit": {
        text: '修改买满送活动'
    },
    //库存调整单
    "inv-adjust-add": {
        text: '新增库存调整单'
    },
    "inv-adjust-edit": {
        text: '修改库存调整单'
    },
    "inv-adjust": {
        text: '库存调整单'
    },
    //商品调仓单
    "transfer-stock-add": {
        text: '新增商品调仓单'
    },
    "transfer-stock-edit": {
        text: '修改商品调仓单'
    },
    "transfer-stock": {
        text: '商品调仓单'
    },
    //采购入库单
    "instock-purchase-list": {
        text: '采购入库单'
    },
    "purchase-instock-add": {
        text: '新增采购入库单'
    },
    "purchase-instock-edit": {
        text: '修改采购入库单'
    },
    //退货入库单
    "instock-refund-list": {
        text: '退货入库单'
    },
    "refund-instock-add": {
        text: '新增退货入库单'
    },
    "refund-instock-edit": {
        text: '修改退货入库单'
    },
    //仓库管理
    "entrepot": {
        text: '仓库管理'
    },
    "entrepot-api": {
        text: '仓库api配置'
    },
    "entrepot-add": {
        text: '新增仓库'
    },
    "entrepot-edit": {
        text: '修改仓库'
    },
    "deploy-freight": {
        text: '配置运费'
    },
    "deploy-courier": {
        text: '配置快递'
    },
    "deploy-place": {
        text: '快递不到区域'
    },
    //商品档案
    "merchant-list": {
        text: '商品列表'
    },
    "merchant-stock": {
        text: '查看商品库存'
    },
    "merchant-list-operate": {
        textGroup: [
            {
                text: '新增商品',
                params: {
                    pageType: 'add'
                }
            },
            {
                text: '修改商品',
                params: {
                    pageType: 'edit'
                }
            },
            {
                text: '查看商品',
                params: {
                    pageType: 'see'
                }
            }
        ]
    },
    "sell-deploy": {
        text: '配置SKU'
    },
    //供应商
    "vender-index": {
        text: '供应商列表'
    },
    "vender-add": {
        text: '添加供应商'
    },
    "vender-edit": {
        text: '修改供应商'
    },
    "vender-price": {
        text: '供应商价管理'
    },
    "vender-price-add": {
        text: ' 新增供应商价'
    },
    "vender-price-edit": {
        text: '修改供应商价'
    },
    //客户
    "client-index": {
        text: '客户列表'
    },
    "client-add": {
        text: '添加客户'
    },
    "client-edit": {
        text: '修改客户'
    },
    //店铺
    "commodity-index": {
        text: '店铺列表'
    },
    "commodity-add": {
        text: '添加店铺'
    },
    "commodity-edit": {
        text: '修改店铺'
    },
    "commodity-result": {
        text: '店铺授权结果'
    },
    "merchant-list-config": {
        text: '配置店铺'
    },
    //SKU
    "sku-index": {
        text: 'SKU列表'
    },
    "see": {
        text: '查看SKU'
    },
    "sku-edit": {
        text: '修改SKU'
    },
    //货位
    "storage-space": {
        text: '货位列表'
    },
    "storage-see": {
        text: '查看货位商品'
    },
    "storage-add": {
        text: '新建货位'
    },
    "storage-edit": {
        text: '修改货位'
    },
    "storage-query": {
        text: '商品货位管理'
    },
    //来货计划
    "inform": {
        text: '来货计划单'
    },
    "inform-add": {
        text: '新增计划单'
    },
    "inform-edit": {
        text: '修改计划单'
    },
    "inform-see": {
        text: '查看计划单'
    },
    //生产订单
    "plan": {
        text: '生产订单'
    },
    "plan-edit": {
        text: '修改生产订单'
    },
    "plan-see": {
        text: '查看生产订单'
    },
    "plan-add": {
        text: '新增计划单'
    },
    //采购退货单
    "sales-return": {
        text: '采购退货单'
    },
    "sales-return-add": {
        textGroup: [
            {
                text: '新增退货单',
                params: {
                    pageType: 'add'
                }
            },
            {
                text: '查看退货单',
                params: {
                    pageType: 'see'
                }
            },
            {
                text: '修改退货单',
                params: {
                    pageType: 'edit'
                }
            }
        ]
    },
    //报表
    "report-form-index": {
        text: '报表列表'
    },
    "report-form-add": {
        text: '新增报表'
    },
    "report-form-edit": {
        text: '修改报表'
    },
    //商品属性
    'report-form-run': {
        textGroup: [
            {
                text: '订单查询',
                params: {
                    ReportID: '5984FC3D-4148-4017-9349-828FD7869E07'
                }
            },
            {
                text: '出库查询',
                params: {
                    ReportID: 'DE2F6766-2954-4A12-986F-4E338D4AC509'
                }
            },
            {
                text: '入库查询',
                params: {
                    ReportID: 'AFE30B49-6D94-4212-B231-A0BF652B962E'
                }
            },
            {
                text: '调拨查询',
                params: {
                    ReportID: '2AA0D630-DB60-43C2-9D99-0ADF34174422'
                }
            },
            {
                text: '锁存查询',
                params: {
                    ReportID: '43C61C4C-765C-4F71-B7A7-581065B4ECFF'
                }
            },
            {
                text: '库存查询',
                params: {
                    ReportID: 'AB896255-1395-4EAE-AD81-161E5DAA1A5C'
                }
            },
            {
                text: '进销售查询',
                params: {
                    ReportID: 'B3902950-8438-48E4-84E1-A7EF0EFD4774'
                }
            },
            {
                text: '代理商查询',
                params: {
                    ReportID: 'F1BF46F0-D0EE-4495-927F-075D3744BA1F'
                }
            },
            {
                text: '代理商进销存',
                params: {
                    ReportID: 'FC0F5198-47B3-4C2C-BE4F-8D941A8E4425'
                }
            },
            {
                text: '公司快递统计',
                params: {
                    ReportID: 'D08D87A5-075C-40F3-B87E-F657C6DBCB49'
                }
            },
            {
                text: '代理商资料',
                params: {
                    ReportID: '279CC73A-FA80-4503-BD47-6D896A3D82FD'
                }
            },
            {
                text: '代理商订单',
                params: {
                    ReportID: 'D7602361-C225-45AD-902F-DF569A188936'
                }
            },
            {
                text: '代理商当日往来',
                params: {
                    ReportID: 'D4B3BC51-53F9-4049-9714-1DA1BA275956'
                }
            },
            {
                text: '代理商分成流水',
                params: {
                    ReportID: 'E0CD7133-8CB4-4490-9369-27AE9775035C'
                }
            },
        ]
    },
    //订单处理
    "order-todo": {
        text: '待处理订单'
    },
    "type-order": {
        text: '录入订单'
    },
    //退单
    "refund-all": {
        text: '退单查询'
    },
    "refund": {
        text: '退单管理'
    },
    //销售订单
    "order-sale": {
        text: '销售订单'
    },
    //发货管理
    "delivery-weigh": {
        text: '待称重订单'
    },
    "delivery-pick": {
        text: '待扫描订单'
    },
    "delivery-callback": {
        text: '待回写订单'
    },
    "delivery-weighed": {
        text: '称重出库'
    },
    "delivery-pack": {
        text: '装箱出库'
    },
    "delivery-scan": {
        text: '扫描出库'
    },
    //配货拣货
    "assort-lack": {
        text: '缺货配货订单'
    },
    "assort-circular": {
        text: '待拣货订单'
    },
    "pick-list": {
        text: '拣货单列表'
    },
    "pick-edit": {
        text: '修改拣货单'
    },
    "pick-back": {
        text: '查看拣货单'
    },
    //入库扫描
    "instorage-scan": {
        text: '入库扫描'
    },
    //接口管理
    "api-merchant": {
        text: '商品接口管理'
    },
    "api-order": {
        text: '订单接口管理'
    },
    "api-sku": {
        text: '条码接口管理'
    },
    "api-refund": {
        text: '退单接口管理'
    },
    //客户等级
    "client-grade": {
        text: '客户等级列表'
    },
    "client-grade-add": {
        text: '新增客户等级'
    },
    "client-grade-edit": {
        text: '修改客户等级'
    },
    //客户商品价
    "product-grade-price": {
        text: '商品等级价'
    },
    "client-product-price": {
        text: '客户商品价'
    },
    "client-product-price-add": {
        text: '新增客户商品价'
    },
    "client-product-price-edit": {
        text: '修改客户商品价'
    },
    "product-grade-add": {
        text: '新增客户商品价'
    },
    "product-grade-edit": {
        text: '修改等级商品价'
    },
    //会员
    "member-grade": {
        text: '会员等级'
    },
    "member-grade-add": {
        text: '新建会员等级'
    },
    "member-grade-edit": {
        text: '修改会员等级'
    },
    "member": {
        text: '会员信息'
    },
    "member-add": {
        text: '新增会员信息'
    },
    "member-edit": {
        text: '修改会员信息'
    },
    "member-order": {
        text: '查看会员订单'
    },
    //账户
    "client-balance-account": {
        text: '结算账户'
    },
    "balance-account-add": {
        text: '新建结算账户'
    },
    "balance-account-edit": {
        text: '修改结算账户'
    },
    "deal-flow": {
        text: '交易流水'
    },
    //结算
    "account-way": {
        text: '结算方式'
    },
    "account-way-add": {
        text: '新建结算方式'
    },
    "account-way-edit": {
        text: '修改结算方式'
    },
    //商家
    "trade-manage": {
        text: '商家管理'
    },
    "trade-manage-add": {
        text: '新增商家'
    },
    "trade-manage-combo-edit": {
        text: '套餐管理'
    },
    "trade-manage-function": {
        text: '功能配置'
    },
    "trade-manage-edit": {
        text: '修改商家'
    },
    //供应商
    "supplier": {
        text: '供应商'
    },
    "supplier-shop": {
        text: '供应商商品管理'
    },
    "supplier-store": {
        text: '供应商店铺管理'
    },
    "clientIssued": {
        text: '客户资料下发门店'
    },
    "commodityIssued": {
        text: '商品资料下发门店'
    },
    "entrepotIssued": {
        text: '仓库资料下发门店'
    },
    "shopIssued": {
        text: '店铺资料下发门店'
    },
    "supplierIssued": {
        text: '供应商资料下发门店'
    },
    //留言
    "message-index": {
        text: '留言'
    },
    "message-add": {
        text: '添加留言'
    },
    "message-edit": {
        text: '修改留言'
    },
    //打印
    "print-template": {
        text: '打印模板'
    },
    //修改密码
    "reset-password": {
        text: '修改密码'
    },
    // 分销系统-订单处理
    'distributionOrderTodo': {
        text: '分销订单管理'
    },
     // 分销系统-订单管理
    'distributionOrderdo': {
        text: '分销订单处理'
    },
    // 分销系统-关联订单
    'relevanceOrder': {
        text: '关联订单'
    },
    // 分销系统-返点配置
    'pointConfig': {
        text: '返点配置'
    },
    // 分销系统-新增返点配置
    'pointConfigAdd': {
        text: '新增返点配置'
    },
    // 分销系统-修改返点配置
    'pointConfigEdit': {
        text: '修改返点配置'
    },
    // 分销系统-代理商档案
    'agentArchives': {
        text: '代理商档案'
    },
    'agentArchivesAdd': {
        text: '新建代理商档案'
    },
    'agentArchivesEdit': {
        text: '修改代理商档案'
    },
    // 分销系统 3个
    'repGoods': {
        text: '提货单查询',
    },
    'agentCheckList': {
        text: '代理审核'
    },
    'agentSuperiorCheckList': {
        text: '上级审核'
    },
    'agentSuperiorCheckProcess': {
        text: '审核流程'
    },
    'qrcode': {
       text: '二维码管理',
    },
    'qrcodeFlow': {
        text: '扫码流水'
    },
    // 全局配置
    'global-config': {
        text: '全局配置'
    },
    // 返还记录
    'returnRecord': {
        text: '返点记录'
    },
    // 提成记录
    'rebateRecord': {
        text: '提成记录'
    },
    'notice-list': {
        text: '公告管理'
    },
    'notice-add': {
        text: '添加公告'
    },
    'notice-edit': {
        text: '修改公告'
    },
    'notice-see': {
        text: '查看公告'
    },
    'managementBlackList': {
        text: '管理黑名单'
    },
    'shopList': {
        text: ' 收费管理'
    },
    'shopEdit': {
        text: '收费管理编辑'
    },
    'propertyList': {
        text: '商户管理'
    },
    'propertyEdit': {
        text: '商户管理编辑'
    },
    //dan
    'rental': {
        text: ' 租赁费'
    },
    'rentalEdit': {
        text: '租赁费编辑'
    },
    'propertyRent': {
        text: '物业管理费'
    },
    'propertyRentEdit': {
        text: '物业管理费编辑'
    },
    'strorageRent': {
        text: ' 仓储费'
    },
    'strorageRentEdit': {
        text: '仓储费编辑'
    },
    'expressRent': {
        text: '快递物流费'
    },
    'expressRentEdit': {
        text: '快递物流费编辑'
    },
    'electricRent': {
        text: ' 电费'
    },
    'electricRentEdit': {
        text: '电费编辑'
    },
    'waterRent': {
        text: '水费'
    },
    'waterRentEdit': {
        text: '水费编辑'
    },
    'incidentalRent': {
        text: '杂费'
    },
    'incidentalRentEdit': {
        text: '杂费编辑'
    },
    //dan
    'rebates-calculate': {
        text: '育成计算'
    },
    'rebates-calculate-flow': {
        text: '育成计算记录'
    },
    'rebates-set-up-list': {
        text: '育成配置'
    },
    'rebates-set-up-edit': {
        text: '修改育成配置'
    },
    'rebates-set-up-see': {
        text: '查看育成配置'
    },
    'rebates-set-up-add': {
        text: '新增育成配置'
    },
    //订单处理
    "outstock": {
        text: '出库订单'
    },
    "imageConfig": {
        text: '配置图片'
    },
    "wechat-config": {
        text: '微信配置'
    },
    "results-rebates": {
        text: '业绩奖励设置'
    },
    "results-rebates-add": {
        text: '新增业绩奖励设置'
    },
    "results-rebates-edit": {
        text: '修改业绩奖励设置'
    },
    "trade-manage-menu": {
        text: '微信菜单'
    },
    "information-list": {
        text: '消息管理'
    },
    "information-edit": {
        text: '修改消息'
    },
    "information-add": {
        text: '新增消息'
    },
    "information-see": {
        text: '查看消息'
    },
    "wechat-model": {
        text: '微信模式配置'
    },
    'articleConfig': {
        text: '文章配置'
    },
    'articleEdite': {
        text: '修改文章'
    },
    'fission-poster': {
        text: '裂变海报'
    },
    'poster-add': {
        text: '新增裂变海报'
    },
    'poster-edit': {
        text: '修改裂变海报'
    },
    'agent-team': {
        text: '参加人员'
    },
    'audit-view': {
        text: '查看凭证'
    }
};
