import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hidden-submit', 'Integration | Component | hidden submit', {
  integration: true
});

test("button is classed with `hidden-submit` and bootstrap's `sr-only`", function (assert) {
  this.render(hbs`{{hidden-submit}}`);
  assert.ok(this.$('button').hasClass('hidden-submit'));
  assert.ok(this.$('button').hasClass('sr-only'));
});

test('button contains html comment concerning its purpose', function (assert) {
  this.render(hbs`{{hidden-submit}}`);
  assert.equal(this.$('button').html().trim(),
    '<!-- This hidden submit button is used to help trigger form submits by pressing enter while focused on inputs -->');
});
