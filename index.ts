import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import fastify, { FastifyRequest, FastifyReply } from 'fastify'
import cors from '@fastify/cors'
const app = fastify()
app.register(cors)
