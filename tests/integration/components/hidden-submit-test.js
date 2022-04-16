import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

import { render } from '@ember/test-helpers';

module('Integration | Component | hidden submit', function (hooks) {
  setupRenderingTest(hooks);

  test("button is classed with `hidden-submit` and bootstrap's `sr-only`", async function (assert) {
    await render(hbs`{{hidden-submit}}`);
    assert.dom('button').hasClass('hidden-submit');
    assert.dom('button').hasClass('sr-only');
  });

  test('button contains html comment concerning its purpose', async function (assert) {
    await render(hbs`{{hidden-submit}}`);
    assert.dom('button').hasNoText();
  });
});
