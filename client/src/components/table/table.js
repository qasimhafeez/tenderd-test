import { useEffect, useState } from 'react'
import { Container, Paper, makeStyles, Button } from '@material-ui/core'
import { useAuth } from '../../contexts/AuthContext'
import { LogoutIcon, SettingsIcon } from '../../icons/index'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
// Custom Styles
const useStyles = makeStyles({
	paper: {
		width: '100%',
		padding: '2rem',
	},
	tableRoot: {},
	tableBar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#c5cbff',
		borderRadius: '10px',
		padding: '0 1rem',
	},
	icons: {
		display: 'grid',
		gap: '.5rem',
		gridTemplateColumns: '1fr 1fr',
	},
	tableHeading: {
		fontSize: '25px',
	},
	tableData: {
		display: 'grid',
		gap: '.5rem',
		gridTemplateColumns: '1fr',
	},
	tableRow: {
		display: 'grid',
		gap: '.5rem',
		gridTemplateColumns: 'repeat(7, 1fr)',
		placeItems: 'center',
		backgroundColor: '#f1f1f1',
		borderRadius: '10px',
	},
	tableRowsHeading: {
		// color: '#ffff',
		backgroundColor: '#c5cbff',
	},
	loadingStyle: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	requestBar: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})

const Table = () => {
	const classes = useStyles()
	const { push } = useHistory()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(null)

	const { logout, currentUser } = useAuth()

	useEffect(() => {
		setLoading(true)
		//get specific user data
		axios
			.get(`http://localhost:5000/api/user/${currentUser.email}`)
			.then(res => {
				setUser(res.data[0])
				setLoading(false)
				console.log('comapney name', res.data[0])
			})
			.catch(err => console.log({ err }))
	}, [])

	return loading ? (
		<section className={classes.loadingStyle}>
			<p>Loading...</p>
		</section>
	) : (
		<Container maxWidth='md'>
			<Paper className={classes.paper} elevation={7}>
				<div className={classes.tableRoot}>
					<section className={classes.tableBar}>
						<h2>{user && user.name}</h2>
						<h2>{user && user.companyId.name}</h2>
						<section className={classes.icons}>
							<SettingsIcon onClick={() => push('/userprofile')} />
							<LogoutIcon onClick={() => logout()} />
						</section>
					</section>
					<section className={classes.tableData}>
						<section className={classes.requestBar}>
							<h1 className={classes.tableHeading}>Requests</h1>
							<Button color='secondary' variant='contained'>
								New Request
							</Button>
						</section>
						<section
							className={classes.tableRow + ' ' + classes.tableRowsHeading}>
							<h3>Name</h3>
							<h3>Dexcription</h3>
							<h3>Created At</h3>
							<h3>Image</h3>
							<h3>Type</h3>
							<h3>Mars</h3>
							<h3>Name</h3>
						</section>
						{requests.map((item, i) => (
							<section key={i} className={classes.tableRow}>
								<h3>{item.type}</h3>
								<h3>{item.description}</h3>
								<h3>{item.created_req_time}</h3>
								<h3>{item.description2}</h3>
								<h3>{item.type2}</h3>
								<h3>{item.image}</h3>
								<h3>{item.image2}</h3>
							</section>
						))}
					</section>
				</div>
			</Paper>
		</Container>
	)
}
export default Table

const requests = [
	{
		type: 'type',
		description: 'description',
		image: 'image',
		status: 'status',
		created_req_time: 'created_req_time',
		type2: 'type',
		description2: 'description',
		image2: 'image',
	},
	{
		type: 'type',
		description: 'description',
		image: 'image',
		status: 'status',
		created_req_time: 'created_req_time',
		type2: 'type',
		description2: 'description',
		image2: 'image',
	},
	{
		type: 'type',
		description: 'description',
		image: 'image',
		status: 'status',
		created_req_time: 'created_req_time',
		type2: 'type',
		description2: 'description',
		image2: 'image',
	},
	{
		type: 'type',
		description: 'description',
		image: 'image',
		status: 'status',
		created_req_time: 'created_req_time',
		type2: 'type',
		description2: 'description',
		image2: 'image',
	},
	{
		type: 'type',
		description: 'description',
		image: 'image',
		status: 'status',
		created_req_time: 'created_req_time',
		type2: 'type',
		description2: 'description',
		image2: 'image',
	},
]
