import * as E from "fp-ts/Either";
import { Brand, createBrand } from "../../../brand";
import { pipe } from "fp-ts/lib/function";
import { isGreaterThan, isLessThanOrEqualTo } from "../../../util/validations";
import { Task } from "fp-ts/lib/Task";

export type CreateValidMessageContentError = MessageMinLengthError | MessageMaxLengthError;

export class MessageMinLengthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MessageMinLengthError";
    }
  }

export class MessageMaxLengthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MessageMaxLengthError";
    }
  }

const BRAND_NAME = "ValidMessageContent" as const;
export type ValidMessageContent = Brand<typeof BRAND_NAME, string>

const checkNgWords = (ngWords: string[]) => (input: string) => {
  const isNgWord = (ngWord: string) => input.includes(ngWord)
  return ngWords.some(isNgWord)
}

type GetNgWords = () => Task<string[]>;

export const createValidMessageContent: (getNGWords: GetNgWords) => (input: string) => E.Either<CreateValidMessageContentError, ValidMessageContent> = (ngWords) => (input) => {
  const returnPipe = pipe(
    input,
    E.fromPredicate(isLessThanOrEqualTo(140), () => new MessageMinLengthError("140文字以内で入力してください")),
    E.chainW(
      E.fromPredicate(isGreaterThan(0), () => new MessageMaxLengthError("0文字より多く入力してください")),
    ),
    E.chainW(
      pipe(
        getNGWords(),
        E.fromPredicate(checkNgWords(), () => new MessageMaxLengthError("NGワードが含まれています")),
      )
    ),
    E.map((input) => 
      createBrand(BRAND_NAME, input)
    )
  )
  return returnPipe
}
