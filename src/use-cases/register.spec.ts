import { expect, it, describe } from "vitest";
import { RegisterUseCase } from "./register";

import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

// unit test: should not reach other components of the application, should not touch a db
describe("Register use cases", () => {
  it("Should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "luc",
      password: "1234",
      email: "luc@gmail.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("Should hash user password upon registration", async () => {
    const usersRepository = new InMemoryUsersRepository();

    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "luc",
      password: "1234",
      email: "luc@gmail.com",
    });

    const isPasswordCorrectlyHashed = await compare("1234", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("Shouldn't be able to register with the same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "luc@gmail.com";

    await registerUseCase.execute({
      name: "luc",
      password: "1234",
      email,
    });

    await expect(() =>
      registerUseCase.execute({
        name: "luc",
        password: "1234",
        email,
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
