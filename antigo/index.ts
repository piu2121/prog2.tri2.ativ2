import { bdAction } from "./src/core";

const servidor = Bun.serve({
    port: 3000,

    routes: {
        '/teste': new Response("teste"),
        '/listabolada': new Response(Bun.file('./index.html')),
'/listabolada/public/js': { GET:(req) => new Response(Bun.file('./public/main.js'), { headers: { 'Content-Type': 'application/javascript' } })},
'/listabolada/public/css': { GET:(req) => new Response(Bun.file('./public/main.css'), { headers: { 'Content-Type': 'text/css' } }) },

'/listabolada/update/:id': {
    PATCH: (req) => {
        bdAction.update(req.params.id, req.body.title as string)
        return new Response("ok")
    }
},

'/listabolada/delete/:id': {
    DELETE: (req) => {
        bdAction.delete(req.params.id)
        return new Response("ok")
    }
},
'/listabolada/get': {
    GET: async (req) => {
        new Response(JSON.stringify(await bdAction.pegar()))
        return new Response("ok")
    }
},
'/listabolada/post': {
    POST: (req) => {
        bdAction.inserir(req.body.title as string)
        return new Response("ok")
    }
},
    },

fetch(request) {
    return new Response("sdfs")
},
});
console.log(`Servidor rodando acesse http://localhost:${servidor.port}/listabolada`);