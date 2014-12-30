'use-strict';
var React = require('react/addons');
var FieldMixin = require('./FieldMixin');
var _ = require('lodash');
var Queue = require('./EventQueue');
var EditorToggle = require('./EditorToggle');

module.exports = React.createClass({

  displayName: 'Checkable',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]).isRequired,
    isFieldGroup: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    helpText: React.PropTypes.string,
    required: React.PropTypes.bool
  },

  mixins: [FieldMixin],

  getDefaultProps: function(){
    return {
      componentType: 'field'
    };
  },

  getInitialState: function(){    
    return {
      checked: !!this.props.checked
    };
  },

  /**
   * Because radios and checkboxes only submit their value if they are checked,
   * we must inspect the "checked" state of the input and choose whether or not
   * to send its value. 
   * 
   * @param {object} e - event object
   * @fires field:value:change
   * @fires fieldGroup:item:change
   */
  handleChange: function(e){
    var value = e.target.checked? this.props.value : null;
    var eventName = this.props.isFieldGroup? 'fieldGroup:item:change' : 'field:value:change';
    this.setState({checked: e.target.checked});
    Queue.push({ 
      entityEvent: eventName, 
      data: {
        id: this.props.id,
        name: this.props.name,
        value: value
      } 
    });
  },

  render: function(){   
    var classNames = React.addons.classSet({
      'editable-component' : !this.props.isFieldGroup,
      'hidden' : !this.state.display,
      'has-error' : this.state.hasError,
      'radio': this.props.type === 'radio',
      'checkbox': this.props.type === 'checkbox'
    });
    var editorToggle = this.props.isFieldGroup? '': <EditorToggle {...this.props}/>;
    var props = _.pick(this.props, ['type', 'id', 'name', 'disabled', 'value', 'aria-describedby', 'checked']);
    return (
      <div className={classNames}>
        {editorToggle}
        <label htmlFor={this.props.id}>
          <input {...props} onChange={this.handleChange}/>
          {this.props.label} {this.getRequiredIndicator()}
        </label>
        {this.getHelpBlock()}
      </div>
    );
  }
});