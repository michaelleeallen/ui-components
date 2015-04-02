'use-strict';
var React = require('react');
var _ = require('lodash');
var Flux = require('fluxify');

module.exports = React.createClass({
  displayName: 'Action',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    event: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string,
    classNames: React.PropTypes.arrayOf(React.PropTypes.string),
    iconClass: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      componentType: 'action'
    };
  },

  /**
  * Return a string of classes
  * @return {String}
  */
  getClasses: function(){
    var classes = ['btn'];
    // Add default link-type for action links
    if(this.props.type==='link'){
      classes.push('btn-link');
    }
    // Add all passed in classes
    if(this.props.classNames){
      classes = classes.concat(this.props.classNames);
    }
    if(this.props.disabled === true){
      classes.push('disabled');
    }
    return classes.join(' ');
  },

  /**
  * Return a span element with icon classes
  * @return {Object}
  */
  getIcon: function(){
    var iconClassNames = 'glyphicon glyphicon-' + this.props.iconClass;
    if(this.props.iconClass){
      return <span className={iconClassNames} aria-hidden="true"></span>;
    }
  },

  /**
   * Event handler for onClick, that pushes a message to the queue, with the action is clicked.
   * It's used with workflow to update page based on the action clicked.
   * @returns {void}
   */
  handleClick: function(){
    if(this.props.disabled === undefined || this.props.disabled !== true) {
      Flux.doAction(this.props.event, this.props);
    }
  },

  /**
  * Return an <a> (link) template
  * @return {JSX Template}
  */
  getLink: function(){
    return (
      <a
        href={this.props.url}
        id={this.props.id}
        key={this.props.id+"-action"}
        className={this.getClasses()}
        onClick={this.handleClick}>
        {this.getIcon()}
        {this.props.name}
      </a>
    );
  },

  /**
  * Return a <button> template
  * @return {JSX Template}
  */
  getButton: function(){
    return (
      <button
        type="button"
        id={this.props.id}
        key={this.props.id+"-action"}
        className={this.getClasses()}
        onClick={this.handleClick}>
        {this.getIcon()}
        {this.props.name}
      </button>
    );
  },

  /**
   * Render a Action component.
   * @returns {JSX}
   */
  render: function(){
    return (this.props.type === 'button')? this.getButton() : this.getLink();
  }

});
