import React from 'react';
import './App.css';

const APPID = "93554df041fc50be24dc41455ad747c1"
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
      temp: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined

    }
  }

  getWeather = (event) => {
    event.preventDefault()
    const city = event.target.elements.city.value
    const country = event.target.elements.country.value
   
    // const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APPID}&units=metric`)
    // const data = await response.json()

       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APPID}&units=metric`)
          .then(response => response.json())
           .then(data => {


    this.setState({
      isLoading: false,
      temp: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description

    })
  }).catch(function(error){
    console.log(error)
  })

}


  render() {
    return (
      <div className="App">

        <nav className="navbar navbar-light bg-danger">
          <a className="navbar-brand" style={{color : "white"}} href="#">Abhinav's Weather App ©</a>
        </nav>

        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">Stay Informed No Matter What</h1>
            <p style={{fontStyle: "italic"}} className="lead">Wherever you go, no matter what the weather, always bring your own sunshine ☀️.</p>
          </div>
          <form style={{ marginTop: "0px" }} onSubmit={this.getWeather}>
            <div className="row">
              <div className="col">
                <input type="text" name="city" placeholder="City" required></input>
              </div>
              <div className="col">
                <input type="text" name="country" placeholder="Country" required></input>
              </div>
            </div>
              <br/>
         
            <button style={{ marginTop: "3px" }} className="btn btn-danger btn-lg" >🌈⛅️Get Weather🌧❄️</button>
          </form>
          <div className="list-group">
            {!this.state.isLoading && <h1 className="list-group-item, alert-danger" style={{ marginTop: "50px" }}>City: {this.state.city}</h1>}
            {!this.state.isLoading && <h1 className="list-group-item, alert-danger">Country: {this.state.country}</h1>}
            {!this.state.isLoading && <h3 className="list-group-item, alert-danger">Temperature: {this.state.temp}℃</h3>}
            {!this.state.isLoading && <h3 className="list-group-item, alert-danger">Humidity: {this.state.humidity}</h3>}
            {!this.state.isLoading && <p className="list-group-item, alert-danger">Description: {this.state.description}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;