import React from 'react'
import { useState,useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux'


//checkboxes
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import { Tooltip } from '@mui/material'
import allActions from '../../actions'




function Singup() {
		const [loginAsConsumer, setLoginAsConsumer] = useState(false)
		const [name, setName] = useState('')
		const [email, setEmail] = useState('')
		const [password, setPassword] = useState('')
		const [Agreement,setAgreement] = useState(false)
		const nameErrorRef = useRef()
		const emailErrorRef= useRef()
		const passwordErrorRef = useRef()
		const agreeRef = useRef()
		const submitButtonRef = useRef()

		const validationAndResponseRef = useRef()

		const navigate = useNavigate()
		const dispatch = useDispatch()

		//fucntion to handle signup
		function signUpHandler(e){
				e.preventDefault()
				const role = loginAsConsumer ? 'consumer' : 'producer'
				const formdata = new FormData()
				formdata.append('username', name)
				formdata.append('email', email)
				formdata.append('password', password)
				formdata.append('role', role)
						if (name && email && password){
								if(Agreement){
										submitButtonRef.current.innerHTML = 'Please wait...'
										axios.post('http://backend-dev22.ap-south-1.elasticbeanstalk.com/api/auth/register', formdata)
										.then(response=>{
												if(response.data.success){
														validationAndResponseRef.current.innerHTML = response.data.message
														dispatch(allActions.userActions.set_registration_status(true))
														submitButtonRef.current.innerHTML = 'Sign Up'
														navigate('/login')
														
												}
												else{
														validationAndResponseRef.current.innerHTML = response.data.message
														submitButtonRef.current.innerHTML = 'Sign Up'
												}}
										)
										.catch(
												error => {
														validationAndResponseRef.current.innerHTML = "Error in Request"
														submitButtonRef.current.innerHTML = 'Sign Up'
												})}
								else{
										agreeRef.current.innerHTML = 'Please agree to the terms and conditions'
								} 
						}
						else{
								validationAndResponseRef.current.innerHTML = 'Please fill all the fields'            
						}       
				
		}
	return (<>
	 <Container component="main" maxWidth="xs">
				<CssBaseline />
				
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						{/* <LockOutlinedIcon /> */}
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<FormControl sx={{mt:4}}>
						<FormLabel> <Typography variant="h6" sx={{
							mt: 1,
							mb: 1,
							fontWeight: 'bold',
						}}>Register as</Typography></FormLabel>
						<RadioGroup defaultValue="Designer" name="radio-buttons-group" >
							<Tooltip title="Designer create the design according to the customer demand" placement="right">
							<Radio value="Designer" label="Designer" variant="outlined" onChange={(e)=>{
									setLoginAsConsumer(false)
							}} />
							</Tooltip>
							<Tooltip title="Customer can provide the design for clothes" placement="right">
							<Radio value="Customer" label="Customer" variant="outlined" onChange={(e)=>{
								setLoginAsConsumer(true)

							}} />
							</Tooltip>
						</RadioGroup>
					</FormControl>
					<Typography variant='soft' sx={{
						color: 'green',
						mt: 1,
						mb: 1,
					}}>You are registering as{
							loginAsConsumer ? ' Customer' : ' Designer'
						} </Typography>
					<Box component="form" noValidate onSubmit={signUpHandler}  sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} >
								<TextField
										required 
										fullWidth
										id="UserName"
										label="User Name"
										name="UserName"
										autoComplete="UserName"
										onChange={(e)=>{
												if(e.target.value.match(/^[a-zA-Z\s]{6,}$/)){
														nameErrorRef.current.innerHTML = ''
														setName(e.target.value)
												}else{
														//display error message
														nameErrorRef.current.innerHTML = 'Name should be atleast 6 characters long'
												}
										}}
										/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={(e)=>{
										if(e.target.value.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)){
												setEmail(e.target.value)
											 emailErrorRef.current.innerHTML = ''
										}else{
												setEmail(e.target.value)
											 emailErrorRef.current.innerHTML = 'Email should be in the format of examle@gmail.com only'
										}
								}} 
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									onChange={(e)=>{
										if(e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\-{}[\]|;:'",.<>?]).{8,}$/)){                       
												setPassword(e.target.value)
												passwordErrorRef.current.innerHTML = ''
										}else{
												setPassword(e.target.value)
												passwordErrorRef.current.innerHTML = 'Password should be atleast 8 characters long and should contain atleast one uppercase, one lowercase and one special character'
										}
								}} 
								/>
							</Grid>
							<Grid item xs={12} sx={{mb:4}}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I agree to the terms and conditions"
									onChange={(e)=>{
										if (e.target.checked){
												setAgreement(true)
										}else{
												setAgreement(false)
										}
									}
									}
								/>
							</Grid>
						</Grid>
						<div style={{display:"flex",flexDirection:"column",color:"red"}}>
								<span ref={nameErrorRef} id="nameError"></span>    
								<span ref={emailErrorRef} id="emailError"></span>
								<span ref={passwordErrorRef} id="passwordError"></span>
								<span ref={agreeRef} id="agree"></span>
								<span ref={validationAndResponseRef} id="error"></span>
						</div>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2}}
							ref={submitButtonRef}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>      
				
		 
		 </>
	)
}
export default Singup