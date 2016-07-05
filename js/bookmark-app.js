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
        <h3>
          <a href="#" className="collapse">{group.name}</a>
          <a href={'#' + group.id}>{group.name}</a>
        </h3>
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
