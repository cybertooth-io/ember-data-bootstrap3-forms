import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('twbs-form', 'Integration | Component | twbs form', {
  integration: true
});

test('when block supplied it is inside the form element', function (assert) {
  // Template block usage:
  this.render(hbs`
    {{#twbs-form}}
      <button class="btn btn-primary">Submit</button>
    {{/twbs-form}}
  `);

  assert.equal(this.$('form').length, 1);
  assert.equal(this.$('form').attr('action'), 'javascript:void(0);'); // jshint ignore:line
  assert.equal(this.$('form>button').length, 1);
});

test('when a submit button is clicked the assigned submit action is fired', function (assert) {
  let actionInvoked = false;
  this.set('actionCode', () => {
    actionInvoked = true;
  });

  // Template block usage:
  this.render(hbs`
    {{#twbs-form submit=(action actionCode)}}
      <button class="btn btn-primary">Submit</button>
    {{/twbs-form}}
  `);

  assert.notOk(actionInvoked);
  assert.equal(this.$('form>button').length, 1);
  this.$('form>button').trigger('click');
  assert.ok(actionInvoked);
});

test('when a regular button is clicked the assigned submit action is NOT fired', function (assert) {
  let actionInvoked = false;
  this.set('actionCode', () => {
    actionInvoked = true;
  });

  // Template block usage:
  this.render(hbs`
    {{#twbs-form submit=(action actionCode)}}
      <button class="btn btn-primary" type="button">Just A Button Man</button>
    {{/twbs-form}}
  `);

  assert.notOk(actionInvoked);
  assert.equal(this.$('form>button').length, 1);
  this.$('form>button').trigger('click');
  assert.notOk(actionInvoked);
});

test('when a reset button is clicked the assigned reset action is fired', function (assert) {
  let actionInvoked = false;
  this.set('actionCode', () => {
    actionInvoked = true;
  });

  // Template block usage:
  this.render(hbs`
    {{#twbs-form reset=(action actionCode)}}
      <button class="btn btn-primary" type="reset">The Reset Button</button>
    {{/twbs-form}}
  `);

  assert.notOk(actionInvoked);
  assert.equal(this.$('form>button').length, 1);
  this.$('form>button').trigger('click');
  assert.ok(actionInvoked);
});

test('when a regular button is clicked the assigned reset action is NOT fired', function (assert) {
  let actionInvoked = false;
  this.set('actionCode', () => {
    actionInvoked = true;
  });

  // Template block usage:
  this.render(hbs`
    {{#twbs-form reset=(action actionCode)}}
      <button class="btn btn-primary" type="button">Just A Plain-Jane Button Dude</button>
    {{/twbs-form}}
  `);

  assert.notOk(actionInvoked);
  assert.equal(this.$('form>button').length, 1);
  this.$('form>button').trigger('click');
  assert.notOk(actionInvoked);
});

test('when the submit action is not bound, a submit button click does not error', function (assert) {
  // Template block usage:
  this.render(hbs`
    {{#twbs-form}}
      <button class="btn btn-primary">Submit</button>
    {{/twbs-form}}
  `);

  this.$('form>button').trigger('click');

  assert.expect(0);
});

test('when the reset action is not bound, a submit button click does not error', function (assert) {
  // Template block usage:
  this.render(hbs`
    {{#twbs-form}}
      <button class="btn btn-primary" type="reset">Reset</button>
    {{/twbs-form}}
  `);

  this.$('form>button').trigger('click');

  assert.expect(0);
});
