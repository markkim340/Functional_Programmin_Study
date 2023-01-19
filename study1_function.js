///////// 예제 //////////
const arr = [1, 2, 3, 4, 5];
// 1. 홀수만 거른다.
// 2. 걸러진 원소에 곱하기 2를 한다.
// 3. 모두 다 더한다.

// 첫번째 방법
let sum = 0;
for (let el of arr) {
  if (el % 2 == 1) {
    const newEl = el * 2;
    sum += newEl;
  }
}
console.log(sum);

// 두번째 방법
let sum2 = arr //
  .filter((el) => el % 2 == 1)
  .map((el) => el * 2)
  .reduce((acc, cur) => acc + cur);

console.log(sum2);

//////// 메소드들의 해체 ////////

// Filter
// func: (el) => truthy || falsy
const filter = (func, iter) => {
  const result = [];

  for (const el of iter) {
    if (func(el)) {
      result.push(el);
    }
  }

  return result;
};
console.log(filter((el) => el % 2 === 1, arr));

// Map
// func: (el) => value
const map = (func, iter) => {
  const result = [];

  for (const el of iter) {
    result.push(func(el));
  }

  return result;
};
console.log(map((el) => el * 2, arr));

//reduce 배열을 순회하면서 func를 반복 적용해서 새로운 결과 값 리턴.
//func: (acc, el) => acc
//fucn: (prev,cur) => acc

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

console.log(reduce((acc, cur) => acc + cur, 0, arr));
console.log(reduce((acc, cur) => acc + cur, arr)); // 60번째 줄 !iter에 해당
