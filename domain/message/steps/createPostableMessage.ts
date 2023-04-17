import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { Typed } from '../../../typed';
import {
  MessageMaxLengthError,
  ValidMessageContent,
  createValidMessageContent,
} from '../objects/validMessageContent';

export type PostableMessage = Typed<
  Symbol,
  {
    content: ValidMessageContent;
  }
>;
type CreatePostableMessage = (
  content: string
) => E.Either<MessageMaxLengthError, PostableMessage>;
export const createPostableMessage: CreatePostableMessage = (content) => {
  return pipe(
    content,
    createValidMessageContent,
    E.map((validMessageContent) => {
      return {
        type: Symbol("PostableMessage"),
        content: validMessageContent,
      };
    })
  );
};
