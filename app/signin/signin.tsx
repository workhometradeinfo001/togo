import React, { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import { useLoadingBar } from 'react-top-loading-bar'
import TogoContext from '~/context-materials/togoContext'
import Button from '~/raw-components/button'
import Input from '~/raw-components/input'
import Label from '~/raw-components/label'
import Paragraph from "~/raw-components/paragraph"

const Signin = (props: any) => {
    const { classNameTopDiv } = props;
    const { handlePostMethod, handleGetMethAuth } = useContext(TogoContext);
    const [searchParam] = useSearchParams();
    const [inputFiled, setInputFiled] = useState({ email: "", password: "" });
    const [checkPointState, setCheckPointState] = useState(false);
    const dashboard = import.meta.env.VITE_CLOUD_DASHBOARD;
    const [mail, setMail] = useState<String | null>(null);
    const { start, complete } = useLoadingBar({
        color: "red",
        height: 2
    });
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>,
        inputFiledName: string) => {
        try {
            switch (inputFiledName) {
                case 'email':
                    setInputFiled({ ...inputFiled, email: e.target.value });
                    break;
                case 'password':
                    setInputFiled({ ...inputFiled, password: e.target.value });
                    break;
                case 'check':
                    setCheckPointState((prev) => !prev);
                    break;
                default:
                    break;
            }
        } catch {
            toast.error("Try after later...");
        }
    };
    const oauthLoging = (e: React.MouseEvent, whichCaller: string) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.removeItem("oauth_endpoint");
        switch (whichCaller) {
            case "google":
                localStorage.setItem("oauth_endpoint", "oauth/token");
                window.location.href = `${import.meta.env.VITE_CLOUD_AUTH_HOST}/oauth2/authorization/google`;
                break;
            case "facebook":
                localStorage.setItem("oauth_endpoint", "fb/api/token");
                window.location.href = `${import.meta.env.VITE_CLOUD_AUTH_HOST}/oauth2/authorization/facebook`;
                break;
            case "linkedin":
                localStorage.setItem("oauth_endpoint", "linkedin/api/token");
                window.location.href = `${import.meta.env.VITE_CLOUD_AUTH_HOST}/oauth2/authorization/linkedin`;
                break;
            default:
                break;
        }
    };
    const loginObj = {
        email: inputFiled.email,
        password: inputFiled.password
    };
    const afterSuccessfulLogin = async () => {
        await fetch(`${import.meta.env.VITE_CLOUD_AUTH_HOST}/jwt/token?email=${mail}`);
    };
    useEffect(() => {
       const processOauthCallBack = async () => {
        // 1. Check search params first before modifying storage
        if (searchParam.get("auth") === "callback") {
            const endpoint = localStorage.getItem("oauth_endpoint");
            if (!endpoint) {
                console.error("oauth_endpoint is missing from localStorage!");
                return;
            }
            start(); // Start progress bar before async work
            try {
                const data = await handleGetMethAuth(
                    endpoint,
                    "Login Successful", 
                    "Login Failed"
                );
                if (data) {
                    // Clear old email only after new email data is successfully fetched
                    localStorage.removeItem("email");
                    localStorage.setItem("email", data);
                    window.location.href = dashboard;
                }
            } catch (error) {
                console.error("OAuth callback processing failed:", error);
            } finally {
                complete(); // Always complete progress bar when finished
            }
        }
    };

    processOauthCallBack();
    }, [searchParam]);
    useEffect(() => {
        const mailStore = localStorage.getItem("email");
        if (mailStore) {
            setMail(mailStore);
        }
    }, []);
    return (
        <div className={classNameTopDiv}>
            <form>
                <div className="mb-3">
                    <Label htmlForTag="exampleEmail" className="form-label" text="Email Address" />
                    <Input id="exampleEmail" className="form-control"
                        placeHolder="name@example.com" type="email"
                        value={inputFiled.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, "email")}
                    />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <Label htmlForTag="examplePassword" className="form-label" text="Password" />
                    <Input id="examplePassword" className="form-control"
                        placeHolder="********" type="password"
                        value={inputFiled.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, "password")}
                    />
                </div>

                <div className="mb-3 form-check">
                    <Input id="exampleCheck" className="form-check-input"
                        placeHolder="********" type="checkbox"
                        checked={checkPointState}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, "check")}
                    />
                    <Label htmlForTag="exampleCheck" className="form-check-label"
                        text="Logout after 1 weak" />
                </div>
                <Button type="submit" className={`btn btn-primary w-100
                    ${(!checkPointState || inputFiled.email === "" || inputFiled.password === "") && "disabled"}
                `} text="Login"
                    onclickBtn={async (e: Event) => {
                        e.preventDefault();
                        mail ? localStorage.removeItem("email") : mail;
                        start();
                        try {
                            await handlePostMethod(loginObj,
                                "login",
                                "Login successfull",
                                "Faile to login",
                                afterSuccessfulLogin
                            );

                            localStorage.setItem("email", inputFiled.email);
                            setInputFiled({ email: "", password: "" });
                            setCheckPointState(false);
                        } catch (error) {
                            console.log(error);
                        } finally {
                            complete();
                        }
                    }}
                />
            </form>
            <div className='d-flex flex-row justify-content-between row mt-4'>
                <div className='col-4 text-center'>
                    <i onClick={(e) => oauthLoging(e, "google")} className="fa-brands fa-google fa-xl cursor-pointer"></i>
                </div>
                <div className='col-4 text-center'>
                    <i onClick={(e) => oauthLoging(e, "facebook")} className="fa-brands fa-facebook fa-xl cursor-pointer"></i>
                </div>
                <div className='col-4 text-center'>
                    <i onClick={(e) => oauthLoging(e, "linkedin")} className="fa-brands fa-square-linkedin fa-xl cursor-pointer"></i>
                </div>
            </div>
            <div className='d-flex flex-row'>
                <Paragraph
                    className="mt-4 text-secondary fs-6"
                    text="Forgot password: " />
                {<Link to={"/forgetpassword"} onClick={() => { start(), complete() }} className='mt-4 ms-2'>Click here</Link>}
            </div>

        </div>
    )
}

export default Signin
