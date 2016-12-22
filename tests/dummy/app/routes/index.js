import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    const demoModel = this.get('store').createRecord('demo-model');
    demoModel.get('errors')._add('someBoolean', 'An error message about the someBoolean attribute');
    demoModel.get('errors')._add('someNumber', 'An error message about the someNumber attribute');
    demoModel.get('errors')._add('someString', 'An error message about the someString attribute');
    return demoModel;
  }
});
