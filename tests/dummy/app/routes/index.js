import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    resetForm() {
      window.alert('Form Was Reset!  Rollback your model attributes that may have been dirtied.');
    },
    submitForm() {
      window.alert('Form Was Submitted!  POST/PATCH your model from the form.');
    }
  },
  model() {
    const demoModel = this.get('store').createRecord('demo-model');
    demoModel.get('errors')._add('someBoolean', 'An error message about the someBoolean attribute');
    demoModel.get('errors')._add('someNumber', 'An error message about the someNumber attribute');
    demoModel.get('errors')._add('someString', 'An error message about the someString attribute');
    return demoModel;
  }
});
