import { expect, it, describe } from "vitest";
import { RegisterUseCase } from "./register";

import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { beforeEach } from "node:test";

// unit test: should not reach other components of the application, should not touch a db
let usersRepository: InMemoryUsersRepository;

let sut: RegisterUseCase;
describe("Register use cases", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      name: "luc",
      password: "1234",
      email: "luc@gmail.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("Should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "luc",
      password: "1234",
      email: "luc@gmail.com",
    });

    const isPasswordCorrectlyHashed = await compare("1234", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
  it("Shouldn't be able to register with the same email twice", async () => {
    const email = "luc@gmail.com";

    await sut.execute({
      name: "luc",
      password: "1234",
      email,
    });

    await expect(() =>
      sut.execute({
        name: "luc",
        password: "1234",
        email,
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
