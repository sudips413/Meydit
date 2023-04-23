import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Singup from './components/singup/Singup';
import Login from './components/login/Login';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import allActions from './actions';
import JobPost from './components/postAjob/JobPost';
import Profile from './components/Profile/Profile';
import AllOrders from './components/orders/AllOrders';
import SingleOrder from './components/orders/SingleOrder';
import NotFounr from './components/NotFound/NotFounr';


function App() {
	const dispatch = useDispatch();
	const id = localStorage.getItem("userID");
	function fetchUser(){
		if(id){
		axios.get(`http://backend-dev22.ap-south-1.elasticbeanstalk.com/api/getUser/${id}`).then((res) => {
			const obj ={
				id: res.data.data.id,
				username: res.data.data.username,
				email: res.data.data.email,
				role: res.data.data.role,
				orders:res.data.allOrders,
			}
			dispatch(allActions.userActions.login(obj));
		});
		
	}
	}
	useEffect(() => {
		fetchUser();
		
	}, [id]);



	return (
		<div className="page-container">
				<Router>
					<div className="content-wrap">
					<Navbar/>
						<Routes>
							<Route path="/" element={<Home/>} />
							<Route path="/home" element={<Home/>} />
							<Route path="/login" element={<Login/>} />
							<Route path="/register" element={<Singup />} />
							<Route path="/placeorder" element={<JobPost />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="*" element={<NotFounr/>} />
							<Route path="/orders" element={<AllOrders/>} />
							<Route path="/order/:id" element={<SingleOrder/>} />
						</Routes>
					</div>
					
				</Router>
				{/* <Footer /> */}
			</div>
	);
}

export default App;
