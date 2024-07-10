const EventEmitter = require("./eventEmitter");

class WithTime extends EventEmitter{
    async execute(asyncFn, ...args){
        this.emit("begin");

        const start = process.hrtime();

        try{
            const data = await asyncFn(...args);
            this.emit("data", data);
            const end = process.hrtime(start);
            const time = (end[0] * 1000) + (end[1] / 1000000);
            this.emit("end", time);
        } catch (error){
            this.emit("error", error);
        }
    }
}


const fetchFromUrl = async (url) => {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("HTTP error status: ", response.status);
    }

    return await response.json();
}

const withTime = new  WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", (time) => console.log(`Done with execute. Time taken: ${time.toFixed(2)}ms`));
withTime.on("data", (data) => console.log("Received data:", data));
withTime.on("error", (error) => console.error("Error", error.message));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));
