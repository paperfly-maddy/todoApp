var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var TodoAdd = React.createClass({
  render: function() {
    //console.log("Rendering TodoAdd");
    return (
      <Panel header="Add Todo">
        <form name="todoAdd">
          <Input type="text" name="title" label="Todo Title" />
          <Input type="text" name="note" label="Note" />
          <ButtonInput value="Add" bsStyle="primary" onClick={this.handleSubmit} />
        </form>
      </Panel>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.todoAdd;
    this.props.addTodo({note: form.note.value, title: form.title.value, status: 'New', priority: 'Low'});
    // clear the form for the next input
    form.note.value = ""; form.title.value = "";
  }
});

module.exports = TodoAdd;
