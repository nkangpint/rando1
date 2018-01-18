console.log('in service-worker.js');
console.log(this)
this.registration.unregister(()=>{console.log('unregisted')});