const map = (func, iter) => {
  const result = [];

  for (const el of iter) {
    result.push(func(el));
  }

  return result;
};

const filter = (func, iter) => {
  const result = [];

  for (const el of iter) {
    if (func(el)) {
      result.push(el);
    }
  }

  return result;
};

const reduce = (func, acc, iter) => {
  if (!iter) {
    // 초기값을 안 줄 경우
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const el of iter) {
    acc = func(acc, el);
  }

  return acc;
};

// 함수의 합성, pipe
// 순회 가능한 객체를 받아 함수의 파이프라인을 타고 최종 결과값을 리턴.

const pipe = (iter, ...functions) =>
  reduce((prev, func) => func(prev), iter, functions);

const arr = [1, 2, 3, 4, 5];

/// 기존에 사용하던 방법

let sum = arr //
  .filter((el) => el % 2 == 1)
  .map((el) => el * 2)
  .reduce((acc, cur) => acc + cur);

console.log(sum);

/// pipe 적용시

pipe(
  //
  arr,
  (arr) => filter((el) => el % 2 === 1, arr),
  (arr) => map((el) => el * 2, arr),
  (arr) => reduce((prev, curr) => prev + curr, arr),
  console.log,
);

pipe(
  //
  arr,
  (arr) => filter((el) => el % 2 === 1, arr),
  (arr) => map((el) => el * 2, arr),
  (arr) => reduce((prev, curr) => prev + curr, arr),
  console.log,
);
