const fs = require("fs");
const readline = require("readline");
const { Transform } = require("stream");

const formatter = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    const [book, author, amount, price] = chunk.split(",").map(item => item.trim());
    const formatted = {
      book: book,
      author: author,
      price: parseFloat(price)
    };
    this.push(JSON.stringify(formatted) + "\n");
    cb();
  }
});

const readStream = fs.createReadStream("example.csv");
const writeStream = fs.createWriteStream("output.txt");

const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

let isFirstLine = true;

rl.on("line", (line) => {
    if(isFirstLine){
        isFirstLine = false;
        return;
    }
    formatter.write(line);
})

rl.on("close", () => {
    formatter.end();
    console.log("Processing complete");
});

formatter.pipe(writeStream).on("error", (e) => console.error(e));

readStream.on("error", (error) => {
  console.error("Error reading file:", error);
});

writeStream.on("error", (error) => {
  console.error("Error writing file:", error);
});