import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ListItemIcon, TextareaAutosize } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
//imagecontrols
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FormLabel from '@mui/joy/FormLabel';
import { Tooltip } from '@mui/material'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import img from '../../images/dress.jpg'



//phoneNumber
import { MuiTelInput } from 'mui-tel-input'
import { useState } from "react";



function JobPost() {
	const currentUser = useSelector(state => state.userReducer.currentUser)
	const emailErrorRef = useRef();
	const nameErrorRef = useRef();
	const clothingTypesErrorRef = useRef();
	const submitValidationRef = useRef();
	const bugdetDescriptionErrorRef = useRef();
	const imagesErrorRef = useRef();
	const [formData, setFormData] = useState({
		customer_id: localStorage.getItem('userID'),
		firstName: "",
		lastName: "",
		phoneNumber: "+977Number",
		emailAddress: "",
		address: "",
		postcode: "",
		state: "",
		clothingTypes: "",
		images:[],
		description: "",
		budget: "",
	});
	const submitButtonRef = useRef()

	function photoHandleChange(e){
		//the size of the photo must be less than 2mb
		if(e.target.files[0].size>1000000){
			imagesErrorRef.current.innerHTML = "Image size must be less than 1mb"
		}
		else if(formData.images.length>4){
			imagesErrorRef.current.innerHTML = "You have already uploaded 5 images"
		}
		else{
			imagesErrorRef.current.innerHTML = ""
		formData.images.push(e.target.files[0])
		}
	}

	const [view,setview] = useState(false)
	function invert(){
		setview(!view)
	}
	
	function handleFormSubmit(event) {
		event.preventDefault();
		console.log(formData)
		if (formData.firstName && formData.lastName && formData.emailAddress && formData.address && formData.postcode && formData.state && formData.clothingTypes && formData.description) {
			
			submitValidationRef.current.innerHTML = ""
			submitButtonRef.current.disabled = true
			submitButtonRef.current.innerHTML = "Please wait..."
			//disable cursor 
			submitButtonRef.current.style.cursor = "not-allowed"
			const header = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			axios.post('http://backend-dev22.ap-south-1.elasticbeanstalk.com/api/postJob', formData, header)
			// axios.post('http://localhost:3333/api/postJob', formData, header)
				.then(res => {
					submitValidationRef.current.innerHTML = res.data.message
					submitButtonRef.current.disabled = false
					submitButtonRef.current.innerHTML = "Place Order"
					submitButtonRef.current.style.cursor = "pointer"
					if(res.data.success){
						window.location.href = "/profile "
					}
					else{
						submitValidationRef.current.innerHTML = "Something went wrong"
					}
				})
				.catch(err => {
					submitButtonRef.current.disabled = false
					submitButtonRef.current.innerHTML = "Place Order"
					submitButtonRef.current.style.cursor = "pointer"
					submitValidationRef.current.innerHTML = "Something went wrong"
				})
		} else {
			submitValidationRef.current.innerHTML = "Please fill all the fields"
		}
	 
	}
	function phoneHandleChange(value) {
		if(value ){
		setFormData({ ...formData, phoneNumber: value });
		}
	}
	function handleInputChange(event) {
		const { name, value } = event.target;
		if (name === 'firstName' || name === 'lastName') {
			if (value.match(/^[a-zA-Z]+$/)) {
			setFormData({ ...formData, [name]: value });
			nameErrorRef.current.innerHTML = ""  }
			else{nameErrorRef.current.innerHTML = "Please enter a valid Name" }  
		}
		if(name ==='emailAddress'){
			if(value.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)){
				setFormData({ ...formData, [name]: value });
				emailErrorRef.current.innerHTML = ""      
			}else{
				emailErrorRef.current.innerHTML = "Please enter a valid gmail address"
			}  
		}
		if(name ==='address'){
			if(value.match(/^[a-zA-Z0-9]+$/)){
				setFormData({ ...formData, [name]: value });
				emailErrorRef.current.innerHTML = ""      
			}else{
				emailErrorRef.current.innerHTML = "Please enter a valid address"
			}  
		}
		if(name ==='postcode'){
			if(value.match(/^[0-9]+$/)){
				setFormData({ ...formData, [name]: value });
				emailErrorRef.current.innerHTML = ""      
			}else{
				emailErrorRef.current.innerHTML = "Please enter a valid postcode"
			}  
		}
		if(name==='state'){
			if(value.match(/^[a-zA-Z]+$/)){
				setFormData({ ...formData, [name]: value });
				emailErrorRef.current.innerHTML = ""
			}else{
				emailErrorRef.current.innerHTML = "Please enter a valid state"
			}
		}
		if(name==='clothingTypes'){
			if(value!==""){
				setFormData({ ...formData, [name]: value });
				clothingTypesErrorRef.current.innerHTML = ""
			}
			else{
				clothingTypesErrorRef.current.innerHTML = "Please select a clothing type"
			}
		}
		if(name==='description'){
			if(value.split(" ").length>10){
				setFormData({ ...formData, [name]: value });
				bugdetDescriptionErrorRef.current.innerHTML = ""
			}
			else{
				bugdetDescriptionErrorRef.current.innerHTML = "Please enter more than 10 words "
			}
		}
		if(name==='budget'){
			if(value.match(/^[0-9]+$/)){
				setFormData({ ...formData, [name]: value });
				bugdetDescriptionErrorRef.current.innerHTML = ""
			}
			else{
				bugdetDescriptionErrorRef.current.innerHTML = "Budget must be in numbers"
			}
		}
	}

	return (
		<container maxWidth="lg" sx={{
			mb: 4,
		}}>
			<Grid container spacing={2}>
			{/* <Grid item xs={12} sm={4}>
				<CssBaseline /> */}
				{/* <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style={{width:"200px",height:"200px",borderRadius:"50%"}}/> */}
			{/* </Grid> */}
			<Grid item xs={12} sm={5}>
				<CssBaseline />
				<Grid sx={{ mt: 8,display:'flex',
				flexDirection:'column',
				alignItems:'center'

			}}>
					<img src={img} alt="Avatar" style={{width:"200px",height:"200px",borderRadius:"50%"}}/>
				</Grid>  
				<Typography component="h1" variant="h5" sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					Place an order
				</Typography>
				<Typography component="body1" variant="body1" sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					How do I place an order?
				</Typography>
				<Typography component="body1" variant="body1" sx={{
					marginTop: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					1. Fill in the form below
				</Typography>
				<Typography component="body1" variant="body1" sx={{
					marginTop: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					2. Upload your design
				</Typography>
				<Typography component="body1" variant="body1" sx={{
					marginTop: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					3. Wait for a response
				</Typography>
				


			</Grid >  
			<Grid item xs={12} sm={7} lg={5} xxl={5}>          
				<CssBaseline />
					<Box component="form" noValidate onSubmit={handleFormSubmit}  sx={{ mt: 10,ml:2,mr:2 }}
					 xs={8} sm={6} lg={6} xxl={8}>
						<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											autoComplete="given-name"
											name="firstName"
											required
											fullWidth
											id="firstName"
											label="First Name"
											autoFocus
											onChange={handleInputChange}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											id="lastName"
											label="Last Name"
											name="lastName"
											autoComplete="family-name"
											onChange={handleInputChange}
										/>
									</Grid>
									<Typography sx={{
										ml: 2,
									}} ref={nameErrorRef} style={{color:'red'}}></Typography>
									
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} sx={{ mt: 3,display:'flex',flexDirection:'column'}}>
							<FormLabel>Phone Number* </FormLabel>
							<MuiTelInput value={formData.phoneNumber} onChange={phoneHandleChange}
							auto />
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} sx={{ mt: 3,display:'flex',flexDirection:'column'}}>
							<FormLabel>Email Address*</FormLabel>
							<TextField
								name="emailAddress"                
								onChange={handleInputChange}
							/>
							<Typography ref={emailErrorRef} style={{color:'red'}}></Typography>
							</Grid>
							
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} sx={{ mt: 3,display:'flex',flexDirection:'column'}}>
							<FormLabel>Address* </FormLabel>
							<TextField
								name="address"
								onChange={handleInputChange}
							/>
							</Grid>
						</Grid>
						<Grid container spacing={2} sx={{mt:3}}>
									<Grid item xs={12} sm={6}>
										<TextField
											accept="number"
											autoComplete="given-name"
											name="postcode"
											required
											fullWidth
											id="PostalCode"
											label="Postal Code"
											autoFocus
											onChange={handleInputChange}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											required
											fullWidth
											id="State"
											label="State"
											name="state"
											autoComplete="family-name"
											onChange={handleInputChange}
										/>
									</Grid>
						</Grid>
						<Grid container spacing={2}>        
							<Grid item xs={12} sm={12} sx={{ mt: 3,display:'flex',flexDirection:'column'}}>
							
								<FormLabel>Choose a clothing type*</FormLabel>
								<Select
									labelId="demo-simple-select-required-label"
									id="demo-simple-select-required"
									label="Clothing Type *"
									name="clothingTypes"
									value={formData.clothingTypes}
									onChange={handleInputChange}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value={"Formal"}>Formal</MenuItem>
									<MenuItem value={"Ethnic"}>Ethnic</MenuItem>
									<MenuItem value={"Wedding"}>Wedding Dress</MenuItem>
								</Select>
							
								<FormHelperText>Choose one</FormHelperText>
								<Typography ref={clothingTypesErrorRef} style={{color:'red'}}></Typography>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} sx={{ mt: 3,display:'flex',flexDirection:'column'}}>
							<FormLabel>Images*</FormLabel>
							<input
								type="file"
								name="images"
								multiple
								accept="image/png, image/jpeg"
								onChange={photoHandleChange}
								required
							/>
							<FormHelperText>Upload images of the clothing less than 1mb each</FormHelperText>
							<Typography ref={imagesErrorRef} style={{color:'red'}}></Typography>
							<Tooltip title="View uploaded images" placement='bottom'>
								<Button 
									halfwidth
								onClick={invert}>View</Button>
							</Tooltip>
							{
								<ImageList sx={{ width: 400, height: 'auto' }} cols={3} rowHeight={164}>
								{formData.images.map((item) => (
									<ImageListItem key={item.img}>
										<img
											src={URL.createObjectURL(item)}
											alt="uploaded images"
											loading="lazy"
										/>
									</ImageListItem>
								))}
							</ImageList>
							}
							
					
							</Grid>
							
						</Grid>
						<Grid container spacing={2} >
						<Grid item xs={12} sm={12} sx={{ mt: 3,display:'flex',flexDirection:'column'}}>
							<FormLabel>Description*</FormLabel>
							<TextareaAutosize
								style={{border:"2px solid grey"}}
								aria-label="minimum height"
								minRows={5}
								maxRows={50}
								placeholder="Details of your order"
								name="description"
								
								onChange={handleInputChange}
							/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} sx={{ mt: 3,display:'flex',flexDirection:'column'}}>
							<FormLabel>Budget(optional)</FormLabel>
							<TextField
								placeholder='Enter your budget in dollars'
								name="budget"
								onChange={handleInputChange}
								accept="number"
							/>
							<Typography ref={bugdetDescriptionErrorRef} style={{color:'red'}}></Typography>
							</Grid>
						</Grid>
					<Button  
						ref={submitButtonRef}        
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Place Order
					</Button>
					<Typography ref={submitValidationRef} style={{color:'red'}}></Typography>
			</Box>
			<br/>
			<br/>
	</Grid>
	</Grid>
	</container>

	)
}

export default JobPost