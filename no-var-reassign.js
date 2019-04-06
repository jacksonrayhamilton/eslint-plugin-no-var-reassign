"use strict"
var astUtils = require("eslint/lib/util/ast-utils")
module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      noVarReassign: "'{{name}}' should not be reassigned."
    }
  },
  create(context) {
    function checkVariable(variable) {
      astUtils.getModifyingReferences(variable.references).forEach(reference => {
        context.report({ node: reference.identifier, messageId: "noVarReassign", data: { name: reference.identifier.name } })
      })
    }
    return {
      VariableDeclaration(node) {
        if (node.kind === "var") {
          context.getDeclaredVariables(node).forEach(checkVariable)
        }
      }
    }
  }
}
