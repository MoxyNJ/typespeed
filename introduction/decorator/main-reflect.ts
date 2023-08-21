import "reflect-metadata";

class MainReflect {
    @injectAge(10)
    private age: number;

    @findReturn
    getAge(): Number {
        return this.age;
    }
}

const mainReflect = new MainReflect();
console.log("获得Age值：", mainReflect.getAge());

// 带参数的成员变量装饰器
function injectAge(arg: Number) {
    // 返回一个成员变量装饰器：target 当前对象实例，propertyKey 当前成员变量名称
    return function (target: any, propertyKey: string) {
        // 修改当前成员变量getter，固定返回传入的 arg 参数。
        // 实质上，成员变量的返回值被修改和覆盖了。
        Object.defineProperty(target, propertyKey, {
            get: () => {
                return arg;
            },
        });
    };
}

// 方法装饰器：target 当前对象实例，propertyKey 当前方法的名称
function findReturn(target: any, propertyKey: string) {
    // 通过 getMetadata，获得当前方法的返回值类型
    const returnType: any = Reflect.getMetadata("design:returntype", target, propertyKey);
    // 输出一下当前方法名，和方法的返回值类型
    console.log(target[propertyKey].name, "的返回类型是：", returnType.name);
    console.log(propertyKey === target[propertyKey].name); // true，两者都是 string，即当前方法的名称
    console.log(target === MainReflect); // true, target 指向了当前类本身 / 当前对象实例
}
