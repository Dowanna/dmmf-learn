import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/lib/function';
import {
  WorkflowInput,
  postMessageWorkflow,
} from './applications/usecases/postMessageWorkflow';

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
