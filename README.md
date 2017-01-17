# ember-data-bootstrap3-forms [![GitHub version](http://badge.fury.io/gh/cybertoothca%2Fember-data-bootstrap3-forms.svg)](http://badge.fury.io/gh/cybertoothca%2Fember-data-bootstrap3-forms) ![](http://embadge.io/v1/badge.svg?start=1.13.0)

[![npm version](http://badge.fury.io/js/ember-data-bootstrap3-forms.svg)](http://badge.fury.io/js/ember-data-bootstrap3-forms) [![CircleCI](http://circleci.com/gh/cybertoothca/ember-data-bootstrap3-forms.svg?style=shield)](http://circleci.com/gh/cybertoothca/ember-data-bootstrap3-forms) [![Code Climate](http://codeclimate.com/github/cybertoothca/ember-data-bootstrap3-forms/badges/gpa.svg)](http://codeclimate.com/github/cybertoothca/ember-data-bootstrap3-forms) ![Dependencies](http://david-dm.org/cybertoothca/ember-data-bootstrap3-forms.svg) [![ember-observer-badge](http://emberobserver.com/badges/ember-data-bootstrap3-forms.svg)](http://emberobserver.com/addons/ember-data-bootstrap3-forms) [![License](http://img.shields.io/npm/l/ember-data-bootstrap3-forms.svg)](LICENSE.md)

This addon helps present your Ember-Data model errors in a consistent fashion using Bootstrap3 alerts and help-blocks.

## Demo

The demonstration web application can be found here:
[http://ember-data-bootstrap3-forms.cybertooth.io/](http://ember-data-bootstrap3-forms.cybertooth.io/). 

## What Does This Addon Do?

This addon supplies the following _components_:

* [`{{twbs-errors-alert}}`](#twbs-errors-alert) - a component that listens to a single model's errors and prepares a bootstrap alert box
with all of the items in an unordered list.
* `{{twbs-errors-alert-dismissable}}` - _COMING SOON_
* [`{{twbs-form-group}}`](#twbs-form-group) - a component generating a Bootstrap `<div class="form-group">...</div>` that will watch
for errors on a particular field and then apply the `.has-error` class.

_Further information about these items can be found in the Usage section below._

## Requirements

* Ember >= 1.13.0
* Ember CLI
* You should have Bootstrap 3.x installed in your Ember application.  Feel free to use the
  [ember-cli-bootstrap3-sass](http://emberobserver.com/addons/ember-cli-bootstrap3-sass)
  addon to setup Bootstrap if you haven't already done so.

## Installation

The following will install this addon:

    $ ember install ember-data-bootstrap3-forms

**As mentioned, you should install Bootstrap3 in order for the correct styling to be applied.  Refer to the 
requirements section above.**

### Upgrading

When working through the Ember upgrade process, I recommend
invoking the `ember install ember-data-bootstrap3-forms` command following the upgrade.  This should get you 
the latest version of the addon.

## Usage

As mentioned above there are several examples on the demonstration site:
[http://ember-data-bootstrap3-forms.cybertooth.io/](http://ember-data-bootstrap3-forms.cybertooth.io/)

### Components

#### `{{twbs-errors-alert}}`

A Bootstrap3 _alert_ box that contains a list of model errors.  You provide a block to the component, it will be
placed in a paragraph element just above the unordered-list of errors.  When the model does not have any errors, 
the alert will not be visible. 

##### Arguments

* `model` (**REQUIRED**) - the supplied model's `DS.Errors` collection is the source for the list of errors presented
in the alert.
* `excludes` (OPTIONAL) - a comma-separated list of the camelCased attribute names from the model whose errors
will be ignored and not presented in the list.  **If you specify both an `includes` and `excludes` argument, the 
`excludes` argument always takes precedence.**
* `includes` (OPTIONAL) - a comma-separated list of the camelCased attribute names from the model whose errors
should be included in the list.
* `classNames` (OPTIONAL) - use the `classNames` argument to pass an alert style to the errors alert.  For example,
`alert-danger` or `alert-warning`.

##### Examples

[Check out the demo application](http://ember-data-bootstrap3-forms.cybertooth.io/)

#### `{{twbs-errors-alert-dismissable}}`

_COMING SOON_

##### Arguments

##### Examples

[Check out the demo application](http://ember-data-bootstrap3-forms.cybertooth.io/)

#### `{{twbs-form-group}}`

A Bootstrap 3 `.form-group` that accepts a model's errors for a given field
and listens for field errors in order to apply the danger colour and produce
the list of error messages below the form itself.

##### Arguments

* `fieldErrors` (**REQUIRED**) - the model's errors collection for a specific
field.  For example, if your model has a field named `firstName` you would pass
the following: `model.errors.firstName`.

##### Examples

[Check out the demo application](http://ember-data-bootstrap3-forms.cybertooth.io/)

### Troubleshooting And Tips

1.

---

# Ember Addon Building And Testing

## Setup

* `git clone git@github.com:cybertoothca/ember-data-bootstrap3-forms.git`
* `npm install`
* `bower install`

## Running The Dummy Application

* `ember server`
* Visit your app at http://localhost:4200.

## Running Addon Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building The Addon

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

# Linking This Addon For Local Testing

## Linking

1. From the command line at the root of __this__ project run the
`npm link` command to _link_ this addon within your local
node repository.
1. From the _other_ Ember project that you wish to test this addon
in, execute the following command:
`npm link ember-data-bootstrap3-forms`.
1. Now in that same _other_ Ember project, you should go into the
`package.json` and add the ember addon with the version _*_.  It will
look something like this: `"ember-data-bootstrap3-forms": "*"`.  Now
when/if you execute `npm install` on this _other_ project it
will know to look for the linked addon rather than fetch it from
the central repository.

## Unlinking

1. Remove the addon from your local node repository with the following
command (that can be run anywhere):
`npm uninstall -g ember-data-bootstrap3-forms`
1. Remove the reference to the `ember-data-bootstrap3-forms`
in your _other_ project's `package.json`.
1. Run an `npm prune` and `bower prune` from the root of your _other_ project's command line.

# Deploying The Dummy Application

Make sure your `~/.aws/credentials` file has a profile named _cybertooth_ 
with a valid key and secret,

    [cybertooth]
    aws_access_key_id = <KEY>
    aws_secret_access_key = <SECRET>

Deploy by invoking the following command: `ember deploy production`

Confirm your changes are showing up in our S3 container: http://ember-data-bootstrap3-forms.cybertooth.io/
