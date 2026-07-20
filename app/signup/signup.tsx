import React, { useContext, useEffect, useState } from 'react'
import TogoContext from '~/context-materials/togoContext';
import Button from '~/raw-components/button';
import Input from '~/raw-components/input'
import Label from '~/raw-components/label'

const Signup = (props: any) => {
    const { classNameTopDiv, formClassName } = props;
    const { handleCreateAcc } = useContext(TogoContext);
    const [inputText, setInputText] = useState({
        email: "",
        first_name: "", last_name: "",
        con_pass: "", password: ""
    });
    const obj_for_send = {
        firstName: inputText.first_name,
        lastName: inputText.last_name,
        emailAdd: inputText.email,
        password: inputText.con_pass
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>,
        methodCall: String) => {
        switch (methodCall) {
            case "f":
                setInputText({ ...inputText, first_name: e.target.value });
                break;
            case "l":
                setInputText({ ...inputText, last_name: e.target.value });
                break;
            case "e":
                setInputText({ ...inputText, email: e.target.value });
                break;
            case "cp":
                setInputText({ ...inputText, con_pass: e.target.value });
                break;
            case "p":
                setInputText({ ...inputText, password: e.target.value });
                break;
            default:
                break;
        }
    }
    const resetInputFileds = () => {
        setInputText({ email: "", first_name: "", last_name: "", con_pass: "", password: "" });
    }
    useEffect(() => {
        console.log("Email: ", inputText.email)
    }, [inputText.email])
    return (
        <div className={classNameTopDiv}>
            <h3 className='mb-4 text-decoration-underline'>Account Creation Form</h3>
            <form className={formClassName}>
                <div className='row w-100 align-items-center justify-content-between'>
                    <div className='mb-3 col'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="First Name" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="Given Name" type="email"
                            value={inputText.first_name}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnChange(e, "f")
                            }
                        />
                    </div>
                    <div className='mb-3 col'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="Last Name" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="Family Name" type="email"
                            value={inputText.last_name}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnChange(e, "l")
                            }
                        />
                    </div>
                </div>
                <div className='row w-100'>
                    <div className='mb-3'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="Email Address" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="name@example.com" type="email"
                            value={inputText.email}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnChange(e, "e")
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="Password" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="********" type="password"
                            value={inputText.password}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnChange(e, "p")
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="Confirm Password" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="********" type="password"
                            value={inputText.con_pass}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnChange(e, "cp")
                            }
                        />
                    </div>
                    <Button
                        className="btn btn-success w-100"
                        type="submit" text="Signup"
                        onclickBtn={(e: Event) => { 
                            handleCreateAcc(obj_for_send, e, resetInputFileds) }}
                    />
                </div>
            </form>
        </div>
    )
}

export default Signup
