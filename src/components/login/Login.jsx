import React from 'react'
import { useState,useRef} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions'
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
import { Alert } from '@mui/material'


// import './login.css'

function Login() {
		const regStatus = useSelector(state=>state.registrationStatusReducer.registrationStatus);
		const [checked, setChecked] = useState(false)
		const passwordErrorRef = useRef()
		const emailErrorRef = useRef()
		const checkErrorRef = useRef()
		const loginRef = useRef()

		const validationAndResponseRef = useRef()
		
		const dispatch = useDispatch()
		const navigate = useNavigate()
		function submitHandler(e) {
				e.preventDefault()
				if(email && password){
						loginRef.current.innerHTML = 'Please wait...'
						loginRef.current.disabled = true
						axios.post('http://backend-dev22.ap-south-1.elasticbeanstalk.com/api/auth/login', {
								email: email,
								password: password
						})
						.then(res => {
								if(res.data.success){
										//write the routing here
										loginRef.current.innerHTML = 'Login'
										loginRef.current.disabled = false
										localStorage.setItem('userID',res.data.data.id)
										localStorage.setItem('role',res.data.data.role)
										const obj ={
												username: res.data.data.username,
												email: res.data.data.email,
												role: res.data.data.role,
												id : res.data.data.id,
												orders : res.data.allOrders
										}
										dispatch(allActions.userActions.login(obj))
										navigate('/')

								}
								else{
										loginRef.current.innerHTML = 'Login'
										validationAndResponseRef.current.innerHTML = res.data.message
								}

						})
						.catch(err => {
								loginRef.current.innerHTML = 'Login'
								validationAndResponseRef.current.innerHTML = 'Error in request'
						})
				}
				else{
					
						validationAndResponseRef.current.innerHTML = 'Please fill all the fields'
				}
		}
		const [password, setPassword] = useState('')
		const [email, setEmail] = useState('')
		
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
						Sign in
					</Typography>
					{regStatus && <Alert severity="success" >Registration Successful - You can Login now!</Alert>
					}
					<br/>
					<Box component="form" onSubmit={submitHandler}  noValidate sx={{ mt: 1 }}>
						<TextField                
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e)=>{
								if(e.target.value.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)){
										setEmail(e.target.value)
										emailErrorRef.current.innerHTML = ''
								}else{
										emailErrorRef.current.innerHTML = 'Please enter gmail account only'
								}


						}}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e)=>{
								if(e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=\-{}[\]|;:'",.<>?]).{8,}$/)){
										setPassword(e.target.value)
										passwordErrorRef.current.innerHTML = ''
								}else{
										passwordErrorRef.current.innerHTML = 'Password must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
								}
						}}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
							onChange={(e)=>{
								if (e.target.checked) {
										setChecked(true)
								} else {
										setChecked(false)

								}
							}}
						/>
						<Container component="main" maxWidth="xs"> 
								<span ref={emailErrorRef} style={{color:'red'}}></span>
								<span ref={passwordErrorRef} style={{color:'red'}}></span>
								<span ref={checkErrorRef} style={{color:'red'}}></span>
								<span ref={validationAndResponseRef} style={{color:'red'}}></span>  
						</Container>  
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							ref={loginRef}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link to="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				{/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
			</Container>
			
		 </> 
	)
}

export default Login