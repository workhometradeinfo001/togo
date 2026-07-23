import React, { useContext, useEffect, useState } from 'react'
import { useLoadingBar } from 'react-top-loading-bar';
import TogoContext from '~/context-materials/togoContext';
import Button from '~/raw-components/button';
import Input from '~/raw-components/input'
import Label from '~/raw-components/label'

const Signup = (props: any) => {
    const { classNameTopDiv, formClassName } = props;
    const { handlePostMethod, endpoints, handleRegEx } = useContext(TogoContext);
    const { start, complete } = useLoadingBar({
        color: "red",
        height: 2
    });
    const [validity, setValidity] = useState({
        f_n: false,
        l_n: false,
        e_n: false,
        p: false,
        c_p: false,
        submit: false
    });
    const [inputFiledCheck, setInputFCheck] = useState({
        f_c: false,
        l_c: false,
        e_c: false,
        p_c: false,
        c_p: false
    });
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
    };
    const [isNowSubmitable, setSubmitable] = useState(false);
    const checkForSubmit = (): boolean => {
        return Object.values(inputFiledCheck).every(
            (isCheck) => isCheck === true);
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>,
        methodCall: String) => {
        try {
            switch (methodCall) {
                case "f":
                    setInputText({ ...inputText, first_name: e.target.value });
                    if (e.target.value === "" || e.target.value === " ") {
                        setValidity({ ...validity, f_n: false });
                        setInputFCheck({ ...inputFiledCheck, f_c: false });
                    } else {
                        const result = handleRegEx("f", e.target.value);
                        if (result && result !== undefined) {
                            setValidity({ ...validity, f_n: true });
                            setInputFCheck({ ...inputFiledCheck, f_c: true });
                        } else {
                            setValidity({ ...validity, f_n: false });
                            setInputFCheck({ ...inputFiledCheck, f_c: false });
                        }
                    }
                    break;
                case "l":
                    setInputText({ ...inputText, last_name: e.target.value });
                    if (e.target.value === "" || e.target.value === " ") {
                        setValidity({ ...validity, l_n: false });
                        setInputFCheck({ ...inputFiledCheck, l_c: false });
                    } else {
                        const result = handleRegEx("l", e.target.value);
                        if (result && result !== undefined) {
                            setValidity({ ...validity, l_n: true });
                            setInputFCheck({ ...inputFiledCheck, l_c: true });
                        } else {
                            setValidity({ ...validity, l_n: false });
                            setInputFCheck({ ...inputFiledCheck, l_c: false });

                        }
                    }
                    break;
                case "e":
                    setInputText({ ...inputText, email: e.target.value });
                    if (e.target.value === "" || e.target.value === " ") {
                        setValidity({ ...validity, e_n: false });
                        setInputFCheck({ ...inputFiledCheck, e_c: false });
                    } else {
                        const result = handleRegEx("e", e.target.value);
                        if (result && result !== undefined) {
                            setValidity({ ...validity, e_n: true });
                            setInputFCheck({ ...inputFiledCheck, e_c: true });
                        } else {
                            setValidity({ ...validity, e_n: false });
                            setInputFCheck({ ...inputFiledCheck, e_c: false });
                        }
                    }
                    break;
                case "p":
                    setInputText({ ...inputText, password: e.target.value });
                    if (e.target.value === "" || e.target.value === " ") {
                        setValidity({ ...validity, p: false });
                        setInputFCheck({ ...inputFiledCheck, p_c: false });
                    } else {
                        const result = handleRegEx("p", e.target.value);
                        if (result && result !== undefined) {
                            setValidity({ ...validity, p: true });
                            setInputFCheck({ ...inputFiledCheck, p_c: true });
                        } else {
                            setValidity({ ...validity, p: false });
                            setInputFCheck({ ...inputFiledCheck, p_c: false });

                        }
                    }
                    break;
                case "cp":
                    setInputText({ ...inputText, con_pass: e.target.value });
                    if (e.target.value === "" || e.target.value === " ") {
                        setValidity({ ...validity, c_p: false });
                        setInputFCheck({ ...inputFiledCheck, c_p: false });
                    } else {
                        const result = handleRegEx("cp", e.target.value);
                        if (result && result !== undefined) {
                            setValidity({ ...validity, c_p: true });
                            setInputFCheck({ ...inputFiledCheck, c_p: true });
                        } else {
                            setValidity({ ...validity, c_p: false });
                            setInputFCheck({ ...inputFiledCheck, c_p: false });
                        }
                    }
                    break;
                default:
                    break;
            }
        } catch {
            console.log("Error occurse.");
        }

    }
    const resetInputFileds = () => {
        setInputText({
            email: "",
            first_name: "",
            last_name: "",
            con_pass: "",
            password: ""
        });
        setValidity({
            ...validity,
            f_n: false,
            l_n: false,
            e_n: false,
            p: false,
            c_p: false
        });
        setSubmitable(false);
    }
    useEffect(() => {
        const obj = checkForSubmit();
        if (inputText.password === inputText.con_pass) {
            setSubmitable(obj);
        } else {
            setSubmitable(false);
        }
    }, [inputFiledCheck]);
    return (
        <div className={classNameTopDiv}>
            <h3 className='mb-4 text-decoration-underline'>Account Creation Form</h3>
            <form className={formClassName}>
                <div className='row w-100 align-items-center justify-content-between'>
                    <div className='mb-3 col'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="First Name" />
                        <Input id="exampleEmail" className={`form-control ${validity.f_n && "is-valid"}`}
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
                        <Input id="exampleEmail" className={`form-control ${validity.l_n && "is-valid"}`}
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
                        <Input id="exampleEmail" className={`form-control ${validity.e_n && "is-valid"}`}
                            placeHolder="name@example.com" type="email"
                            value={inputText.email}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnChange(e, "e")
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <Label htmlForTag="exampleEmail" className={`form-label`}
                            text="Password" />
                        <Input id="exampleEmail" className={`form-control ${validity.p && "is-valid"}`}
                            placeHolder="[A-Z]+[a-z]+[0-9]+[~!@#$...]" type="password"
                            value={inputText.password}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnChange(e, "p")
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <Label htmlForTag="exampleEmail" className={`form-label`}
                            text="Confirm Password" />
                        <Input id="exampleEmail" className={`form-control ${validity.c_p && "is-valid"}`}
                            placeHolder="[A-Z]+[a-z]+[0-9]+[~!@#$...]" type="password"
                            value={inputText.con_pass}
                            onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleOnChange(e, "cp")
                            }
                        />
                    </div>
                    <Button
                        className={`btn btn-success w-100 
                            ${!isNowSubmitable && "disabled"}`}
                        type="submit" text="Signup"
                        onclickBtn={(e: Event) => {
                            start();
                            handlePostMethod(obj_for_send, e,
                                endpoints.acc_create,
                                resetInputFileds);
                            complete();
                        }}
                    />
                </div>
            </form>
        </div>
    )
}

export default Signup
