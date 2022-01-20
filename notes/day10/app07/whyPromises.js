account = insertIntoAccount(amount, accountId);
balance = getBalance(account);

return balamce;

// hard to maintain - if you want to change
// can not unit test callback functions
// not nesting -> chaining
// // // // // // // //

insertIntoAccount(amount, accountId, function (err, account) {});

getBalance(account, function (err, balance) {
  return balance;
});

// // // // // // // //

insertIntoAccount(amount, accountId, function (err, account) {
  if (!err) {
    getBalance(account, function (err, balance) {
      return balance;
    });
  }
});

// // // // // // // //
function emailBalance(err, account) {
  return account;
}

function afterAccountInsert(err, account) {
  if (!err) {
    getBalance(account, emailBalance);
  }
}

insertIntoAccount(amount, accountId, afterAccountInsert);

// // // // // // // //

function emailBalance(err, account) {
  return account;
}

function afterAccountInsert(account) {
  if (account.balance < 0) {
    // charge
  }
}

insertIntoAccount(amount, accountId)
  .then(afterAccountInsert)
  .then(emailBalance);
