import Component from '@ember/component';
import layout from '../templates/components/hidden-submit';

/**
 * Requires the bootstrap .sr-only class.
 */
export default Component.extend({
  attributeBindings: ['type'],
  classNames: ['hidden-submit', 'sr-only'],
  layout,
  tagName: 'button',
  type: 'submit',
});
