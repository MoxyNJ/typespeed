@app
export default class ExampleImport {
    @func
    doSomeThing(): void {
        console.log("这是一个类方法");
    }
}

function app(target: any) {
    console.log("import 载入 ExampleImport 类的 @app 类装饰器。");
}

function func(target: any, propertyKey: string) {
    console.log("这是一个方法装饰器");
}
