console.log('hello')

const readline = require('node:readline');
console.log(__dirname)
console.log(__filename)


const someFunc = async () => {
    let rlInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rlInstance.question('What is your favorite food?', (answer) => {
        console.log(`Oh, so your favorite food is ${answer}`);
    })
}

void someFunc();