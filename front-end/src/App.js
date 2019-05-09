import React from 'react';

const URL = 'http://localhost:3004/todos/'

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.getTodos = this.getTodos.bind(this)
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




  render() {
    return (
    <div className="container">
        <h1>words</h1>
        {this.state.todos.map(item => {
          return(
            <div key={item._id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          )
        })}
    </div>
  );
}
}

export default App;
