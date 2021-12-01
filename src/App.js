import './App.css';
import React, {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/register/Register';

const app = new Clarifai.App({
 apiKey: '34a8649a345f461180909296b654822a'
}); //can move api to server.js



const particlesOptions = {
  particles: {
  number: {
    value: 80,
    density: {
      enable: true,
      value_area: 800
    }
  },
  line_linked: {
    enable: true,
    distance: 150,
    color: "#ffffff",
    opacity: 0.4,
    width: 1
  },
  "shape": {
    "type": "circle",
    "stroke": {
      "width": 0,
      "color": "#000000"
    },
    polygon: {
      nb_sides: 7
    }
  }
 },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      }
    }
  },
  "retina_detect": true
} 
      


const initialState =  {
      input: '',
      imgUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user:{
        "id":"",
        "name":"",
        "email": "",
        "password":"",
        "entries":0,
        "joined":  ""
      }
    }         
class App extends Component {
  constructor(){
    super();
    this.state = initialState;  
  }
  /*
  componentDidMount(){
    fetch("http://localhost:3001/")
    .then(response=>response.json())
    .then(console.log)
  }*/

loadUser = (data) =>{
  this.setState({user:{
    "id":data.id,
    "name":data.name,
    "email": data.email,
    "password":data.password,
    "entries":data.entries,
    "joined":  data.joined
    }
  })
}
calfacelocation = (data) =>{
  const clarifai_face = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('image');
  const width = Number(image.width);
  const height = Number(image.height);
  return{
    leftCol: clarifai_face.left_col*width,
    topRow: clarifai_face.top_row*height,
    rightCol: width - (clarifai_face.right_col*width),
    bottomRow: height - (clarifai_face.bottom_row*height)
  }
}
displayFaceBox = (box)=>{
  this.setState({box: box});
  console.log(box);
}


OnInputChange = (event) =>{
  this.setState({input: event.target.value});

}
OnSubmit = () => {
    // image example  https://buffer.com/library/content/images/size/w300/2020/05/Frame-9.png 
    this.setState({imgUrl: this.state.input});
 //https://samples.clarifai.com/face-det.jpg
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imgUrl)
    .then(response => {
      if(response){
        fetch("http://localhost:3001/image",{
          method: "put",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            id: this.state.user.id })
        })
        .then(response =>{response.json()})
        .then(count => {
          this.setState(Object.assign(this.state.user,{"entries": count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calfacelocation(response));//console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    })
    .catch(error => {
      console.log(error);
    });
  }; 

onRouteChange = (route) =>{
  if(route ==='signout'){
    this.setState(initialState);
  }else if(route ==='home'){
    this.setState({isSignedIn: true});
  }
  this.setState({route: route});
}
  render(){
    return (
      <div className="App">
      <Particles className = 'particles' params={particlesOptions} />
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route ==='signin'
          ?<Signin loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
          :(this.state.route ==='register'
            ?<Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
            :(this.state.route ==='home'
            ?<div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>/>
            <ImageLinkForm OnInputChange={this.OnInputChange} OnButtonSubmit = {this.OnSubmit}/>
            <FaceRecognition box = {this.state.box} imgUrl = {this.state.imgUrl}/>
          </div>
          :<Signin loadUser = {this.loadUser}  onRouteChange={this.onRouteChange}/>
          )
            )


        }
      </div>
    );
  }
}

export default App;
