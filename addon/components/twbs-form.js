import Ember from 'ember';
import layout from '../templates/components/twbs-form';

export default Ember.Component.extend({
  /**
   * Had to define the action and make sure it does absolutely nothing.
   */
  action: Ember.String.htmlSafe('javascript:void(0);'),  // jshint ignore:line
  attributeBindings: ['action'],
  classNames: ['form'],
  layout,
  tagName: 'form',
  _initializeOnReset: Ember.on('didInsertElement', function () {
    const resetAction = this.get('reset');
    if (Ember.isPresent(resetAction)) {
      this.$()
        .off('reset.twbs-form')
        .on('reset.twbs-form', function () {
          resetAction();
        });
    }
  }),
  _destroyOnReset: Ember.on('willDestroyElement', function () {
    this.$().off('reset.twbs-form');
  })
});
