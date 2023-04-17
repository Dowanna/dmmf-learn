const symbol = Symbol();
export type Brand<Type, Value> = Value & { readonly [symbol]: Type };
export const createBrand = <const Type, Value>(_: Type, value: Value) => {
  return value as Brand<Type, Value>;
};

// constがついてない場合
// type: string
// Brand<string, Value>;

// constがついている場合
// type: "Id"
// Brand<"Id", Value>;

// createBrand("Id");
