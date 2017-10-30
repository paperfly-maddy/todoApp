var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('react-bootstrap/lib/Panel');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var TodoFilter = React.createClass({
  render: function() {
    console.log("Rendering TodoFilter, state=", this.state);
    return (
      <Panel collapsible defaultExpanded={true} header="Filter">
        <Grid fluid={true}>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <Input type="select" label="Priority" value={this.state.priority}
                onChange={this.onChangePriority}>
                <option value="">(Any)</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Input>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Input type="select" label="Status" value={this.state.status}
                onChange={this.onChangeStatus}>
                <option value="">(Any)</option>
                <option>New</option>
                <option>Complete</option>
                <option>Pending</option>
              </Input>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Input label="&nbsp;">
                <ButtonInput value="Search" bsStyle="primary" onClick={this.submit} />
              </Input>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  },

  getInitialState: function() {
    var initFilter = this.props.initFilter;
    return {status: initFilter.status, priority: initFilter.priority};
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.initFilter.status === this.state.status
        && newProps.initFilter.priority === this.state.priority) {
      console.log("TodoFilter: componentWillReceiveProps, no change");
      return;
    }
    console.log("TodoFilter: componentWillReceiveProps, new filter:", newProps.initFilter);
    this.setState({status: newProps.initFilter.status, priority: newProps.initFilter.priority});
  },

  onChangeStatus: function(e) {
    this.setState({status: e.target.value});
  },
  onChangePriority: function(e) {
    this.setState({priority: e.target.value});
  },

  submit: function(e) {
    var newFilter = {};
    if (this.state.priority) newFilter.priority = this.state.priority;
    if (this.state.status) newFilter.status = this.state.status;
    this.props.submitHandler(newFilter);
  }
});

module.exports = TodoFilter;
