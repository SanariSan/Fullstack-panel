type TInitialState = {
  todos: Array<Record<string, unknown>>;
  lastFetchedId: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

type TInitialStateThunk = {
  fetchTodo: TInitialState;
};

export type { TInitialState, TInitialStateThunk };
