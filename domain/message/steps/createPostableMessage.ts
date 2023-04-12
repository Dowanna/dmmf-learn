import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { Typed } from '../../../typed';
import {
  MessageLengthError,
  ValidMessageContent,
} from '../objects/validMessageContent';

export type PostableMessage = Typed<
  'PostableMessage',
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
