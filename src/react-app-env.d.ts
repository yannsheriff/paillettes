/// <reference types="react-scripts" />
type AsyncReturnType<
  T extends (...args: never) => Promise<unknown>
> = ReturnType<T> extends Promise<infer U> ? U : never;
