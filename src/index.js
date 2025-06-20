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
