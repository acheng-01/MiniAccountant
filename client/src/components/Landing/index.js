import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Landing.css';

function Landing(props) {
    if (props.auth) {
        return <Navigate to="/dashboard" />
    }
    
    return (
        <section className="landing-container">
            <div className="description">
                <h2>Welcome to your Mini Accountant!</h2>
                <h3>
                    Track your expenses, view month-to-month comparisons, and
                    see where you can save. Please log in below to begin.
                </h3>
            </div>
            <div className="credentials">
                <div className="oauth login">
                    <button className="google">
                        <a href="/auth/google">
                            <img src={process.env.PUBLIC_URL + "/logos/icons8-google-48.png"} alt="Google Logo" />
                            SIGN IN WITH GOOGLE
                        </a>
                    </button>
                    <button className="facebook">
                        <a href="/auth/facebook">
                            <img src={process.env.PUBLIC_URL + "/logos/f_logo_RGB-Blue_58.png"} alt="Facebook Logo" />
                            SIGN IN WITH FACEBOOK
                        </a>
                    </button>
                </div>
            </div>
        </section>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Landing);