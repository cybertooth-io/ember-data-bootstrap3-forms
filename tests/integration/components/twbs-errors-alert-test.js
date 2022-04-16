import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | twbs errors alert', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
  });

  test('when no errors are present the alert div is hidden', async function(assert) {
    await render(hbs`{{twbs-errors-alert}}`);
    assert.equal(this.$('.alert').css('display'), 'none');
  });

  test('when no errors are present but the includes was supplied the alert div is hidden', async function(assert) {
    await render(hbs`{{twbs-errors-alert includes='base'}}`);
    assert.equal(this.$('.alert').css('display'), 'none');
  });

  test('when no errors are present but the excludes was supplied the alert div is hidden', async function(assert) {
    await render(hbs`{{twbs-errors-alert excludes='base'}}`);
    assert.equal(this.$('.alert').css('display'), 'none');
  });

  test('when passed a block it is placed inside the p element', async function(assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
    });

    await render(hbs`
      {{#twbs-errors-alert model=model}}Look at these errors{{/twbs-errors-alert}}
    `);
    assert.equal(find('p').textContent.trim(), 'Look at these errors');
  });

  test('when passed a model with some errors', async function(assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model}}`);
    assert.equal(findAll('li').length, 3);
    assert.equal(find('li').textContent.trim(), 'An error in the someBoolean field.');
    assert.equal(find(findAll('li')[1]).textContent.trim(), 'An error in the someNumber field.');
    assert.equal(find(findAll('li')[2]).textContent.trim(), 'An error in the someString field.');
  });

  test('when including only the someString errors', async function(assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model includes="someString"}}`);
    assert.equal(findAll('li').length, 1);
    assert.equal(find('li').textContent.trim(), 'An error in the someString field.');
  });

  test('when including multiple error fields', async function(assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model includes="someNumber,someString"}}`);
    assert.equal(findAll('li').length, 2);
    assert.equal(find('li').textContent.trim(), 'An error in the someNumber field.');
    assert.equal(find(findAll('li')[1]).textContent.trim(), 'An error in the someString field.');
  });

  test('when excluding the someNumber errors', async function(assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model excludes="someNumber"}}`);
    assert.equal(findAll('li').length, 2);
    assert.equal(find('li').textContent.trim(), 'An error in the someBoolean field.');
    assert.equal(find(findAll('li')[1]).textContent.trim(), 'An error in the someString field.');
  });


  test('when excluding multiple error fields', async function(assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model excludes="someBoolean,someNumber"}}`);
    assert.equal(findAll('li').length, 1);
    assert.equal(find('li').textContent.trim(), 'An error in the someString field.');
  });

  test('when excluding and including at the same time, exclusions take precedence', async function(assert) {
    run(() => {
      this.set('model', this.store.createRecord('demo-model'));
      this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
      this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
      this.get('model.errors')._add('someString', 'An error in the someString field.');
    });

    await render(hbs`{{twbs-errors-alert model=model excludes="someNumber" includes="someNumber"}}`);
    assert.equal(findAll('li').length, 2);
    assert.equal(find('li').textContent.trim(), 'An error in the someBoolean field.');
    assert.equal(find(findAll('li')[1]).textContent.trim(), 'An error in the someString field.');
  });
});
