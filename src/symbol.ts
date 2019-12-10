namespace symbol {
  // 不需要new
  const s1 = Symbol('s');
  // const s2 = Symbol('s');
  // console.log(s1 === s2); // 永远不相等

  console.log(typeof s1);
  console.log(s1.toString()); // Symbol(s)

  const s0 = Symbol(0);
  console.log(Boolean(s0)); // true

  const obj = {
    [s1]: '1',
  };

  console.log(obj[s1]);

  const name = Symbol('name');
  const obj1 = {
    [name]: 'name',
    age: 18,
  };

  const baseKeys = Object.getOwnPropertyNames(obj1); // 获取readable属性名
  const symbolKeys = Object.getOwnPropertySymbols(obj1); // 获取symbol属性名
  const allKeys = Reflect.ownKeys(obj1);
  console.log(baseKeys); // ["age"]
  console.log(symbolKeys); // [Symbol(name)]
  console.log(allKeys); // ["age", Symbol(name)]

  /**
   * 静态方法 Symbol.for()  &  Symbol.keyFor()
   */
  const fSymbol1 = Symbol.for('cat');
  // const fSymbol2 = Symbol.for('cat');
  const cSymbol = Symbol('cat');
  //   console.log(fSymbol1 === fSymbol2); true
  //   全局注册,如果已经有相同字符串使用Symbol.for()创建的值就直接返回这个值，如果没有就创建
  console.log(Symbol.keyFor(fSymbol1)); // 获取Symbol.for在全局注册的属性名
  console.log(Symbol.keyFor(cSymbol)); // undefined 普通方式注册不会再全局注册属性名
  /**
   * 内置属性
   */
  //1. onlinSymbol.hasInstance
  // console.info(Symbol.prototype, cSymbol.);

  const obj2 = {
    [Symbol.hasInstance](obj) {
      return true;
    },
  };

  console.log([1] instanceof (obj2 as any));

  // 2. Symbol.isConcatSpreadable
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  console.log(arr1[Symbol.isConcatSpreadable]); // 当值为默认的undefined和true时 数组在concat中会被扁平化
  console.log(arr1.concat(arr2)); // [1, 2, 3, 4, 5, 6]
  arr1[Symbol.isConcatSpreadable] = false;
  console.log(arr1.concat(arr2)); // [[1, 2, 3, Symbol(Symbol.isConcatSpreadable): false], 4, 5, 6]
  arr2[Symbol.isConcatSpreadable] = false;
  console.log(arr1.concat(arr2)); // [[1, 2, 3, Symbol(Symbol.isConcatSpreadable): false], [4, 5, 6, Symbol(Symbol.isConcatSpreadable): false]]
  console.log([...arr1, ...arr2]); // 只有concat方法会受到影响

  // 3. Symbol.species

  // 4.Symbol.match Symbol.replace Symbol.search Symbol.split
  const matchObj = {
    [Symbol.match](obj) {
      return obj.length;
    },
  };
  console.log('1111'.match(matchObj));
  // 相同的还有 Symbol.replace、Symbol.search 和 Symbol.split，使用方法和 Symbol.match 是一样的。

  // 5. Symbol.iterator
  const testIteratorArr = [1, 2, 3];

  testIteratorArr[Symbol.iterator] = function*() {
    yield 11;
    yield 11;
  };

  const iterator = testIteratorArr[Symbol.iterator](); // 生成遍历器
  console.log(iterator);
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next()); // undefined

  // 6. Symbol.toPrimitive
  const testPrimitiveObj1 = {
    [Symbol.toPrimitive](hint) {
      switch (hint) {
        case 'number':
          return 'number';
        case 'string':
          return 'string';
        case 'default':
          return 'default';
        default:
          throw new Error();
      }
    },
  };

  console.log(`primitive${testPrimitiveObj1}`); // default
  console.log(String(testPrimitiveObj1)); // string
  console.log(+testPrimitiveObj1 + 1); // number
  // 当对象被转换类型时 自定义行为

  // 7. Symbol.toStringTag
  // 可以是一个字符串
  const testToStringTagStr = {
    [Symbol.toStringTag]: '[not true, it is the custom]',
  };

  const testToStringTagObj1 = {
    get [Symbol.toStringTag]() {
      return 'not true!';
    },
  };

  console.log(testToStringTagStr.toString()); // [object [not true, it is the custom]]
  console.log(testToStringTagObj1.toString()); // [object not true!]

  // 8. Symbol.unscopables

  // typescript 中使用Symbol
  const tsSymbol = Symbol('tsSymbol');
  const tsUniqueSymbol: unique symbol = Symbol();
  const tsSymbolObj = {
    [tsSymbol]: '1',
    [tsUniqueSymbol]: '2',
  };

  // console.log(tsSymbolObj[tsSymbol]) // TS2538: Type 'symbol' cannot be used as an index type.
  // 在ts中普通的Symbol不能当做对象索引
  console.log(tsSymbolObj[tsUniqueSymbol]);
}
