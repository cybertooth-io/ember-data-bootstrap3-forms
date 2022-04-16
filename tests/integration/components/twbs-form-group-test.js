import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | twbs form group', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
  });

  test('when field errors are not supplied then simply behave as a form-group', async function(assert) {
    await render(hbs`
      {{#twbs-form-group}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);
    assert.equal(findAll('.form-group').length, 1);
    assert.equal(findAll('.form-group.has-error').length, 0);
    assert.equal(findAll('.form-group > label.control-label').length, 1);
    assert.equal(findAll('.form-group > input.form-control').length, 1);
    assert.equal(findAll('.form-group > .help-block').length, 1);
    assert.equal(findAll('.form-group > .help-block.twbs-form-group-errors').length, 0);
  });

  test('when field errors are empty', async function(assert) {
    run(() => {
      const model = this.store.createRecord('demo-model');
      this.set('fieldErrors', model.get('errors.anotherString'));
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=fieldErrors}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    assert.equal(findAll('.form-group').length, 1);
    assert.equal(findAll('.form-group.has-error').length, 0);
    assert.equal(findAll('.form-group > .help-block.twbs-form-group-errors').length, 0);
  });

  test('when field errors are empty', async function(assert) {
    run(() => {
      const model = this.store.createRecord('demo-model');
      this.set('model', model);
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=model.errors.anotherString}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    assert.equal(findAll('.form-group').length, 1);
    assert.equal(findAll('.form-group.has-error').length, 0);
    assert.equal(findAll('.form-group > .help-block.twbs-form-group-errors').length, 0);
  });

  test('when a single error is present', async function(assert) {
    let model;
    run(() => {
      model = this.store.createRecord('demo-model');
      this.set('model', model);
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=model.errors.anotherString}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    run(() => {
      model.get('errors')._add('anotherString', 'Some sort of error.');
    });

    assert.equal(findAll('.form-group').length, 1);
    assert.equal(findAll('.form-group.has-error').length, 1);
    assert.equal(findAll('.form-group > .help-block.twbs-form-group-errors').length, 1);
    assert.equal(find(
      '.form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message'
    ).textContent,
      'Some sort of error.');
  });

  test('when multiple errors are present', async function(assert) {
    let model;
    run(() => {
      model = this.store.createRecord('demo-model');
      this.set('model', model);
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=model.errors.anotherString}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    run(() => {
      model.get('errors')._add('anotherString', 'Some sort of error.');
      model.get('errors')._add('anotherString', 'Another kind of error.');
    });

    assert.equal(findAll('.form-group').length, 1);
    assert.equal(findAll('.form-group.has-error').length, 1);
    assert.equal(findAll('.form-group > .help-block.twbs-form-group-errors').length, 1);
    assert.equal(findAll(
      '.form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message'
    ).length, 2);
    assert.equal(find(
      '.form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message'
    ).textContent,
      'Some sort of error.');
    assert.equal(find(findAll(
      '.form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message'
    )[1]).textContent,
      'Another kind of error.');
  });

  test("when an error is present among other field's errors", async function(assert) {
    let model;
    run(() => {
      model = this.store.createRecord('demo-model');
      this.set('model', model);
    });

    await render(hbs`
      {{#twbs-form-group fieldErrors=model.errors.anotherString}}
        <label for="js-some-text" class="control-label">Some Text</label>
        <input type="text" id="js-some-text" class="form-control" value=""/>
        <p class="help-block">Help about some text.</p>
      {{/twbs-form-group}}
    `);

    run(() => {
      model.get('errors')._add('anotherString', 'Some sort of error.');
      model.get('errors')._add('someBoolean', 'An error message about the someBoolean attribute');
      model.get('errors')._add('someNumber', 'An error message about the someNumber attribute');
      model.get('errors')._add('someString', 'An error message about the someString attribute');

    });

    assert.equal(findAll('.form-group').length, 1);
    assert.equal(findAll('.form-group.has-error').length, 1);
    assert.equal(findAll('.form-group > .help-block.twbs-form-group-errors').length, 1);
    assert.equal(findAll(
      '.form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message'
    ).length, 1);
    assert.equal(find(
      '.form-group > .help-block.twbs-form-group-errors > .twbs-form-group-error-message'
    ).textContent,
      'Some sort of error.');
  });
});
