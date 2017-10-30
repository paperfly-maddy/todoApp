var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;

var TodoList = require('./TodoList');
var TodoEdit = require('./TodoEdit');

var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

ReactDOM.render(
  (
    <Router>
      <Route path="/todos" component={TodoList} />
      <Route path="/todos/:id" component={TodoEdit} />
      <Redirect from="/" to="/todos" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);
