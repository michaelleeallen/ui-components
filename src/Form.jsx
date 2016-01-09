import React from 'react';

/**
 * Render a Form component.
 * @returns {JSX}
 */
 class Form extends React.Component {
   render() {
     return <form>{this.props.children}</form>;
   }
 }

 export default Form;
