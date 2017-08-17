import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('twbs-errors-alert', 'Integration | Component | twbs errors alert', {
  integration: true,
  beforeEach() {
    this.inject.service('store');
  }
});

test('when no errors are present the alert div is hidden', function (assert) {
  this.render(hbs`{{twbs-errors-alert}}`);
  assert.equal(this.$('.alert').css('display'), 'none');
});

test('when no errors are present but the includes was supplied the alert div is hidden', function (assert) {
  this.render(hbs`{{twbs-errors-alert includes='base'}}`);
  assert.equal(this.$('.alert').css('display'), 'none');
});

test('when no errors are present but the excludes was supplied the alert div is hidden', function (assert) {
  this.render(hbs`{{twbs-errors-alert excludes='base'}}`);
  assert.equal(this.$('.alert').css('display'), 'none');
});

test('when passed a block it is placed inside the p element', function (assert) {
  Ember.run(() => {
    this.set('model', this.store.createRecord('demo-model'));
  });

  this.render(hbs`
    {{#twbs-errors-alert model=model}}Look at these errors{{/twbs-errors-alert}}
  `);
  assert.equal(this.$('p').text().trim(), 'Look at these errors');
});

test('when passed a model with some errors', function (assert) {
  Ember.run(() => {
    this.set('model', this.store.createRecord('demo-model'));
    this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
    this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
    this.get('model.errors')._add('someString', 'An error in the someString field.');
  });

  this.render(hbs`{{twbs-errors-alert model=model}}`);
  assert.equal(this.$('li').length, 3);
  assert.equal(this.$('li:eq(0)').text().trim(), 'An error in the someBoolean field.');
  assert.equal(this.$('li:eq(1)').text().trim(), 'An error in the someNumber field.');
  assert.equal(this.$('li:eq(2)').text().trim(), 'An error in the someString field.');
});

test('when including only the someString errors', function (assert) {
  Ember.run(() => {
    this.set('model', this.store.createRecord('demo-model'));
    this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
    this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
    this.get('model.errors')._add('someString', 'An error in the someString field.');
  });

  this.render(hbs`{{twbs-errors-alert model=model includes="someString"}}`);
  assert.equal(this.$('li').length, 1);
  assert.equal(this.$('li:eq(0)').text().trim(), 'An error in the someString field.');
});

test('when including multiple error fields', function (assert) {
  Ember.run(() => {
    this.set('model', this.store.createRecord('demo-model'));
    this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
    this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
    this.get('model.errors')._add('someString', 'An error in the someString field.');
  });

  this.render(hbs`{{twbs-errors-alert model=model includes="someNumber,someString"}}`);
  assert.equal(this.$('li').length, 2);
  assert.equal(this.$('li:eq(0)').text().trim(), 'An error in the someNumber field.');
  assert.equal(this.$('li:eq(1)').text().trim(), 'An error in the someString field.');
});

test('when excluding the someNumber errors', function (assert) {
  Ember.run(() => {
    this.set('model', this.store.createRecord('demo-model'));
    this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
    this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
    this.get('model.errors')._add('someString', 'An error in the someString field.');
  });

  this.render(hbs`{{twbs-errors-alert model=model excludes="someNumber"}}`);
  assert.equal(this.$('li').length, 2);
  assert.equal(this.$('li:eq(0)').text().trim(), 'An error in the someBoolean field.');
  assert.equal(this.$('li:eq(1)').text().trim(), 'An error in the someString field.');
});


test('when excluding multiple error fields', function (assert) {
  Ember.run(() => {
    this.set('model', this.store.createRecord('demo-model'));
    this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
    this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
    this.get('model.errors')._add('someString', 'An error in the someString field.');
  });

  this.render(hbs`{{twbs-errors-alert model=model excludes="someBoolean,someNumber"}}`);
  assert.equal(this.$('li').length, 1);
  assert.equal(this.$('li:eq(0)').text().trim(), 'An error in the someString field.');
});

test('when excluding and including at the same time, exclusions take precedence', function (assert) {
  Ember.run(() => {
    this.set('model', this.store.createRecord('demo-model'));
    this.get('model.errors')._add('someBoolean', 'An error in the someBoolean field.');
    this.get('model.errors')._add('someNumber', 'An error in the someNumber field.');
    this.get('model.errors')._add('someString', 'An error in the someString field.');
  });

  this.render(hbs`{{twbs-errors-alert model=model excludes="someNumber" includes="someNumber"}}`);
  assert.equal(this.$('li').length, 2);
  assert.equal(this.$('li:eq(0)').text().trim(), 'An error in the someBoolean field.');
  assert.equal(this.$('li:eq(1)').text().trim(), 'An error in the someString field.');
});
