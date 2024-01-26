import { expect, it, describe, beforeEach } from "vitest";

import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

// unit test: should not reach other components of the application, should not touch a db
// sut: System under test| design pattern
let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;
describe("Authenticate use cases", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("Should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Lucas",
      password_hash: await hash("1234", 5),
      email: "luc@gmail.com",
    });

    const { user } = await sut.execute({
      password: "1234",
      email: "luc@gmail.com",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        password: "1234",
        email: "luc@gmail.com",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Lucas",
      password_hash: await hash("1234", 5),
      email: "luc@gmail.com",
    });

    await expect(() =>
      sut.execute({
        password: "123423",
        email: "luc@gmail.com",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
