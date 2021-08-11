import React, { useContext, useEffect, useState } from "react";
import ListInfo from "../../../assets/List-Info/ListInfo";
import "./Education.css";
import Faq from '../../Data/Faq.json';
import News from '../../Data/News.json';
import Educations from '../../Data/Education.json';
import Aos from 'aos';
import 'aos/dist/aos.css';
import AuthContext from "../../../Store/auth-context";
import axios from "axios";
import Moment from "moment";


const Education = (props) => {
  const authCtx = useContext(AuthContext);
  const [dataEduList, setDataEduList] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function getEducationDataList(){
    try{
      setIsLoading(true)
      let token = `Bearer ${authCtx.token}`;
      const config = {
        headers:{
          Authorization: token
        }
      }

      const response = await axios.get('/get-data/get-education', config);
      if(response.status === 200 || response.status === 202){
        setIsLoading(false)
        setDataEduList(response.data.data);
      } 
      else{
        setIsLoading(false)
        throw new Error(response)
      }
    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    Aos.init({duration: 2000});
    getEducationDataList();
  }, [])

  console.log("EDU LIST: " + JSON.stringify(dataEduList))
  Moment.locale("en");
  return (
    <div>
      <header className="education" data-aos="fade-right">
        <h2>Education</h2>
          <div className="education-container">
            {dataEduList?.list?.map((ed, index) => {
                return <ListInfo 
                key={ed.education_id} 
                title={ed.title} 
                image={ed.url_image} 
                author={ed.author}
                date={Moment(ed.created_at).format("DD MMMM YYYY")} 
                />
            })}
          </div>
      </header>
      <section className="news" data-aos="fade-left">
        <h2>News</h2>
          <div className="news-container">
            {News?.map((nw,index) => {
                return <ListInfo key={index} title={nw.title} image={nw.url_image} author={nw.author} date={nw.date} />
            })}
          </div>
      </section>
      <section className="faq" data-aos="fade-right">
        <h2>FAQ</h2>
        <div className="faq-container">
            {Faq?.map((qna, index) => {
                return <ListInfo key={index} title={qna.question} description={qna.answers} />           
            })}
        </div>
      </section>
    </div>
  );
};

export default Education;
