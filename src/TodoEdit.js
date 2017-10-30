var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var Button  = require('react-bootstrap/lib/Button');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Alert = require('react-bootstrap/lib/Alert');

var TodoEdit = React.createClass({
  render: function() {
    var success = (
      <Alert bsStyle="success" onDismiss={this.dismissSuccess} dismissAfter={5000}>
        Todo saved to DB successfully.
      </Alert>
    );
    return (
      <div style={{maxWidth: 600}}>
        <Panel header={"Edit todo: " + this.props.params.id}>
          <form onSubmit={this.submit}>
            <Input type="select" label="Priority"
              value={this.state.priority} onChange={this.onChangePriority}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Input>
            <Input type="select" label="Status" value={this.state.status} onChange={this.onChangeStatus}>
              <option>New</option>
              <option>Complete</option>
              <option>Pending</option>
            </Input>
            <Input type="text" label="Title" value={this.state.title} onChange={this.onChangeTitle}/>
            <Input type="text" label="Note" value={this.state.note} onChange={this.onChangeNote}/>
            <ButtonToolbar>
              <Button type="submit" bsStyle="primary">Submit</Button>
              <Link className="btn btn-link" to="/todos">Back</Link>
            </ButtonToolbar>
          </form>
        </Panel>
        {this.state.successVisible ? success : null}
      </div>
    );
  },

  getInitialState: function() {
    return {successVisible: false};
  },

  componentDidMount: function() {
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    console.log("TodoEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
    if (this.props.params.id != prevProps.params.id) {
      this.loadData();
    }
  },

  loadData: function() {
    $.ajax('/api/todos/' + this.props.params.id) .done(function(todo) {
      this.setState(todo);
    }.bind(this));
  },

  onChangePriority: function(e) {
    this.setState({priority: e.target.value});
  },
  onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  onChangeNote: function(e) {
    this.setState({note: e.target.value});
  },
  onChangeTitle: function(e) {
    this.setState({title: e.target.value});
  },

  showSuccess: function() {
    this.setState({successVisible: true});
  },
  dismissSuccess: function() {
    this.setState({successVisible: false});
  },

  submit: function(e) {
    e.preventDefault();
    var todo = {
      status: this.state.status,
      priority: this.state.priority,
      note: this.state.note,
      title: this.state.title
    }

    $.ajax({
      url: '/api/todos/' + this.props.params.id, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(todo),
      dataType: 'json',
      success: function(todo) {
        this.setState(todo);
        this.showSuccess();
      }.bind(this),
    });
  }
});

module.exports = TodoEdit;
