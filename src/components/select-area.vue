<template>
    <select v-model="stateModel" class="form-control">
        <option value="{name: '',regionID: ''}">不限</option>
        <option v-for="stateList in stateLists" :value="{name:stateList.Name,regionID:stateList.RegionID}" :selected="state == stateList.Name || stateId == stateList.RegionID">{{stateList.Name}}</option>
    </select>
    <select v-model="cityModel" class="form-control" v-if="options.isShowCity" >
        <option value="{name: '',regionID: ''}">不限</option>
        <option v-for="cityList in cityLists" :value="{name:cityList.Name,regionID:cityList.RegionID}" :selected="city == cityList.Name || cityId == cityList.RegionID">{{cityList.Name}}</option>
    </select>
    <select v-model="districtModel" class="form-control" v-if="options.isShowDistrict">
        <option value="{name: '',regionID: ''}">不限</option>
        <option v-for="districtList in districtLists" :value="{name:districtList.Name,regionID:districtList.RegionID}" selected="district == districtList.Name || districtId == districtList.RegionID">{{districtList.Name}}</option>
    </select>
    <!--<div>{{state,city,district}}</div>-->
</template>

<script>
    var servers = require('../js/servers/servers');
    module.exports = {
        props: ['state','city','district','options','stateId','cityId','districtId'],
        data: function () {
            return {
                stateLists: [],
                cityLists: [],
                districtLists: [],
                stateModel: {
                    name: '',
                    regionID: ''
                },
                cityModel: {
                    name: '',
                    regionID: ''
                },
                districtModel: {
                    name: '',
                    regionID: ''
                },
//                isEditFirstIn: true,
                isStateFirstIn: true,  //是否首次进入
                isCityFirstIn: true,
                isDistrictFirstIn: true,
                isDistrictSecondIn: true
            }
        },
        methods: {
            /**
             * 获取地区信息
             * @param pID  {string} 上级ID
             * @param callback {function} 回调函数
             */
            getRegionList: function (pID, callback) {
                servers.postAjax({
                    url: '/BaseLookup/GetRegionList',
                    data: {
                        parentID: pID
                    }
                }).done(function (result) {
//                    var regionData = result.Data;
//                    console.log(result.Data);
                    callback(result.Data);
                })
            },
            //获取省份信息
            getState: function (callback) {
                var self = this;
                this.getRegionList('00000000-0000-0000-0000-000000010001',function (regionData) {
                    var stateLists = self.stateLists = regionData;
                    stateLists.forEach(function (stateObj) {
                        if (self.state == stateObj.Name || self.stateId == stateObj.RegionID) {
                            self.stateModel = {
                                name: stateObj.Name,
                                regionID: stateObj.RegionID
                            };
                        }
                    });
                });
            },
            //获取城市信息
            getCity: function (stateModel) {
                var self = this;
                self.cityModel = {
                    name: '',
                    regionID: ''
                };
                self.cityLists = [];
                if ( this.options.isShowCity && stateModel.regionID ) {
                    this.getRegionList(stateModel.regionID,function (regionData) {
                        var cityList = self.cityLists = regionData;
                        cityList.forEach(function (cityObj) {
                            if (self.city == cityObj.Name || self.cityId == cityObj.RegionID) {
                                self.cityModel = {
                                    name: cityObj.Name,
                                    regionID: cityObj.RegionID
                                };
                            }
                        });
                    });
                }
            },
            //获取地区信息
            getDistrict: function (cityModel) {
                var self = this;
                self.districtModel = {
                    name: '',
                    regionID: ''
                };
                self.districtLists = [];
                if (this.options.isShowDistrict && cityModel.regionID) {
                    this.getRegionList(cityModel.regionID,function (regionData) {
                        var districtLists = self.districtLists = regionData;
                        districtLists.forEach(function (districtObj) {
                            if (self.district == districtObj.Name || self.districtId == districtObj.RegionID ) {
                                self.districtModel = {
                                    name: districtObj.Name,
                                    regionID: districtObj.RegionID
                                };
                            }
                        })
                    })
                }
            },
//            init: function () {
//                if (this.isEditFirstIn) {
//                    this.getState();
//                    this.isEditFirstIn = false;
//                }
//            }
        },
        ready: function () {
            //初始化,获取省份信息
            if (typeof(this.options) == 'undefined') {
                this.options = {
                    isShowDistrict: true,
                    isShowCity: true
                }
            }
            this.getState();
        },
        watch: {
//            'state': function (state) {
//                if (state && this.isEditFirstIn) {
//                    this.isEditFirstIn = false;
//                    this.getState();
//                } else {
//                    return ;
//                }
//            },
//            'stateId': function (stateId) {
//                if (stateId && this.isEditFirstIn) {
//                    this.isEditFirstIn = false;
//                    this.getState();
//                } else {
//                    return ;
//                }
//            },
            'stateModel': function (stateObj) {
//                console.log('state');
//                if (this.isEditFirstIn) {
//                    return ;
//                }
                if (stateObj.name) {
                    this.getCity(stateObj);
                }
                this.state = stateObj.name;
                this.stateId = stateObj.regionID;
            },
            'cityModel': function (cityObj) {
//                console.log('city');
//                if (this.isEditFirstIn) {
//                    return ;
//                }
                if (cityObj.name) {
                    this.getDistrict(cityObj);
                }
                if (this.isCityFirstIn) {
                    this.isCityFirstIn = false;
                } else {
                    this.city = cityObj.name;
                    this.cityId = cityObj.regionID;
                }
            },
            'districtModel': function (districtObj) {
//                console.log('district');
//                if (this.isEditFirstIn) {
//                    return ;
//                }
                if (this.isDistrictFirstIn) {
                    this.isDistrictFirstIn = false;
                } else {
                    this.district = districtObj.name;
                    this.districtId = districtObj.regionID;
                }
            }
        },
        computed: {
//            'stateModel': {
////                get: function (val) {
//////                    console.log(val);
////                },
//                set: function (stateObj) {
//                    console.log('state');
//                    this.getCity(stateObj);
//                    if (this.isStateFirstIn) {
//                        this.isStateFirstIn = false;
//                    } else {
//                        this.state = stateObj.name;
//                        this.stateId = stateObj.regionID;
//
//                    }
////                    this.getCity(stateObj);
//
////                    this.stateModel = stateObj;
////                    return stateObj;
//                }
//            },
//            'cityModel': {
//                set: function (cityObj) {
//                    console.log('city');
//                    this.getDistrict(cityObj);
//                    if (this.isCityFirstIn) {
//                        this.isCityFirstIn = false;
//                    } else {
//                        this.city = cityObj.name;
//                        this.cityId = cityObj.regionID;
//                    }
////                    return cityObj;
//                }
//            },
//            'districtModel': {
//                set: function (districtObj) {
//                    console.log('district');
//                    if (this.isDistrictFirstIn) {
//                        this.isDistrictFirstIn = false;
//                    } else if (this.isDistrictSecondIn){
//                        this.isDistrictSecondIn = false;
//                    } else {
//                        this.district = districtObj.name;
//                        this.districtId = districtObj.regionID;
//                    }
////                    return districtObj;
//                }
//            }
        },
        events: {
            'resetArea': function () {
                this.stateModel = {
                    name: '',
                    regionID: ''
                };
                this.cityModel = {
                    name: '',
                    regionID: ''
                };
                this.districtModel = {
                    name: '',
                    regionID: ''
                }
            },
            'newProp': function () {
                this.isStateFirstIn = true;  //是否首次进入
                this.isCityFirstIn = true;
                this.isDistrictFirstIn = true;
                this.isDistrictSecondIn = true;
                this.getState();

            }
        }
//        watch: {
//            'state': function (val) {
//                this.getState();
//            }
//        }
    }
</script>

<style rel="stylesheet/less" lang="less">

</style>