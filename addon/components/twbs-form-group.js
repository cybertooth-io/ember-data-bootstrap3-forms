import { mapBy, notEmpty, alias } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/twbs-form-group';

/**
 * The Bootstrap component used for spacing controls inside a form.  It is special because it will also
 * present any errors related to the specified field that the form-group is for.
 */
export default Component.extend({
  classNameBindings: ['hasError'],
  classNames: ['form-group'],
  errorMessages: mapBy('fieldErrors', 'message'),
  /**
   * REQUIRED.
   * For example: `model.errors.someFieldName`
   */
  fieldErrors: undefined,
  'hasError?': notEmpty('fieldErrors'),
  hasError: alias('hasError?'),
  layout,
  tagName: 'div',
});
