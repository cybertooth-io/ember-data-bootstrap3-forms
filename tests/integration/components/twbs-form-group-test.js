import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

import { run } from "@ember/runloop";
import { findAll, render } from "@ember/test-helpers";

module("Integration | Component | twbs form group", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.store = this.owner.lookup("service:store");
  });

  test("when field errors are not supplied then simply behave as a form-group", async function (assert) {
    await render(hbs`
      {{#twbs-form-group}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);
    assert.dom(".form-group").exists({ count: 1 });
    assert.dom(".form-group.has-error").doesNotExist();
    assert.dom(".form-group > label.control-label").exists({ count: 1 });
    assert.dom(".form-group > input.form-control").exists({ count: 1 });
    assert.dom(".form-group > .help-block").exists({ count: 1 });
    assert
      .dom(".form-group > .help-block.twbs-form-group-errors")
      .doesNotExist();
  });

  test("when field errors are empty", async function (assert) {
    run(() => {
      const model = this.store.createRecord("demo-model");
      this.set("fieldErrors", model.get("errors.anotherString"));
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=fieldErrors}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    assert.dom(".form-group").exists({ count: 1 });
    assert.dom(".form-group.has-error").doesNotExist();
    assert
      .dom(".form-group > .help-block.twbs-form-group-errors")
      .doesNotExist();
  });

  test("when field errors are empty", async function (assert) {
    run(() => {
      const model = this.store.createRecord("demo-model");
      this.set("model", model);
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=model.errors.anotherString}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    assert.dom(".form-group").exists({ count: 1 });
    assert.dom(".form-group.has-error").doesNotExist();
    assert
      .dom(".form-group > .help-block.twbs-form-group-errors")
      .doesNotExist();
  });

  test("when a single error is present", async function (assert) {
    let model;
    run(() => {
      model = this.store.createRecord("demo-model");
      this.set("model", model);
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=model.errors.anotherString}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    run(() => {
      model.get("errors")._add("anotherString", "Some sort of error.");
    });

    assert.dom(".form-group").exists({ count: 1 });
    assert.dom(".form-group.has-error").exists({ count: 1 });
    assert
      .dom(".form-group > .help-block.twbs-form-group-errors")
      .exists({ count: 1 });
    assert
      .dom(
        ".form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message"
      )
      .hasText("Some sort of error.");
  });

  test("when multiple errors are present", async function (assert) {
    let model;
    run(() => {
      model = this.store.createRecord("demo-model");
      this.set("model", model);
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=model.errors.anotherString}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    run(() => {
      model.get("errors")._add("anotherString", "Some sort of error.");
      model.get("errors")._add("anotherString", "Another kind of error.");
    });

    assert.dom(".form-group").exists({ count: 1 });
    assert.dom(".form-group.has-error").exists({ count: 1 });
    assert
      .dom(".form-group > .help-block.twbs-form-group-errors")
      .exists({ count: 1 });
    assert
      .dom(
        ".form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message"
      )
      .exists({ count: 2 });
    assert
      .dom(
        ".form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message"
      )
      .hasText("Some sort of error.");
    assert
      .dom(
        findAll(
          ".form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message"
        )[1]
      )
      .hasText("Another kind of error.");
  });

  test("when an error is present among other field's errors", async function (assert) {
    let model;
    run(() => {
      model = this.store.createRecord("demo-model");
      this.set("model", model);
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=model.errors.anotherString}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    run(() => {
      model.get("errors")._add("anotherString", "Some sort of error.");
      model
        .get("errors")
        ._add(
          "someBoolean",
          "An error message about the someBoolean attribute"
        );
      model
        .get("errors")
        ._add("someNumber", "An error message about the someNumber attribute");
      model
        .get("errors")
        ._add("someString", "An error message about the someString attribute");
    });

    assert.dom(".form-group").exists({ count: 1 });
    assert.dom(".form-group.has-error").exists({ count: 1 });
    assert
      .dom(".form-group > .help-block.twbs-form-group-errors")
      .exists({ count: 1 });
    assert
      .dom(
        ".form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message"
      )
      .exists({ count: 1 });
    assert
      .dom(
        ".form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message"
      )
      .hasText("Some sort of error.");
  });
});
