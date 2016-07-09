function sortAscending(item1,item2){
  var comparisonValue = item1.name.localeCompare(item2.name);
  if(comparisonValue < 0) {
    return -1
  }else if(comparisonValue > 0){
    return 1;
  }else{
    return 0;
  }
}

var LinkGroup = React.createClass({
  render: function(){
    var linkLists = this.props.data
      .sort(sortAscending)
      .map(function(group, idx){
        return (<LinkList data={group} key={idx} />);
      });

    return (<div className="bookmark-container">{linkLists}</div>);
  }
});

var LinkList = React.createClass({
  render: function(){
    var group = this.props.data;

    var links = group.links
      .sort(sortAscending)
      .map(function(link, idx){
        return (<li key={idx}><Link url={link.url} label={link.name} /></li>);
      });

    return(
      <div className="bookmark-row" id={group.id}>
        <label htmlFor={group.id + '-radio'}>{group.name}</label>
        <input type="checkbox" id={group.id + '-radio'} name="checkbox-accordion" />        
        <ul>{links}</ul>
      </div>
    );
  }
});

var Link = React.createClass({
  render: function(){
    return(
      <a href={this.props.url}>{this.props.label}</a>
    )
  }
});

var BookmarkApp = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  componentDidUpdate: function(){
        //TODO Clean this up
        //How do you break this up???
        $('.bookmark-row ul').after('<p><a href="#" class="openall">Open All Bookmarks</a></p>');
        $('.openall').on('click', function (e) {
          var $links = $(this).parent().siblings('ul').find('a');
          $links.each(function(index, value){
            window.open(value.href);
          });
        });
        // $('.bookmark-row label').on('click', function(){
        //   var active = $(this).attr('href') !== '#';
        //   if(active){
        //     $('.bookmark-row').addClass('inactive');
        //     $(this).closest('.bookmark-row').removeClass('inactive');
        //   }else{
        //     $('.bookmark-row').removeClass('inactive');
        //   }
        // });

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
  },
  render: function(){
    return (
      <LinkGroup data={this.state.data} />
    );
  }
});

ReactDOM.render(
  <BookmarkApp url="/data/bookmarks.json" />,
  document.getElementById('bookmarks')
);
