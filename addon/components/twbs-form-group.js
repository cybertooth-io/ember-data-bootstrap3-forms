import Ember from 'ember';
import layout from '../templates/components/twbs-form-group';

/**
 * The Bootstrap component used for spacing controls inside a form.  It is special because it will also
 * present any errors related to the specified field that the form-group is for.
 */
export default Ember.Component.extend({
  classNameBindings: ['hasError'],
  classNames: ['form-group'],
  errorMessages: Ember.computed.mapBy('fieldErrors', 'message'),
  /**
   * REQUIRED.
   * For example: `model.errors.someFieldName`
   */
  fieldErrors: undefined,
  'hasError?': Ember.computed.notEmpty('fieldErrors'),
  hasError: Ember.computed.alias('hasError?'),
  layout,
  tagName: 'div'
});
