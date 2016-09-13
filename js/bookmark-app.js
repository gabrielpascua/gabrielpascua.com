var utils = {
  sortAscending: function(item1,item2){
    var comparisonValue = item1.name.localeCompare(item2.name);
    if(comparisonValue < 0) {
      return -1
    }else if(comparisonValue > 0){
      return 1;
    }else{
      return 0;
    }
  },
  positionResults: function(){
    var domResults = document.querySelector('.bookmark-results');
    var listItems = domResults.getElementsByTagName('li');

    if(listItems.length){
      var searchBox = document.querySelector('.bookmark-search input[type="text"]');    
      domResults.style.display = 'block';
      domResults.style.left = searchBox.offsetLeft + 'px';
      domResults.style.width = searchBox.offsetWidth + 'px';      
    }else{
      domResults.style = null;
    }
  }
}

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
  detectPress: function(event){
    if(event.keyCode == 27){
      this.props.onSearch('');
    }
  },
  render: function(){
    return(
      <input type="text" placeholder="Search Bookmarks"
        value={this.props.term}        
        onChange={this.setSearchTerm}
        onKeyDown={this.detectPress} 
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
    // console.log('searchboxValue', searchboxValue);
    this.setState({
      searchTerm: searchboxValue
    });
  },
  render: function(){
    return(
      <div className="bookmark-search">
        {/* #1 */}                                           {/* #2 */}
        <LinkSearchBox term={this.state.searchTerm} onSearch={this.searchForLinksCallback} />        
        <LinkSearchResults filter={this.state.searchTerm} data={this.props.data} ref='searchResults' />    
      </div>
    );
  },
  componentDidUpdate: function(){
    utils.positionResults();    
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
    var maxResults = 5;
    for(var i=0, maxGroups=this.props.data.length; i<maxGroups; i++){
      var group = this.props.data[i];
      for(var j=0, maxLinks=group.links.length; j<maxLinks; j++){
        var link = group.links[j];
        var hasMatch = (regex.test(link.name) || regex.test(link.url));
        var belowLimit = result.length < maxResults; 
        if(hasMatch && belowLimit){
          result.push({
            group: group.name,
            text: link.name,
            href: link.url
          });           
        }
      }
    }
    
    return result;
  },
  render: function(){
    var results = this.props.filter.length ? this.searchData(this.props.filter) : [];    
    return(
      <div className="bookmark-results">
        <ul>
        {
          results.map(function(link, linkIndex){
            return( 
              <li key={linkIndex}>
                  <a href={link.href}><b>{link.group}</b> - {link.text}</a>
              </li>
            )
          })  
        }
        </ul>
      </div>
    );
  }
});

var LinkGroup = React.createClass({
  render: function(){
    var linkLists = this.props.data
      .sort(utils.sortAscending)
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
      .sort(utils.sortAscending)
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
    window.onresize = utils.positionResults;       
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
