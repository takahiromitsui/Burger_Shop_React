import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path='/auth' component={Auth} />
					<Route path='/' exact component={BurgerBuilder} />
					<Route path='/orders' component={Orders} />
					<Route path='/logout' component={Logout} />
					<Route path='/' exact component={BurgerBuilder} />
				</Switch>
			</Layout>
		);
	}
}

export default App;
