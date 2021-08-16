/**
 * hp: handlePromise
 * @param {*} promiseFn
 * @returns
 */
function hp(promiseFn) {
  return new Promise((resolve) => {
    promiseFn
      .then((data) => {
        resolve({ ok: true, data });
      })
      .catch((errors) => {
        resolve({ ok: false, errors });
      });
  });
}

module.exports = {
  hp,
};
