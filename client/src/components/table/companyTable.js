import { useEffect, useState } from 'react'
import { Container, Paper, makeStyles, Button } from '@material-ui/core'
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
		gridTemplateColumns: 'repeat(4, 1fr)',
		placeItems: 'center',
		backgroundColor: '#f1f1f1',
		borderRadius: '10px',
	},
	tableRowsHeading: {
		// color: '#ffff',
		backgroundColor: '#c5cbff',
	},
	loadingStyle: {
		height: '400px',
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

const CompanyTable = ({ companyId, userId, runOnUpdate, userName }) => {
	const classes = useStyles()
	const [userCompanies, setUserCompanies] = useState([])
	const [loading, setLoading] = useState(null)
	const [loadingButton, setLoadingButton] = useState(null)
	const [runOnRemove, setRunOnRemove] = useState(false)

	useEffect(() => {
		setLoading(true)
		//get specific user data
		axios
			.get(`http://localhost:5000/api/user/company/${companyId}`)
			.then(res => {
				setUserCompanies(res.data)
				setLoading(false)
				console.log('comapney name', res.data[0])
			})
			.catch(err => console.log({ err }))
	}, [runOnUpdate, runOnRemove])

	const onCompanyRemoveHandler = () => {
		setLoadingButton(true)
		console.log('remove click')
		const updateData = {
			name: userName,
			companyId: '',
		}
		axios
			.put(`http://localhost:5000/api/user/update/${userId}`, updateData)
			.then(res => {
				setRunOnRemove(!runOnRemove)
				setLoadingButton(false)
				console.log('remove api', res.data)
			})
	}

	return loading ? (
		<section className={classes.loadingStyle}>
			<p>Loading...</p>
		</section>
	) : (
		<Container maxWidth='md'>
			<Paper className={classes.paper} elevation={7}>
				<div className={classes.tableRoot}>
					<section className={classes.tableData}>
						<h1 className={classes.tableHeading}>Companies</h1>
						<section
							className={classes.tableRow + ' ' + classes.tableRowsHeading}>
							<h3>Sr.</h3>
							<h3>Name</h3>
							<h3>Company Name</h3>
							<h3>Remove</h3>
						</section>
						{userCompanies.map((item, i) => (
							<section key={i} className={classes.tableRow}>
								<h3>{i + 1}</h3>
								<h3>{item.name}</h3>
								<h3>{item.companyId.name}</h3>
								{userId !== item._id && (
									<Button
										color='primary'
										variant='contained'
										size='small'
										onClick={() => onCompanyRemoveHandler()}>
										Remove
									</Button>
								)}
							</section>
						))}
					</section>
				</div>
			</Paper>
		</Container>
	)
}
export default CompanyTable
