namespace baseTypes {
  /**
   * 基本类型的声明方式
   */
  // let aNumber: 123
  // let aNumber: number = 123
  // let aString: '123'
  // let aString: string = '123'
  // let aBoolean: false
  // let aBoolean: boolean = false
  // let aNull: null
  // let aNull: null = null
  // let aUndefined: undefined
  // let aUndefined: undefined = undefined

  // boolean
  let bool = false;
  bool = true;
  // bool = 123; // error 不能将类型"123"分配给类型"boolean"
  const bool1 = !!0; // 可以是一个计算后的boolean值
  // console.log(bool1); // false

  // number 数值类型
  let num: number;
  num = 123;
  // num = "123"; // error 不能将类型"123"分配给类型"number"
  num = 0b1111011; //  二进制的123
  num = 0o173; // 八进制的123
  num = 0x7b; // 十六进制的123

  // string
  let str = 'Lison';
  str = 'Li';
  const first = 'Lison';
  const last = 'Li';
  str = `${first} ${last}`; // es6
  // console.log(str); // 打印结果为:Lison Li
  // 可以这样使用
  let str1: 'Lison';
  // str1 = 'haha' // error 不能将类型“"haha"”分配给类型“"Lison"”

  // Array
  const list1: number[] = [1, 2, 3]; // number 数组
  const list2: number[] = [1, 2, 3]; // number 数组
  const list3: number | string[] = ['1', '2', '3']; // number 或 string数组
  const list4: (number | string)[] = ['1', 2, '3']; // 数组里的元素可以是number或string
  const list5: (number | string)[] = [1, 2, '3'];

  // null & undefined
  const vNull = null;
  const vUndefined = undefined;

  const a: string = vNull;
  const b: number = vUndefined;
  const c: void = vNull;
  // 可以赋值给任意类型, 如果 "strictNullChecks": true 就只能赋值给同类型

  // Object
  let obj: object;
  obj = { name: 'Lison' };
  // console.log(obj.name) // error 类型“object”上不存在属性“name”
}
