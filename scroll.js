/**
 * Created by Administrator on 2016/8/25.
 * author ：@luhan
 */
    function scroll(){ //各参数含义node-需要滑动的元素，time-滑动时间间隔，speed-滑动速度，nav-自定义导航标放置的容器，默认为滑动元素父元素下
        var con = {
            node:'',
            nav:'',
            time : '5000',
            speed :'1000',
            scrollAuto : true
        };
        var parent = '',child = '',cLen = 0,pw = 0,cw = 0,w = 0,num = 0,pageIndex = 0,scr_nav = '',s = '';
        console.log(parent+','+child+','+cLen+','+pw+','+cw+','+w+','+num+','+pageIndex);

        this.init = function(obj){
            for(var i in obj){
                con[i] = obj[i];
            }
        };
        this.start = function(){
            parent = $(con.node).parent();
            child = $(con.node).children();
            cLen = child.length;
            pw = parent.width();
            cw = $(child).width();
            w = cLen * cw;
            num = w/pw % 1 == 0 ? parseInt(w/pw) : parseInt(w/pw) + 1;

            $(con.node).width(w);
            if(num <= 1 && con.scrollAuto == false){
                return;
            }

            ////
            var ul = $('<ul></ul>');
            ul.addClass('scr_nav');
            ul.css({'width':num*(10+2*4)});
            for(var i = 0;i < num;i++){
                var li = $('<li style="width:8px;height:8px;margin:0 4px;"></li>');
                ul.append(li);
            }
            if(con.nav != undefined && con.nav != ''){
                $(con.nav).append(ul);
                scr_nav = $(con.nav).find('.scr_nav>li');
            }else if(con.nav == 'none'){

            }else{
                $(parent).append(ul);
                scr_nav = $(parent).find('.scr_nav>li');
            }

            scr_nav.eq(pageIndex).addClass('on').siblings().removeClass('on');

            $(scr_nav).on('click',function(){
                pageIndex = $(this).index();
                move(-pw*(pageIndex),pageIndex);
            });
            /////

            $(parent).hover(function(){
                clearInterval(s);
            },function(){
                s = setInterval(function(){
                    if(con.scrollAuto == false){
                        clearInterval(s);
                        return;
                    }

                    if(pageIndex < num - 1){
                        pageIndex++;
                        move(-pw*pageIndex,pageIndex);
                    }else{
                        pageIndex = 0;
                        move(0,pageIndex);
                    }
                },con.time);
            }).trigger("mouseleave");
        };
        this.stop = function(){
            con.scrollAuto = false;
        };

        this.oneTimeScroll = function(direction){//director仅代表正反方向
            switch(direction){
                case '-1':
                    if(pageIndex > 0){
                        pageIndex--;
                    }else{
                        return;
                    }
                    break;
                case '1':
                    if(pageIndex < num - 1){
                        pageIndex++;
                    }else{
                        return;
                    }
                    break;
            }
            move(-pw*pageIndex,pageIndex);
        };

        function move(x,y){
            $(con.node).animate({'left':x},con.speed);
            scr_nav.eq(y).addClass('on').siblings().removeClass('on');
        }
    }
//    var Scroll = new scroll();
////scroll
