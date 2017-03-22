var Dated = (function(){
  return new function(){
    var fn = this;    
    fn.simplify = function(){
      var date = this;
      if(date && date.getDate){
        return (date.getMonth()+1) + '/' + 
                date.getDate() + '/' + 
                date.getFullYear() ;
      }
      return '';
    };
    fn.mark = function(markedDates){
      var dt = fn.simplify.call(this);
      if(dt){
        var match = markedDates.filter(function(markedDate){
          return markedDate.date === dt;
        });
        return match.length ? match[0].label : '';
      }
      return '';
    }
  }
})();

function markDates(date){
  var dates = [
      {date:'1/2/2017', label:'holiday'},
      {date:'1/16/2017', label:'holiday'},
      {date:'2/20/2017', label:'holiday'},
      {date:'5/29/2017', label:'holiday'},
      {date:'7/3/2017', label:'holiday'},
      {date:'7/4/2017', label:'holiday'},
      {date:'9/4/2017', label:'holiday'},
      {date:'10/9/2017', label:'holiday'},
      {date:'11/23/2017', label:'holiday'},
      {date:'11/24/2017', label:'holiday'},
      {date:'12/25/2017', label:'holiday'},
      {date:'1/24/2017', label:'sick'},
      {date:'3/15/2017', label:'personal'},
      {date:'3/20/2017', label:'personal'}
  ];
  return Dated.mark.call(date, dates);
}

function getTense(date) {
    var today = new Date(Dated.simplify.call(new Date()));

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

  if(window.location.search.indexOf('format=plain') < 0){
    properties.push(getTense(date));
  }

  if(window.location.search.indexOf('mark=true') >= 0){
    properties.push(markDates(date));
  }

  return properties.reduce(function(classes, property){
    if(property.length){
      classes += property + ' ';
    }
    return classes;
  }, '').trim();
});

var start = '1/1/2017';
new Vue({
  el: '#calendar',
  data: {
    calendar: (function(){
      var cal = new CaLLendar(start);
      cal.setLast();
      return cal.toGrid();
    })(),
    year: (new Date(start)).getFullYear()
  }
})