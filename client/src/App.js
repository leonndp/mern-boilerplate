import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'

class App extends React.Component {
    render(){
        return (
            <div className="App">
                <AppNavbar />
            </div>
        )
    }
}
export default App;