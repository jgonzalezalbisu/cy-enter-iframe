# cy-enter-iframe

A custom Cypress command to handle interactions of elements within an iframe

## Description

`cy-enter-iframe` is a Cypress custom command that simplifies working with iframes in your end to end tests. This plugin provides a reliable way to access and interact with elements inside iframes by returning the iframe's body as a chainable Cypress command.

The command handles common iframe challenges such as:
- Waiting for iframe content to load
- Ensuring iframe visibility
- Accessing the iframe's document content
- Providing a chainable interface for seamless testing

