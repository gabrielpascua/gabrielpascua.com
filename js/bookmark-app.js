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

function AutoCompleteItem(){
  this.href = '';
  this.text = '';
  this.group = '';
}

var AutoCompleteResult = React.createClass({
  render: function(autocompleteItem){
    if(!autocompleteItem){
      return (<a href="#">No matching bookmark found.</a>);
    }else{
      return (<a href={autocompleteItem.href}><b>{autocompleteItem.group}</b> - {autocompleteItem.text}</a>);
    }
  }
});

/* Parent - Child callback interaction */
// 1. LinkSearchBox loads default term from LinkSearch state 
// 2. LinkSearcher assigns searchForLinksCallback function as a property to LinkSearchBox
// 3. From LinkSearchbox onChange is triggered when users type something and executes the callback
// 4. callback function from LinkSearcher gets the value from LinkSearchBox and set it on it's own state
// 5. LinkSearchbox text value gets updated as user types

var LinkSearchBox = React.createClass({
  // # 3
  setSearchTerm: function(event){
    this.props.onSearch(event.target.value);
  },
  render: function(){
    return(
      <input type="text" placeholder="Search Bookmarks"
        value={this.props.term}        
        onChange={this.setSearchTerm} 
      />
    );
  }
});

var LinkSearcher = React.createClass({
  getInitialState: function(){
    return {
      searchTerm: ''
    };
  },
  ///# 4
  searchForLinksCallback: function(searchboxValue){
    this.setState({
      searchTerm: searchboxValue
    });
  },
  render: function(){
    return(
      <div className="bookmark-search">
        {/* #1 */}                                           {/* #2 */}
        <LinkSearchBox term={this.state.searchTerm} onSearch={this.searchForLinksCallback}/>
        <div className="bookmark-results">
          <LinkSearchResults filter={this.state.searchTerm} data={this.props.data} />
        </div>
      </div>
    );
  }
});

var LinkSearchResults = React.createClass({
  getInitialState: function(){
    return { results: [] };
  },
  getDefaultProps: function(){
    return { data: [] };
  },
  searchData: function(filter){
    var regex = new RegExp(filter, 'ig');
    var result = [];
    
    this.props.data.forEach(function(group){
      group.links.forEach(function(link){
        if(regex.test(link.name) || regex.test(link.url)){
          result.push({
            group: group.name,
            text: link.name,
            href: link.url
          });
        };
      });
    });
    
    return result;
  },
  render: function(){
    var results = this.props.filter.length ? this.searchData(this.props.filter) : [];    
    return(
      <ul>
      {
        results.map(function(link, linkIndex){
          return( 
            <li key={linkIndex}>
                <a href={link.href}><b>link.group</b> - {link.text}</a>
            </li>
          )
        })  
      }
      </ul>
    );
  }
});

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

var LinkGroupOpener = React.createClass({
  getInitialState: function(){
    return { links: [] }
  },
  handleClick : function(evt){
    this.props.links.map(function(link){
      window.open(link.url);
    });
  },
  render: function(){
    return(
      <p>
        <a href="#" className="openall" onClick={this.handleClick}>Open All Bookmarks</a>
      </p>
    );
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
        <LinkGroupOpener links={group.links} />
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
        // function AutoCompleteResult(anchorTag){
        //   this.href = '';
        //   this.text = '';
        //   this.group = '';

        //   if(anchorTag){
        //     this.href = anchorTag.attr('href');
        //     this.text = anchorTag.text();
        //   }

        //   this.toHTML = function(){
        //     if(this.href === ''){
        //       return '<a href="#">No matching bookmark found.</a>';
        //     }else{
        //       return '<a href="' + this.href + '"><b>' + this.group + '</b> - ' + this.text + '</a>';
        //     }
        //   }
        // }

        // var dataset = [];
        // $('.bookmark-row').each(function(){
        //   var row = $(this);
        //   var group = row.find('h3 a:first-child').text();
        //   row.find('li').each(function(){
        //     var li = $(this);
        //     li.find('a').each(function(){
        //       var ac = new AutoCompleteResult($(this));
        //       ac.group = group;
        //       dataset.push(ac);
        //     });
        //   });
        // });

        // var autocomplete = $('.bookmark-search input[type="text"]').focus();
        // var bookmarkResults = $('.bookmark-results');

        // function positionResults(e){
        //   if(e.keyCode === 27){
        //     bookmarkResults.html('').removeAttr('style');
        //   }else{
        //     bookmarkResults.css({
        //       display: 'block',
        //       left: autocomplete.position().left + 'px',
        //       width: autocomplete.outerWidth() + 'px'
        //     });
        //   }
        // };

        // autocomplete.on('keyup', function(e){
        //   var txt = $(this);
        //   var regex;
        //   var matches = dataset.filter(function(data){
        //     regex = new RegExp(txt.val(), 'ig');
        //     return regex.test(data.text) || regex.test(data.href);
        //   });
        //   if(!matches.length){
        //     matches.push(new AutoCompleteResult());
        //   }

        //   var results = '<ul>';
        //   for(var i=0; i<matches.length; i++){
        //     results += '<li>' + matches[i].toHTML() + '</li>';
        //   }
        //   results += '</ul>';

        //   bookmarkResults.html(results);
        //   positionResults(e);
        // });

        // $(document).on('keyup', function(e){
        //   positionResults(e);
        // });

        // window.onresize = positionResults;
  },
  render: function(){
    return (
      <div>
        <LinkSearcher data={this.state.data}/ >
        <LinkGroup data={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <BookmarkApp url="/data/bookmarks.json" />,
  document.getElementById('bookmarks')
);
