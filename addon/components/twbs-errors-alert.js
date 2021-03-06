import Ember from 'ember';
import layout from '../templates/components/twbs-errors-alert';

export default Ember.Component.extend({
  attributeBindings: ['role'],
  classNames: ['alert'],
  /**
   * Prepare a copy of the errors that include/exclude only the fields specified or returns all the errors.
   */
  errors: Ember.computed('_excludesArray.[]', '_includesArray.[]', 'model.errors.@each.attribute', /*'model.errors.[]', 'model.errors.length', */function () {
    const excludedFields = this.get('_excludesArray');
    if (Ember.isPresent(excludedFields)) {
      const filteredErrors = Ember.A();
      if (Ember.isPresent(this.get('model.errors'))) {
        this.get('model.errors').forEach((error) => {
          if (!excludedFields.includes(Ember.get(error, 'attribute'))) {
            filteredErrors.pushObject(Ember.get(error, 'message'));
          }
        });
      }
      return filteredErrors;
    }
    if (Ember.isPresent(this.get('_includesArray'))) {
      const filteredErrors = Ember.A();
      const modelErrors = this.get('model.errors');
      this.get('_includesArray').forEach((field) => {
        if (Ember.isPresent(modelErrors)) {
          modelErrors.forEach((error) => {
            if (field === Ember.get(error, 'attribute')) {
              filteredErrors.pushObject(Ember.get(error, 'message'));
            }
          });
        }
      });
      return filteredErrors;
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
      return Ember.A().pushObjects(object);
    }
    if (Ember.isPresent(object)) {
      // assume a String and split it on comma
      return Ember.A().pushObjects(String(object).split(','));
    }
    return Ember.A();
  }
});
