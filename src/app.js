
require('expose?$!expose?jQuery!jquery');
// require('bootstrap-webpack');
require("bootstrap-webpack!./../bootstrap.config.js");
require('!style!css!less!./css/common.less');//加载公共样式
require('!style!css!less!./css/nprogress.css'); //加载进度条样式
require('!style!css!less!./newfont/iconfont.css');
var Vue = require('vue');
var VueRouter = require('vue-router');
var cookie = require('js-cookie');
var editor = require("vue-html5-editor");

// register filters 自定义过滤器  金额格式化，
var filters = require('./js/filters/filters');
var directives = require('./js/directives/directives');
//注册所有过滤器
Object.keys(filters).forEach(function(k) {
 Vue.filter(k, filters[k]);
});
//注册所有组件
// Object.keys(components).forEach(function (k) {
// 	Vue.component(k,components[k]());
// });
//注册所有指令
Object.keys(directives).forEach(function (k) {
	Vue.directive(k,directives[k]);
});

var App = Vue.extend(require('./app.vue'));
/*
    如果还想声明一个vue实例
	要放在 Vue.use(VueRouter); 之前
	因为当使用了 Vue.use(VueRouter)后，改写了 Vue 的实例化方法。
 */
//var newV = new Vue();//注意看上面说明

Vue.use(VueRouter);

var router = new VueRouter(
	{
	  hashbang: true,  //为true的时候 example.com/#!/foo/bar ， iconlse的时候 example.com/#/foo/bar
	  //abstract:true,  //地址栏不会有变化
	  //以下设置需要服务端设置
	  //history: iconlse,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
	  //saveScrollPosition: iconlse
	  linkActiveClass:'custom-active-class' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
	}
);

var store = require('./js/vuex/store');
var servers = require('./js/servers/servers');
var isObjectSame = require('./js/common').isObjectSame;
//获取菜单列表
var getNavList = function (callback) {
	servers.getAjax({
		url: '/Login/ErpGetUserMenu'
	}).done(function (result) {
		if(result.ResultCode == 1) {
			store.dispatch('UPDATENAVLISTS',result.Data.Data);
			callback();
		}
	})
};

var showTab = function (transition) {
	var tabOptions = require('./js/options/showTabs');
	if (transition.to.isShowInTab) {
		var navLists = transition.to.router.app.$store.state.login.navLists;
		var group = transition.to.group;
		var params = transition.to.params;
		var name = transition.to.name;
		var textFromServer = '';
		var textFromLocal = '';
		//如果此路由在菜单中,则取菜单中的文字
		navLists.forEach(function (firstNav) {
			var firstNavItem = firstNav.Sub;
			firstNavItem.forEach(function (secondNav) {
				var secondNavItem = secondNav.Sub;
				secondNavItem.forEach(function (thirdNav) {
					if (thirdNav.Path === transition.to.path) {
						textFromServer = thirdNav.Text;
					}
				});
			})
		});
		//从本地配置表中取文字,如果路由配置了group,则以group作为键值,否则以name作为键值
		if (group) {   //如果路由配置中存在group字段,则取对应组的文本,在配置表中,要以路由group字段对应的值作为键值
			textFromLocal = tabOptions[group] ? tabOptions[group].text : '无标题';
		} else if (Object.keys(params).length > 0) {   //否则,看路由是否存在参数,如果存在参数,则要取配置表中对应参数下的文本
			var theSameNameTextGroup = tabOptions[name] ? tabOptions[name].textGroup : [];
			theSameNameTextGroup.forEach(function (item) {
				if (isObjectSame(params,item.params)) {
					textFromLocal = item.text;
				}
			})
		} else {  //直接取text文本
			textFromLocal = tabOptions[name] ? tabOptions[name].text : '无标题';
		}
		store.dispatch('ADDTAB',{
			path: transition.to.path,
			name: name,
			params: params,
			query: transition.to.query,
			text: textFromServer || textFromLocal,
			group: group
		})
	}
};

router.beforeEach(function (transition) {
	// 非注册类页面关闭统计代码弹窗
	if (['register','account-information','register-next','register-success'].indexOf(transition.to.name) == -1) {
		var rogueBaidu = $('script');
		var ins = $('ins');
		for (var i = 0, len = rogueBaidu.length; i < len; i++) {
			var scriptSrc = rogueBaidu.eq(i).attr('src');
			if (scriptSrc && (scriptSrc.indexOf('baidu.com') || scriptSrc.indexOf('growing.qbox.me'))) {
				rogueBaidu.eq(i).remove();
			}
		}
		if (ins.length > 0) {
			ins.remove();
		}
	}
	if (transition.to.auth) {
		var navLists = transition.to.router.app.$store.state.login.navLists;  //菜单
		if (cookie.get('userName')) {
			if (!navLists || navLists.length == 0) {   //如果不存在菜单,则获取菜单
				getNavList(function () {
					showTab(transition);
					transition.next();
				})
			} else {
				showTab(transition);
				transition.next();
			}
		} else {
			var redirect = encodeURIComponent(transition.to.path);
			transition.redirect('/log/login?redirect=' + redirect);
		}

	} else {
		transition.next();
	}

});

require('./routers')(router);

router.start(App,'#app');
//
//new Vue({
//	el: 'html',
//	data: {
//		testtitle: 'lalala'
//	}
//})


Vue.use(editor, {
    //全局组件的名称
    name: "editor",
    //图片相关配置
    image: {
        //服务器上传地址
        //服务器需要返回json数据类似 {ok:iconlse,msg:"错误信息"} 或者 {ok:true,data:"图片地址"}
        server: null,
        //图片上传请求参数名称
        fieldName: "image",
        //大小限制,默认512k
        sizeLimit: 512 * 1024,
        //是否压缩,如果设置为iconlse,后面3个参数无用
        compress: true,
        //压缩后的最大宽度
        width: 1600,
        //压缩后的最大高度
        height: 1600,
        //jpeg质量
        quality: 80
    },
    //图标配置,编辑器默认使用fontawesome图标,可自定义图标的class进行配置
    icons: {
        //加粗
        bold: "iconfont icon-overstriking",
        //倾斜
        italic: "iconfont icon-tilt",
        //下划线
        underline: "iconfont icon-underline",
        //颜色
        color: "iconfont icon-pencil",
        //链接
        link: "iconfont icon-link",
        //取消链接
        unlink: "iconfont icon-chain-broken",
        //有序列表
        ol: "iconfont icon-list-ol",
        //无序列表
        ul: "iconfont icon-list-ul",
        //水平分隔线
        hr: "iconfont icon-minus",
        //表格
        table: "iconfont icon-table",
        //图片
        image: "iconfont icon-image",
        //格式清除
        eraser: "iconfont icon-eraser",
        //撤回
        undo: "iconfont icon-undo",
        //全屏
        fullScreen: "iconfont icon-arrows-alt"
    }
});
