// const randomPromise = new Promise((resolve, reject) => {
//   const randomNumber = Math.random();
//   setTimeout(() => {
//     if (randomNumber > 0.5) {
//       resolve(randomNumber);
//     } else {
//       reject("randomPromise: " + randomNumber);
//     }
//   }, 5000);
// });

// const alwaysSuccessPromise = new Promise((resolve, reject) => {
//   const randomNumber = Math.random() + 0.5;
//   setTimeout(() => {
//     if (randomNumber > 0.5) {
//       resolve(randomNumber);
//     } else {
//       reject("alwaysSuccessPromise: " + randomNumber);
//     }
//   }, 1000);
// });

// const alwaysFailPromise = new Promise((resolve, reject) => {
//   const randomNumber = Math.random() - 0.5;
//   setTimeout(() => {
//     if (randomNumber > 0.5) {
//       resolve(randomNumber);
//     } else {
//       reject("alwaysFailPromise: " + randomNumber);
//     }
//   }, 3000);
// });

// randomPromise
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// Node is not interruptible
// Promise.race([alwaysSuccessPromise, randomPromise, alwaysFailPromise])
//   // Promise.all([alwaysSuccessPromise, randomPromise, alwaysFailPromise])
//   .then(function (response) {
//     console.log("All success", response);
//   })
//   .catch(function (err) {
//     console.log("All error", err);
//   });

function resolverPromise1s() {
  return new Promise((resolve) => setTimeout(() => resolve("Done 1s"), 3000));
}

function resolverPromise2s() {
  return new Promise((resolve) => setTimeout(() => resolve("Done 2s"), 5000));
}

async function mySyncFun() {
  console.log("Start");

  const promise1 = await resolverPromise1s();
  console.log(promise1);
  const promise2 = await resolverPromise2s();
  console.log(promise2);

  console.log("End");
}

mySyncFun();
