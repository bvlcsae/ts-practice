namespace Interface {
  interface Info {
    name: string
    age: number
  }
  const getInfo = (info: Info): string => {
    return `name: ${info.name}, age: ${info.age}`;
  };


  // console.log(getInfo({ name: 'li', age: 18 }));

  interface Vegetables {
    color?: string
    type: string
  }

  const getVegetables = ({ color, type }: Vegetables) => {
    return `A ${color ? color + ' ' : ''}${type}`;
  };


  getVegetables({
    type: 'tomato',
    size: 12,
    price: 1.2,
  } as Vegetables); // 使用类型断言不进行检查

  interface Vegetables1 {
    color?: string
    type: string
    [props: string]: any // 添加索引签名，可以扩充属性
  }

  const getVegetables1 = ({ color, type }: Vegetables1) => {
    return `A ${color ? color + ' ' : ''}${type}`;
  };

  getVegetables1({
    type: 'tomato',
    color: 'red',
    price: 1.2,
  });

  type IFunc = (a: number, b: string) => number;

  const add: IFunc = function(a, b) {
    return 1;
  };
}
