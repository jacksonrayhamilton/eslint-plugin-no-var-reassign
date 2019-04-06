"use strict"
var rule = require("./no-var-reassign")
var RuleTester = require("eslint").RuleTester
var ruleTester = new RuleTester
ruleTester.run("no-var-reassign", rule, {
  valid: [
    {
      code: "var foo = 1; foo"
    },
    {
      code: "var foo = 1; var foo = 2"
    }
  ],
  invalid: [
    {
      code: "var foo; foo = 1",
      errors: [{ message: "'foo' should not be reassigned." }]
    },
    {
      code: "var foo = 1; foo = 2",
      errors: [{ message: "'foo' should not be reassigned." }]
    }
  ]
})
