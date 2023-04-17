import { Brand, createBrand } from "../../../brand";

export type MessageId = Brand<"Id", string>;
export const MessageId = (id: string): MessageId => createBrand("Id", id);

export type ValidMessageContent = Brand<"ValidMessageContent", string>;
