import React, { useRef } from 'react';
import rtArw from "./assets/images/right-arw.svg"
import ltArw from "./assets/images/left-arw.svg"
import MySql from "./assets/images/MysqlW.svg"
import ExcelW from "./assets/images/Excel-w.svg"
import PowerBI from "./assets/images/PowerBIW.svg"
import ChatGpt from "./assets/images/ChatGPTW.svg"
import Python from "./assets/images/PYW.svg"
import SocW from "./assets/images/SocW.svg"

import { Link } from 'react-router-dom';
import './Carousel.css';

const items = [
  { id: 1, 
    cls:'batch-excel', 
    title: 'Excel', 
    status: 'April 2025 Enrollment Open',
    info:'4 Course | 5 Projects | 7 Weeks',
    img:ExcelW, 
    descp: 'Gain a deep understanding of Excel from the ground up by learning its fundamentals and advancing to complex features. Quickly and easily master the latest Excel tools, including Formulas, Power Query, DAX, and more, through real-life projects.' },
  { id: 2, cls:'batch-power-bi',title: 'Power BI',img:PowerBI,info:'4 Course | 5 Projects | 7 Weeks', status: 'Upcoming', descp:'Learn Power BI from the ground up! This training takes you from core skills like data cleaning with Power Query M to advanced analytics with DAX, so you can confidently build reports, uncover insights, and make smarter decisions.' },
  { id: 3, cls:'batch-python',title: 'Python', img:Python,info:'4 Course | 5 Projects | 7 Weeks', status: 'Upcoming',descp:"Master Python with our online training, tailored for data science, analytics, and finance professionals. Learn to analyze data, build visualizations, and automate tasks to enhance your career in today's data-driven world." },
  { id: 4, cls:'batch-sql',title: 'SQL', img:MySql,info:'4 Course | 5 Projects | 7 Weeks', status: 'April 2025 Enrollment Open', descp:'​Boost your data management skills with our MySQL training. Learn to design, manage, and optimize databases, empowering you to handle complex datasets and make informed decisions in data analytics and business intelligence.' },
  { id: 5, cls:'batch-gen-ai',title: 'Gen AI', img:ChatGpt ,info:'4 Course | 5 Projects | 2 Weeks',status: 'Upcoming' ,descp:'​Boost your career with our Generative AI training for data scientists, analysts, and accountants. Master AI for data analysis, predictive modeling, and financial operations through hands-on, real-world projects. Stay ahead in the AI-driven future of decision-making.​'},
  { id: 6, cls:'batch-soc',title: 'Statutory Compliance',info:'4 Course | 5 Projects | 9 Weeks', img: SocW ,status: 'Upcoming',descp:"​Enhance your CA firm's statutory compliance expertise with our specialized training for Chartered Accountants and articled assistants. Gain practical insights into Indian taxation, auditing standards, and corporate laws to navigate complex regulations confidently and uphold your firm's integrity."},

];

export default function Carousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.6;

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="carousel-wrapper">

      <button className="nav-btn left-btn" onClick={() => scroll('left')}><img className="arrow-icon" src={ltArw} alt="left-arrow" />  </button>
      <div className="rt-prg-container" ref={scrollRef}>
        {items.map((item) => (
          <div key={item.id} className= {`rt-prg-box ${item.cls}`}>
            <div className="batch-status">{item.status}</div>
            <img src={item.img} alt="" />
            <h1>{item.title}</h1>
            <div className="batch-info">{item.info}</div>
            <p>{item.descp}</p>
            <Link to="/Training"><button className="view-btn">View Details</button></Link>
          </div>
        ))}
      </div>
      <button className="nav-btn right-btn" onClick={() => scroll('right')}><img className="arrow-icon" src={rtArw} alt="right-arrow" /> </button>
      
    </div>
  );
}
