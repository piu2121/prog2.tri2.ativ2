

const servidor = Bun.serve({
    port: 5003,
    routes: {
        'listabolada': Bun.file('./public'),
        'listabolada/update': { POST: ()=>{ } },
        'listabolada/delete':,
        'listabolada/get':,
        'listabolada/post'
    }

})