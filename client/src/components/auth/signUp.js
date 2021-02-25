// Auth Context
import { useAuth } from '../../contexts/AuthContext'
// React Hooks
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
// React Router
import { Link } from 'react-router-dom'
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
import Alert from '@material-ui/lab/Alert'

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
})

const SignUp = () => {
	const { register, errors, handleSubmit, control } = useForm()

	// Classes
	const classes = useStyles()

	// Local state
	const [err, setErr] = useState('')
	const [loading, setLoading] = useState(false)
	const [companies, setCompanies] = useState([])
	const [company, setCompany] = useState('')

	const { push } = useHistory()
	const { signUp } = useAuth()

	//get companies on render
	useEffect(() => {
		axios
			.get('http://localhost:5000/api/company/list')
			.then(res => {
				setCompanies(res.data.companies_list)
			})
			.catch(err => console.log({ err }))
	}, [])

	const handleFormSubmit = data => {
		if (data.password !== data.confirm_password) {
			setErr('Passwords did not match')
		} else {
			setErr('')
			setLoading(true)
			signUp(data.email, data.password, data.name, company)
				.then(() => {
					setLoading(false)
					push('/signin')
				})
				.catch(() => {
					setLoading(false)
					setErr('Email already exists')
				})
		}
	}

	return (
		<Container maxWidth='xs'>
			<Grid container className={classes.root}>
				<Paper className={classes.paper} elevation={7}>
					<h1 className={classes.headingH1}>Sign Up</h1>
					{err && <Alert severity='error'>{err}</Alert>}
					<form
						className={classes.paperFormDiv}
						onSubmit={handleSubmit(handleFormSubmit)}>
						<TextField
							fullWidth
							label='Name'
							className={classes.textFieldMargin}
							name='name'
							variant='outlined'
							inputRef={register({
								required: true,
							})}
						/>
						<FormControl
							className={classes.formControl + ' ' + classes.textFieldMargin}>
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
								inputRef={register({ required: true })}
								required
								control={control}>
								{companies.map((item, i) => {
									return (
										<MenuItem key={i} value={item._id}>
											{item.name}
										</MenuItem>
									)
								})}
							</Select>
						</FormControl>
						<TextField
							fullWidth
							label='Email'
							className={classes.textFieldMargin}
							name='email'
							variant='outlined'
							inputRef={register({
								required: true,
								pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
							})}
						/>
						{/* {errors.email?.type === 'required' && (
							<p className={classes.errorPTag}>Required*</p>
						)} */}
						{errors.email?.type === 'pattern' && (
							<p className={classes.errorPTag}>
								please enter correct email address
							</p>
						)}
						<TextField
							fullWidth
							label='Password'
							className={classes.textFieldMargin}
							name='password'
							variant='outlined'
							type='password'
							inputRef={register({ required: true, minLength: 6 })}
						/>
						{/* {errors.password?.type === 'required' && (
							<p className={classes.errorPTag}>Required*</p>
						)} */}
						{errors.password?.type === 'minLength' && (
							<p className={classes.errorPTag}>minimum length 6*</p>
						)}
						<TextField
							className={classes.textFieldMargin}
							name='confirm_password'
							label='Confirm Password'
							variant='outlined'
							type='password'
							inputRef={register({ required: true, minLength: 6 })}
						/>
						{errors.confirm_password?.type === 'minLength' && (
							<p className={classes.errorPTag}>minimum length 6*</p>
						)}
						<Button
							disabled={loading}
							type='submit'
							color='primary'
							variant='contained'
							size='large'
							className={classes.butonStyle}>
							{loading ? 'Signing Up...' : 'Sign Up'}
						</Button>
					</form>
					<section className={classes.lastSection}>
						<p>
							Already have an account?{' '}
							<Link className={classes.linkStyle} to='/signin'>
								Sign In
							</Link>
						</p>
					</section>
				</Paper>
			</Grid>
		</Container>
	)
}

export default SignUp
