class EventEmitter {
    constructor(){
        this.listeners = {};
    }

    addListener(eventName, fn){
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
        return this;
    }

    on(eventName, fn){
        return this.addListener(eventName, fn);
    }

    removeListener(eventName, fn){

        if(!this.listeners[eventName]) return this;

        this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);

        return this;
    }

    off(eventName, fn){
        return this.removeListener(eventName, fn);
    }

    once(eventName, fn){
        const onceClosure = (...args) => {
            fn(...args);
            this.off(eventName, onceClosure);
        }

        return this.on(eventName, onceClosure);
    }

    emit(eventName, ...args){
        if(!this.listeners[eventName]) return false;

        this.listeners[eventName].forEach(listener => listener(...args));
        return true;
    }

    listenerCount(eventName){
        return this.listeners[eventName] ? this.listeners[eventName].length : 0;
    }

    rawListeners(eventName){
        return this.listeners[eventName] || [];
    }
}

module.exports = EventEmitter;