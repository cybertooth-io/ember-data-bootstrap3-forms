import { A } from "@ember/array";
import Component from "@ember/component";
import { computed, get } from "@ember/object";
import { notEmpty } from "@ember/object/computed";
import { isPresent, typeOf } from "@ember/utils";

import layout from "../templates/components/twbs-errors-alert";

export default Component.extend({
  attributeBindings: ["role"],
  classNames: ["alert"],
  /**
   * Prepare a copy of the errors that include/exclude only the fields specified or returns all the errors.
   */
  errors: computed(
    "_excludesArray.[]",
    "_includesArray.[]",
    "model.errors.@each.attribute",
    /*'model.errors.[]', 'model.errors.length', */ function () {
      const excludedFields = this.get("_excludesArray");
      if (isPresent(excludedFields)) {
        const filteredErrors = A();
        if (isPresent(this.get("model.errors"))) {
          this.get("model.errors").forEach((error) => {
            if (!excludedFields.includes(get(error, "attribute"))) {
              filteredErrors.pushObject(get(error, "message"));
            }
          });
        }
        return filteredErrors;
      }
      if (isPresent(this.get("_includesArray"))) {
        const filteredErrors = A();
        const modelErrors = this.get("model.errors");
        this.get("_includesArray").forEach((field) => {
          if (isPresent(modelErrors)) {
            modelErrors.forEach((error) => {
              if (field === get(error, "attribute")) {
                filteredErrors.pushObject(get(error, "message"));
              }
            });
          }
        });
        return filteredErrors;
      }
      return this.get("model.errors.messages");
    }
  ),
  "errorsPresent?": notEmpty("errors"),
  /**
   * The camel-cased field names to exclude from the computed errors collection.  Takes precedence over `includes`.
   */
  excludes: undefined,
  /**
   * The camel-cased field names to include in the computed errors collection.  Will be ignored if `excludes`
   * is present.
   */
  includes: undefined,
  isVisible: notEmpty("errors"),
  layout,
  /**
   * REQUIRED.
   */
  model: undefined,
  role: "alert",
  _excludesArray: computed("excludes", function () {
    return this._convertToArray(this.excludes);
  }),
  _includesArray: computed("includes", function () {
    return this._convertToArray(this.includes);
  }),
  _convertToArray(object) {
    if ("array" === typeOf(object)) {
      return A().pushObjects(object);
    }
    if (isPresent(object)) {
      // assume a String and split it on comma
      return A().pushObjects(String(object).split(","));
    }
    return A();
  },
});
