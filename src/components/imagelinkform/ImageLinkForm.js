import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({OnInputChange, OnButtonSubmit}) =>{
	return(
		<div>
			<p className='f3'>
			{'This Bizzare Alien will detect your faces! Go for a try!'}
			</p>
		
		<div className = 'center'>
			<div className = 'center pa4  br4 shadow-5'>
			<input className = 'f4 pa2 w-70 center' type='text' onChange = {OnInputChange}/>
			<button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick = {OnButtonSubmit}> Detect </button>
			</div>
		</div>
		</div>
		)
}

export default ImageLinkForm;