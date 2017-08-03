import Ember from 'ember';
import layout from '../templates/components/twbs-errors-alert';

export default Ember.Component.extend({
  attributeBindings: ['role'],
  classNames: ['alert'],
  /**
   * Prepare a copy of the errors that include/exclude only the fields specified or returns all the errors.
   */
  errors: Ember.computed('_excludesArray.[]', '_includesArray.[]', 'model.errors.length', function () {
    if (Ember.isPresent(this.get('_excludesArray'))) {
      const errors = Ember.A().pushObjects(this.get('model.errors.messages'));
      this.get('_excludesArray').forEach((field) => {
        this.get(`model.errors.${field}`).forEach((error) => {
          errors.removeObject(error.message);
        });
      });
      return errors;
    }
    if (Ember.isPresent(this.get('_includesArray'))) {
      const errors = Ember.A();
      this.get('_includesArray').forEach((field) => {
        this.get(`model.errors.${field}`).forEach((error) => {
          errors.pushObject(error.message);
        });
      });
      return errors;
    }
    return this.get('model.errors.messages');
  }),
  'errorsPresent?': Ember.computed.notEmpty('errors'),
  /**
   * The camel-cased field names to exclude from the computed errors collection.  Takes precedence over `includes`.
   */
  excludes: undefined,
  /**
   * The camel-cased field names to include in the computed errors collection.  Will be ignored if `excludes`
   * is present.
   */
  includes: undefined,
  isVisible: Ember.computed.notEmpty('errors'),
  layout,
  /**
   * REQUIRED.
   */
  model: undefined,
  role: 'alert',
  _excludesArray: Ember.computed('excludes', function () {
    return this._convertToArray(this.get('excludes'));
  }),
  _includesArray: Ember.computed('includes', function () {
    return this._convertToArray(this.get('includes'));
  }),
  _convertToArray(object) {
    if ('array' === Ember.typeOf(object)) {
      return object;
    }
    if (Ember.isPresent(object)) {
      // assume a String and split it on comma
      return String(object).split(',');
    }
    return Ember.A();
  }
});
