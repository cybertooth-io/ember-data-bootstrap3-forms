import { observer } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  anotherString: DS.attr('string'),
  someBoolean: DS.attr('boolean'),
  someNumber: DS.attr('number'),
  someString: DS.attr('string'),
  _addErrorToAnotherString: observer('anotherString', function () {
    if (this.anotherString === 'error') {
      this.errors._add('anotherString', 'Now change the text to error2 to add a second');
    } else if (this.anotherString === 'error2') {
      this.errors._add('anotherString', 'Another error, take it easy');
    } else {
      this.errors._remove('anotherString');
    }
  }),
});
