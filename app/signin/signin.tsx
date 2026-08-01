import React, { useContext, useEffect, useEffectEvent, useState, type ChangeEvent } from 'react'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { useLoadingBar } from 'react-top-loading-bar'
import TogoContext from '~/context-materials/togoContext'
import Button from '~/raw-components/button'
import Input from '~/raw-components/input'
import Label from '~/raw-components/label'
import Paragraph from "~/raw-components/paragraph"

const Signin = (props: any) => {
    const { classNameTopDiv } = props;
    const { handlePostMethod } = useContext(TogoContext);
    const [inputFiled, setInputFiled] = useState({ email: "", password: ""});
    const [checkPointState, setCheckPointState] = useState(false);
    const {start,complete} = useLoadingBar({
        color: "red",
        height: 2
    });
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, 
        inputFiledName: string)=> {
        try{
            switch (inputFiledName) {
                case 'email':
                    setInputFiled({...inputFiled, email: e.target.value});
                    break;
                case 'password':
                    setInputFiled({...inputFiled, password: e.target.value});
                    break;
                case 'check':
                    if(!checkPointState){
                        setCheckPointState(true);
                    }else{
                        setCheckPointState(false);
                    }  
                    break;
                default:
                    break;
            }
        }catch{
            toast.error("Try after later...");
        }
    }
    const loginObj = {
        email: inputFiled.email,
        password: inputFiled.password
    }
    return (
        <div className={classNameTopDiv}>
            <form>
                <div className="mb-3">
                    <Label htmlForTag="exampleEmail" className="form-label" text="Email Address" />
                    <Input id="exampleEmail" className="form-control"
                        placeHolder="name@example.com" type="email" 
                        value={inputFiled.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> handleOnChange(e, "email")}
                        />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <Label htmlForTag="examplePassword" className="form-label" text="Password" />
                    <Input id="examplePassword" className="form-control"
                        placeHolder="********" type="password"
                        value={inputFiled.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> handleOnChange(e, "password")}
                        />
                </div>

                <div className="mb-3 form-check">
                    <Input id="exampleCheck" className="form-check-input"
                        placeHolder="********" type="checkbox"
                        checked={checkPointState}
                        onChange={(e: ChangeEvent<HTMLInputElement>)=> handleOnChange(e, "check")}
                        />
                    <Label htmlForTag="exampleCheck" className="form-check-label"
                        text="Logout after 1 weak" />
                </div>
                <Button type="submit" className={`btn btn-primary w-100
                    ${!checkPointState && "disabled"}
                `} text="Login" 
                    onclickBtn={(e: Event)=> 
                        {
                            start();
                            handlePostMethod(loginObj, e, 
                                "login",
                                "Login successfull",
                                "Faile to login"
                            );
                            setInputFiled({email: "", password: ""});
                            setCheckPointState(false);
                            complete();
                        }}
                />
            </form>
            <div className='d-flex flex-row'>
                <Paragraph
                    className="mt-4 text-secondary fs-6"
                    text="Forgot password: " />
                {<Link to={"/forgetpassword"} className='mt-4 ms-2'>Click here</Link>}
            </div>

        </div>
    )
}

export default Signin
