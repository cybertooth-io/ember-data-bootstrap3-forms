import DS from 'ember-data';

export default DS.Model.extend({
  someBoolean: DS.attr('boolean'),
  someNumber: DS.attr('number'),
  someString: DS.attr('string')
});
