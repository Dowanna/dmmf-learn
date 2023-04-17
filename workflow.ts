import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";

type Typed<Type, Value> = Value & {type: Type}

// NOTE: validate -> post
type PostTweetWorkflow = (input: WorkFlowInput) => WorkFlowOutput;

type WorkFlowInput = { content: string };
type WorkFlowOutput = TE.TaskEither<Error, { id: number; content: string }>;

type ValidTweet = Typed<"ValidTweet", string>
type PostableTweet = Typed<"PostableTweet", string>
