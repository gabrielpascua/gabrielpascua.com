Vue.filter('isHoliday', function (date) {
    //TODO Extract
    var holidays = [
      '1/2/2017',
      '1/16/2017',
      '2/20/2017',
      '5/29/2017',
      '7/3/2017',
      '7/4/2017',
      '9/4/2017',
      '10/9/2017',
      '11/23/2017',
      '11/24/2017',
      '12/25/2017',
    ];

    var dt;
    if(date && date.getDate){
      dt = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
      return holidays.indexOf(dt) > -1 ? 'holiday' : '';
    }

    return '';
});

Vue.filter('date', function (date) {
  if(date && date.getDate){
    return date.getDate();
  }
  return date;
});

new Vue({
  el: '#calendar',
  data: {
    calendar: (function(){
      var cal = new CaLLendar('1/1/2017');
      cal.setLast();
      return cal.toGrid();
    })()
  }
})