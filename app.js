const delay = ms => {
  const promise = new Promise((onSuccess) => {
    setTimeout(() => {
      onSuccess(ms);
    }, ms);
  });

  return promise;
};

const logger = time => console.log(`Resolved after ${time}ms`);

delay(2000).then(logger);
delay(1000).then(logger);
delay(1500).then(logger);


const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'Ajax', active: true },
  { name: 'Lux', active: false },
];

const toggleUserState = (allUsers, userName) => {
  return new Promise((onSucces) => {
    const updatedUsers = allUsers.map(user =>
      user.name === userName ? { ...user, active: !user.active } : user,
    );

    onSucces(updatedUsers);
  });
};

const logger1 = updatedUsers => console.table(updatedUsers);

toggleUserState(users, 'Mango').then(logger1);
toggleUserState(users, 'Lux').then(logger1);


const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  const promise = new Promise((onSuccess, onError) => {
    const delay = randomIntegerFromInterval(200, 500);

    setTimeout(() => {
      const canProcess = Math.random() > 0.3;

      if (canProcess) {
        onSuccess(transaction.id, delay);
      } else {
        onError(transaction.id);
      }
    }, delay);
  });

  return promise;
};

const logSuccess = (id, time) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};