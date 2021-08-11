import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import Map from '../../../assets/Map/Map';
import VisionMission from '../../Data/VisionMission.json';
import RSData from '../../Data/RSData.json';
import './About.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const About = (props) => {
    useEffect(() => {
        Aos.init({duration: 2000})
    }, [])
    return(
        <main className="main">
        <header className="header" data-aos="fade-bottom">
            <h1>Motto</h1>
            <h3>Serving Friendly</h3>
        </header>
        <section className="vision-mission" data-aos="fade-right">
            <h2>Vision and Mission</h2>
            <div className="vision-container">
                <div className="vision-img" />
                <div className="vision-description">
                <h3>Vision</h3>
                <ul className="list-vision">
                    {VisionMission.vision?.map((ls, index)=>{
                        return <li className="list-item" key={index}>{ls}</li>
                    })}
                </ul>
                </div>
            </div>
            
            <div className="mission-container">
                <div className="mission-img" />
                <div className="mission-description">
                <h3>Mission</h3>
                <ul className="list-mission">
                    {VisionMission.mission?.map((ls2, index2)=>{
                        return <li className="list-item" key={index2}>{ls2}</li>
                    })}
                </ul>
                </div>
            </div>
        </section>
        <section className="about" data-aos="fade-left">
            <h2>Map</h2>
            <h3>Check your location here :</h3>
            <ul className="guide">
            <li className="list-item">Click "Get User Location" and click the map to find your marker.</li>
            <li className="list-item">Select "Mode" and then click "Destination".</li>
            <li className="list-item">"Navigate" and "Info" button will showing. Click "Navigate" to see the route instruction or click "Info" to see total distance and time</li>
            </ul>
            <div className="about-container">
                <div className="about-map">
                    <Map user={props.user}/>
                </div>
            </div>
            <div className="about-contact">
                    {RSData?.map((ls, index2)=>{
                        return (
                        <ul key={index2}>
                            <li><i className="fas fa-hospital" />{ls.address}</li>
                            <li><i className="fas fa-phone-alt" />{ls.phone}</li>
                            <li><i className="fas fa-fax" />{ls.faxMail}</li>
                            <li><i className="fas fa-envelope" />{ls.email}</li>
                        </ul>
                        )
                    })}
            </div>
        </section>
        </main>
    )
}

export default About;