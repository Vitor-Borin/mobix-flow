// Imita a MockAPI (materias e capturas) para testar sem internet. Uso: npm run api:local
// e, no .env.local, VITE_API_URL=http://localhost:4010. Os dados voltam ao original quando o servidor reinicia.
import { createServer } from "node:http"
import { readFileSync } from "node:fs"
import { join } from "node:path"

const pasta = process.argv[2]
const porta = Number(process.argv[3] || 4010)
const dados = {
  materias: JSON.parse(readFileSync(join(pasta, "materias.json"), "utf8")),
  capturas: JSON.parse(readFileSync(join(pasta, "capturas.json"), "utf8")),
}

const responder = (res, status, corpo) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  })
  res.end(corpo === undefined ? "" : JSON.stringify(corpo))
}

createServer((req, res) => {
  const url = new URL(req.url, "http://x")
  const [, recurso, id] = url.pathname.split("/")
  if (req.method === "OPTIONS") return responder(res, 204)
  const lista = dados[recurso]
  if (!lista) return responder(res, 404, "Not found")

  if (req.method === "GET" && !id) {
    let saida = lista
    for (const [campo, valor] of url.searchParams) saida = saida.filter((item) => String(item[campo]) === valor)
    if (url.searchParams.size && saida.length === 0) return responder(res, 404, "Not found")
    return responder(res, 200, saida)
  }
  if (req.method === "GET" && id) {
    const item = lista.find((i) => i.id === id)
    return item ? responder(res, 200, item) : responder(res, 404, "Not found")
  }
  if (req.method === "POST") {
    let corpo = ""
    req.on("data", (p) => (corpo += p))
    req.on("end", () => {
      const novo = { ...JSON.parse(corpo), id: String(Math.max(0, ...lista.map((i) => Number(i.id))) + 1) }
      lista.push(novo)
      responder(res, 201, novo)
    })
    return
  }
  if (req.method === "DELETE" && id) {
    const pos = lista.findIndex((i) => i.id === id)
    if (pos < 0) return responder(res, 404, "Not found")
    const [removido] = lista.splice(pos, 1)
    return responder(res, 200, removido)
  }
  responder(res, 405, "Method not allowed")
}).listen(porta, () => console.log(`mock api em http://localhost:${porta}`))
