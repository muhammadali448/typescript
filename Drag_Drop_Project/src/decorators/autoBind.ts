namespace App {
    export function AutoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const bindFunc = originalMethod.bind(this);
                return bindFunc
            }
        }
        return adjDescriptor;
    }
}