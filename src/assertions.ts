namespace TypeAssertions {
  // 类型断言
  // 有时候要告诉TypeScript我们比它更了解的属性
  // let someValue: any = 'this is a string'
  // const strLength: number = someValue.length
  const someValue: any = 'this is a string';

  // let strLength: number = (<string>someValue).length  // 不能在jsx中使用
  // let strLength: number = (someValue as string).length

  interface Foo {
    bar: number;
    bas: string;
  }

  const foo: Foo = {
    // 只有这种方式编辑器会给出提示
    // 编译器将会提供 Foo 属性的代码提示
    bar: 1,
    bas: '2',
  };

  const getLength = (target: number | string): number => {
    if ((target as string).length) {
      return (target as string).length;
    } else {
      return target.toString().length;
    }
  };
}
