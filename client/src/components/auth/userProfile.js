import { useEffect } from 'react'
import {
	Button,
	Paper,
	Container,
	Divider,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	TextField,
} from '@material-ui/core'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import CompanyTable from '../table/companyTable'
//css
const sectionStyle = {
	display: 'flex',
	justifyContent: 'center',
	height: '100%',
}

const paperStyle = {
	padding: '2rem',
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	gap: '.5rem',
	margin: '2rem',
}
const formcontrolStyle = {
	width: '100%',
	margin: '.5rem 0',
}
const loadingStyle = {
	height: '100vh',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}

export default function Profile() {
	const { currentUser, logout } = useAuth()

	//localstate
	const [loading, setLoading] = useState(false)
	const [companies, setCompanies] = useState([])
	const [company, setCompany] = useState('')
	const [name, setName] = useState('')
	const [userData, setUserData] = useState(null)
	const [runOnUpdate, setRunOnUpdate] = useState(false)
	const [wholeLoading, setWholeLoading] = useState(null)
	//get companies on render
	useEffect(() => {
		setWholeLoading(true)
		//get specific user data
		axios
			.get(`http://localhost:5000/api/user/${currentUser.email}`)
			.then(res => {
				setUserData(res.data[0])
				setName(res.data[0].name)
				setCompany(res.data[0].companyId._id)
				setWholeLoading(false)
				console.log('comapney name', res.data[0].companyId._id)
			})
			.catch(err => console.log({ err }))

		//get all companies
		axios
			.get('http://localhost:5000/api/company/list')
			.then(res => {
				setCompanies(res.data.companies_list)
			})
			.catch(err => console.log({ err }))
	}, [])

	const onFormSubmitHandler = e => {
		e.preventDefault()
		setLoading(true)
		const updateData = {
			name,
			companyId: company,
		}
		axios
			.put(`http://localhost:5000/api/user/update/${userData._id}`, updateData)
			.then(res => {
				setRunOnUpdate(!runOnUpdate)
				setLoading(false)
			})
	}

	return wholeLoading ? (
		<section style={loadingStyle}>
			<p>Loading...</p>
		</section>
	) : (
		<>
			<Container maxWidth='sm'>
				<form onSubmit={onFormSubmitHandler}>
					<section style={sectionStyle}>
						<Paper style={paperStyle} elevation={7}>
							<h2>Profile</h2>
							<h3>Email: {currentUser && currentUser.email}</h3>
							<TextField
								fullWidth
								label='Name'
								style={formcontrolStyle}
								name='name'
								value={name}
								onChange={e => setName(e.target.value)}
								variant='outlined'
								required
							/>
							<FormControl className={formcontrolStyle}>
								<InputLabel id='demo-simple-select-label'>
									Select Company
								</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									name='company'
									value={company}
									variant='outlined'
									onChange={e => setCompany(e.target.value)}
									fullWidth
									required>
									{companies.map((item, i) => {
										return (
											<MenuItem key={i} value={item._id}>
												{item.name}
											</MenuItem>
										)
									})}
								</Select>
							</FormControl>
							<Divider />
							<Button
								type='submit'
								disabled={loading}
								color='primary'
								variant='contained'>
								{loading ? 'Updating...' : 'Update'}
							</Button>
						</Paper>
					</section>
				</form>
			</Container>
			<CompanyTable
				runOnUpdate={runOnUpdate}
				companyId={company}
				userId={userData && userData._id}
			/>
		</>
	)
}
