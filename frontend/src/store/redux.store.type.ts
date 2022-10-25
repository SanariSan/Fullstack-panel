import type { StoreToolkit } from './redux.store';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof StoreToolkit.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type TAppDispatch = typeof StoreToolkit.dispatch;
