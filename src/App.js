import React, { Component } from 'react';
import facebookImg from './img/facebook-button.png';
import backgroundPic from './img/background-pic.png';
import axios from 'axios';
import './App.css';
import './reset.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aboutFlag: false,
      tourFlag: false,
      emailFlag: false,
      storeFlag: false,
      aboutInfo: [],
      tourInfo: [],
      storeInfo: [],
      email: ''

    };
    // console.log(this.state.aboutInfo)
    this.handleAboutTab = this.handleAboutTab.bind(this);
    this.handleTourTab = this.handleTourTab.bind(this);
    this.handleStoreTab = this.handleStoreTab.bind(this);
    this.addEmail=this.addEmail.bind(this);
  }


  handleAboutTab(change) {
    let aboutState = !this.state.aboutFlag
    this.setState({
      aboutFlag: aboutState
    })
  }

  handleTourTab(change) {
    let tourState = !this.state.tourFlag
    this.setState({
      tourFlag: tourState
    })
  }

  handleStoreTab(change) {
    let storeState = !this.state.storeFlag
    this.setState({
      storeFlag: storeState
    })
  }

  
  addEmail(e) {
    e.preventDefault();
    axios.post(`http://localhost:3001/email`, {email:this.state.email}).then(response => {
      let emailState = !this.state.emailFlag
      this.setState({
        emailFlag: emailState,
        email: ''
      })
      console.log(response.data)
      console.log(this.state.emailFlag)
      }
     
    )

  }
  componentWillMount() {
    let promise = axios.get('http://localhost:3001/aboutInfo')
    promise.then(response => {
      // console.log(response)
      this.setState({
        aboutInfo: response.data
      })
    })


    axios.get('http://localhost:3001/tourInfo').then(response => {
      // console.log(response)
      this.setState({
        tourInfo: response.data
      })
    })

    axios.get('http://localhost:3001/storeInfo').then(response => {
      // console.log(response)
      this.setState({
        storeInfo: response.data
      })
    })


  }



  render() {
    // console.log(this.state.aboutFlag)
    // console.log(this.state.tourInfo)

    let showAbout = () => {
      if (this.state.aboutFlag) {
        return (
          <div className='about-info'>
            <h3>{this.state.aboutInfo}</h3>
          </div>
        )
      }
    }


    let showTour = () => {
      if (this.state.tourFlag) {
        return (
          <div className='tour-info'>
            {this.state.tourInfo.map( (e,i) => (
          <div key={i} className ='tourEvent'>   
            <h2>{e.date}</h2>
            <h3>{e.venue}</h3>
            <h3>{e.location}</h3>
          </div>  
            ))}
          </div>
        )



      }
    }

    let showStore = () => {
      if (this.state.storeFlag) {
        return (
          <div className='store-info'>
            <img src={this.state.storeInfo.cd1} alt='cd1'/>
                <span>$15</span>
                <button className='button1'>BUY</button>
                
            <img src={this.state.storeInfo.cd2} alt='cd2'/>
                <span>$15</span>
                <button className='button2'>BUY</button>
                
          </div>
        )
      }
    }

    let showEmail = () => {
      if (this.state.emailFlag) {
        return (
          <div className='email-thank'>
            <h3>THANK YOU!</h3> 
            <h3> You'll hear from us soon!</h3>
          </div>
        )
      }
    }


    return (
      <div className='main-div' background={backgroundPic}>
        <link href="https://fonts.googleapis.com/css?family=Oswald:400,600,700" rel="stylesheet" />
        {/* <img src={backgroundPic} alt='back-pic'/> */}

        <header className='header'>
          <h1>CALEB GRAY</h1>
        </header>

        <div className='body-tab'>

          <div onClick={this.handleAboutTab} className='about-tab id'>
            <h1>ABOUT</h1>
          </div>

          {showAbout()}

          <div onClick={this.handleTourTab} className='tour-tab id'>
            <h1>TOUR</h1>
          </div>

          {showTour()}

          <div onClick={this.handleStoreTab} className='store-tab id'>
            <h1>STORE</h1>
          </div>

          {showStore()}

          <div className='newsletter-tab'>
            <h2>Sign up for our newsletter!</h2>
            <form onSubmit={this.addEmail}>
              <input onChange={ (e) => {this.setState({ email: e.target.value})}} value={this.state.email} className='email-input' placeholder='Enter your email'></input>
              <button className='email-button' type='submit'>Sign up!</button>
            </form>
          </div>

          {showEmail()}

          <div className='facebook-tab'>
            <h3>Like us on facebook!</h3>
            <a href="https://www.facebook.com/calebgrayband/?view_public_for=310248822407431"
              target="_blank"
              rel="noopener noreferrer">
              <img src={facebookImg} alt='facebook-icon' />
            </a>
          </div>

        </div>


      </div>
    );
  }
}



export default App;
