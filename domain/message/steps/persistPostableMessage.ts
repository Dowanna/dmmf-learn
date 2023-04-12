import * as TE from 'fp-ts/TaskEither';
import { Typed } from '../../../typed';
import { MessageId } from '../objects/messageId';
import { ValidMessageContent } from '../objects/validMessageContent';
import { PostableMessage } from './createPostableMessage';

type PersistPostableMessage = (
  connection: any
) => (message: PostableMessage) => TE.TaskEither<Error, PersistedMessage>;
export const persistPostableMessage: PersistPostableMessage =
  (c) => (message) => {
    console.log(`connection使って保存`);
    const PersistedMessage: PersistedMessage = {
      type: 'PersistedMessage',
      id: MessageId.generate('1'),
      content: message.content,
    };

    return TE.right(PersistedMessage);
  };

export type PersistedMessage = Typed<
  'PersistedMessage',
  {
    id: MessageId;
    content: ValidMessageContent;
  }
>;
