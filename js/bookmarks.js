$(function(){
  /* expand and collapse */
  $('.bookmark-row ul').after('<p><a href="#" class="openall">Open All Bookmarks</a></p>');
  $('.openall').on('click', function (e) {
    var $links = $(this).parent().siblings('ul').find('a');
    $links.each(function(index, value){
      window.open(value.href);
    });
  });
  $('.bookmark-row h3 a').on('click', function(){
    var active = $(this).attr('href') !== '#';
    if(active){
      $('.bookmark-row').addClass('inactive');
      $(this).closest('.bookmark-row').removeClass('inactive');
    }else{
      $('.bookmark-row').removeClass('inactive');
    }
  });

  /* autocomplete */
  function AutoCompleteResult(anchorTag){
    this.href = '';
    this.text = '';
    this.group = '';

    if(anchorTag){
      this.href = anchorTag.attr('href');
      this.text = anchorTag.text();
    }

    this.toHTML = function(){
      if(this.href === ''){
        return '<a href="#">No matching bookmark found.</a>';
      }else{
        return '<a href="' + this.href + '"><b>' + this.group + '</b> - ' + this.text + '</a>';
      }
    }
  }

  var dataset = [];
  $('.bookmark-row').each(function(){
    var row = $(this);
    var group = row.find('h3 a:first-child').text();
    row.find('li').each(function(){
      var li = $(this);
      li.find('a').each(function(){
        var ac = new AutoCompleteResult($(this));
        ac.group = group;
        dataset.push(ac);
      });
    });
  });

  var autocomplete = $('.bookmark-search input[type="text"]').focus();
  var bookmarkResults = $('.bookmark-results');

  function positionResults(e){
    if(e.keyCode === 27){
      bookmarkResults.html('').removeAttr('style');
    }else{
      bookmarkResults.css({
        display: 'block',
        left: autocomplete.position().left + 'px',
        width: autocomplete.outerWidth() + 'px'
      });
    }
  };

  autocomplete.on('keyup', function(e){
    var txt = $(this);
    var regex;
    var matches = dataset.filter(function(data){
      regex = new RegExp(txt.val(), 'ig');
      return regex.test(data.text) || regex.test(data.href);
    });
    if(!matches.length){
      matches.push(new AutoCompleteResult());
    }

    var results = '<ul>';
    for(var i=0; i<matches.length; i++){
      results += '<li>' + matches[i].toHTML() + '</li>';
    }
    results += '</ul>';

    bookmarkResults.html(results);
    positionResults(e);
  });

  $(document).on('keyup', function(e){
    positionResults(e);
  });

  window.onresize = positionResults;
});