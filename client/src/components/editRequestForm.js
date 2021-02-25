// Auth Context
import { useAuth } from '../contexts/AuthContext'
// React Hooks
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
// React Router
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
// Material Design UI
import {
	TextField,
	Grid,
	Container,
	Button,
	makeStyles,
	Paper,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
} from '@material-ui/core'

// Custom Styles
const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
	},
	paper: {
		width: '100%',
		padding: '2rem',
	},
	paperFormDiv: {
		display: 'flex',
		flexDirection: 'column',
	},
	textFieldMargin: {
		margin: '1.2rem 0 0 0',
	},
	lastSection: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: '1rem',
	},
	errorPTag: {
		fontSize: '.9rem',
		color: 'red',
		marginTop: '-.1rem',
	},
	butonStyle: {
		marginTop: '1.2rem',
	},
	headingH1: {
		textAlign: 'center',
		color: '#3f51b5',
	},
	linkStyle: {
		color: '#3f51b5',
	},
	customErrors: {
		fontSize: '1rem',
		color: 'red',
	},
	formControl: {
		width: '100%',
	},
	loadingStyle: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

const EditRequestForm = ({ match }) => {
	const { register, errors, handleSubmit, control } = useForm()

	// Classes
	const classes = useStyles()

	// Local state
	const [err, setErr] = useState('')
	const [loading, setLoading] = useState(false)
	const [wholeLoading, setWholeLoading] = useState(false)
	const [userData, setUserData] = useState({})
	const [type, setType] = useState('')
	const [status, setStatus] = useState('')
	const [image, setImage] = useState({})
	const [companies, setCompanies] = useState([])
	const [companyUsers, setCompanyUsers] = useState([])
	const [company, setCompany] = useState('')
	const [companyUser, setCompanyUser] = useState('')
	const [specificReqData, setSpecificReqData] = useState({})

	const { push } = useHistory()

	//get companies on render
	useEffect(() => {
		setWholeLoading(true)
		//get all companies
		axios
			.get('http://localhost:5000/api/company/list')
			.then(res => {
				setCompanies(res.data.companies_list)
			})
			.catch(err => console.log({ err }))

		//get specific edit
		axios
			.get(`http://localhost:5000/api/request/get/${match.params.requestId}`)
			.then(res => {
				setSpecificReqData(res.data)
				setType(res.data.type)
				setStatus(res.data.status)
				setCompany(res.data.companyId._id)
				setWholeLoading(false)
				console.log('getting value', res.data)
			})
			.catch(err => console.log({ err }))
	}, [])

	const handleFormSubmit = data => {
		setLoading(true)
		const companyData = {
			type,
			description: data.description,
			image: image.name || '',
			status,
			companyId: company,
			userId: companyUser,
		}
		axios
			.put(
				`http://localhost:5000/api/request/update/${match.params.requestId}`,
				companyData
			)
			.then(res => {
				setLoading(false)
				push('/userdata')
			})
	}

	const onImageChangeHandler = e => {
		const objimg = e.target.files[0]
		const img = Object.assign(objimg, {
			imgURL: URL.createObjectURL(objimg),
		})
		setImage(img)
	}

	const onCompayChangeHandler = e => {
		setCompany(e.target.value)
		axios
			.get(`http://localhost:5000/api/user/company/${e.target.value}`)
			.then(res => {
				setCompanyUsers(res.data)
				console.log('on company name change', res.data)
			})
			.catch(err => console.log({ err }))
	}

	return wholeLoading ? (
		<section className={classes.loadingStyle}>
			<p>Loading...</p>
		</section>
	) : (
		<Container maxWidth='sm'>
			<Grid container className={classes.root}>
				<Paper className={classes.paper} elevation={7}>
					<h1 className={classes.headingH1}>Add New Request</h1>
					<form
						className={classes.paperFormDiv}
						onSubmit={handleSubmit(handleFormSubmit)}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<FormControl
									className={
										classes.formControl + ' ' + classes.textFieldMargin
									}>
									<InputLabel id='demo-simple-select-label'>Types</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										name='company'
										value={type}
										variant='outlined'
										onChange={e => setType(e.target.value)}
										fullWidth
										inputRef={register({ required: true })}
										required
										control={control}>
										<MenuItem value='Breakdown'>Breakdown</MenuItem>
										<MenuItem value='Maintenance'>Maintenance</MenuItem>
										<MenuItem value='Replacement'>Replacement</MenuItem>
										<MenuItem value='Demobilisation'>Demobilisation</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									fullWidth
									label='Description'
									className={classes.textFieldMargin}
									name='description'
									defaultValue={specificReqData.description}
									variant='outlined'
									inputRef={register({
										required: true,
									})}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid container item xs={12} md={6} alignItems='center'>
								<Grid item xs={12} md={6}>
									<section style={{ margin: '1.5rem 0' }}>
										<input
											type='file'
											accept='images/*'
											onChange={onImageChangeHandler}
										/>
									</section>
								</Grid>
								<Grid item xs={12} md={6}>
									<section style={{ margin: '.5rem 2rem' }}>
										{specificReqData.image && <h4>{specificReqData.image}</h4>}
									</section>
								</Grid>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControl
									className={
										classes.formControl + ' ' + classes.textFieldMargin
									}>
									<InputLabel id='demo-simple-select-label'>
										Select Company
									</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										name='company'
										value={company}
										variant='outlined'
										onChange={onCompayChangeHandler}
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
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<FormControl
									className={
										classes.formControl + ' ' + classes.textFieldMargin
									}>
									<InputLabel id='demo-simple-select-label'>User</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										name='company'
										disabled={!company ? true : false}
										value={companyUser}
										variant='outlined'
										onChange={e => setCompanyUser(e.target.value)}
										fullWidth
										required>
										{companyUsers.map((item, i) => {
											return (
												<MenuItem key={i} value={item._id}>
													{item.name}
												</MenuItem>
											)
										})}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControl
									className={
										classes.formControl + ' ' + classes.textFieldMargin
									}>
									<InputLabel id='status-label'>Types</InputLabel>
									<Select
										labelId='status-label'
										id='demo-simple-select'
										name='company'
										value={status}
										variant='outlined'
										onChange={e => setStatus(e.target.value)}
										fullWidth
										inputRef={register({ required: true })}
										required
										control={control}>
										<MenuItem value='Created'>Created</MenuItem>
										<MenuItem value='In progress'>In progress</MenuItem>
										<MenuItem value='Completed'>Completed</MenuItem>
										<MenuItem value='Cancelled'>Cancelled</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Button
							disabled={loading}
							type='submit'
							color='primary'
							variant='contained'
							size='large'
							className={classes.butonStyle}>
							{loading ? 'Editing...' : 'Edit'}
						</Button>
					</form>
				</Paper>
			</Grid>
		</Container>
	)
}

export default EditRequestForm
