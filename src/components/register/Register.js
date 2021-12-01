import React from 'react';


class Register extends React.Component{
	constructor(props){
	super(props);
	this.state = {
		Email:'',
		Password:'',
		Name:''
	}
	}
	onNameChange = (event)=>{
		this.setState({Name: event.target.value})
	}
	onEmailChange = (event)=>{
		this.setState({Email: event.target.value})
	}
	onPasswordChange = (event)=>{
		this.setState({Password: event.target.value})
	}
	onSubmitSignIn =()=>{
	fetch("http://localhost:3001/register",{
		method: "post",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify({
			email: this.state.Email,
			password: this.state.Password,
			name: this.state.Name,
		})
	})
		.then(response=>response.json())
		.then(user =>{
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');

			}
		})

	};

	render(){
		//const{onRouteChange} = this.props;
	return(
		<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">Register</legend>

			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="name"  
				        id="name"
				        onChange = {this.onNameChange}/>
			      </div>



			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        onChange = {this.onEmailChange}/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password"
				        onChange = {this.onPasswordChange}/>
			      </div>
			      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
			    </fieldset>
			    <div className="">
			      <input onClick = {this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="register"/>
			    </div>
			  </div>
			</main>
		</article>
		)}
}

export default Register;