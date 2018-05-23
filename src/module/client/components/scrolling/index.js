import Jquery from 'jquery'

const srolling = {}

srolling.install = function (Vue, options) {
  Vue.prototype.$scrolling = function (params) {
    window.onscroll = function() {
      if (!params.isFixed){
        let scrollBar     = document.body.scrollTop || document.documentElement.scrollTop;
        let elementTop    = Jquery('#content-top');
        let elementLiner  = Jquery('#liner');
        let elementSet    = Jquery('#setting');
        let parent        = Jquery('#panel');
        let elementTabs   = Jquery('.bi-tabs-slide');
        let elementTabsItem   = elementTabs.find('.bi-tabs-item');

        if(scrollBar > 50) {
          if (!elementTop.hasClass('fixed') || !elementLiner.hasClass('fixed') || !elementSet.hasClass('fixed')){
            elementTop.addClass('fixed');
            elementLiner.addClass('fixed');
            elementSet.addClass('fixed');
            if (parent.hasClass('left-panel-shrink')) {
              elementTop.css({'width':'calc(100% - 50px)', 'left':'50px'});
              if (parent.hasClass('right-panel-open')){
                elementTop.css({'width':'calc(100% - 250px)', 'right':'0'})
              }
            }else{
              elementTop.css({'width':'calc(100% - 200px)', 'left':'200px'})
            }
          }
        }
        else {
          elementTop.removeClass('fixed').css({'width':'100%', 'left':'0'});
          elementLiner.removeClass('fixed');
          elementSet.removeClass('fixed');
        }

        if (elementTabsItem){
          let obj       = [];
          let top       = [];
          let t         = '';
          [...elementTabsItem].some(function (item) {
            let _id         = Jquery(item).attr('targetid');
            let _top   = Jquery('#' + _id).offset().top - 105;
            obj.push(item);
            top.push(_top);
          })
          for (let i = 0; i < top.length; i++){
            if ( scrollBar > top[i] - 50){
              t = obj[i];
            }
          }
          if (t) {
            Jquery('.line').css('left', parseInt(Jquery(t)[0]['offsetLeft']) + 'px');
            Jquery(t).addClass('tabs-selected').siblings('.bi-tabs-item').removeClass('tabs-selected');
          }
        }
      }
    } //
  };


}
export default srolling;
