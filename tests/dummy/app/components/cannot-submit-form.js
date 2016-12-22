import Ember from 'ember';
import layout from '../templates/components/cannot-submit-form';

export default Ember.Component.extend({
  actions: {
    submit() {
      this.get('results').pushObject('Submitted On-Enter');
      return true;
    }
  },
  classNames: ['row'],
  layout,
  results: Ember.A()
});
