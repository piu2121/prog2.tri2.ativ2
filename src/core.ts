import { Database } from "bun:sqlite";

// class Item_ {
//   public title: string
//   constructor(title: string) {
//     this.title = title
//   }
// }

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
const updateItems = (id: number, newtitle: String) => { db.run("Update items Set title=?2  where id=?1", [id,newtitle]) }
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


function bola() {
  let lista = new TodoList()
  const bola = new Item("bola")
  lista.addItem(bola)
  let meuitem  = lista.getItems()
  console.log(meuitem[0].title, "    ", meuitem[0].id)
  console.log(lista.updateItems(1, 'bolaaaaaaaaaaaaaaa'))
  lista.removeItem(1)

}

bola()