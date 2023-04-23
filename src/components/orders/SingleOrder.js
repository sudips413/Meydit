import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Typography,Box,ImageList,ImageListItem,Button, TextField,Breadcrumbs,Link,Chip,Alert,Grid} from '@mui/material'

import axios from 'axios'
import './order.css'

function SingleOrder() {
	const currentUser = useSelector(state=>state.userReducer.currentUser)
	const id = localStorage.getItem("OrderId");
	const [order, setOrders] = React.useState([])
	const [price,setPrice] = React.useState('')
	const [comment,setComment] = React.useState('')

	const commentErrorRef = React.useRef(null)
	const priceErrorRef = React.useRef(null)
	const ButtonRef = React.useRef(null)
	const sendRef = React.useRef(null)
	const [sent, setSent] = React.useState(false)
	function fetchById(){
		if(id){
		axios.get(`http://backend-dev22.ap-south-1.elasticbeanstalk.com/api/getOrder/${id}`)

		.then((response) => {
		   setOrders(response.data.data)
		});
		}
	}

	useEffect(() => {
		fetchById();
	}, [id]);
	
	const [sendQuote, setSendQuote] = React.useState(false)

	return (
		order.length !== 0?
		<Container
			maxWidth="lg"
			sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
		>   <Typography variant="h4" component="h4" gutterBottom>
				Order Details
			</Typography>
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" to="/">
				Home
				</Link>
				<Typography color="text.primary"> Order</Typography>
			</Breadcrumbs>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4} lg={6}sx={{
					mt:10,
				}}
				>   <Box sx = {{mt: 2, mb: 2,mr:1}} className='images' >
					{Object.keys(JSON.parse(order.images)).map((key) => (
							<ImageListItem key={key} 
							>
							<img 
							className='images'
							src={`${JSON.parse(order.images)[key]}`} alt="photos"
							srcSet={`${JSON.parse(order.images)[key]}`}
								/>
							</ImageListItem>
						))}
					</Box>    
						<br/>
						<div sx = {{display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2, mb: 2}}>
						<Chip label={order.clothing_type} variant="outlined" />
						<Chip label="dress" variant="outlined" />
						</div> 
				
				</Grid>
				<Grid item xs={12} md={8} lg={6}>
				<Box sx = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
					<Box sx = {{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, mb: 2,ml:5,mr:5}}>
												 
						<Box sx = {{display: 'flex', flexDirection: 'column', alignItems: 'left', mt: 10, mb: 2}}>
							<Typography variant="h6" component="h6" gutterBottom fontFamily={'monospace'}>
								Order Decription
							</Typography>
							<Typography variant="body1" component="p" gutterBottom color="blue" fontFamily={'monospace'} >
								{order.description}
							</Typography>
							<Typography variant="h6" component="h6" gutterBottom fontFamily={'monospace'}>
								Address
							</Typography>
							<Typography variant="body1" component="p" gutterBottom fontFamily={'monospace'}>
								<Typography variant="body1" component="p" gutterBottom>
									state: {order.state} <br/>
									post code : {order.postal_code}
								</Typography>
								<Typography variant="body1" component="p" gutterBottom>
									Country/City: {order.address}
								</Typography>        
							</Typography>
							<Typography variant="body1" component="p" gutterBottom fontFamily={'monospace'}>
								Budget($)
								<Typography variant="body1" component="p" gutterBottom color="green">
									{
										order.budget === '' ? 'Not specified' : (order.budget)
									}
								</Typography>    
							</Typography>    
							<Typography variant="h6" component="h6" gutterBottom fontFamily={'monospace'}>
							Contact
							<Typography variant="body1" component="p" gutterBottom>
								{order.first_name} {order.last_name}
							</Typography>
							<Typography variant="body1" component="p" gutterBottom>
								{order.phone_number}
							</Typography>
							<Typography variant="body1" component="p" gutterBottom>
								{order.email}
							</Typography>
							</Typography>
							<Typography variant="h6" component="h6" gutterBottom fontFamily={'monospace'}>
								Order Date
								<Typography variant="body1" component="p" gutterBottom>
									{new Date(order.updated_at).toDateString()}
								</Typography>    
							</Typography>


						</Box>               
						
					</Box>  
								
					
					
				</Box> 
				</Grid>
				{sendQuote &&
			<Grid
				item
				xs={12}

			sx={{
				mt:2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<Box sx = {{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 2}}>
					<TextField 
						id="outlined-basic"
						label="Enter the price in $"
						variant="outlined"
						defaultValue={price}
						sx={{ width: 300, mt: 2, mb: 2 }}
						onChange={(e) => {
							if (e.target.value <=0) {
								priceErrorRef.current.innerHTML = "Price cannot be negative"

							}
							else{
								priceErrorRef.current.innerHTML = ""
								setPrice(e.target.value)

							}
							}}
					/>
					<Typography ref = {priceErrorRef} color="red" variant="body1" component="p" gutterBottom/>
					<TextField
						id="outlined-multiline-static"
						label="Any additional information"
						multiline
						rows={4}
						variant="outlined"
						sx={{ width: 300, mt: 2, mb: 2 }}
						onChange={(e) => {
							if (e.target.value.length > 1) {
							setComment(e.target.value)
							commentErrorRef.current.innerHTML = ""
						}
						else{
							commentErrorRef.current.innerHTML = "Comment cannot be empty"
						}
					}

						}
					/>
					<Typography ref = {commentErrorRef} color="red" variant="body1" component="p" gutterBottom/>
					<Button ref={ButtonRef}variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={(e)=>{
						e.preventDefault()
						if (price > 0 && comment.length > 1){
							ButtonRef.current.disabled = true
							ButtonRef.current.style.cursor = "not-allowed"
							ButtonRef.current.innerHTML = "Sending..."
							axios.post('http://backend-dev22.ap-south-1.elasticbeanstalk.com/api/sendMail', {
								// axios.post('http://localhost:3333/api/sendMail', {
								to: order.email,
								price: price,
								comment: comment,
								order_id: order.id,
								first_name: order.first_name,
								last_name: order.last_name,
								from: currentUser.email

							}).then((res) => {
								if(res.data.success){
									sendRef.current.innerHTML = ""
									ButtonRef.current.style.backgroundColor = "green"
									ButtonRef.current.innerHTML = "Sent"
									ButtonRef.current.disabled = false
									ButtonRef.current.style.cursor = "pointer"
									setSent(true)
									setTimeout(() => {                                        
										setSent(false)
										}, 4000);
									setTimeout(() => {                                        
									setSendQuote(false)
									}, 2000);
								}
								else{
									sendRef.current.innerHTML = res.data.message
									ButtonRef.current.disabled = false
									ButtonRef.current.style.cursor = "pointer"
									ButtonRef.current.innerHTML = "Send"
								}
							}
							)
						}
						else{
							if (price <= 0){
								priceErrorRef.current.innerHTML = "Price cannot be negative"
							}
							if (comment.length <1){
								commentErrorRef.current.innerHTML = "Comment cannot be empty"
							}
							ButtonRef.current.innerHTML = "Send"
						}

					}}>
						Send
					</Button>

				</Box>
				{sent && <Alert severity="success" sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				mt: 2,
			}}>Mail Sent!</Alert>}
			</Grid>  } 
			
			<Typography ref = {sendRef} color="red" variant="body1" component="p" gutterBottom/>
			</Grid>
			{currentUser.role === 'producer' && <Button variant="contained" color="primary" sx={{ mt: 3, mb: 5 }}
					onClick={() => setSendQuote(!sendQuote)}
					>
						Send Quotation
					</Button>
					}
			
				  
		</Container>:
		<Container 
			maxWidth="sm"
			sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Typography variant="h4" component="h4" gutterBottom>
				Loading ...
			</Typography>
		</Container>
	)
}

export default SingleOrder