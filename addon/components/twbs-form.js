import Component from "@ember/component";
import { htmlSafe } from "@ember/template";
import { isPresent } from "@ember/utils";

import layout from "../templates/components/twbs-form";

export default Component.extend({
  /**
   * Had to define the action and make sure it does absolutely nothing.
   */
  action: htmlSafe("javascript:void(0);"), // jshint ignore:line
  attributeBindings: ["action"],
  classNames: ["form"],
  layout,
  tagName: "form",
  didInsertElement() {
    const resetAction = this.reset;
    if (isPresent(resetAction)) {
      this.$()
        .off("reset.twbs-form")
        .on("reset.twbs-form", function () {
          resetAction();
        });
    }
  },
  willDestroyElement() {
    this.$().off("reset.twbs-form");
  },
});
