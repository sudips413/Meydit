import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// import CryptoJS from 'crypto-js';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Order({order, key,role}) {
	const currentUser = useSelector(state=>state.userReducer.currentUser)
	const imgList = JSON.parse(order.images)
	const userId= parseInt(localStorage.getItem('userID'))
	const customer_id = parseInt(order.customer_id)
	return (
			role==='consumer' && userId === customer_id?
			<Card sx={{
				mt:4,
				width: 400,
				mb: 4,
			}}>
				<CardActionArea>
					<CardMedia
					component="img"
					height="400"
					image={imgList[0]}
					alt="green iguana"
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{order.clothing_type} Dress
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{order.description}
					</Typography>
					<Typography>
					Posted By: {order.first_name} {order.last_name}
				</Typography>
					</CardContent>
				</CardActionArea>
				
				<CardActions>
					<Button size="small" color="primary"
					onClick={()=>{
						//encrypt order id
						// const key = "secret"
						// const encryptedOrderId = order.order_id && CryptoJS.AES.encrypt(JSON.stringify(order.order_id), key).toString()
						localStorage.setItem('OrderId', order.order_id)
						window.location.href ='order/'+order.order_id
						// ('/order/'+order.order_id)
					}}
					>
					View More
					</Button>
				</CardActions>
			</Card>:

			
				localStorage.getItem('userID')===order.customer_id?
				<Card sx={{
					mt:4,
					width: 500,
					mb: 4,
				}}>
					<CardActionArea>
						<CardMedia
						component="img"
						height="400"
						image={imgList[0]}
						alt="green iguana"
						/>
						<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{order.clothing_type} Dress
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{order.description}
						</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button size="small" color="primary"
						onClick={()=>{
							//encrypt order id
							// const key = "secret"
							// const encryptedOrderId = order.order_id && CryptoJS.AES.encrypt(JSON.stringify(order.order_id), key).toString()
							localStorage.setItem('OrderId', order.order_id)
							// ('/order/'+order.order_id)
							window.location.href ='order/'+order.order_id
						}}
						>
						View More
						</Button>
					</CardActions>
				</Card>
				:null

			


	
 
  )
}

export default Order