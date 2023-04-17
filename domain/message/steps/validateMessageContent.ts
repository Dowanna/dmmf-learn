import * as E from 'fp-ts/Either';

import { createBrand } from '../../../brand';
import { MessageId } from '../parsistedMessage';
import { MessageLengthError } from '../objects/validMessageContent';

// export class ValidMessageContent {
//   private constructor(private readonly input: string) {}

//   public static generate(
//     input: string
//   ): E.Either<MessageLengthError, ValidMessageContent> {
//     return 140 <= input.length
//       ? E.left(new MessageLengthError('140文字以内で入力してください'))
//       : E.right(new ValidMessageContent(input));
//   }
// }
export type ValidMessageContent = Typed<
  'ValidMessageContent',
  {
    content: ValidMessageContent;
  }
>;
type CreatePostableMessage = (
  content: string
) => E.Either<MessageLengthError, PostableMessage>;
export const createPostableMessage: CreatePostableMessage = (content) => {
  return pipe(
    content,
    ValidMessageContent.generate,
    E.map((validContent) => {
      return {
        type: 'PostableMessage',
        content: validContent,
      };
    })
  );
};
