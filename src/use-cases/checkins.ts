import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { CheckIn } from "@prisma/client";
import { CheckinsRepository } from "@repositories/check-ins-repository";

interface CheckinUseCaseRequest {
  userId: string;
  gymId: string;
}
interface CheckinUseCaseResponse {
  checkin: CheckIn;
}

export class CheckinUseCase {
  constructor(private checkinsRepository: CheckinsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkin = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    if (!checkin) {
      throw new InvalidCredentialsError();
    }

    return { checkin };
  }
}
