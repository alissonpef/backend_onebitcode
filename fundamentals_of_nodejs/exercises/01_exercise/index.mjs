import { createFile, deleteFile, showFile, updateFile } from "./functions.mjs"

async function start() {
  try {
    await createFile("Conteúdo inicial do arquivo\nCriado com o módulo fs do Node.js")
    await showFile()
    console.log("--------------")
    await updateFile("Conteúdo modificado...")
    await showFile()
    console.log("--------------")
    await deleteFile()
  } catch (error) {
    console.error(error.message);
  }
}

start()