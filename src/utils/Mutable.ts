type Mutable<T> = {
  [K in keyof T]: T[K] extends ReadonlyArray<infer U> ? Array<U> : T[K]
}

export default Mutable
