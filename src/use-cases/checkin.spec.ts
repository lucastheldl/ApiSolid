import { expect, it, describe, beforeEach } from "vitest";

import { CheckinUseCase } from "./checkins";
import { InMemoryCheckInRepository } from "@repositories/in-memory/in-memory-checkins-repository";

// unit test: should not reach other components of the application, should not touch a db
let checkInsRepository: InMemoryCheckInRepository;

let sut: CheckinUseCase;
describe("Check-in use cases", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new CheckinUseCase(checkInsRepository);
  });

  it("Should be able to check in", async () => {
    const { checkin } = await sut.execute({
      userId: "luc",
      gymId: "gym-01",
    });

    expect(checkin.id).toEqual(expect.any(String));
  });
});
