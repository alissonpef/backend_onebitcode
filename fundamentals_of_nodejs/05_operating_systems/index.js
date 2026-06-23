const os = require("node:os")

const plataforma = os.platform() // platform retorna a plataforma do sistema operacional
console.log("Plataforma do SO: ", plataforma)

const arquitetura = os.arch() // arch retorna a arquitetura do sistema operacional
console.log("Arquitetura do SO: ", arquitetura)

const processadores = os.cpus() // cpus retorna informações sobre os processadores disponíveis
console.log("Informações da CPU:", processadores[0])

const memoria = os.totalmem() // totalmem retorna a quantidade total de memória do sistema em bytes
console.log("Total de memória do PC:", memoria / 1024 / 1024 / 1024, "GB")