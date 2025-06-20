/**
 * This method returns the body of a single iframe that matches the given selector and checking the visibility of it.
 * It will only work when there is ONE iframe on the page.
 * The function is a Parent Cypress command, so it can be used in a test like this:
 * @param {string} iFrameSelectorCSS - The selector for the iframe you want to get the body of.
 * @example cy.enterIframeBody("iframe").within(($iFrameBody)=>{
 * cy.get("selector within the iframe").should("be.visible");
 * })
 * @returns The body of the iframe as a chainable Cypress command to keep interacting with elements within. This should be used with a `within(($iFrame)=>{...}) command to continue with the desired behaviors.
 */
Cypress.Commands.add("enterIframeBody", (iFrameSelectorCSS) => {
	cy.log(`Entering iFrame ${iFrameSelectorCSS}`);
	return cy
		.get(iFrameSelectorCSS)
		.last()
		.should("exist")
		.scrollIntoView()
		.should("be.visible")
		.its("0.contentDocument")
		.should("exist")
		.its("body")
		.should("not.be.empty")
		.then(cy.wrap);
});
