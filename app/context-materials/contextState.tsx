import { useState } from 'react';
import TogoContext from './togoContext'
import { toast } from 'react-toastify';

const ContextState = ({ children }: any) => {

    const [endpoints, setEndPoints] = useState({ 
        acc_create: "reg/ac", 
        login: "", 
        forgot_pass: "" 
    });
    const regex = {
        name: /^\p{L}+([\s'-]\p{L}+)*$/u,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };
    const host: string = "http://localhost:8081";

    const handleRegEx = (field_name: String, inputData: any): Boolean | undefined => {
        switch (field_name) {
            case "f":
                return regex.name.test(inputData);
            case "l":
                return regex.name.test(inputData);
            case "e":
                return regex.email.test(inputData);
            case "cp":
                return regex.password.test(inputData);
            case "p":
                return regex.password.test(inputData);
            default:
                break;
        }
    };

    const handlePostMethod = async (obj: Object, e: Event, end_point: String,
        optional: Function) => {
        e.preventDefault();
        await fetch(`${host}/${end_point}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(res => {
            if (res.ok) {
                toast.success("Account create successful.");
                if (optional) {
                    optional();
                }
            } else {
                toast.error("Something wrong!!!");
            }
        })

    }

    return (
        <TogoContext.Provider
            value={{ 
                handlePostMethod, endpoints, 
                setEndPoints, regex, handleRegEx, 
                }}>
            {children}
        </TogoContext.Provider>
    );
};

export default ContextState
