import fs from "node:fs"

// Assync
// export function createFile(text) {
//   fs.writeFile("meuarquivo.txt", text, (error) => {
//     if (error) {
//       console.log("Erro ao escrever arquivo: ", error.message)
//     }
//   })
// }

// Sync
// export function createFile(text) {
//   fs.writeFileSync('meuarquivo.txt', text)
// }

// Promise
export function createFile(text) {
  return new Promise((resolve, reject) => {
    fs.writeFile("meuarquivo.txt", text, (error) => {
      if (error) {
        reject(new Error("Erro ao escrever arquivo: " + error.message));
      } else {
        resolve()
      }
    })
  })
}

export function showFile() {
  return new Promise((resolve, reject) => {
    fs.readFile("meuarquivo.txt", "utf-8", (error, text) => {
      if (error) {
        reject("Erro ao ler arquivo: ", error.message)
      } else {
        console.log(text)
        resolve()
      }
    })
  })
}

export function updateFile(newText) {
  return new Promise((resolve, reject) => {
    fs.writeFile("meuarquivo.txt", newText, (error) => {
      if (error) {
        reject("Erro ao modificar arquivo: ", error.message)
      } else {
        resolve()
      }
    })
  })
}

export function deleteFile() {
  return new Promise((resolve, reject) => {
    fs.unlink("meuarquivo.txt", (error) => {
      if (error) {
        console.log("Erro ao excluir o arquivo: ", error.message)
        resolve()
      } else {
        console.log("Arquivo excluído com sucesso!")
        resolve()
      }
    })
  })
}
