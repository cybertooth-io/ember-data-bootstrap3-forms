import Model, { attr } from '@ember-data/model';
import { observer } from '@ember/object';

export default Model.extend({
  anotherString: attr('string'),

  someBoolean: attr('boolean'),

  someNumber: attr('number'),

  someString: attr('string'),

  // eslint-disable-next-line ember/no-observers
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
