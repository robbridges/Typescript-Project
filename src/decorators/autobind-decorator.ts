namespace App {
  //autobind decorator
  export const autoBind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const orgionalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = orgionalMethod.bind(this);
        return boundFn;
      }
    };
    return adjDescriptor;
  }
}