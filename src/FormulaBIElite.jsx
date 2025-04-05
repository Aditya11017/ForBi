import "./train.css";
import { useState , useRef} from "react";
import TrainTable from "./trainTable";
import { Link } from "react-router-dom";


export default function FormulaBIElite() {
    
    const tagRef = useRef(null); // ✅ Move useRef to the top level

  
    function scrollClick() {
          tagRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); 
      }
    function trainingSubmit(event) {
        event.preventDefault(); // Prevent form submission refresh
    }
    const [selectedId, setSelectedId] = useState(null); // ✅ Single state for selection
    const plans = [
        {
            id: 1,
            name: "Small-Team",
            category: "team",
            features: [
                { text: "Perfect for 3-5 members size teams.", classType: "tick" },
                { text: "Based on team members' requirements.", classType: "tick" },
                { text: "Live industry-based training.", classType: "tick" },
                {text:"Dedicated support and training", classType:"tick" },
                { text: "No pre-recorded videos.", classType: "cross" }
            ]
        },
        {
            id: 2,
            name: "Medium-Team",
            category: "team",
            features: [
                { text: "Best for teams of 6-15 members size teams.", classType: "tick" },
                { text: "Personalized curriculum & hands-on projects.", classType: "tick" },
                { text: "One-on-one mentorship.", classType: "tick" },
                { text: "Includes both live and recorded sessions.", classType: "cross" }
            ]
        },
        {
            id: 3,
            name: "Enterprise",
            category: "team",
            features: [
                { text: "Tailored for large organizations.", classType: "tick" },
                { text: "Full AI-driven automation support.", classType: "tick" },
                { text: "Custom enterprise-level projects.", classType: "tick" },
                { text: "Dedicated support and training.", classType: "tick" }
            ]
        },
        {
            id: 4,
            name: "Standerd Plan",
            category: "firm",
            features: [
                { text: "Training based on firm-approved data.", classType: "tick" },
                { text: "Custom enterprise-level projects.", classType: "tick" },
                {text:"Dedicated support and training", classType:"tick" },
                { text: "Custom training in Statutory Compliance.", classType: "tick" }

            ]
        },
        {
            id: 5,
            name: "Pro Plan",
            category: "firm",
            features: [
                { text: "Training based on firm-approved data.", classType: "tick" },
                { text: "Custom enterprise-level projects.", classType: "tick" },
                { text: "Custom training in Statutory Compliance.", classType: "tick" }
            ]
        },
        {
            id: 6,
            name: "Enterprise Plan",
            category: "firm",
            features: [
                { text: "Training based on firm-approved data.", classType: "tick" },
                { text: "Custom enterprise-level projects.", classType: "tick" },
                { text: "Dedicated support and training.", classType: "tick" },
                { text: "Custom training in Statutory Compliance.", classType: "tick" }
            ]
        },
        {
            id: 7,
            name: "School ",
            category: "eduction",
            features: [
                { text: "Tailored for senior secondary education.", classType: "tick" },
                { text: "Training based on institution approved data.", classType: "tick" },
                { text: "Custom enterprise-level projects.", classType: "tick" },
                { text: "Dedicated support and training.", classType: "tick" }
            ]
        },
        {
            id: 8,
            name: "College & University",
            category: "eduction",
            features: [
                { text: "Tailored for UG and PG curriculum.", classType: "tick" },
                { text: "Training based on institution approved data.", classType: "tick" },
                { text: "Custom enterprise-level projects.", classType: "tick" },
                { text: "Dedicated support and training.", classType: "tick" }
            ]
        },
        {
            id: 9,
            name: " Eductional Instistue",
            category: "eduction",
            features: [
                { text: "Tailored for your unique curriculum requirements.", classType: "tick" },
                { text: "Training based on institution approved data.", classType: "tick" },
                { text: "Custom enterprise-level projects.", classType: "tick" },
                { text: "Dedicated support and training.", classType: "tick" }
            ]
        },
        {
            id: 10,
            name: " Custom",
            category: "custom",
            features: [
                { text: "Tailored for total presonalised online training for large organization.", classType: "tick" },
                { text: "Training based on firm-approved data", classType: "tick" },
                { text: "Custom enterprise-level projects.", classType: "tick" },
                { text: "Dedicated support and training.", classType: "tick" }
            ]
        }
    ];

    function handleSelection(id) {
        setSelectedId(id)
        console.log(selectedId)
         // ✅ Only one selected at a time
    }

    return (
        <div className="train-container">
            <div className="train-box">
                <div className="t-box">
                    <h1 className="train-p">FormulaBI<span className="for-elite">+Elite</span></h1>
                    <h1 className="bg-head">Choose Your FormulaBI LABS Elite Training Plan</h1>
                    <div className="center-box">
                    <button className="compare-btn" onClick={scrollClick}>Compare Plans</button>
                    <br/>
                    <p className="train-p">Please, Select a plan which suits you best. </p>
                    </div>
                    <div className="t-price-box">
                        {/* ✅ Team Plans */}
                        <div className="t-plan-box">
                            <h3>For Teams</h3>
                            <p>
                                Flexible training tailored to your {"team's"} unique needs, helping them build strong data literacy, data science, and analytics skills.
                            </p>

                            <form onSubmit={trainingSubmit}>
                                {plans.filter(plan => plan.category === "team").map(plan => (
                                    <div className="team-box" key={plan.id}>
                                        <label className={`team-radio  ${selectedId === plan.id ? 't-active': ''}`}  onClick={() => handleSelection(plan.id)}>
                                            <input
                                                className="radio-btn"
                                                type="radio"
                                                name="TrainingPlan" // ✅ Single name for all
                                                checked={selectedId === plan.id}
                                                readOnly
                                                value={plan.name}
                                            />
                                            <p>{plan.name}</p>

                                            {/* Conditionally display the plan details */}
                                            <div className={selectedId === plan.id ? "plan-info" : "hide-plan-info"}>
                                                <span className="line"></span>

                                                {/* Dynamically Render UL Elements */}
                                                <ul>
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index} className={feature.classType}>
                                                            {feature.text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </label>
                                    </div>
                                ))}     
                                <Link to="/sales">
                                <button 
                                    className={selectedId !== null && plans.some(plan => plan.category === "team" && plan.id === selectedId) ? "t-reg-btn-active" : "t-reg-btn-disabled"} 
                                    disabled={!plans.some(plan => plan.category === "team" && plan.id === selectedId)}
                                >Contact to FormulaBI LABS</button>
                                </Link>
                            </form>
                        </div>

                        {/* ✅ Firm Plans */}
                        <div className="t-plan-box">
                            <h3>For Firms</h3>
                            <p>Tailored training for Chartered Accountancy firms to enhance data literacy, data science, and analytics while leveraging existing tools. We incorporate industry examples for practical learning, ensuring your team stays ahead with a future-ready approach while maintaining ethical and security standards.</p>

                            <form onSubmit={trainingSubmit}>
                                {plans.filter(plan => plan.category === "firm").map(plan => (
                                    <div className="team-box" key={plan.id}>
                                        <label className={`team-radio  ${selectedId === plan.id ? 't-active': ''}`}  onClick={() => handleSelection(plan.id)}>
                                            <input
                                                className="radio-btn"
                                                type="radio"
                                                name="TrainingPlan" // ✅ Same name as Team Plans
                                                checked={selectedId === plan.id}
                                                readOnly
                                                value={plan.name}
                                            />
                                            <p>{plan.name}</p>

                                            {/* Conditionally display the plan details */}
                                            <div className={selectedId === plan.id ? "plan-info" : "hide-plan-info"}>
                                                <span className="line"></span>

                                                {/* Dynamically Render UL Elements */}
                                                <ul>
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index} className={feature.classType}>
                                                            {feature.text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </label>
                                    </div>
                                ))}   
                                <Link to="/sales">                             
                                <button 
                                    className={selectedId !== null && plans.some(plan => plan.category === "firm" && plan.id === selectedId) ? "t-reg-btn-active" : "t-reg-btn-disabled"} 
                                    disabled={!plans.some(plan => plan.category === "firm" && plan.id === selectedId)}
                                >Contact to FormulaBI LABS</button>
                                </Link>
                            </form>
                        </div>

                        <div className="t-plan-box">
                            <h3>For Educational Institution</h3>
                            <p>Tailored training for educational institutions, equipping students with essential data literacy, data science, and analytics skills. Our programs integrate seamlessly with existing and emerging technologies within your curriculum and infrastructure, ensuring students stay ahead in a rapidly evolving digital world—while upholding ethical standards and data security.</p>
                            <form onSubmit={trainingSubmit}>
                                {plans.filter(plan => plan.category === "eduction").map(plan => (
                                    <div className="team-box" key={plan.id}>
                                        <label className={`team-radio  ${selectedId === plan.id ? 't-active': ''}`}  onClick={() => handleSelection(plan.id)}>
                                            <input
                                                className="radio-btn"
                                                type="radio"
                                                name="TrainingPlan" // ✅ Same name as Team Plans
                                                checked={selectedId === plan.id}
                                                readOnly
                                                value={plan.name}
                                            />
                                            <p>{plan.name}</p>

                                            {/* Conditionally display the plan details */}
                                            <div className={selectedId === plan.id ? "plan-info" : "hide-plan-info"}>
                                                <span className="line"></span>

                                                {/* Dynamically Render UL Elements */}
                                                <ul>
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index} className={feature.classType}>
                                                            {feature.text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                                <Link to="/sales">
                                <button 
                                    className={selectedId !== null && plans.some(plan => plan.category === "eduction" && plan.id === selectedId) ? "t-reg-btn-active" : "t-reg-btn-disabled"} 
                                    disabled={!plans.some(plan => plan.category === "eduction" && plan.id === selectedId)}
                                >Contact to FormulaBI LABS</button>
                                </Link>
                            </form>
                        </div>

                        <div className="t-plan-box">
                            <h3>For Custom Training</h3>
                            <p>Fully customized training designed around your unique requirements, backed by our Research & Development expertise. We focus on core technologies, leverage your existing infrastructure, and ensure impactful learning—while maintaining the highest standards of ethics and security.</p>
                            <form onSubmit={trainingSubmit}>
                                {plans.filter(plan => plan.category === "custom").map(plan => (
                                    <div className="team-box" key={plan.id}>
                                        <label className={`team-radio  ${selectedId === plan.id ? 't-active': ''}`}  onClick={() => handleSelection(plan.id)}>
                                            <input
                                                className="radio-btn"
                                                type="radio"
                                                name="TrainingPlan" // ✅ Same name as Team Plans
                                                checked={selectedId === plan.id}
                                                readOnly
                                                value={plan.name}
                                            />
                                            <p>{plan.name}</p>

                                            {/* Conditionally display the plan details */}
                                            <div className={selectedId === plan.id ? "plan-info" : "hide-plan-info"}>
                                                <span className="line"></span>

                                                {/* Dynamically Render UL Elements */}
                                                <ul>
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index} className={feature.classType}>
                                                            {feature.text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                                <Link to="/sales">
                                     <button 
                                    className={selectedId !== null && plans.some(plan => plan.category === "custom" && plan.id === selectedId) ? "t-reg-btn-active" : "t-reg-btn-disabled"} 
                                    disabled={!plans.some(plan => plan.category === "custom" && plan.id === selectedId)}
                                >Contact to FormulaBI LABS</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                    <div className="table-box" ref={tagRef}>
                    <TrainTable  />
                    </div>
                </div>
            </div>
        </div>
    );
}
