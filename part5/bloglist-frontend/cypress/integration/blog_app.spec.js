describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "kerman07",
      name: "Kerim",
      password: "weak",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#login-form").should("be.visible");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("kerman07");
      cy.get("#password").type("weak");
      cy.get("#login").click();
      cy.contains("Kerim logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("kerman07");
      cy.get("#password").type("weakly");
      cy.get("#login").click();
      cy.contains("wrong username or password");
      cy.contains("wrong username or password").should(
        "have.css",
        "border-color",
        "rgb(255, 0, 0)"
      );
    });
  });
});
