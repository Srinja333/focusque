"use client";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { APP_MAIN_COLOR } from "../../shared/constant.js";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  // const [isValid,setIsValid]=useState(true);
  

  // useEffect(() => {
  //   // console.log("mmm",APP_MAIN_COLOR)
  //   if(isValid==false){
  //     toast.remove();
  //     toast.error("phone number can't be more than 10 digits")
  //   }
  // }, [isValid]);

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

      const formatPh = "+" + ph;

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
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

 const handleInput=(e)=>{
  setPh(e.target.value)
  
  // if(ph.length>10){
  //   setIsValid(false)
  //   return;
  //  }

  
 
  
 }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>
      {user ? (
        <>login success</>
      ) : (
        <>
          {showOTP ? (
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
                    {/* <div className="form-outline form-dark mb-4">
                   
                      <input
                        type="tel"
                        className="form-control form-control"
                        placeholder="Mobile Number"
                        value={ph}
                        onChange={(e)=>{handleInput(e)}}
                       
                      />
                    </div> */}
                    <PhoneInput
                            className="mb-4 mt-4"
                            placeholder="Mobile Number"
                            value={ph}
                            onChange={setPh}
                            defaultCountry="IN"
                            style={{border:"1px solid green"}}
                          />
                    {
                      ph.length>10&&
                      <p className="mb-3" style={{color:"red"}}>phone number must have 10 digits</p>
                    }
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
                            disabled={ph.length==10?false:true}
                            // type="submit"
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
          )}
        </>
      )}
    </>
  );
};

export default Login;
