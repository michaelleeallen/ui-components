var Queue = require('./EventQueue');

module.exports = {

  /**
   * Stop event prop and push event to Queue, enabling global app to open the config editor window.
   * Publishes the component's props.
   * @fires component:edit
   * @param {object} e - Event object
   */
  handleConfigEdit: function (e) {
    e.preventDefault();
    e.stopPropagation();
    Queue.push({ entityEvent: 'component:edit', data: this.props });
  },

  /**
   * Stop even prop and push event to Queue, enabling global app to open the config editor window.
   * Publishes the component's props.
   * @fires component:add:new
   * @param e Event
   */
  handleConfigAdd: function (e) {
    e.preventDefault();
    e.stopPropagation();
    Queue.push({ entityEvent:'component:add', data: this.props });
  },

  /**
   * Only show an add button if the component can have children(which 'field' and 'action' cannot). 
   * @param {string} type - the type of component
   * @returns {JSX}
   */
  getAddButton: function(type){    
    if(type !== 'field' && type !== 'action'){
      return (
        <span onClick={this.handleConfigAdd} className="add-component">
          <span className="glyphicon glyphicon glyphicon-plus"></span>
        </span>
      );
    }    
  },

  /**
   * Create edit component HTML and handle click events.
   * @returns {JSX}
   */
  getEditTemplate: function() {
    return (
      <div className="config-editor">
        {this.getAddButton(this.props.componentType.toLowerCase())}
        <span onClick={this.handleConfigEdit} className="edit-component">
          <span className="glyphicon glyphicon-cog"></span>
        </span>
      </div>
    );
  }
};