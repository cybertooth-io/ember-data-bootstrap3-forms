# ember-data-bootstrap3-forms

[![npm version](http://badge.fury.io/js/ember-data-bootstrap3-forms.svg)](http://badge.fury.io/js/ember-data-bootstrap3-forms) ![downloads](https://img.shields.io/npm/dy/ember-data-bootstrap3-forms.svg) [![Code Climate](http://codeclimate.com/github/cybertoothca/ember-data-bootstrap3-forms/badges/gpa.svg)](http://codeclimate.com/github/cybertoothca/ember-data-bootstrap3-forms)

[![ember-observer-badge](http://emberobserver.com/badges/ember-data-bootstrap3-forms.svg)](http://emberobserver.com/addons/ember-data-bootstrap3-forms) [![License](http://img.shields.io/npm/l/ember-data-bootstrap3-forms.svg)](LICENSE.md)

This addon helps present your Ember-Data model errors in a consistent fashion using Bootstrap3 alerts and help-blocks.

## Compatibility

- Ember.js v2.18 or above
- Ember CLI v2.13 or above
- Node.js v8 or above

* Ember Data - the `twbs-errors-alert` & `twbs-form-group` components depend on Ember Data's
  modeling of errors.
* You should have Bootstrap 3.x

## Installation

```
ember install ember-data-bootstrap3-forms
```

**As mentioned, you should install Bootstrap3 in order for the correct styling to be applied. Refer to the
requirements section above.**

## Demo

The demonstration web application can be found here:
[http://ember-data-bootstrap3-forms.cybertooth.io/](http://ember-data-bootstrap3-forms.cybertooth.io/).

## What Does This Addon Do?

This addon supplies the following _components_:

- [`{{twbs-errors-alert}}`](#twbs-errors-alert) - a component that listens to a single model's errors
  and prepares a bootstrap alert box with the fields you want in a bulleted list.
- [`{{twbs-form}}`](#twbs-form) - a component that creates a form element that you can easily bind
  the submit and reset action to. Then all you need to do is add a submit and/or reset button to your
  form.
- [`{{twbs-form-group}}`](#twbs-form-group) - a component generating a Bootstrap
  `<div class="form-group">...</div>` that has intelligence built in to detect when it's
  field enters the error-state; the `.has-error` class will be applied and error messages will be
  appended to the bottom of the component's template.

_Further information about these items can be found in the Usage section below._

## Usage

As mentioned above there are several examples on the demonstration site:
[http://ember-data-bootstrap3-forms.cybertooth.io/](http://ember-data-bootstrap3-forms.cybertooth.io/)

### Components

#### `{{twbs-form}}`

A standard HTML form with the Bootstrap3 `.form` class assigned. Provide a block
with all the form-groups and inputs that you want inside the form container. The
`twbs-form` component accepts a `submit` and `reset` property both of which
should take in a closure function.

##### Arguments

- `submit` (OPTIONAL) - the action that will be fired if the form happens to
  be submitted by a basic submit button or by pressing enter while focused on
  an input. Ideal for posting model changes.
- `reset` (OPTIONAL) - the action the will be fired when the form is reset by
  clicking on a basic reset button. Ideal for rolling back model changes.

###### Examples

[Check out the demo application](http://ember-data-bootstrap3-forms.cybertooth.io/)

#### `{{twbs-errors-alert}}`

A Bootstrap3 _alert_ box that contains a list of model errors. You provide a block to the component, it will be
placed in a paragraph element just above the unordered-list of errors. When the model does not have any errors,
the alert will not be visible.

##### Arguments

- `model` (**REQUIRED**) - the supplied model's `DS.Errors` collection is the source for the list of errors presented
  in the alert.
- `excludes` (OPTIONAL) - a comma-separated list of the camelCased attribute names from the model whose errors
  will be ignored and not presented in the list. **If you specify both an `includes` and `excludes` argument, the
  `excludes` argument always takes precedence.**
- `includes` (OPTIONAL) - a comma-separated list of the camelCased attribute names from the model whose errors
  should be included in the list.
- `classNames` (OPTIONAL) - use the `classNames` argument to pass an alert style to the errors alert. For example,
  `alert-danger` or `alert-warning`.

##### Examples

[Check out the demo application](http://ember-data-bootstrap3-forms.cybertooth.io/)

#### `{{twbs-form-group}}`

A Bootstrap 3 `.form-group` that accepts a model's errors for a given field
and listens for field errors in order to apply the danger colour and produce
the list of error messages below the form itself.

To understand how this works, familiarize yourself with [Bootstrap 3's form validation
states](http://getbootstrap.com/css/#forms-control-validation). Also recognize
that Ember Data model errors can be viewed from a field's perspective and this
component is watching that particular view of the errors.

##### Arguments

- `fieldErrors` (**REQUIRED**) - the model's errors collection for a specific
  field. For example, if your model has a field named `firstName` you would pass
  the following: `model.errors.firstName`.

##### Examples

[Check out the demo application](http://ember-data-bootstrap3-forms.cybertooth.io/)

### Troubleshooting And Tips

1. Do you have Ember Data in your application and are using it for your data modeling?
1. Is Bootstrap 3 installed? As the addon's name states, this isn't Bootstrap 4 ready.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
