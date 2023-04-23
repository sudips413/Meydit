import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import './home.css'
import { Box, Container, Typography } from '@mui/material'
import {Switch} from '@mui/material'
import allActions from '../../actions'

function Home() {
		const dispatch = useDispatch() 
		const currentUser = useSelector(state => state.userReducer.currentUser)
		const a=useSelector(state => state.themeDarkReducer.darkMode)
		const [theme,setTheme] = React.useState(a)

		async function handleChange(e){
			e.preventDefault();
			setTheme(!theme)
			if(theme){
				dispatch(allActions.userActions.themeDark())
			}
			else{
				dispatch(allActions.userActions.themeLight())
			}

		}
		React.useEffect(() => {
			setTheme(theme)
			localStorage.setItem('theme',theme)
		}, [theme]); 


	return (
		<Container
			maxWidth="xxl"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				height: '100vh',
				backgroundColor:  '#1B2430'

			}}
			> <br/>
				<img style={{ height:"auto",maxHeight:"90%",width:"100%"}}
					src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80" alt="home-pic"/>
			{/* <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center',borderRadius:"10px" }}>
				<Typography variant="h5" component="h1" gutterBottom>
					Welcome to the Home Page
				</Typography>
				<Typography variant="h5" component="h1" gutterBottom>
					{currentUser.username}
				</Typography>
				<Typography variant="h5" component="h1" gutterBottom>
					{currentUser.email}
				</Typography>
				<Typography variant="h5" component="h1" gutterBottom>
					{currentUser.role}
				</Typography>
			 </Box>  */}
		</Container>   
			
	)
}

export default Home