// Context Api
import ContextsIndex from './contexts/index'

// React Router
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'

// Importing Components
import SignUp from './components/auth/signUp'
import SignIn from './components/auth/signIn'
import ForgotPassword from './components/auth/forgetPassword'
import Profile from './components/auth/userProfile'
import ProtectedRoute from './components/common/protectedRoute'
import Table from './components/table/table'
import RequestForm from './components/requestForm'
import EditRequestForm from './components/editRequestForm'

function App() {
	return (
		<div className='App'>
			<ContextsIndex>
				<Router>
					<Switch>
						<Redirect exact from='/' to='/signup' />
						<Route exact path='/signup' component={SignUp} />
						<Route exact path='/signin' component={SignIn} />
						<Route exact path='/forgotpassword' component={ForgotPassword} />
						<ProtectedRoute exact path='/userprofile' component={Profile} />
						<ProtectedRoute exact path='/userdata' component={Table} />
						<ProtectedRoute
							exact
							path='/userrequestform'
							component={RequestForm}
						/>
						<ProtectedRoute
							exact
							path='/edituserrequestform/:requestId'
							component={EditRequestForm}
						/>
					</Switch>
				</Router>
			</ContextsIndex>
		</div>
	)
}

export default App
