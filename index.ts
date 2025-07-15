import mysql from 'mysql2/promise'
import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import cors from '@fastify/cors'

const app = fastify()
app.register(cors)

const conexao = {
  host: "localhost",
  user: 'root',
  password: "",
  database: 'salao',
  port: 3306
}

app.get('/clientes', async (req, reply) => {
  try {
    const conn = await mysql.createConnection(conexao)
    const [dados] = await conn.query("SELECT * FROM clientes")
    await conn.end()
    reply.status(200).send(dados)
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao buscar clientes" })
  }
})

app.post('/clientes', async (req, reply) => {
  const { nome, telefone } = req.body as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query(
      "INSERT INTO clientes (nome, telefone) VALUES (?, ?)",
      [nome, telefone]
    )
    await conn.end()
    reply.status(200).send({ mensagem: "Cliente cadastrado com sucesso!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao cadastrar cliente" })
  }
})

app.put('/clientes/:id', async (req, reply) => {
  const { nome, telefone } = req.body as any
  const { id } = req.params as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query(
      "UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?",
      [nome, telefone, id]
    )
    await conn.end()
    reply.status(200).send({ mensagem: "Cliente atualizado com sucesso!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao atualizar cliente" })
  }
})

app.delete('/clientes/:id', async (req, reply) => {
  const { id } = req.params as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query("DELETE FROM clientes WHERE id = ?", [id])
    await conn.end()
    reply.status(200).send({ mensagem: "Cliente deletado com sucesso!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao deletar cliente" })
  }
})

app.get('/procedimento', async (req, reply) => {
  try {
    const conn = await mysql.createConnection(conexao)
    const [dados] = await conn.query("SELECT * FROM procedimento")
    await conn.end()
    reply.status(200).send(dados)
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao buscar procedimentos" })
  }
})

app.post('/procedimento', async (req, reply) => {
  const { nome, preco } = req.body as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query(
      "INSERT INTO procedimento (nome, preco) VALUES (?, ?)",
      [nome, preco]
    )
    await conn.end()
    reply.status(200).send({ mensagem: "Procedimento cadastrado!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao cadastrar procedimento" })
  }
})

app.put('/procedimento/:id', async (req, reply) => {
  const { nome, preco } = req.body as any
  const { id } = req.params as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query(
      "UPDATE procedimento SET nome = ?, preco = ? WHERE id = ?",
      [nome, preco, id]
    )
    await conn.end()
    reply.status(200).send({ mensagem: "Procedimento atualizado!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao atualizar procedimento" })
  }
})

app.delete('/procedimento/:id', async (req, reply) => {
  const { id } = req.params as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query("DELETE FROM procedimento WHERE id = ?", [id])
    await conn.end()
    reply.status(200).send({ mensagem: "Procedimento deletado!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao deletar procedimento" })
  }
})

app.get('/agendamento', async (req, reply) => {
  try {
    const conn = await mysql.createConnection(conexao)
    const [dados] = await conn.query("SELECT * FROM agendamento")
    await conn.end()
    reply.status(200).send(dados)
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao buscar agendamentos" })
  }
})

app.post('/agendamento', async (req, reply) => {
  const { clientes_idclientes, profissional_id, data_hora } = req.body as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query(
      "INSERT INTO agendamento (clientes_idclientes, profissional_id, data_hora) VALUES (?, ?, ?)",
      [clientes_idclientes, profissional_id, data_hora]
    )
    await conn.end()
    reply.status(200).send({ mensagem: "Agendamento criado!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao cadastrar agendamento" })
  }
})


app.put('/agendamento/:id', async (req, reply) => {
  const { clientes_idclientes, profissional_id, data_hora } = req.body as any
  const { id } = req.params as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query(
      "UPDATE agendamento SET clientes_idclientes = ?, profissional_id = ?, data_hora = ? WHERE id = ?",
      [clientes_idclientes, profissional_id, data_hora, id]
    )
    await conn.end()
    reply.status(200).send({ mensagem: "Agendamento atualizado!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao atualizar agendamento" })
  }
})

app.delete('/agendamento/:id', async (req, reply) => {
  const { id } = req.params as any
  try {
    const conn = await mysql.createConnection(conexao)
    await conn.query("DELETE FROM agendamento WHERE id = ?", [id])
    await conn.end()
    reply.status(200).send({ mensagem: "Agendamento deletado!" })
  } catch (erro: any) {
    console.log(erro)
    reply.status(400).send({ mensagem: "Erro ao deletar agendamento" })
  }
})


app.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server rodando em ${address}`)
})
