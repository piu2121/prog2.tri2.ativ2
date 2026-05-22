import { banco } from "./src/core";

const servidor = Bun.serve({
    port: 5003,
    routes: {/* colocar new responser depois*/
        'listabolada':new Response(Bun.file('./public')),
        'listabolada/update': { PATCH: (req) => banco.update(req.params) },
        'listabolada/delete': { DELETE: (req) => banco.delete(req.params) },
        'listabolada/get': { GET: (req) => banco.pegar() },
        'listabolada/post': { POST: (req) => banco.inserir(req.body) }
    }

})