var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var TodoFilter = require('./TodoFilter');
var TodoAdd = require('./TodoAdd');

var TodoRow = React.createClass({
  render: function() {
    //console.log("Rendering TodoRow:", this.props.todo);
    return (
      <tr>
        <td>
          <Link to={'/todos/' + this.props.todo._id}>{this.props.todo._id}</Link>
        </td>
        <td>{this.props.todo.title}</td>
        <td>{this.props.todo.note}</td>
        <td>{this.props.todo.priority}</td>
        <td>{this.props.todo.status}</td>
      </tr>
    )
  }
});

var TodoTable = React.createClass({
  render: function() {
    //console.log("Rendering todo table, num items:", this.props.todos.length);
    var todoRows = this.props.todos.map(function(todo) {
      return <TodoRow key={todo._id} todo={todo} />
    });
    return (
      <table className="table table-striped table-bordered table-condensed">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Note</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todoRows}
        </tbody>
      </table>
    )
  }
});

var TodoList = React.createClass({
  getInitialState: function() {
    return {todos: []};
  },
  render: function() {
    console.log("Rendering TodoList, num items:", this.state.todos.length);
    return (
      <div>
        <h1>Todo Application by Mahesh Patil</h1>
        <TodoFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
        <TodoTable todos={this.state.todos}/>
        <TodoAdd addTodo={this.addTodo} />
      </div>
    )
  },

  componentDidMount: function() {
    console.log("TodoList: componentDidMount");
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority &&
        oldQuery.status === newQuery.status) {
      console.log("TodoList: componentDidUpdate, no change in filter, not updating");
      return;
    } else {
      console.log("TodoList: componentDidUpdate, loading data with new filter");
      this.loadData();
    }
  },

  loadData: function() {
    var query = this.props.location.query || {};
    var filter = {priority: query.priority, status: query.status};

    $.ajax('/api/todos', {data: filter}).done(function(data) {
      this.setState({todos: data});
    }.bind(this));
    // In production, we'd also handle errors.
  },

  changeFilter: function(newFilter) {
    this.props.history.push({search: '?' + $.param(newFilter)});
  },

  addTodo: function(todo) {
    console.log("Adding todo:", todo);
    $.ajax({
      type: 'POST', url: '/api/todos', contentType: 'application/json',
      data: JSON.stringify(todo),
      success: function(data) {
        var todo = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var todosModified = this.state.todos.concat(todo);
        this.setState({todos: todosModified});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding todo:", err);
      }
    });
  }
});

module.exports = TodoList;
