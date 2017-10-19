import HomePage from './components/HomePage';
import LoginPage from './containers/Login' ;
import SignUpPage from './containers/RegisterForm';


const routes = {
    // base component (wrapper for the whole application).
    component: HomePage,
    childRoutes: [

        {
            path: '/login',
            component: LoginPage
        },

        {
            path: '/signup',
            component: SignUpPage
        }

    ]
};

export default routes;