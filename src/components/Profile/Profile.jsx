import React from 'react'
import { Container, Box, Avatar, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import userActions from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import Order from '../orders/Order'


function Profile() {
	const currentUser = useSelector(state => state.userReducer.currentUser)
	const role = currentUser.role


  return (
	<Container>
		<Typography variant="h5" component="h1" gutterBottom sx={{
				mt: 5,
				textAlign: 'center',
			}}>
				My Profile
			</Typography>
		<Grid container spacing={2}>
			<Grid item xs={12} sm={4}>
				<Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center',borderRadius:"10px" }}>
					<img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style={{width:"200px",height:"200px",borderRadius:"50%"}}/>
					<Typography variant="h5" component="h5" >
						{currentUser.username}
					</Typography>
					<Typography variant="h5" component="h5" >
						{currentUser.email}
					</Typography>


				</Box>    
			</Grid>
			{
				role ==='consumer'?
				<Grid item xs={12} sm={8}>
				<Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center',borderRadius:"10px" }}>
					<Typography variant="h5" component="h1" gutterBottom>
						My Orders
					</Typography>
					<Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center',borderRadius:"10px" }}>
					{
						currentUser.orders.map((order,index)=>{
							return <Order key={index} order={order} role={role} />
						})
					}


				</Box>
				</Box>    
			</Grid>:
			null
			}
		   
		


		</Grid>
	</Container>        
	)
}

export default Profile