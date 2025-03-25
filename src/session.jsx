import "./session.css";

export default function Session() {
  const sessions = [
    {
        id: 1,
      title: "Complete Symposium Training Program",
      description: "Advance your career with our Complete Symposium Training Program, designed for data professionals and accountants. This all-in-one program covers Excel, Power BI, Python, SQL, Generative AI, and Statutory Compliance. Gain practical experience through real-world projects, equipping you to tackle complex data challenges, implement AI solutions, and navigate regulatory landscapes with confidence. Stay ahead in today's data-driven world with this comprehensive training.",
      price:"₹ 60,999",
      mrp:"₹ 80,999",
      tags: ["60 Course", "90 Weeks","50 Project", "Live Traininig"],
      date: "April 4 2025",
      enddate: "January 25 2026",
      imgBg: "rgb(141, 243, 194)",
    },
    {
        id: 2,
        title: "Excel",
        description: "Gain a deep understanding of Excel from the ground up by learning its fundamentals and advancing to complex features. Quickly and easily master the latest Excel tools, including Formulas, Power Query, DAX, and more, through real-life projects.",
        price:"₹ 8,999",
        mrp:"₹ 10,999",
        tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
        date: "April 4 2025",
        enddate: "April 19 2025",
        imgBg: "rgb(189, 253, 222)",
      },
    {
        id: 3,
      title: "Power BI",
      description: "Learn Power BI from the ground up! This training takes you from core skills like data cleaning with Power Query M to advanced analytics with DAX, so you can confidently build reports, uncover insights, and make smarter decisions.",
      price:"₹ 11,999",
      mrp:"₹ 14,999",
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      date: "April 4 2025",
      enddate: "April 19 2025",
      imgBg: "rgb(243, 219, 150)",

    },
    {
        id:4,
      title: "Python",
      description: "Master Python with our online training, tailored for data science, analytics, and finance professionals. Learn to analyze data, build visualizations, and automate tasks to enhance your career in today's data-driven world.",
      price:"₹ 11,999",
      mrp:"₹ 14,999",
              tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
        date: "April 4 2025",
        enddate: "April 19 2025",
      imgBg: "rgb(166, 212, 249)",

    },
    {
        id:5,
      title: "SQL",
      description: "​Boost your data management skills with our MySQL training. Learn to design, manage, and optimize databases, empowering you to handle complex datasets and make informed decisions in data analytics and business intelligence.",
      price:"₹ 10,999",
      mrp:"₹ 12,999",
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      date: "April 4 2025",
      enddate: "April 19 2025",
      imgBg: "rgb(168, 238, 254)",

    },
    {
        id:6,
      title: "Gen AI",
      description: "​Boost your career with our Generative AI training for data scientists, analysts, and accountants. Master AI for data analysis, predictive modeling, and financial operations through hands-on, real-world projects. Stay ahead in the AI-driven future of decision-making.",
      price:"₹ 8999",
      mrp:"₹ 10,999",
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      date: "April 4 2025",
      enddate: "April 19 2025",
      imgBg: "rgb(173, 250, 230)",

    },
    {
        id:7,
      title: "Statutory Compliance",
      description: "​Enhance your CA firm's statutory compliance expertise with our specialized training for Chartered Accountants and articled assistants. Gain practical insights into Indian taxation, auditing standards, and corporate laws to navigate complex regulations confidently and uphold your firm's integrity.",
      price:"₹ 10,999",
      mrp:"₹ 14,999",
      tags: ["5 Course", "9 Weeks","5 Project", "Live Traininig"],
      date: "April 4 2025",
      enddate: "April 19 2025",
      imgBg: "rgb(145, 143, 249)",

    },
  ];

  return (
    <div className="session-container">
      <h1>Symposium Learning</h1>
      <h3>Discover the most suitable Online Collaborative Learning experience for You.</h3>
      <div className="session-box">
        {sessions.map((session, index) => (
          <div className="session-card" key={index}>
            <div className="session-img" style={{ backgroundColor: session.imgBg }}>
              {/* Placeholder image div – you can insert actual <img /> if available */}
              <div className="img-placeholder" />
            </div>
            <div className="session-info">
              <h2>{session.title}</h2>
              <span className="start-date">
              <span>Start Date: {session.date} </span> | 
              <span> End Date: {session.enddate}</span>
             </span>
              <p>{session.description}</p>
              <div className="session-tags">
                {session.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <div className="session-price">{session.price} <span className="session-mrp">{session.mrp}</span></div>
              <div className="session-meta">
              {session.id == 1 ? (
                <button className="btn join-btn">Buy Pack</button>
            ) : (
            <>
            <button className="btn join-btn">Join Now</button>
            <button className="btn talk-btn">View Full Details</button>
            </>
        )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
