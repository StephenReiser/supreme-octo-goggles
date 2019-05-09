import React from 'react';
// import NewForm from './components/NewForm'

const URL = 'http://localhost:3004/todos/'

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      name: '',
      description: ''
    }
    this.getTodos = this.getTodos.bind(this)
    this.handleAddToDos = this.handleAddToDos.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

componentDidMount() {
  this.getTodos()
}

getTodos() {
  fetch(URL)
  .then(data => {
    return data.json()
  }, error => console.log(error))
  .then(parsedData => {
    console.log(parsedData)
    this.setState({todos:parsedData})
  }, error=> console.log(error))
}

handleAddToDos (todo) {
  const copyToDos = [...this.state.todos]
  copyToDos.unshift(todo)
  this.setState({
    todos: copyToDos
  })
}
handleChange(event) {
  this.setState({
      [event.currentTarget.id]: event.currentTarget.value
  })
}
handleSubmit(event) {
  event.preventDefault()
  fetch(URL, {
      method: 'POST',
      body: JSON.stringify({name: this.state.name, description: this.state.description}),
      headers: {
          'Content-Type': 'application/json'
      } 
  }).then(res => res.json())
  .then(resJson => {
      this.handleAddToDos(resJson)
      this.setState({
          name: '',
          description: ''
      })
  }).catch(error => console.error({'Error': error}))
}
deleteItem(id) {
  fetch(URL + id, {
    method: 'DELETE'
  }).then( response => {
    const findIndex = this.state.todos.findIndex(item => item._id === id)

    const copyTodos = [...this.state.todos]
    copyTodos.splice(findIndex, 1)
    this.setState({todos: copyTodos})
  })
}

// updateItem(item) {
//   fetch(URL, {
//     method: 'PUT',
//     body: JSON.stringify({completed: !item.completed}),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
// }





  render() {
    return (
    <div className="container">
        <h1>To Do List</h1>
        {this.state.todos.map(item => {
          return(
            <div key={item._id}>
              <h3 onClick={(()=>this.deleteItem(item._id))}>{item.name}</h3>
              <p>{item.description}</p>
              <h4>{item.completed ? 'True': 'False'}</h4>
            </div>
          )
        })}
         <form onSubmit={this.handleSubmit}>
            <label htmlFor='name'></label>
            <input type='text' id='name' onChange={this.handleChange} value = {this.state.name} placeholder='Add something to do'/>
            <label htmlFor='description'></label>
            <input type='text' id='description' onChange={this.handleChange} value = {this.state.description} placeholder='description'/>
            <input type='submit' value = 'Create to do item' />

        </form>
        
    </div>
  );
}
}

export default App;
