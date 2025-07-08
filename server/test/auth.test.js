const { expect } = require("chai");
const mongoose = require("mongoose");
const { registerService, loginService } = require("../services/authService");

before(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe("Auth Service", () => {
  describe("Register", () => {
    it("Should create a new user", async () => {
      const result = await registerService({
        username: "Unit Tester",
        email: "unittest@example.com",
        password: "Test@123",
      });

      expect(result).to.have.property("email").equal("unittest@example.com");
      expect(result).to.have.property("username");
      expect(result).to.have.property("password");
    });
  });

  describe("Login", () => {
    it("Should login the user and return token", async () => {
      await registerService({
        username: "Unit Tester",
        email: "unittest@example.com",
        password: "Test@123",
      });
      const result = await loginService({
        email: "unittest@example.com",
        password: "Test@123",
      });
      expect(result).to.have.property("token");
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
