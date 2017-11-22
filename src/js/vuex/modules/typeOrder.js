var state = {
    isManualChangeStock: false,  //是否手动更改仓库
    isManualChangeLinkMan: false, //是否手动更改联系人
    isManualChangeMobile: false,  //是否手动更改手机
    isManualChangePhone: false, //是否手动更改电话
    isManualChangeAddress: false, //是否手动更改地址
//                isShowSelectArea: true,
    baseLookUp: {
        sellerFlags: [],  //淘宝旗帜
        stockLists: [],   //仓库
        merchantDeliveryLists: [],  //快递公司
        PayModel: [], //支付方式
        ChannelList: [], //渠道
        ShopList: [], //店铺
        channelList: [], //网店平台
        customerOrderType: [] //获取订单类型
    },
    customerOrderItem: {
        OutSheetID: '',
        BuyerNick: '',
        PayModeDesc: '',
        PayMode: '',
        Country:'',//新增国家
        State: '',
        City: '',
        District: '',
        Address: '',
        LinkMan: '',
        OrderItems: [],
        ShopID: '',
        StockID: '',
        PayTime: new Date(),
        OrderType: '',
        Phone: '',
        Mobile: '',
        Shop: {
            Name: '',
//                        NetShop: {
//                            Channel: {
//                                Name: ''
//                            }
//                        }
        },
        OrderDetail: {
            AlipayNo: '',
            ZipCode: ''
        },
        OrderBusiness: {
            BuyerMemo: '',
            SellerFlag: '',
            SellerMemo: ''
        },
        Stock: {
            StockID: ''
        },
        OrderFlag: {
            MerchantDeliveryID: '',
            DeliverySheetID: '',
            MerchantDelivery: {
                LinkMan: '',
                LinkTel: '',
                Name: ''
            }
        }
    }
};
var mutations = {
    UPDATETYPEORDERISMANUALCHANGESTOCK: function (state, isManualChangeStock) {
        state.isManualChangeStock = isManualChangeStock;
    },
    UPDATETYPEORDERISMANUALCHANGELINKMAN: function (state, isManualChangeLinkMan) {
        state.isManualChangeLinkMan = isManualChangeLinkMan;
    },
    UPDATETYPEORDERISMANUALCHANGEMOBILE: function (state, isManualChangeMobile) {
        state.isManualChangeMobile = isManualChangeMobile;
    },
    UPDATETYPEORDERISMANUALCHANGEPHONE: function (state, isManualChangePhone) {
        state.isManualChangePhone = isManualChangePhone;
    },
    UPDATETYPEORDERISMANUALCHANGEADDRESS: function (state, isManualChangeAddress) {
        state.isManualChangeAddress = isManualChangeAddress;
    },
    UPDATETYPEORDERBASELOOKUP: function (state, baseLookUp) {
        state.baseLookUp = baseLookUp;
    },
    UPDATETYPEORDERCUSTOMERORDERITEM: function (state, customerOrderItem) {
        state.customerOrderItem = customerOrderItem;
    },
    RESETCUSTOMERORDERITEM: function (state) {
        state.customerOrderItem = {
            OutSheetID: '',
            BuyerNick: '',
            PayModeDesc: '',
            PayMode: '',
            Country:'',
            State: '',
            City: '',
            District: '',
            LinkMan: '',
            Address: '',
            OrderItems: [],
            ShopID: '',
            StockID: '',
            PayTime: new Date(),
            OrderType: '',
            Phone: '',
            Mobile: '',
            Shop: {
                Name: '',
//                        NetShop: {
//                            Channel: {
//                                Name: ''
//                            }
//                        }
            },
            OrderDetail: {
                AlipayNo: '',
                ZipCode: ''
            },
            OrderBusiness: {
                BuyerMemo: '',
                SellerFlag: '',
                SellerMemo: ''
            },
            Stock: {
                StockID: ''
            },
            OrderFlag: {
                MerchantDeliveryID: '',
                DeliverySheetID: '',
                MerchantDelivery: {
                    LinkMan: '',
                    LinkTel: '',
                    Name: ''
                }
            }
        }
    }
};
module.exports = {
    state: state,
    mutations: mutations
};