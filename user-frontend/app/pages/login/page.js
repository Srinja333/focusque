"use client";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-phone-number-input/style.css";
import { APP_MAIN_COLOR } from "../../shared/constant.js";
import { LANGUAGES } from "./constant";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import loginStyle from  "./login.module.css"

const Login = () => {

 
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [examIds, setExamIds] = useState(null);
  const [examName, setExamName] = useState(null);
  const [subExamIds, setSubExamIds] = useState([]);
  const [subExamNames, setSubExamNames] = useState([]);
  const[levelId,setLevelId]=useState()
  const[langId,setLangId]=useState()
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);
  

  const userData={
    uid:"",
    name:"",
    exams:[{
      name:"",
      level:""
    }],
    languages:[]
  }

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  


  const exams = [
    {
      name: "ssc",
      sub_exams: [
        { name: "ssc cgl", logo: "logo1" },
        { name: "ssc chsl", logo: "logo2" },
      ],
    },

    {
      name: "railway",
      sub_exams: [
        { name: "rrb je", logo: "logo3" },
        { name: "loco pilot", logo: "logo4" },
      ],
    },
  ];

  function onCaptchVerify() {
    if (typeof window !== "undefined") {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              onSignup();
            },
            "expired-callback": () => {},
          }
        );
      }
    }
  }

  function onSignup() {
    setLoading(true);

    if (typeof window !== undefined) {
      onCaptchVerify();

      const appVerifier = window.recaptchaVerifier;

      const formatPh = "+91" + ph;

      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          // setShowOtpToast(true)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }

  const onOTPVerify = async () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          // console.log("res",res?.user);

          setUser(res?.user);
          if (res?.user?.uid !== undefined) {
            localStorage.setItem("user", JSON.stringify(res?.user?.uid));
          }
          onOpenModal()
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const handleInput = (e) => {
    setPh(e.target.value);
  };

//   const handleLevels=(sub,level)=>{
//    for(let ex of userData.exams){
//     if(ex.name==sub){
//       return;
//     }
   
//    }
//    userData.exams.push({
//     name:sub,
//     level:level
//   }
// )
//   }

  const handleUserSaveToDb=()=>{

  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user !== null ? 
      (
        <>
     
      <Modal open={open} onClose={onCloseModal}   styles={
        {
          modal: {
            background: "rgb(235, 253, 247)",
            maxWidth: "500px",
            width:" 100%",
          }
        }
        } center>
      <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">
                    User Info
                  </h1>
                </div>
                <div className="modal-body">
                  <div className="col">
                    <label>Name:</label>
                    <input
                       onChange={(e)=>{
                        userData.name=e.target.value
                       }}
                      className="mt-3 form-control"
                      placeholder="Enter your name"
                      style={{ border: "1px solid rgba(0, 0, 0, 0.175)" }}
                    />
                  </div>
                  <div className="col mt-4">
                    <p>Choose Your Exam:</p>
                    {exams.map((ex, index) => (
                      <>
                        <input
                          type="radio"
                          className="btn-check"
                          name="examOptions"
                          id={`examOptions${index}`}
                          autoComplete="off"
                          onChange={(e) => {
                            setExamName(ex?.name);
                            setExamIds(e.target.id);
                          }}
                          checked={examIds === `examOptions${index}`}
                        />
                        <label
                          className="btn btn-outline-success mx-2"
                          for={`examOptions${index}`}
                        >
                          {ex?.name}
                        </label>
                      </>
                    ))}
                    <div class="row justify-content-evenly mt-4">
                      {exams.map(
                        (ex) =>
                          ex?.name === examName &&
                          ex.sub_exams.map((sub, index) => (
                            <div className="col-4 form-check">
                              <input
                                className="radio form-check-input"
                                type="checkbox"
                                id={`subExamOptions-${sub?.name}-${index}`}
                                value={sub?.name}
                                style={{
                                  cursor: "pointer",
                                }}
                                onChange={(e) => {
                                  let tempSubExamIds = subExamIds;
                                  let tempSubExamNames = subExamNames;

                                  if (tempSubExamIds.includes(e.target.id)) {
                                    tempSubExamIds.forEach((temp, tempInd) => {
                                      if (temp == e.target.id) {
                                        tempSubExamIds.splice(tempInd, 1);
                                        tempSubExamNames.splice(tempInd, 1);
                                        setSubExamNames([...tempSubExamNames]);
                                        setSubExamIds([...tempSubExamIds]);
                                      }
                                    });

                                    return;
                                  }

                                  tempSubExamIds.push(e.target.id);
                                  tempSubExamNames.push(sub?.name);
                                  setSubExamNames([...tempSubExamNames]);
                                  setSubExamIds([...tempSubExamIds]);
                                }}
                                checked={subExamIds.includes(
                                  `subExamOptions-${sub?.name}-${index}`
                                )}
                              />
                              <label
                                className="ms-auto"
                                for={`subExamOptions-${sub?.name}-${index}`}
                              >
                                {sub?.logo}
                                <span className="ms-auto">
                                  &nbsp;{sub?.name}
                                </span>
                              </label>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                  {/* {subExamNames.length !== 0 &&
                    subExamNames.map((sub) => (
                      <div className="col mt-4">
                        <p>What is your level in {sub}?</p>
                        {
                          LEVELS.map((level)=>
                          <div class="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={level}
                            id={level}
                            onChange={(e)=>{
                              handleLevels(sub,e.target.id)
                              setLevelId(e.target.id)
                            }}
                            checked={levelId===level}
                          />
                          <label className="form-check-label" for={level}>
                            {level}
                          </label>
                        </div>
                          )
                        }
                   
                      
                      </div>
                    ))} */}

<div className="col mt-4">
                        <p>Choose your language</p>

                        {
                          LANGUAGES.map((lang)=>
                          <div class="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={lang}
                            id={lang}
                            onChange={(e)=>{
setLangId(e.target.id)
                            }}
                            checked={langId===lang}
                          />
                          <label className="form-check-label" for={lang}>
                            {lang}
                          </label>
                        </div>
                          )
                        }
                       
                    
                       
                      </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    style={{
                      backgroundColor: APP_MAIN_COLOR,
                      color: "white",
                    }}
                    aria-label="Close"
                    onChange={()=>{
                      handleUserSaveToDb()
                    }}
                  >
                    Continue
                  </button>
                  {/* <button type="button" className="btn btn-primary">Understood</button> */}
                </div>
              </div>
            </div>
      </Modal>


        </>
      ) : (
        
          showOTP ? (
            <section className="vh-100">
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div
                      className="card bg-light text-dark"
                      style={{ borderRadius: "1rem" }}
                    >
                      <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-2">
                          <div className="d-flex justify-content-center">
                            <BsFillShieldLockFill size={30} />
                          </div>
                          <label
                            htmlFor="otp"
                            className="mt-3 mb-4 d-flex justify-content-center"
                          >
                            Enter your OTP
                          </label>
                          <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            isInputNum={true}
                            disabled={false}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                            containerStyle="d-flex justify-content-center"
                            inputStyle="m-2"
                            shouldAutoFocus={true}
                          ></OtpInput>
                          <div className="d-flex justify-content-center">
                            <button
                            //  type="button"
                            //  data-bs-toggle="modal"
                            //  data-bs-target="#staticBackdrop"
                              onClick={onOTPVerify}
                              className="btn mt-5"
                              style={{
                                backgroundColor: APP_MAIN_COLOR,
                                color: "white",
                              }}
                             
                            >
                              <span>Verify OTP</span>
                              {loading && (
                                <div
                                  className="spinner-border text-light ms-4"
                                  role="status"
                                  style={{ zoom: "0.5" }}
                                ></div>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="vh-100">
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div
                      className="card bg-light text-dark"
                      style={{ borderRadius: "1rem" }}
                    >
                      <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-2">
                          <h2 className="fw-semibold mb-5">Logo</h2>
                          {/* <p className="text-dark-50 mb-5">
                      Please enter your Mobile Number!
                    </p> */}
                          <div className="form-outline form-dark mb-4">
                            <input
                              type="tel"
                              className="form-control form-control"
                              placeholder="Mobile Number"
                              value={ph}
                              onChange={(e) => {
                                handleInput(e);
                              }}
                            />
                          </div>

                          {ph.length > 10 && (
                            <p className="mb-3" style={{ color: "red" }}>
                              phone number must have 10 digits
                            </p>
                          )}
                          {/* <div className="form-outline form-dark mb-4">
                          <PhoneInput
                            className="mb-4 mt-4"
                            placeholder="Mobile Number*"
                            value={ph}
                            onChange={setPh}
                            defaultCountry="IN"
                            style={{border:"1px solid green"}}
                          />
                          </div> */}
                          <p className="small text-muted  pb-lg-2">
                            By continuing, I agree to the{" "}
                            <a
                              className="text-decoration-none fw-bold"
                              style={{ color: APP_MAIN_COLOR }}
                              // href="/pages/terms-&-condition"
                            >
                              Terms of Use
                            </a>{" "}
                            &{" "}
                            <a
                              className="fw-bold text-decoration-none"
                              style={{ color: APP_MAIN_COLOR }}
                              // href="/pages/privacy-policy"
                            >
                              Privacy Policy
                            </a>
                          </p>
                          <button
                            className="btn mt-3"
                            onClick={onSignup}
                            style={{
                              backgroundColor: APP_MAIN_COLOR,
                              color: "white",
                            }}
                            disabled={ph.length == 10 ? false : true}
                            // type="submit"
                            type="button"
                            // data-bs-toggle="modal"
                            // data-bs-target="#staticBackdrop"
                          >
                            <span>CONTINUE</span>
                            {loading && (
                              <div
                                className="spinner-border text-light ms-4"
                                role="status"
                                style={{ zoom: "0.5" }}
                              ></div>
                            )}
                          </button>
                        </div>
                        {/* <div>
                    <p className="text-muted">
                      Have trouble logging in?{" "}
                      <a
                        href="#!"
                        className="text-decoration-none fw-bold"
                        style={{ color: "#ff3f6c" }}
                      >
                        Get Help!
                      </a>
                    </p>
                  </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        
      )}
    </>
  );
};

export default Login;
