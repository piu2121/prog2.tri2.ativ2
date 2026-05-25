// Select DOM elements
const p = 5003;
const app = document.querySelector('#app')
const input = app.querySelector('#task-input')
const addButton = app.querySelector('#add-button')
const list = app.querySelector('#list')
const itemTemplate = list.querySelector('template')

// Save tasks to local storage

let tasks;
// Create a DOM element for a task
function createDomTask() {
  const domTask = itemTemplate.content.cloneNode(true)
  foreach(tasks, (tasks) => {
  domTask.querySelector('.title').textContent = tasks.title

  domTask.querySelector('.bt-delete')
    .addEventListener('click', (e) => {

      e.target.closest('li').remove()


    })/* aqui eu insiro  a função como um meta dado do butão
    domTask.querySelector('.bt-delete').onclick = () => deletetask(${tasks.id})*/
    domTask.querySelector('.bt-delete').addEventListener('click', () => deletetask(${tasks.id}))
    domTask.querySelector('.bt-update').addEventListener('click', () => updatetask(${tasks.id}))
  })
  return domTask
}

// Create a new task and add it to the list
function createNewTask() {
  const title = input.value.trim()

  if (!title) return

  const task = posttask(title)
  input.value = ''
}

// Event listeners
addButton.addEventListener(
  'click',
  createNewTask
)

input.addEventListener('keypress', (e) =>
(e.key === 'Enter'
  ? createNewTask()
  : null)
)

// Load tasks from local storage on page load

const gettask = async () => {
  await fetch('http://localhost:${p}/listabolada/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
tasks = await response.json()
};
const updatetask = async (id) => {
  await fetch('http://localhost:${p}/listabolada/update:${id}', {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json'
    },body: JSON.stringify({
      title: input.value.trim()
    })
  })
  gettask()
};
const deletetask = async (id) => {
  await fetch('http://localhost:${p}/listabolada/delete:${id}', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  gettask()
};

const posttask = async (title) => {
  await fetch('http://localhost:${p}/listabolada/post', {
    method: 'POST',
    headers: { contentType: 'application/json' },
    body: JSON.stringify({
      title: title

    })
  })
  gettask()
}

gettask()
