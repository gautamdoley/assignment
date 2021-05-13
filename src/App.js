import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { store } from './store'
import MainPage from './components/MainPage'

class App extends React.Component {
  render() {
    return (
      // pass the store into the provider
      <Provider store={store}>
        <div style={{backgroundColor: "azure",padding: "25px",margin: "10px", border: "1px solid lightblue"}}>
          <MainPage/>
        </div>
      </Provider>
    )
  }
}

export default App