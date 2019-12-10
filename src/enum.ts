namespace Enum {
    enum Status {
        Uploading,
        Success,
        Failed,
    }

    console.log(Status.Uploading); // 0
    console.log(Status.Success); // 1
    console.log(Status.Failed); // 2

    // 修改起始编号 后面的编号接着递增
    enum Color {
        Red = 2,
        Blue,
        Yellow,
    }

    console.log(Color.Red, Color.Blue, Color.Yellow); // 2 3 4

    // 指定任意字段的索引值
    enum Status1 {
        Success = 200,
        NotFound = 404,
        Error = 500,
    }

    console.log(Status1.Success, Status1.NotFound, Status1.Error); // 200 404 500

    // 指定部分字段，其他使用默认递增索引
    enum Status2 {
        Ok = 200,
        Created,
        Accepted,
        BadRequest = 400,
        Unauthorized,
    }

    console.log(Status2.Created, Status2.Accepted, Status2.Unauthorized); // 201 202 401

    // const Start = 1;

    // enum Index {
    //   a = Start, // 不可使用外部的变量
    //   b, // error 枚举成员必须具有初始化的值
    //   c
    // }
    enum Message1 {
        Error = 'Sorry, error',
        Success = 'Hoho, success',
    }
    console.log(Message1.Error); // 'Sorry, error'

    enum Message2 {
        Error = 'error message',
        ServerError = Error,
        ClientError = Error,
    }
    console.log(Message2.Error); // 'error message'
    console.log(Message2.ServerError); // 'error message'

    enum Result {
        Success = 'Success',
        Failed = 0,
    }

    // 枚举成员类型
    // 满足下列3个条件，枚举值和枚举成员都可以作为类型来使用
    // enum EType {
    //   A
    // }
    enum EType {
        A = 'a',
    }
    // enum EType {
    //   A = 1,
    //   A = -1
    // }

    enum Animal {
        Dog = 1,
        Cat = 2,
    }
    interface Dog {
        type: Animal.Dog; // 这里使用Animal.Dog作为类型，指定接口Dog的必须有一个type字段，且类型为Animal.Dog
    }
    interface Cat {
        type: Animal.Cat; // 这里同上
    }
    // let cat1: Cat = {
    //   type: Animal.Dog // error [ts] 不能将类型“Animal.Dog”分配给类型“Animal.Cat”
    // }
    const dog: Dog = {
        type: Animal.Dog,
    };

    // 联合枚举类型
    enum EUnion {
        OFF,
        ON,
    }

    interface Union {
        status: EUnion; // 必须为EUnion中的某一个相当于status: EUnion.OFF | EUnion.ON
    }

    // const light1: Union = {
    //   status: Animal.Dog // error 不能将类型“Animal.Dog”分配给类型“Status”
    // };

    const light2: Union = {
        status: EUnion.OFF,
    };
    const light3: Union = {
        status: EUnion.ON,
    };

    // 运行时的枚举
    enum RuntimeEnum {
        A = 11,
        B,
        C,
    }

    const getIndex = (enumObj: { A: number; B: number; C: number }): number => {
        return enumObj.A + enumObj.B;
    };

    console.log(getIndex(RuntimeEnum));

    // const enum  枚举类型会被编译成实际的js对象，如果要减少代码量可以用const
    const enum ETestConstEnum {
        A = 0,
    }
    const aTestConst = ETestConstEnum.A;

    // 编译出来是 const aTestConst = 0
}
