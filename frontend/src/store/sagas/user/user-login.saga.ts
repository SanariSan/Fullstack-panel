const A = 1;
export { A };

// let task: Task | undefined;
// while (true) {
//   // type, payload
//   const action = (yield take(getUserLoginStatusAsync)) as {
//     type: string;
//   };

//   if (task !== undefined) {
//     yield cancel(task);
//   }

//   task = (yield fork(getUserLoginStatusWorker, action)) as Task;
// }
