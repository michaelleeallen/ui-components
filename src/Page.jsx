'use-strict';
import React from 'react';
import Content from './Content';

class Page extends React.Component {

  /**
   * Render a Page component to the screen.
   * @returns {JSX}
   */
  render() {
    return (
      <article>
        <header>
          <h2>{this.props.title}</h2>
        </header>
        <Content visible={true} key="content" ref="content" content={this.props.content} />
        {this.props.children}
      </article>
    );
  }
}

Page.propTypes = {
  title: React.PropTypes.string
};

Page.defaultProps = {
  content: '',
  title: '',
  componentType: 'page'
};

export default Page;
