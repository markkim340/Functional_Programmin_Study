const curry =
  (func) =>
  (a, ...args) =>
    args.length > 0 ? func(a, ...args) : (...args) => func(a, ...args);

const map = curry((func, iter) => {
  const result = [];
  for (const el of iter) {
    result.push(func(el));
  }

  return result;
});

const filter = curry((func, iter) => {
  const result = [];
  for (const el of iter) {
    if (func(el)) {
      result.push(el);
    }
  }

  return result;
});

const reduce = curry((func, acc, iter) => {
  if (iter === undefined) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const el of iter) {
    acc = func(acc, el);
  }

  return acc;
});

const pipe = (iter, ...functions) =>
  reduce((prev, func) => func(prev), iter, functions);

///ex) const arr = [1, 2, 3, 4, 5, ...100000000];

const range = function* (limit) {
  let i = -1;
  while (++i < limit) {
    yield i;
  }
};

// Lazy map

const Lmap = curry(function* (func, iter) {
  for (const el of iter) {
    // console.log(`Lazy Map: ${el}`);
    yield func(el);
  }
});

// Lazy filter

const Lfilter = curry(function* (func, iter) {
  for (const el of iter) {
    // console.log(`Lazy Filter: ${el}`);
    if (func(el)) {
      yield el;
    }
  }
});

const arr = Array(10000)
  .fill()
  .map((v, i) => i);

// before
let startA = new Date();
pipe(
  arr,
  filter((el) => el % 2 === 1),
  map((el) => el * 2),
  reduce((prev, curr) => prev + curr),
  console.log,
);
let endA = new Date();
console.log(endA - startA);

// after
let startB = new Date();
pipe(
  arr,
  Lfilter((el) => el % 2 === 1),
  Lmap((el) => el * 2),
  reduce((prev, curr) => prev + curr),
  console.log,
);
let endB = new Date();
console.log(endB - startB);
