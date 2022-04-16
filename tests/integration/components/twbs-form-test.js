import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

import { click, render } from '@ember/test-helpers';

module('Integration | Component | twbs form', function (hooks) {
  setupRenderingTest(hooks);

  test('when block supplied it is inside the form element', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#twbs-form}}
        <button class="btn btn-primary">Submit</button>
      {{/twbs-form}}
    `);

    assert.dom('form').exists({ count: 1 });
    assert.dom('form').hasAttribute('action', 'javascript:void(0);'); // jshint ignore:line
    assert.dom('form>button').exists({ count: 1 });
  });

  test('when a submit button is clicked the assigned submit action is fired', async function (assert) {
    let actionInvoked = false;
    this.set('actionCode', () => {
      actionInvoked = true;
    });

    // Template block usage:
    await render(hbs`
      {{#twbs-form submit=(action actionCode)}}
        <button class="btn btn-primary">Submit</button>
      {{/twbs-form}}
    `);

    assert.notOk(actionInvoked);
    assert.dom('form>button').exists({ count: 1 });
    await click('form>button');
    assert.ok(actionInvoked);
  });

  test('when a regular button is clicked the assigned submit action is NOT fired', async function (assert) {
    let actionInvoked = false;
    this.set('actionCode', () => {
      actionInvoked = true;
    });

    // Template block usage:
    await render(hbs`
      {{#twbs-form submit=(action actionCode)}}
        <button class="btn btn-primary" type="button">Just A Button Man</button>
      {{/twbs-form}}
    `);

    assert.notOk(actionInvoked);
    assert.dom('form>button').exists({ count: 1 });
    await click('form>button');
    assert.notOk(actionInvoked);
  });

  test('when a reset button is clicked the assigned reset action is fired', async function (assert) {
    let actionInvoked = false;
    this.set('actionCode', () => {
      actionInvoked = true;
    });

    // Template block usage:
    await render(hbs`
      {{#twbs-form reset=(action actionCode)}}
        <button class="btn btn-primary" type="reset">The Reset Button</button>
      {{/twbs-form}}
    `);

    assert.notOk(actionInvoked);
    assert.dom('form>button').exists({ count: 1 });
    await click('form>button');
    assert.ok(actionInvoked);
  });

  test('when a regular button is clicked the assigned reset action is NOT fired', async function (assert) {
    let actionInvoked = false;
    this.set('actionCode', () => {
      actionInvoked = true;
    });

    // Template block usage:
    await render(hbs`
      {{#twbs-form reset=(action actionCode)}}
        <button class="btn btn-primary" type="button">Just A Plain-Jane Button Dude</button>
      {{/twbs-form}}
    `);

    assert.notOk(actionInvoked);
    assert.dom('form>button').exists({ count: 1 });
    await click('form>button');
    assert.notOk(actionInvoked);
  });

  test('when the submit action is not bound, a submit button click does not error', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#twbs-form}}
        <button class="btn btn-primary">Submit</button>
      {{/twbs-form}}
    `);

    await click('form>button');

    assert.expect(0);
  });

  test('when the reset action is not bound, a submit button click does not error', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#twbs-form}}
        <button class="btn btn-primary" type="reset">Reset</button>
      {{/twbs-form}}
    `);

    await click('form>button');

    assert.expect(0);
  });
});
