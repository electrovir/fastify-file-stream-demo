import fastify, {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {createReadStream} from 'node:fs';
import {basename} from 'node:path';
import {testPdfFilePath} from './file-paths.js';

const server: FastifyInstance = fastify();

server.get('/file', async (request: FastifyRequest, reply: FastifyReply) => {
    // const stats = await stat(testPdfFilePath);

    reply.header('Content-Type', 'application/pdf');
    // reply.header('Content-Length', stats.size);
    reply.header('Content-Disposition', `inline; filename="${basename(testPdfFilePath)}"`);
    const stream = createReadStream(testPdfFilePath);
    stream.on('error', (err) => {
        server.log.error('Stream error', err);
    });
    // // this does not work!
    // reply.send(stream);
    // this works without any trouble at all
    return reply.send(stream);
});

server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send('ok');
});

await server.listen({port: 3890, host: 'localhost'});
console.log(`Service running at http://localhost:3890`);
