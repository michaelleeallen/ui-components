'use-strict';
var React = require('react');

module.exports = React.createClass({

  displayName: 'Content',

  propTypes: {
    'content' : React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      'componentType': 'content'
    };
  },

  getInitialState: function() {
    return null;
  },

  render: function(){
    return (
      <section className="page-content" dangerouslySetInnerHTML={{__html: this.props.content }}></section>
    );
  }

});