import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderContent from './HeaderContent';
import '../styling/Header.css';

function Header(props) {
    const renderContent = () => {
        if (props.auth) {
            return <HeaderContent />;
        }
    }
    return (
        <nav className="header">
            <div className="nav-wrapper">
                <Link to={props.auth ? "/dashboard" : "/"} className="left brand-logo">
                    <h1>Mini<span>Accountant</span></h1>
                </Link>
                {renderContent()}
            </div>
        </nav>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Header);