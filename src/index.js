import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
const axios = require('axios')

class DogsBreed extends React.Component {
  constructor(){
    super();
    this.state = {
      imgURL: "",
      breed: [""],
      select: ""
    }
  }

  getDogPicture = () => {
    const { select } = this.state;
    let url = "https://dog.ceo/api/breed/" + select + "/images/random";
    axios
      .get(url)
      .then(response => {
        this.setState({
          imgURL: response.data.message
        })
        console.log(response.data.message)
      })
      .catch(e => {
        console.log("error fetching image")
      })
  }

  getBreed = () => {
    const {breed} = this.state
    axios
      .get("https://dog.ceo/api/breeds/list")
      .then(response => {
        this.setState({
          breed: breed.concat(response.data.message)
        })
      })
      .catch(e => {
        console.log("error fetching list")
      })
  }

  getRandomPicture = () => {
    const { breed } = this.state
    const randomDog = Math.floor(Math.random()*breed.length)
    const choice = (randomDog === 0 ? "wolfhound" : breed[randomDog])
    let url = "https://dog.ceo/api/breeds/image/random"
    axios
      .get(url)
      .then(response => {
        this.setState({
          imgURL: response.data.message,
          select: choice
        })
      })
      .catch(e => {
        console.log("error fetching image")
      })
      console.log(url)
  }

  handleSelect = (e) => {
    this.setState({
      select: e.target.value
    })
  }

  componentDidMount() {
    this.getBreed()
    this.getRandomPicture()
  }

  render() {
    const { breed, imgURL, select} = this.state
    return(
      <div className="main">
        
        <h1>Dogs by Breed</h1>
        <div class="content">
          <div>
            <h3>Option 1: Choose a breed from the select and click submit</h3>
            <select value={select} onChange={this.handleSelect}>
              {breed.map(e => 
                <option value={e}> {e} </option>
              )}
            </select>
            <button id="submit" disabled={!select} onClick={this.getDogPicture}>SUBMIT</button>
          </div>
          <div class="lbl-opt">OR</div>
          <div>
            <h3>Option 2: Click the random button for a random dog.</h3>
            <p>Breed: {select}</p>
            <button onClick={this.getRandomPicture}>RANDOM</button>
          </div>
          <div id="box-img">
            <img alt="dog" src={imgURL} className="height-Pictureure" />
          </div>
        </div>
      </div>
    )
  }
}

ReactDom.render(
  <DogsBreed />,
  document.getElementById('root')
);