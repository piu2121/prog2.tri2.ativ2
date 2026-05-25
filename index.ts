import { banco } from "./src/core";

const servidor = Bun.serve({
    port: 5003,
    routes: {/* colocar new responser depois*/
        'listabolada': new Response(Bun.file('./index.html')),
        'listabolada/public': new Response(Bun.file('./public')),
        'listabolada/update:id': { PATCH: (req) => banco.update(req.params.id,req.body.title) },
        'listabolada/delete:id': { DELETE: (req) => banco.delete(req.params.id) },
        'listabolada/get': { GET: (req) => banco.pegar() },
        'listabolada/post': { POST: (req) => banco.inserir(req.body.title) }
    }

})