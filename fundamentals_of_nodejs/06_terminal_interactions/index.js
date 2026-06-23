const readline = require("node:readline")

// process.stdout.write("Olá, mundo!\n")

// process.stdin.on("data", (data) => {
//   process.stdout.write(`Você digitou: ${data}`)
// })

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Ele escreve além do que nós digitamos, ele escreva tambem Você digitou: "texto"
rl.on("line", (input) => {
  rl.write(`Você digitou: "${input}"`)
})

rl.question("Qual é o seu nome? ", (answer) => {
  rl.write(`Olá, ${answer}!\\n`)
  rl.close()
})

rl.on("close", () => {
  rl.write("Saindo...")
	process.exit(0)
})

rl.on('SIGINT', () => {
  rl.question('Deseja realmente sair? (s/n) ', (resposta) => {
    if (resposta.trim().toLowerCase() === 's') {
      rl.close()
    } else {
      rl.write("Você escolheu continuar.")
    }
  })
})