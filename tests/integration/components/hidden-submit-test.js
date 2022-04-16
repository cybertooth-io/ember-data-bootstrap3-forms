import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | hidden submit', function (hooks) {
  setupRenderingTest(hooks);

  test("button is classed with `hidden-submit` and bootstrap's `sr-only`", async function (assert) {
    await render(hbs`{{hidden-submit}}`);
    assert.dom('button').hasClass('hidden-submit');
    assert.dom('button').hasClass('sr-only');
  });

  test('button contains html comment concerning its purpose', async function (assert) {
    await render(hbs`{{hidden-submit}}`);
    assert.equal(
      find('button').innerHTML.trim(),
      '<!-- This hidden submit button is used to help trigger form submits by pressing enter while focused on inputs -->'
    );
  });
});
