import { Brand, createBrand } from "../../brand";
import { Typed } from "../../typed";

export type MessageId = Brand<"Id", string>;
export const parseMessageId = (id: string): MessageId => createBrand("Id", id);

export type ValidMessageContent = Brand<"ValidMessageContent", string>;

export type PersistedMessage = Typed<
  "PersistedMessage",
  {
    id: MessageId;
    content: ValidMessageContent;
  }
>;
