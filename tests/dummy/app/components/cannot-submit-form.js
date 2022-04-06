import { A } from '@ember/array';
import Component from '@ember/component';
import layout from '../templates/components/cannot-submit-form';

export default Component.extend({
  actions: {
    submit() {
      this.get('results').pushObject('Submitted On-Enter');
      return true;
    }
  },
  classNames: ['row'],
  layout,
  results: A()
});
