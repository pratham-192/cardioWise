import axios from "axios";
import React, { useState ,useRef} from "react";
import { Header } from "../components";
import PopUp from "../components/Modal/PopUp";
import { useTranslation } from "react-i18next";
import { protectedRoute } from "../Contexts/ProtectedRoute";


const CvdPredictionForm = () => {
    const currentuser = JSON.parse(localStorage.getItem("userDetails"));
    const [userId, setUserId] = useState(currentuser.email);
    const [generalHealth, setGeneralHealth] = useState("");
    const [exercise, setExercise] = useState("");
    const [heartDisease, setHeartDisease] = useState("");
    const [skinCancer, setSkinCancer] = useState("");
    const [otherCancer, setOtherCancer] = useState("");
    const [depression, setDepression] = useState("");
    const [diabetes, setDiabetes] = useState("");
    const [arthritis, setArthritis] = useState("");
    const [sex, setSex] = useState("");
    const [ageCategory, setAgeCategory] = useState("");
    const [smokingHistory, setSmokingHistory] = useState("");
    const [checkup, setCheckup] = useState("");
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [alcoholConsumption, setAlcoholConsumption] = useState();
    const [fruitConsumption, setFruitConsumption] = useState();
    const [greenVegetablesConsumption, setGreenVegetablesConsumption] = useState();
    const [friedPotatoConsumption, setFriedPotatoConsumption] = useState();
    const [err, seterr] = useState("");
    const [cvdScore, setcvdScore] = useState();
    const { t } = useTranslation();

    const [openPopUp, setopenPopUp] = useState(false);

    const submitCvdPrediction = async () => {
        if (!generalHealth   || !exercise || !skinCancer ||
            !otherCancer || !depression || !diabetes || !arthritis || !sex || !ageCategory || !smokingHistory
            || !checkup || !height || !weight || !alcoholConsumption || !fruitConsumption || !greenVegetablesConsumption || !friedPotatoConsumption) {
            seterr("Please fill all the details");
            return;
        }
        const response = await axios.post(
            "https://cvd-server.onrender.com/users/cvd_prediction",
            {
                userId: userId,
                generalHealth: generalHealth,
                exercise: exercise,
                skinCancer: skinCancer,
                otherCancer: otherCancer,
                depression: depression,
                diabetes: diabetes,
                arthritis: arthritis,
                sex: sex,
                ageCategory: ageCategory,
                smokingHistory: smokingHistory,
                checkup: checkup,
                height: height,
                weight: weight,
                alcoholConsumption: alcoholConsumption,
                fruitConsumption: fruitConsumption,
                greenVegetablesConsumption: greenVegetablesConsumption,
                friedPotatoConsumption: friedPotatoConsumption,
            }
        );
            // console.log(response.data)
        if (response.data) {
            setcvdScore(response.data.probability_of_occurrence.toFixed(5));
            setopenPopUp(true);
        
        setGeneralHealth("");
        setExercise("");
        setSkinCancer("");
        setOtherCancer("");
        setDepression("");
        setDiabetes("");
        setArthritis("");
        setSex("");
        setAgeCategory("");
        setSmokingHistory("");
        setCheckup("");
        setHeight("");
        setWeight("");
        setAlcoholConsumption("");
        setFruitConsumption("");
        setGreenVegetablesConsumption("");
        setFriedPotatoConsumption("");
        seterr("");}
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header title={t("CVD Prediction Form")} />
            <div>
                {openPopUp ? (
                    <PopUp
                        message={`your probability of having a heart disease is ${cvdScore}`}
                        status={true}
                        setopenPopUp={setopenPopUp}
                        heading={"Success"}
                    />
                ) : (
                    ""
                )}
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div className="bg-white rounded p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="lg:col-span-3">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        
                                        <div className="md:col-span-5">
                                            <label htmlFor="generalHealth">{t("Would you say that in general, your health is")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="generalHealth"
                                                id="generalHealth"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={generalHealth}
                                                onChange={(e) => setGeneralHealth(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="5">Very Good</option>
                                                <option value="4">Good</option>
                                                <option value="3">excellent</option>
                                                <option value="2">Fair</option>
                                                <option value="1">Poor</option>
                                            </select>
                                        </div>
                                        {/* Add more form fields for other cardiovascular disease prediction data */}
                                        <div className="md:col-span-5">
                                            <label htmlFor="exercise">{t("During the past month, other than your regular job, did you participate in any physical activities or exercises such as running, calisthenics, golf, gardening, or walking for exercise?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="exercise"
                                                id="exercise"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={exercise}
                                                onChange={(e) => setExercise(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        {/* <div className="md:col-span-5">
                                            <label htmlFor="heartDisease">{t("Heart Disease")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="heartDisease"
                                                id="heartDisease"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={heartDisease}
                                                onChange={(e) => setHeartDisease(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div> */}
                                        <div className="md:col-span-5">
                                            <label htmlFor="heartDisease">{t("(Ever told) (you had) skin cancer?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="skinCancer"
                                                id="skinCancer"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={skinCancer}
                                                onChange={(e) => setSkinCancer(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="heartDisease">{t("(Ever told) (you had) any other types of cancer?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="otherCancer"
                                                id="otherCancer"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={otherCancer}
                                                onChange={(e) => setOtherCancer(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="heartDisease">{t("(Ever told) (you had) a depressive disorder (including depression, major depression, dysthymia, or minor depression)?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="depression"
                                                id="depression"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={depression}
                                                onChange={(e) => setDepression(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="heartDisease">{t("(Ever told) (you had) diabetes?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="diabetes"
                                                id="diabetes"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={diabetes}
                                                onChange={(e) => setDiabetes(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                                {/* <option value="0">No, pre-diabetes or borderline diabetes</option> */}
                                                {/* <option value="1">Yes, but female told only during pregnancy</option> */}

                                            </select>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="heartDisease">{t("(Ever told) (you had) some form of arthritis, rheumatoid arthritis, gout, lupus, or fibromyalgia?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="arthritis"
                                                id="arthritis"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={arthritis}
                                                onChange={(e) => setArthritis(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="heartDisease">{t("Sex")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="sex"
                                                id="sex"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={sex}
                                                onChange={(e) => setSex(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="0">Male</option>
                                                <option value="1">Female</option>

                                            </select>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="ageCategory">{t("In what Age category do you belong?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="ageCategory"
                                                id="ageCategory"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={ageCategory}
                                                onChange={(e) => setAgeCategory(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="18-24">18-24 </option>
                                                <option value="25-29">25-29 </option>
                                                <option value="30-34">30-34 </option>
                                                <option value="35-39">35-39 </option>
                                                <option value="40-44">40-44 </option>
                                                <option value="45-49">45-49 </option>
                                                <option value="50-54">50-54 </option>
                                                <option value="55-59">55-59 </option>
                                                <option value="60-64">60-64 </option>
                                                <option value="65-69">65-69 </option>
                                                <option value="75-79">75-79 </option>
                                                <option value="70-74">70-74 </option>
                                                <option value="80+">80+ </option>
                                            </select>
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="heartDisease">{t("Have you smoked at least 100 cigarettes in your entire life?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="smokingHistory"
                                                id="smokingHistory"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={smokingHistory}
                                                onChange={(e) => setSmokingHistory(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="checkup">{t("About how long has it been since you last visited a doctor for a routine checkup?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <select
                                                name="checkup"
                                                id="checkup"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={checkup}
                                                onChange={(e) => setCheckup(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Within the past year </option>
                                                <option value="2">Within the past 2 years </option>
                                                <option value="3">Within the past 5 years </option>
                                                <option value="4">5 or more years ago </option>
                                                <option value="0">Never </option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="height">{t("How tall are you? (cm)")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <input
                                                type="number"
                                                name="height"
                                                id="height"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="weight">{t("weight (Kg)")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <input
                                                type="number"
                                                name="weight"
                                                id="weight"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="alcoholConsumption">{t("During the past 30 days, how many days did you have at least one drink of any alcoholic beverage such as beer, wine, a malt beverage or liquor?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <input
                                                type="number"
                                                name="alcoholConsumption"
                                                id="alcoholConsumption"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                min="-1"
                                                max="30"
                                                value={alcoholConsumption}
                                                onChange={(e) => setAlcoholConsumption(Math.min(Math.max(e.target.value, -1), 30))}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="fruitConsumption">{t("Not including juices, how often did you eat fruit (past 30 days)?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <input
                                                type="number"
                                                name="fruitConsumption"
                                                id="fruitConsumption"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                min="-1"
                                                max="30"
                                                value={fruitConsumption}
                                                onChange={(e) => setFruitConsumption(Math.min(Math.max(e.target.value, 0), 30))}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="greenVegetablesConsumption">{t("How often did you eat a green leafy or lettuce salad, with or without other vegetables?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <input
                                                type="number"
                                                name="greenVegetablesConsumption"
                                                id="greenVegetablesConsumption"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                min="-1"
                                                max="30"
                                                value={greenVegetablesConsumption}
                                                onChange={(e) => setGreenVegetablesConsumption(Math.min(Math.max(e.target.value, 0), 30))}
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label htmlFor="friedPotatoConsumption">{t("How often did you eat any kind of fried potatoes, including French fries, home fries, or hash browns?")}</label>
                                            <span className="text-red-500 pl-1">*</span>
                                            <input
                                                type="number"
                                                name="friedPotatoConsumption"
                                                id="friedPotatoConsumption"
                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                min="0"
                                                max="30"
                                                value={friedPotatoConsumption}
                                                onChange={(e) => setFriedPotatoConsumption(Math.min(Math.max(e.target.value, 0), 30))}
                                                required
                                            />
                                        </div>
                                        {err ? (
                                            <div className="text-red-500 text-sm md:col-span-5">
                                                {err}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => submitCvdPrediction()}
                                                >
                                                    {t("Submit")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default (CvdPredictionForm);
