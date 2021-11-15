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

  describe("When logged in ", function () {
    beforeEach(function () {
      cy.login({ username: "kerman07", password: "weak" });
    });

    it("A blog can be created", function () {
      cy.contains("Create new Blog").click();
      cy.get("#title").type("mock");
      cy.get("#author").type("test");
      cy.get("#url").type("test");
      cy.contains("Create").click();

      cy.contains("a new blog mock by test added");
      cy.contains("mock test");
    });

    describe("and blogs are present", function () {
      beforeEach(function () {
        cy.createBlog({ title: "blog1", author: "kera", url: "test" });
        cy.createBlog({ title: "blog2", author: "keroni", url: "test" });
        cy.createBlog({ title: "blog3", author: "kerisimus", url: "test" });
      });

      it("can like a blog", function () {
        cy.contains("view").click();
        cy.contains("likes 0").contains("like").click();
        cy.contains("likes 1");
      });

      it("can delete a blog created by same user", function () {
        cy.contains("view").click();
        cy.contains("remove");
      });

      it("can't delete a blog created by other user", function () {
        cy.contains("Logout").click();
        const user2 = {
          username: "nekky",
          name: "Nermina",
          password: "weak",
        };
        cy.request("POST", "http://localhost:3003/api/users", user2);
        cy.login({ username: "nekky", password: "weak" });

        cy.contains("view").click();
        cy.contains("remove").should("not.exist");
      });
    });
  });
});
