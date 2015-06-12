'use-strict';
import React from 'react';
import Flux, { dispatcher as Dispatcher } from 'fluxify';
import constants from './constants';
import _ from 'lodash';
import Immutable from 'immutable';
import Action from './Action';
import EntryListItem from './EntryListItem';
import EntryListForm from './EntryListForm';
import EntryListBtn from './EntryListBtn';
import DependencyMixin from './DependencyMixin';

module.exports = React.createClass({

  displayName: 'EntryList',

  mixins: [DependencyMixin],

  statics: {
    configure: function(schema, model, components) {
      let config = schema.get('config');
      let entries = model.get(config.get('model'));
      return entries ? config.set('entries', entries).toJSON() : config.toJSON();
    }
  },

  propTypes: {
    model: React.PropTypes.string,
    entries: React.PropTypes.arrayOf(React.PropTypes.object),
    emptyText: React.PropTypes.string,
    addNewButtonText: React.PropTypes.string,
    columns: React.PropTypes.arrayOf(React.PropTypes.object),
    form: React.PropTypes.object,
    formAddButtonText: React.PropTypes.string,
    formUpdateButtonText: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      model: '',
      entries: [],
      addNewButtonText: 'Add New',
      CancelButtonText: 'Cancel',
      columns: [],
      form: {},
      formAddButtonText: 'Add Entry',
      formUpdateButtonText: 'Update Entry'
    };
  },

  getInitialState: function() {
    return {
      entries: [],
      entry: {},
      showForm: false,
      formConfig: {},
      isEdit: false
    };
  },

  componentWillMount: function() {
    this.setState({entries: this.props.entries});
  },

  componentDidMount: function() {
    // when the user clicks the show form button
    Dispatcher.register('show-entrylist-form', function(action){
      if ( action === constants.actions.ENTRYLIST_FORM_SHOW ) {
        this.setState({showForm: true});
      }
    }.bind(this));

    // when the user clicks the cancel button
    Dispatcher.register('cancel-entrylist-entry', function(action){
      if ( action === constants.actions.ENTRYLIST_ENTRY_CANCEL ) {
        this.setState({
          isEdit: false,
          showForm: false,
          entry: {}
        });
      }
    }.bind(this));

    // when the user clicks the edit entry link
    Dispatcher.register('edit-entrylist-entry', function(action, data){
      if ( action === constants.actions.ENTRYLIST_ENTRY_EDIT ) {
        let currentEntry = Immutable.Map(this.state.entries[data.entryId]);
        let formConfig = Immutable.fromJS(this.props.form).set('model', currentEntry).toJSON();
        this.setState({
          isEdit: true,
          entry: currentEntry.set('_id', data.entryId).toJSON(),
          formConfig: formConfig,
          showForm: true
        });
      }
    }.bind(this));

    // when the user clicks the remove entry link
    Dispatcher.register('remove-entrylist-entry', function(action, data){
      if ( action === constants.actions.ENTRYLIST_ENTRY_REMOVE ) {
        let entries = Immutable.List(this.state.entries);
        this.setState({ entries: entries.remove(data.entryId).toJSON() });
      }
    }.bind(this));

    // when the user fills out the add entry form
    Dispatcher.register('entrylist-field-value-change', function(action, data) {
      if ( action === 'entrylist-field-value-change-action' ) {
        let value = data.dateString ? data.dateString : data.value;
        let updatedEntry = Immutable.Map(this.state.entry).set(data.name, value).toJSON();
        this.setState({entry: updatedEntry});
      }
    }.bind(this));

    // when the user clicks the #add-entry-btn
    Dispatcher.register('add-new-entrylist-entry', function(action){
      if ( action === constants.actions.ENTRYLIST_NEW_ENTRY_ADD ) {
        let currentEntries = Immutable.List(this.state.entries);
        let updatedEntries = (!this.state.isEdit) ?
          currentEntries.push(this.state.entry) :
          currentEntries.set(this.state.entry._id, this.state.entry);
        let entries = updatedEntries.toJSON();
        // fire FIELD_VALUE_CHANGE for the model
        let self = this;
        let entriesModel = {
          id: this.props.model,
          name: this.props.model,
          type: 'entrylist',
          value: entries
        };
        Flux.doAction(constants.actions.FIELD_VALUE_CHANGE, entriesModel).then(function() {
          self.setState({isEdit: false, entry: {}, entries: entries, showForm: false});
        });
      }
    }.bind(this));
  },

  componentWillUnmount: function() {
    Dispatcher.unregister('show-entrylist-form');
    Dispatcher.unregister('cancel-entrylist-entry');
    Dispatcher.unregister('edit-entrylist-entry');
    Dispatcher.unregister('remove-entrylist-entry');
    Dispatcher.unregister('entrylist-field-value-change');
    Dispatcher.unregister('add-new-entrylist-entry');
  },

  showEmptyText: function() {
    if (!this.state.entries.length) {
      return <tr><td colSpan={this.props.columns.length + 2}>{this.props.emptyText}</td></tr>;
    }
  },

  /**
   * Render an EntryList component.
   * @returns {JSX}
   */
  render: function() {
    let columns = this.props.columns;
    let formConfig = this.state.isEdit ? this.state.formConfig : this.props.form;
    let actionName = this.state.isEdit ? this.props.formUpdateButtonText : this.props.formAddButtonText;
    return (
      <div className="entrylist mblg">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              {columns.map(function(col) {
                return <th key={col.dataKey}>{col.header}</th>;
              })}
              <th key="edit"></th>
              <th key="remove"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.entries.map(function(entry, entryIdx) {
              return (
                <EntryListItem
                  key={'entrylist-item-'+entryIdx}
                  entry={entry}
                  entryIdx={entryIdx}
                  columns={columns} />
              );
            })}
            {this.showEmptyText()}
          </tbody>
        </table>
        <EntryListForm
          show={this.state.showForm}
          config={formConfig}
          actionName={actionName}/>
        <EntryListBtn
          id="add-entry-btn"
          iconClass="plus"
          show={this.state.showForm}
          name={this.props.addNewButtonText}
          event={constants.actions.ENTRYLIST_FORM_SHOW} />
        <EntryListBtn
          id="cancel-entry-btn"
          show={!this.state.showForm}
          name={this.props.CancelButtonText}
          event={constants.actions.ENTRYLIST_ENTRY_CANCEL} />
      </div>
    );
  }
});

