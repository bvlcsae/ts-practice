// Symbol.species
class C extends Array {
    getName() {
        return 'xiaoming';
    }
}

const c = new C(1, 2, 3);
const ac = c.map((item) => item + 1);
console.log(ac); // [2, 3, 4]
console.log(ac instanceof C); // true
console.log(ac instanceof Array); // true
console.log(ac.getName()); // xiaoming

class D extends Array {
    static get [Symbol.species]() {
        // 自定方法 返回值成为实例继承的构造器
        return Array;
    }

    getName() {
        return 'xiaoming';
    }
}

const d = new D(1, 2, 3);
const ad = d.map((item) => item + 1);
console.log(ad); // [2, 3, 4]
console.log(ad instanceof D); // false
console.log(ad instanceof Array); // true
// console.log(ad.getName()) // 找不到属性

// 8. Symbol.unscopables  用来控制with语法的行为
console.log(Array.prototype[Symbol.unscopables]); // 列表中的属性会直接到外部获取
console.log(Array.prototype);

const a = ['1', '2', '3'];

Array.prototype[Symbol.unscopables].find = false; // 将find方法改为可在with内部访问

with (a) {
    const c = concat([3, 4, 5]);
    console.log(c);

    const E = find((item) => item === '1'); // 有效
    console.log(E);

    // const F = findIndex((item) => item === '1') // 无效
    // console.log(F)
}

// 没有 unscopables 时
class MyClass1 {
    foo() {
        return 1;
    }
}

const foo1 = function() {
    return 2;
};

with (MyClass1.prototype) {
    foo1(); // 1
}

// 有 unscopables 时
class MyClass2 {
    foo() {
        return 1;
    }

    get [Symbol.unscopables]() {
        return { foo: true }; // 原型上的属性的集合
    }
}

const foo2 = function() {
    return 2;
};

with (MyClass2.prototype) {
    foo2(); // 2   直接到外部访问
}

// 添加了Symbol.unscopables 后with语句中访问名单中的对象会到外层作用域去找
