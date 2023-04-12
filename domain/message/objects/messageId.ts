export class MessageId {
  private constructor(readonly id: string) {}
  public static generate(id: string) {
    return new MessageId(id);
  }
}
