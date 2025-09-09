import MySql from "./assets/images/Mysql.svg"
import Excel from "./assets/images/Excel.svg"
import PowerBI from "./assets/images/PowerBI.svg"
import Sheets from "./assets/images/GSheets.svg"
import Genmini from "./assets/images/Gemi.svg"
import ChatGpt from "./assets/images/ChatGPT.svg"
import Python from "./assets/images/PY.svg"
import Copilot from "./assets/images/Copilot.svg"
import knime from"./assets/images/knime.svg"
export default function Marque(){
    return(
        <div className="marquee-container">
        <div className="marquee">
            <img className="Tech-img" src={Excel} alt="Excel_logo" />
            <img className="Tech-img" src={PowerBI} alt="PowerBI_logo" />
            <img className="Tech-img" src={Sheets} alt="GoogleSheets_logo" />
            <img className="Tech-img" src={Genmini} alt="GoogleGemani_logo" />
            <img className="Tech-img" src={ChatGpt} alt="ChatGPT_logo" />
            <img className="Tech-img" src={Python} alt="Python_logo" />
            <img className="Tech-img" src={MySql} alt="MySQl_logo" />
            <img className="Tech-img" src={Copilot} alt="MicroSoftCopilot_logo" />
            <img className="Tech-img" src={knime} alt="knime_logo" />
            <img className="Tech-img" aria-hidden="true" src={Excel} alt="Excel_logo" />
            <img className="Tech-img" aria-hidden="true" src={PowerBI} alt="PowerBI_logo" />
            <img className="Tech-img" aria-hidden="true" src={Sheets} alt="GoogleSheets_logo" />
            <img className="Tech-img" aria-hidden="true" src={Genmini} alt="GoogleGemani_logo" />
            <img className="Tech-img" aria-hidden="true" src={ChatGpt} alt="ChatGPT_logo" />
            <img className="Tech-img" aria-hidden="true" src={Python} alt="Python_logo" />
            <img className="Tech-img" aria-hidden="true" src={MySql} alt="MySQl_logo" />
            <img className="Tech-img" aria-hidden="true" src={Copilot} alt="MicroSoftCopilot_logo" />
            <img className="Tech-img" src={knime} alt="knime_logo" />

        </div>
    </div>
    
    )
}