var React = require('react');
require('es6-promise').polyfill();
var Components = require('../../src/main');
var TestUtils = require('react/lib/ReactTestUtils');
var fixture = require('../fixtures/fieldset.json');

describe('Fieldset component', function() {
  
  it('Renders fieldset legend', function(){
    var Fieldset = Components.factory(fixture);
    var fieldset = TestUtils.renderIntoDocument(Fieldset);
    var legend = TestUtils.findRenderedDOMComponentWithTag(fieldset, 'legend');
    expect(legend.getDOMNode().textContent).toEqual(fixture.config.legend);
  });

  it('Renders fieldset container', function(){
    var Fieldset = Components.factory(fixture);
    var fieldset = TestUtils.renderIntoDocument(Fieldset);
    var inputText = TestUtils.scryRenderedDOMComponentsWithTag(fieldset, 'fieldset');
    expect(inputText.length).toEqual(1);    
  });

  it('Renders fieldset fields', function(){
    var Fieldset = Components.factory(fixture);
    var fieldset = TestUtils.renderIntoDocument(Fieldset);
    var inputText = TestUtils.scryRenderedDOMComponentsWithTag(fieldset, 'input');
    expect(inputText.length).toEqual(Object.keys(fixture.components).length);
  });  
  
});
