import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage';
import './App.css';
import AboutUS from './pages/about-us/about-us';
import ContactUs from './pages/contact-us/contact-us';
import CustomNav from './components/shared/navbar/custom-nav';
import Footer from './components/shared/footer/footer';
import axios from 'axios'
import Dashboard from "./pages/Dashboard/dashboard";
import Courses from "./pages/courses/courses";
import Tutors from "./pages/tutors/tutors";
import Blog from "./pages/blog/blog";
import Login from "./pages/sign-in/login";
import Registration from "./pages/sign-up/registration";
import { getData } from "./reducers/sign-in";
import SignInPage from './pages/sign-in/sign-in';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
  }
   
  checkLoginStatus() {
    axios.get("https://authentication-backend-rails.herokuapp.com/logged_in", { withCredentials: true })
      .then(response => {
         // console.log(response.data.logged_in)
        if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
          console.log('true');
          this.setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user
          })
        } else if (!response.data.logged_in & (this.state.loggedInStatus === 'LOGGED_IN')) {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {}
          })
        }
        
      }).catch(error => {
        console.log('login error', error);
      })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  render() {
    const { signInInfo } = this.props.signInInfo;
    const { message } = signInInfo;
    console.log(message)
    /* if (this.loggedInStatus === 'NOT_LOGGED_IN' && message === null) {
      message = this.loggedInStatus;
    } */
    
    return (
      <div className="app">
        <header>
          <CustomNav />
        </header>
        <main>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path={"/dashboard"}
                render={props => (
                  <Dashboard {...props} loggedInStatus={message} />
                )}
              />
              <Route exact path='/' component={HomePage} />
              <Route
             exact 
             path={"/sign_in"} 
             render={props => (
               <Login {...props} handleLogin={this.handleLogin} loggedInStatus={message} />
             )}/>
             <Route
             exact 
             path={"/sign_up"} 
             render={props => (
               <Registration {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
             )}/>
              <Route path='/contact-us' component={ContactUs} />
              <Route path='/about-us' component={AboutUS} />
              <Route path='/courses' component={Courses} />
              <Route path='/tutors' component={Tutors} />
              <Route path='/blog' component={Blog} />
            </Switch>
          </BrowserRouter>
          </main>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  signInInfo: PropTypes.objectOf(PropTypes.any).isRequired, 
};

const mapStateToProps = state => ({
  signInInfo: getData(state),
});

export default connect(mapStateToProps)(App);