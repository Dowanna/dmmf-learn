import * as E from "fp-ts/Either";

export class MessageLengthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MessageLengthError";
    }
  }

export class ValidMessageContent {
    private constructor(private readonly input: string) {}

    public static generate(input: string): E.Either<MessageLengthError, ValidMessageContent> {
      return 140 <= input.length
        ? E.left(new MessageLengthError("140文字以内で入力してください"))
        : E.right(new ValidMessageContent(input));
    }

    public static reconstruct(input: string): ValidMessageContent {
      return new ValidMessageContent(input);
    }
  }
