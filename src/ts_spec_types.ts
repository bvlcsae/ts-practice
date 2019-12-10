namespace tsSpecTypes {
    /**
     * tuple 元组:   已知元素数量和类型的数组
     */
    const tuple: [string, number] = ['1', 2];
    // tuple[1] = false // error 序号为2 的元素是number 不能赋值为别的类型
    tuple[1] = 3;
    // 会对在元素上的操作进行检查
    tuple[0].split(':'); // right 类型"string"拥有属性"split"
    // tuple[1].split(":"); // error 类型“number”上不存在属性“split”
    // tuple = ['a'] // 元素不足
    // tuple = ["a", 2, "b"]; // 元素超过声明数量  2.6 以后报错

    // 和下面的效果一样的 2.6 以后
    interface Tuple1 extends Array<number | string> {
        0: string;
        1: number;
        length: 2;
    }

    // 如果要让它可以超过声明数量
    interface Tuple2 extends Array<string | number> {
        0: string;
        1: number;
    }

    let tuple2: Tuple2 = ['1', 2];
    tuple2 = ['1', 1, '3']; // 可以超过定义的长度

    /**
     * enum 枚举
     */
    enum Roles { // 默认从0 开始
        SUPER_ADMIN,
        ADMIN,
        USER,
    }
    console.log(Roles.SUPER_ADMIN); // 0
    console.log(Roles.ADMIN); // 1
    console.log(Roles[0]); // SUPER_ADMIN

    // 可以设置从不同的序号开始
    enum Roles1 {
        SUPER_ADMIN = 2, // 让index从2开始
        ADMIN,
        USER = 6,
    }

    console.log(Roles1.SUPER_ADMIN); // 2
    console.log(Roles1.ADMIN); // 3
    console.log(Roles1[6]); // USER
    console.log(Roles1[2]); // SUPER_ADMIN
    console.log(Roles1);

    /**
     * any 任意类型
     */
    let value: any;
    value = 123;
    value = 'abc';
    value = false;

    const array: any[] = [1, 'a', true];

    /**
     * void 没有任何类型
     */
    const consoleText = (text: string): void => {
        console.log(text);
    };
    // void 类型的变量只能赋值为 undefined 和 null

    /**
     * never 永不存在的值类型
     */
    let errorFunc = (message: string): never => {
        throw new Error(message);
    };

    const infiniteFunc = (): never => {
        while (true) {
            console.log('while');
        }
    };

    errorFunc = infiniteFunc;
    // 和void不同的地方是这些是永远不会有返回值，void是定义时没有
    // never 类型是任何类型的子类型 可以赋值给任何类型， 但是他不能赋值给别的类型

    /**
     * unknown 3.0 新增  unknown 相对于 any 是安全的
     */

    /**
     * 交叉类型
     */
    // 需要满足全部类型  '&'
    const merge = <T, U>(arg1: T, arg2: U): T & U => {
        let res = <T & U>{}; // 这里指定返回值的类型兼备T和U两个类型变量代表的类型的特点
        res = Object.assign(arg1, arg2); // 这里使用Object.assign方法，返回一个合并后的对象；
        // 关于该方法，请在例子下面补充中学习
        return res;
    };

    const info1 = {
        name: 'lison',
    };

    const info2 = {
        age: 18,
    };

    const lisonInfo = merge(info1, info2);
    // console.log(lisonInfo.address); // error 类型“{ name: string; } & { age: number; }”上不存在属性“address”

    /**
     * 联合类型
     */
    // 只需要满足其中一种类型即可  '|'
    const getLength = (content: string | number): number => {
        if (typeof content === 'string') return content.length;
        else return content.toString().length;
    };
    console.log(getLength('abc')); // 3
    console.log(getLength(123)); // 3
}
