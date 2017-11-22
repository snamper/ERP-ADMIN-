var propertyPageInfo = {
    size: {
        propertyTypeID: '00000000-0000-0000-0000-000000000022',
        text: '尺码',
        KeyName: 'sizeList',
        type: 3
    },
    color: {
        propertyTypeID: '00000000-0000-0000-0000-000000000021',
        text: '颜色',
        KeyName: 'colorList',
        type: 2
    },
    brand: {
        propertyTypeID: '00000000-0000-0000-0000-000000000011',
        text: '品牌',
        KeyName: 'brandList',
        type: 4
    },
    sex: {
        propertyTypeID: '00000000-0000-0000-0000-000000000013',
        text: '性别',
        KeyName: 'sexList',
        type: 5
    },
    season: {
        propertyTypeID: '00000000-0000-0000-0000-000000000012',
        text: '季节',
        KeyName: 'seasonList',
        type: 6
    }
};
//待处理订单状态
var customerOrderStatusConst = {
    empty: {
        code: [1],
        text: '未确认'
    },
    check: {
        code: [2],
        text: '已确认'
    },
    pick: {
        code: [3,4,5],
        text: '待发货'
    },
    scan: {
        code: [4],
        text: '待扫描'
    },
    weigh: {
        code: [5],
        text: '待称重'
    },
    callback: {
        code: [6],
        text: '待回写'
    },
    finish: {
        code: [7],
        text: '已完成'
    },
    exception: {
        code: [8],
        text: '问题单'
    },
    pause: {
        code: [9],
        text: '暂停'
    },
    lack: {
        code: [10],
        text: '缺货'
    },
    invalid: {
        code: [11],
        text: '取消'
    }
};

var deliveryFlag = {
    pick: {
        code: 90,
        text: '待扫描'
    },
    weigh: {
        code: 92,
        text: '待称重'
    },
    callback: {
        code: 100,
        text: '待回写'
    }
};

//退单状态
var reFundStatusCode = {
    'refund-all': {
        code: -1,
        text: '全部退单'
    },
    'refund-empty': {
        code: 1,
        text: '未确认'
    },
    'refund-confirm': {
        code: 2,
        text: '待收货'
    },
    'refund-receive': {
        code: 3,
        text: '已收货'
    },
    'refund-finish': {
        code: 4,
        text: '已完成' 
    },
    'refund-invalid': {
        code: 5,
        text: '取消'
    }
};
//拣货单状态
var outStockBatchCode = {
    'assort-pick-list-empty': {
        code: 1,
        text: '未确认'
    },
    'assort-pick-list-pick': {
        code: 2,
        text: '已拣货'
    },
    'assort-pick-list-finish': {
        code: 3,
        text: '已完成'
    },
    'assort-pick-list-invalid': {
        code: 4,
        text: '已取消'
    }
};
//消息管理
var megManageCode = {
    'meg-manage-list':{
        code:100,
        text:'处理中'
    },
    'meg-manage-pick':{
        code:200,
        text:'已到期'
    }
};
var allLinks = [
    {
        text: '登录',
        name: 'login',
        params: ''
    },
    {
        text: '找回密码',
        name: 'find-password',
        params: ''
    },
    {
        text: '商品分类',
        name: 'categories',
        params: ''
    },
    {
        text: '新增商品分类',
        name: 'category-edit',
        params: ''
    },
    {
        text: '员工',
        name: 'employees',
        params: ''
    },
    {
        text: '新建员工',
        name: 'employee-edit',
        params: ''
    },
    {
        text: '角色',
        name: 'role',
        params: ''
    },
    {
        text: '新增角色',
        name: 'role-edit',
        params: ''
    },
    {
        text: '快递公司',
        name: 'merchant-deliveries',
        params: ''
    },
    {
        text: '新建快递公司',
        name: 'merchant-delivery-edit',
        params: ''
    },
    {
         text: '新建仓库',
         name: 'entrepot-add',
         params: ''
    },
    {
        text: '新增库存调整单',
        name: 'inv-adjust-edit',
        params: ''
    },
    {
        text: '库存调整单',
        name: 'inv-adjust',
        params: ''
    },
    {
        text: '商品品牌',
        name: 'property-edit',
        params: 'brand'
    },
    {
        text: '商品尺码',
        name: 'property-edit',
        params: {
            propertyName: 'size'
        }
    },
    {
        text: '商品颜色',
        name: 'property-edit',
        params: {
            propertyName: 'color'
        }
    },
    {
        text: '商品性别',
        name: 'property-edit',
        params: {
            propertyName: 'sex'
        }
    },
    {
        text: '商品季节',
        name: 'property-edit',
        params: {
            propertyName: 'season'
        }
    },
    {
        text: '新增商品调仓单',
        name: 'transfer-stock-edit',
        params: ''
    },
    {
        text: '商品调仓单',
        name: 'transfer-stock',
        params: ''
    },
    {
        text: '采购入库单',
        name: 'instock',
        params: ''
    },
    {
        text: '新增采购入库单',
        name: 'instock-edit',
        params: ''
    },
    {
        text: '新增库存调整单',
        name: 'inv-adjust-edit',
        params: ''
    },
    {
        text: '库存调整单',
        name: 'inv-adjust-edit',
        params: ''
    },
    {
        text: '商品列表',
        name: 'merchant-list',
        params: ''
     },
     {
         text: 'sku 列表',
         name: 'sku-index',
         params: ''
      },
    {
        text: '订单管理',
        name: 'empty',
        params: ''
    },
    {
        text: '缺货配货',
        name: 'assort-lack',
        params: ''
    },
    {
        text: '通知配货',
        name: 'assort-circular',
        params: ''
    },
    {
        text: '淘宝退单管理',
        name: 'sell-taobaoquit',
        params: ''
    },
    {
        text: '淘宝订单管理',
        name: 'sell-taobaoindent',
        params: ''
    },
    {
        text: '淘宝SKU管理',
        name: 'sell-taobaosku',
        params: ''
    },
    {
        text: '淘宝商品管理',
        name: 'sell-taobaoshop',
        params: ''
    },
    {
        text: '缺货配货订单',
        name: 'sell-stockout',
        params: ''
    },
    {
        text: '通知配货订单',
        name: 'sell-otice',
        params: ''
    },
    {
        text: '待拣货订单',
        name: 'sell-picking',
        params: ''
    },
    {
        text: '修改拣货单',
        name: 'sell-alterPicking',
        params: ''
    },
    {
        text: '拣货单列表',
        name: 'sell-pickinglist',
        params: ''
    },
    {
        text: '商品列表',
        name: 'sell-catalogue',
        params: ''
    },
    {
        text: '配置SKU',
        name: 'sell-deploy',
        params: ''
    },
    {
        text: '称重出库',
        name: 'sell-category',
        params: ''
    },

    {
        text: '扫描出库',
        name: 'sell-scanning',
        params: ''
    },
    {
        text: '商品分类',
        name: 'categories',
        params: ''
    },
    {
        text: '店铺列表',
        name: 'commodity-index',
        params: ''
    },
    {
        text: '仓库货位管理',
        name: 'storage-space',
        params: ''
    },
    {
        text: '商品货位管理',
        name: 'storage-query',
        params: ''
    },
];

module.exports = {
    allLinks: allLinks,
    propertyPageInfo: propertyPageInfo,
    customerOrderStatusConst: customerOrderStatusConst,
    reFundStatusCode: reFundStatusCode,
    outStockBatchCode: outStockBatchCode,
    deliveryFlag: deliveryFlag,
    megManageCode:megManageCode

};
