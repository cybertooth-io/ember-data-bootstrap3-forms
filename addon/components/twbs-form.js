import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { isPresent } from '@ember/utils';

import layout from '../templates/components/twbs-form';

export default Component.extend({
  /**
   * Had to define the action and make sure it does absolutely nothing.
   */
  action: htmlSafe('javascript:void(0);'), // jshint ignore:line
  attributeBindings: ['action'],
  classNames: ['form'],
  layout,
  tagName: 'form',
  didInsertElement() {
    if (isPresent(this.reset)) {
      this.element.addEventListener('reset', this.reset);
    }
  },
  willDestroyElement() {
    if (isPresent(this.reset)) {
      this.element.removeEventListener('reset', this.reset);
    }
  },
});
