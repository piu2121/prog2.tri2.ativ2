# prog2.tri2.ativ2
## core
nele está constido a lógica do trabalho e o BD
```TS


import { Database } from "bun:sqlite";


const db = new Database("database.sqlite")

db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL
  )
`)


// const queryInsertItem = db.query("INSERT INTO items (title) VALUES (?)")
// queryInsertItem.run("comprar abacate")
// queryInsertItem.run("comprar abobrinha")
// queryInsertItem.run("comprar melancia")
// queryInsertItem.run("comprar aipo")
// queryInsertItem.run("comprar alface")
// queryInsertItem.run("comprar batata")


// const querySelectAllItems = db.query("SELECT * FROM items")
// console.log(querySelectAllItems.all())

// const querySelectItem = db.query("SELECT * FROM items WHERE id=?")
// console.log(querySelectItem.get(1))
// console.log(querySelectItem.get(3))
// console.log(querySelectItem.get(300))

const querySelectItems = db.prepare("SELECT * FROM items")
const queryInsertItem = db.prepare("INSERT INTO items (title) VALUES (?)")
const removeItems = (id: number) => { db.run("Delete from items where id=?1", [id]) }
const updateItems = (id: number, newtitle: String) => { db.run("Update items Set title=?2  where id=?1", [id, newtitle]) }
class Item {
  constructor(public title: string) { }
}


class TodoList {
  private items: Item[] = []

  addItem(item: Item) {
    this.items.push(item)
    queryInsertItem.run(item.title)
  }

  removeItem(index: number) {
    this.items.splice(index, 2)
    removeItems(index)
  }

  updateItems(index: number, newtitle: string) {
    updateItems(index, newtitle)
    return "sdlkjfdskljfghsadlkfjhsdaflkjh"
  }

  getItems() {
    const items = querySelectItems.all()
    return items
  }
}

let lista = new TodoList()

const bdAction = {
  update(id: number, newtitle: string) { lista.updateItems(id, newtitle) },
  delete(id: number) { lista.removeItem(id) },
  pegar() {
    let meuitem = lista.getItems()
    return meuitem;
  },
  inserir(nome: string) { lista.addItem(new Item(nome)) }
}

export { bdAction }

```

```TS

import { banco } from "./src/core";

const servidor = Bun.serve({
    port: 5003,
    routes: {
        'listabolada': new Response(Bun.file('./index.html')), 
        'listabolada/public': new Response(Bun.file('./public')),
        'listabolada/update:id': { PATCH: (req) => banco.update(req.params.id,req.body.title) },
        'listabolada/delete:id': { DELETE: (req) => banco.delete(req.params.id) },
        'listabolada/get': { GET: (req) => banco.pegar() },
        'listabolada/post': { POST: (req) => banco.inserir(req.body.title) }
    }

})

```
#'listabolada'

Rota principal do trabalho,nela é onde é enviada o arquivo html

#'listabolada/public'

Rota que entrega a pasta public,na qual está contida os arquivos estáticos da página,como css e js

#'listabolada/update:id'

Rota pacth,ela pega o id que é passado como parametro na url,e os dados a serem alterados no body da requisição,manda pro banco alterar os dados

#'listabolada/delete:id'

Rota delete,passa o id pela url, e manda pro banco para deletar

#'listabolada/get'

pega todos os itens da lista por ser a rota get,não precisa passar parametro pois esses dados são comuns a todos os usuários do trabalho

#'listabolada/post'

Rota post,manda os dados no corpo da requiusição

##como usar o software

você tem que escrever no bash
 ```
 bash

 bun index.ts
 
 ```
apartir dai você joga na barra de pesquisa do browser de sua preferencia,esse caminho


`http://localhost:5003/listabolada`

ai tu usufrui do site


##sobre o BD

estou usando o sqlite é um BD que cria um arquivo na máquina,com ele eu salvo valores,consulto,deleto e atualizo