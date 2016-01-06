'use-strict';
import React from 'react';
import setClassNames from 'classnames';
import Field from './Field';
import Content from './Content';

/**
 * Render a Terms component.
 * @returns {JSX}
 */
class Terms extends React.Component {
   constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.renderLegend = this.renderLegend.bind(this);
    this.renderCheckboxHeader = this.renderCheckboxHeader.bind(this);
  }

  handleScroll(e) {
    let $terms = e.target;
    // enable Agree checkbox upon scrolling to the bottom of the terms textarea
    if ($terms.scrollTop >= $terms.scrollHeight - $terms.offsetHeight) {
      e.component = {
        id: this.props.id,
        schemaUpdates: {
          termsRead: true
        }
      };
    }
  }

  getClassNames() {
    return setClassNames(
      'form-control',
      'terms-and-conditions',
      this.props.className
    );
  }

  renderLegend() {
    return this.props.legend ? <legend>{this.props.legend}</legend> : null;
  }

  renderCheckboxHeader() {
    return this.props.checkboxHeader ? (
      <Content
        id={`${this.props.id}-checkbox-header`}
        name={`${this.props.id}-checkbox-header`}
        content={this.props.checkboxHeader} />
    ) : (
      null
    );
  }

  render() {
    return (
      <fieldset className="form-group" onChange={this.handleChange}>
        {this.renderLegend()}
        <textarea
          id={`agree-to-terms-${this.props.id}`}
          ref="terms"
          readOnly
          onScroll={this.handleScroll}
          className={this.getClassNames()}
          value={this.props.terms} />
        {this.renderCheckboxHeader()}
        <Field
          {...this.props}
          type="checkbox"
          disabled={!this.props.termsRead}
          label={this.props.checkboxLabel} />
      </fieldset>
    );
  }
}

Terms.propTypes = {
  id: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  legend: React.PropTypes.string,
  checkboxHeader: React.PropTypes.string,
  checkboxLabel: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  required: React.PropTypes.bool,
  termsRead: React.PropTypes.bool,
  requiredIndicatorPosition: React.PropTypes.string
};

Terms.defaultProps = {
  id: '',
  value: '',
  legend: '',
  checkboxHeader: '',
  checkboxLabel: '',
  className: '',
  required: true,
  termsRead: false,
  requiredIndicatorPosition: ''
};

export default Terms;
