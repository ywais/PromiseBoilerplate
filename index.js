class Declare {
  constructor(executionFunction) {
    this.promiseChain = [];
    this.hadResolved = false;
    this.value;

    this.onResolve = this.onResolve.bind(this);

    executionFunction(this.onResolve);
  }

  then(handleSuccess) {
    this.promiseChain.push(handleSuccess);
    if(this.hadResolved) {
      this.onResolve(this.value);
    }
    return this;
  }

  onResolve(value) {
    if(!this.hadResolved) {
      this.hadResolved = true;
      this.value = value;
    }

    let storedValue = value;
    
    this.promiseChain.forEach((nextFunction) => {
        storedValue = nextFunction(storedValue);
    });
  }
}
module.exports = Declare;