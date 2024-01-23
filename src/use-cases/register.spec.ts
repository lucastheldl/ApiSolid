import { expect, it, describe } from "vitest";
import { RegisterUseCase } from "./register";

import { compare } from "bcryptjs";

// unit test: should not reach other components of the application, should not touch a db
describe("Register use cases", () => {
  it("Should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },
      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: "luc",
      password: "1234",
      email: "luc@gmail.com",
    });

    const isPasswordCorrectlyHashed = await compare("1234", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
