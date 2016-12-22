import Ember from 'ember';
import layout from '../templates/components/errors-alert';

const EMPTY_ARRAY = Object.freeze([]);

export default Ember.Component.extend({
  attributeBindings: ['role'],
  /**
   * REQUIRED.
   * An array of camel-cased attribute names matching the supplied model's attribute or relationship names.
   * Leaving this array empty will return all error messages.
   * Supplying attribute name(s) to this array will mean that only those attribute error messages are presented.
   * Putting a minus symbol infront of an attribute name will exclude it.
   */
  attributeNames: EMPTY_ARRAY,
  classNames: ['panel'],
  errors: Ember.computed('_excludesArray', '_includesArray', 'model.errors', function () {
    if (Ember.isPresent(this.get('_excludesArray'))) {
      const errors = Ember.A().pushObjects(this.get('model.errors.messages'));
      this.get('_excludesArray').forEach((field) => {
        this.get('model.errors').errorsFor(field).forEach((error) => {
          errors.removeObject(error.message);
        });
      });
      return errors;
    }
    if (Ember.isPresent(this.get('_includesArray'))) {
      const errors = Ember.A();
      this.get('_includesArray').forEach((field) => {
        this.get('model.errors').errorsFor(field).forEach((error) => {
          errors.pushObject(error.message);
        });
      });
      return errors;
    }
    return this.get('model.errors.messages');
  }),
  /**
   * The camel-cased field names to exclude from the computed errors collection.  Takes precedence over `includes`.
   */
  excludes: EMPTY_ARRAY,
  /**
   * The camel-cased field names to include in the computed errors collection.  Will be ignored if `excludes`
   * is present.
   */
  includes: EMPTY_ARRAY,
  isVisible: Ember.computed.notEmpty('errors'),
  layout,
  /**
   * REQUIRED.
   */
  model: undefined,
  role: 'alert',
  _excludesArray: Ember.computed('excludes', function () {
    const excludes = this.get('excludes');
    if ('array' === Ember.typeOf(excludes)) {
      return excludes;
    }
    // assume a String and split it on comma
    return String(excludes).split(',');
  }),
  _includesArray: Ember.computed('includes', function () {
    const includes = this.get('includes');
    if ('array' === Ember.typeOf(includes)) {
      return includes;
    }
    // assume a String and split it on comma
    return String(includes).split(',');
  })
});
