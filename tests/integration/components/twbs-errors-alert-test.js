import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

import { run } from '@ember/runloop';
import { findAll, render } from '@ember/test-helpers';

module('Integration | Component | twbs errors alert', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.store = this.owner.lookup('service:store');
  });

  test('when no errors are present the alert div is hidden', async function (assert) {
    await render(hbs`{{twbs-errors-alert}}`);
    assert.equal(this.$('.alert').css('display'), 'none');
  });

  test('when no errors are present but the includes was supplied the alert div is hidden', async function (assert) {
    await render(hbs`{{twbs-errors-alert includes='base'}}`);
    assert.equal(this.$('.alert').css('display'), 'none');
  });

  test('when no errors are present but the excludes was supplied the alert div is hidden', async function (assert) {
    await render(hbs`{{twbs-errors-alert excludes='base'}}`);
    assert.equal(this.$('.alert').css('display'), 'none');
  });

  test('when passed a block it is placed inside the p element', async function (assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
    });

    await render(hbs`
      {{#twbs-errors-alert model=model}}Look at these errors{{/twbs-errors-alert}}
    `);
    assert.dom('p').hasText('Look at these errors');
  });

  test('when passed a model with some errors', async function (assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model}}`);
    assert.dom('li').exists({ count: 3 });
    assert.dom('li').hasText('An error in the someBoolean field.');
    assert.dom(findAll('li')[1]).hasText('An error in the someNumber field.');
    assert.dom(findAll('li')[2]).hasText('An error in the someString field.');
  });

  test('when including only the someString errors', async function (assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model includes="someString"}}`);
    assert.dom('li').exists({ count: 1 });
    assert.dom('li').hasText('An error in the someString field.');
  });

  test('when including multiple error fields', async function (assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model includes="someNumber,someString"}}`);
    assert.dom('li').exists({ count: 2 });
    assert.dom('li').hasText('An error in the someNumber field.');
    assert.dom(findAll('li')[1]).hasText('An error in the someString field.');
  });

  test('when excluding the someNumber errors', async function (assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model excludes="someNumber"}}`);
    assert.dom('li').exists({ count: 2 });
    assert.dom('li').hasText('An error in the someBoolean field.');
    assert.dom(findAll('li')[1]).hasText('An error in the someString field.');
  });

  test('when excluding multiple error fields', async function (assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model excludes="someBoolean,someNumber"}}`);
    assert.dom('li').exists({ count: 1 });
    assert.dom('li').hasText('An error in the someString field.');
  });

  test('when excluding and including at the same time, exclusions take precedence', async function (assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model excludes="someNumber" includes="someNumber"}}`);
    assert.dom('li').exists({ count: 2 });
    assert.dom('li').hasText('An error in the someBoolean field.');
    assert.dom(findAll('li')[1]).hasText('An error in the someString field.');
  });
});
