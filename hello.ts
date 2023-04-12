import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { Brand, createBrand } from './brand';
import { Typed } from './typed';
import {
  MessageLengthError,
  ValidMessageContent,
} from './domain/message/objects/validMessageContent';
import { pipe } from 'fp-ts/lib/function';
import { persistPostableMessage } from './domain/message/steps/persistPostableMessage';
import {
  WorkflowInput,
  postMessageWorkflow,
} from './applications/usecases/postMessageWorkflow';
import { MessageId } from './domain/message/objects/messageId';

const postMessageController = (request: any, response: any) => {
  const input: WorkflowInput = {
    message: request.body.message,
  };

  // 本当はrequestをvalidationする処理もpipeに入れる
  return pipe(
    input,
    postMessageWorkflow({ connection: undefined }),
    TE.match(
      (e) => response.send(e.message, 500),
      (result) => response.send(result, 200)
    )
  );
};
