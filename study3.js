// 커링함수 생성
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

// 함수들을 커링으로 감싸준다
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
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const el of iter) {
    acc = func(acc, el);
  }

  return acc;
});

// 파이프 생성
const pipe = (iter, ...functions) =>
  reduce((prev, func) => func(prev), iter, functions);

// 예시
const arr = [1, 2, 3, 4, 5];

// pipe(
//   arr,
//   (arr) => filter((el) => el % 2 === 1, arr),
//   (arr) => map((el) => el * 2, arr),
//   (arr) => reduce((prev, curr) => prev + curr, arr),
//   console.log,
// );

//// 위의 코드를 커링으로 조금 더 간단하게 구현할 수 있다.
// pipe(
//   arr,
//   (arr) => filter((el) => el % 2 === 1)(arr),
//   (arr) => map((el) => el * 2)(arr),
//   (arr) => reduce((prev, curr) => prev + curr)(arr),
//   console.log,
// );

/// 위에서 조금 더 간단하게 표현
pipe(
  arr,
  filter((el) => el % 2 === 1),
  map((el) => el * 2),
  reduce((prev, curr) => prev + curr),
  console.log,
);

///실제 사용 예시
const people = [
  {
    name: 'jenny',
    age: 30,
    city: 'seoul',
  },
  {
    name: 'jenifer',
    age: 20,
    city: 'seoul',
  },
  {
    name: 'chris',
    age: 15,
    city: 'tokyo',
  },
  {
    name: 'dave',
    age: 40,
    city: 'london',
  },
];

pipe(
  people,
  filter((person) => person.city === 'seoul'),
  map((person) => person.name),
  console.log,
);

const add = (a, b) => a + b;

pipe(
  people,
  filter((person) => person.name.startsWith('j')),
  map((person) => person.age),
  reduce(add),
  console.log,
);
