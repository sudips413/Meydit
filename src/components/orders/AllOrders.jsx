import React from 'react'
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, InputAdornment, InputLabel, TextField, Tooltip, createFilterOptions } from '@mui/material';
import Box from '@mui/material/Box';
import Order from './Order';
import Grid from '@mui/material/Grid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

//search bar
import FormControl from '@mui/joy/FormControl';



function AllOrders() {
		const currentUser = useSelector(state=>state.userReducer.currentUser)
		const allOrders=currentUser.orders
		console.log(allOrders)
		const[Category, setCategory] = React.useState('')
		const [all, setAll] = React.useState(true)
		return (
				<Container 
						maxWidth="100%"
						
						>  <Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								mt: 2,
								mb: 2,
							}}>
								<Typography>Filter Orders</Typography><FilterAltIcon />
								<FormControl sx={{
										mt: 2,
										mb: 2,
								}}>
										<TextField
												label="Search"
												type="search"
												variant="standard"
												fullWidth
												InputProps={{
														startAdornment: (
														<InputAdornment position="start">
																<SearchIcon />
														</InputAdornment>
														),
												}}
/>
								
								<Button sx={{
										mt: 2,
										mb: 2,
								}} variant="contained">Search</Button>
								</FormControl>
								<Box sx={{
									mt: 2,
									mb: 2,
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem'
								}}>
									<Typography>Filter By Category</Typography>
									<Grid container spacing={2}>
										<Grid item xs={6} md={3}>
											<Button fullWidth variant="contained" onClick={() => {
												setAll(true)
												setCategory('')
											}}>All</Button>
										</Grid>
										<Grid item xs={6} md={3}>
											<Button fullWidth variant="contained" onClick={() => {
												setCategory('Wedding')
												setAll(false)
											}}>Wedding</Button>
										</Grid>
										<Grid item xs={6} md={3}>
											<Button fullWidth variant="contained" onClick={() => {
												setCategory('Formal')
												setAll(false)
											}}>Formal</Button>
										</Grid>
										<Grid item xs={6} md={3}>
											<Tooltip title="Sari/Blouse/Kurtha">
												<Button fullWidth variant="contained" onClick={() => {
													setCategory('Ethnic')
													setAll(false)
												}}>Ethnic</Button>
											</Tooltip>
										</Grid>
									</Grid>

									<Typography>Filter By Status</Typography>
									<Grid container spacing={2}>
										<Grid item xs={6} md={4}>
											<Button fullWidth variant="contained">All</Button>
										</Grid>
										<Grid item xs={6} md={4}>
											<Button fullWidth variant="contained">Pending</Button>
										</Grid>
										<Grid item xs={6} md={4}>
											<Button fullWidth variant="contained">Completed</Button>
										</Grid>
									</Grid>

									<Typography>Sort By</Typography>
									<Grid container spacing={2}>
										<Grid item xs={6} md={6}>
											<Button fullWidth variant="contained">Newest</Button>
										</Grid>
										<Grid item xs={6} md={6}>
											<Button fullWidth variant="contained">Oldest</Button>
										</Grid>
									</Grid>
								</Box>

												
						</Box>
						</Grid>
						<Grid item xs={12} sm={8} sx={{
								mt: 5   
						}} >
								<Typography variant="h4">Orders: {
										all ? 'All' : Category
								} </Typography>
								
								<Grid 
										sx={{
												display: 'flex',
												flexWrap: 'wrap',
												justifyContent: 'space-between',
										}}
										>
												{
														all && Array.isArray(allOrders) && allOrders.map((order,index)=>{

																return (
																		<Order
																				key={index}
																				order={order}   
																		/>
																);
														})
												}
										
										{ 
										Array.isArray(allOrders) && allOrders.map((order,index)=>{
												return (
												order.clothing_type===Category &&
												<Order 
														key={index} 
														order={order}
														role={currentUser.role}
												/>
												
												);
										})}
								</Grid>
						</Grid>
				
						
			</Grid>
						
				</Container>

		)
}

export default AllOrders