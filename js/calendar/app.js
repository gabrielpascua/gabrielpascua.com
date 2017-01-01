function isHoliday(date) {
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
}

function getTense(date) {
    var now = new Date();
    var today = new Date((now.getMonth()+1) + '/' + now.getDate() + '/' + now.getFullYear());

    if(!date || !date.getTime){
      return '';
    }

    if(date.getTime() < today.getTime()){
      return 'past';
    }

    if(date.getTime() === today.getTime()){
      return 'present';
    }

    return 'future';
}

Vue.filter('date', function (date) {
  if(date && date.getDate){
    return date.getDate();
  }
  return date;
});

Vue.filter('inflect', function (date) {
  var properties = [];

  if(window.location.search.indexOf('?format=plain') < 0){
    properties.push(isHoliday(date));
    properties.push(getTense(date));
  }

  return properties.reduce(function(classes, property){
    if(property.length){
      classes += property + ' ';
    }
    return classes;
  }, '').trim();
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