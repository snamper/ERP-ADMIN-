module.exports = {
    params: ['parent','range'],
    bind: function () {
        var self = this;
        var el = $(this.el);
        var dialogInstace , onMoveStartId , mousePos = {x:0,y:0};	//	用于记录当前可拖拽的对象
        var range = this.params.range || '.modal';
        self.el.style.cursor = 'all-scroll';
        //	Dialog实例化的方法
        function Dialog(){
            var instace = {} ;
            instace.dragElement  = $(self.el);	//	允许执行 拖拽操作 的元素
            instace.mouseOffsetLeft = 0;			//	拖拽操作时，移动元素的起始 X 点
            instace.mouseOffsetTop = 0;			//	拖拽操作时，移动元素的起始 Y 点
            instace.dragElement.on('mousedown',function(e){
                if (!instace.moveElement) {
                    instace.moveElement  = el.parents(self.params.parent).eq(0);	//	拖拽操作时，移动的元素
                }
                var e = e || window.event;
                mousePos.x = e.clientX;
                mousePos.y = e.clientY;
                dialogInstace = instace;
                instace.mouseOffsetLeft = e.pageX - instace.moveElement.position().left ;
                instace.mouseOffsetTop  = e.pageY - instace.moveElement.position().top;
                onMoveStartId = setInterval(onMoveStart,50);
                return false;
            });
            return instace;
        }
        //	在页面中侦听 鼠标弹起事件
        $(document).on('mouseup',range,function (e) {
            dialogInstace = false;
            clearInterval(onMoveStartId);
        });
        $(document).on('mousemove',range,function (e) {
            var e = window.event || e;
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;

            e.stopPropagation && e.stopPropagation();
            e.cancelBubble = true;
            e = this.originalEvent;
            e && ( e.preventDefault ? e.preventDefault() : e.returnValue = false );

            document.body.style.MozUserSelect = 'none';
        });

        function onMoveStart(){
            var instace = dialogInstace;
            if (instace) {
                instace.moveElement.css({
                    'left': mousePos.x - instace.mouseOffsetLeft,
                    'top': mousePos.y - instace.mouseOffsetTop
                });
            }

        }

        Dialog();
    },
};