import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import userActions from '../../actions/userActions'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/joy/Badge';
import MailIcon from '@mui/icons-material/Mail';

function Navbar() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const currentUser = useSelector(state => state.userReducer.currentUser)
	const username = currentUser.username
	const settings=["Profile","Logout"]
	const navMenu = ["Home","About","Contact"]
	const consumerMenu=["placeorder"]
	const producerMenu=["orders"]
	const LoginLogout=["Login","Register"]

	const [anchorElNav, setAnchorElNav] = React.useState(null)
	const [anchorElUser, setAnchorElUser] = React.useState(null)

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSetting = (item) => {
		if(item==="Logout"){
			dispatch(userActions.logout())
			localStorage.removeItem('userID')
			localStorage.removeItem('role')
			localStorage.removeItem('OrderId')
			navigate('/')
		}
		else{
			navigate('/profile')
		}
		handleCloseUserMenu()

	}
	return (
	<div>
		<AppBar position="static" sx={{
			backgroundColor: '#000000',
		}}>
		<Container maxWidth="xl">
			<Toolbar disableGutters>
			<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
			<Typography
				variant="h6"
				noWrap
				component="a"
				href="/"
				sx={{
				mr: 2,
				display: { xs: 'none', md: 'flex' },
				fontFamily: 'monospace',
				fontWeight: 700,
				letterSpacing: '.3rem',
				color: 'inherit',
				textDecoration: 'none',
				}}
			>
				LAB
			</Typography>

			<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
				<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleOpenNavMenu}
				color="inherit"
				>
				<MenuIcon />
				</IconButton>
				<Menu
				id="menu-appbar"
				anchorEl={anchorElNav}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={Boolean(anchorElNav)}
				onClose={handleCloseNavMenu}
				sx={{
					display: { xs: 'block', md: 'none' },
				}}
				>
				{navMenu.map((item) => (
					<MenuItem key={item} onClick={handleCloseNavMenu} component={Link} to={`/${item.toLowerCase()}`}>
						{item}
					</MenuItem>
				))}
				
				{username !== '' && currentUser.role==="producer"? (
					producerMenu.map((item) => (
						<MenuItem key={item} onClick={handleCloseNavMenu} component={Link} to={`/${item.toLowerCase()}`}>
							{item}
						</MenuItem>
					))
				):null}
				{username !== '' && currentUser.role==="consumer"? (
					consumerMenu.map((item) => (
						<MenuItem key={item} onClick={handleCloseNavMenu} component={Link} to={`/${item.toLowerCase()}`}>
							{item}
						</MenuItem>
					))
				):null}
				</Menu>
			</Box>
			<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
			<Typography
				variant="h5"
				noWrap
				component="a"
				href=""
				sx={{
				mr: 2,
				display: { xs: 'flex', md: 'none' },
				flexGrow: 1,
				fontFamily: 'monospace',
				fontWeight: 700,
				letterSpacing: '.3rem',
				color: 'inherit',
				textDecoration: 'none',
				}}
			>
				LAB
			</Typography>
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{navMenu.map((item) => (
					<Button key={item} color="inherit" component={Link} to={`/${item.toLowerCase()}`}>
						{item}
					</Button>
				))}
				{username !== '' && currentUser.role==="producer"? (
					producerMenu.map((item) => (
						<Button key={item} color="inherit" component={Link} to={`/${item.toLowerCase()}`}>
							{item}
						</Button>
					))
				):null}
				{
					username !== '' && currentUser.role==="consumer"? (
						consumerMenu.map((item) => (
							<Button key={item} color="inherit" component={Link} to={`/${item.toLowerCase()}`}>
								{item}
							</Button>
						))
					):null

				}
			</Box>
				{username !== '' ? (
					
			<Box>
				<Badge badgeContent={2} sx={{
					mr: 3,
				}}>
					<MailIcon />
				</Badge>
				<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					{/* profile image */}
					<Avatar alt="Remy Sharp" src="/static/images/avatar/5.jpg" />
				</IconButton>
				</Tooltip>
				<Menu
				sx={{ mt: '45px' }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
				>
					{settings.map((item,index)=>(
						<MenuItem key={index} onClick={()=> {
							handleSetting(item)
						}}>
							{item}
						</MenuItem>
						
					))
					}
				</Menu>
			</Box>) : (
				 LoginLogout.map((item) => (
					<MenuItem key={item} onClick={handleCloseNavMenu} component={Link} to={`/${item.toLowerCase()}`}>
						{item}
					</MenuItem>
				)))}
			</Toolbar>
		</Container>
	</AppBar>
		
	</div>
  )
}

export default Navbar