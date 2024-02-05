import { expect, it, describe, beforeEach } from "vitest";

import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@repositories/in-memory/in-memory-users-repository";

import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

// unit test: should not reach other components of the application, should not touch a db
// sut: System under test| design pattern
let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;
describe("Get profile use cases", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Lucas",
      password_hash: await hash("1234", 5),
      email: "luc@gmail.com",
    });

    const { user } = await sut.execute({
      id: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Lucas");
  });

  it("Should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        id: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
