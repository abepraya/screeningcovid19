import React from 'react'
import './LandingPage.css';
import Background from '../../../assets/Img/Background/background.jpg'
import { Link, useHistory } from 'react-router-dom';

const LandingPage = () => {
    const history = useHistory();

    function navigateMemberHandler(){
        history.push('/sign-in');
    }
    
    function navigateNewMemberHandler(){
        history.push('/sign-up');
    }

    return (
        <main className="main-land text-center">
            <header className="headers">
                <h1>Screening COVID-19 RSUP Persahabatan</h1>
                <div className="multi-btn">
                        <button type="button" className="btn btn-primary btn-lg" onClick={navigateNewMemberHandler}><i className="fas fa-user-plus" />&nbsp;&nbsp;New Member</button>
                        <button type="button" className="btn btn-primary btn-lg" onClick={navigateMemberHandler}><i className="fas fa-user-check" />&nbsp;&nbsp;Member</button>
                </div>

            </header>
        </main>
    )
}

export default LandingPage;
