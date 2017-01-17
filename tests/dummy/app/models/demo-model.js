import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  anotherString: DS.attr('string'),
  someBoolean: DS.attr('boolean'),
  someNumber: DS.attr('number'),
  someString: DS.attr('string'),
  _addErrorToAnotherString: Ember.observer('anotherString', function () {
    if (this.get('anotherString') === 'error') {
      this.get('errors')._add('anotherString', 'Now change the text to error2 to add a second');
    } else if (this.get('anotherString') === 'error2') {
      this.get('errors')._add('anotherString', 'Another error, take it easy');
    } else {
      this.get('errors')._remove('anotherString');
    }
  })
});
