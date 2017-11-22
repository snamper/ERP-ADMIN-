/* 
* @Author: Marte
* @Date:   2016-06-20 10:19:26
* @Last Modified by:   Marte
* @Last Modified time: 2016-06-20 10:46:16
*/
 $(function () {
    $("#btn-submit").bind("click", function () {
        $.ajax({
            url:"http://121.199.167.19/Api/ErpSaveTrialApply",
            data: { Name: $("#formName").val() },
            type="post";
            success: function (data) {
            $("ul").append("<li>用户名<b>  "+ $("#formName").val() + " </b>是<b> "+ data + " </b></li>");
            }
        });
    });

    ErpSaveTrialApply(一个类   xxx)
});


 $.ajax({
            type: "get",//数据发送的方式（post 或者 get）
            url: "http://121.199.167.19/Api/ErpSaveTrialApply",//要发送的后台地址
            data: {Name:"$("#formName").val()",Phone:"$("#formNum").val()"},//要发送的数据（参数）格式为{'val1':"1","val2":"2"}
            dataType: "json",//后台处理后返回的数据格式
            success: function (data) {//ajax请求成功后触发的方法
               alert('请求成功');
            },
            error: function (msg) {//ajax请求失败后触发的方法
                alert(msg);//弹出错误信息
            }
        });
});