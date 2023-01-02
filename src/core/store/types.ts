export type Subscriber = () => void;
export type RootState<T = any> = Record<string, T>;
export interface Action<T = string, P = any> {
  type: T;
  payload?: P;
}
export type Reducer<T = any, A = Action<any>> = (state: T, action: A) => T;
