function getRandomNumber(){
    const num = Math.floor(Math.random() * 1000) + 1;
    return num;
}

module.exports = getRandomNumber;