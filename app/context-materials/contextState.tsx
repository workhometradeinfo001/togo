import { useState } from 'react';
import TogoContext from './togoContext'
import { toast } from 'react-toastify';

const ContextState = ({ children }: any) => {

    const [endpoints, setEndPoints] = useState({acc_create: "reg/ac", login: "", forgot_pass: ""});
    const host: string = "http://localhost:8081";
    const handleCreateAcc = async (obj: Object, e: Event, optional: Function) => {
        e.preventDefault();
        await fetch(`${host}/${endpoints.acc_create}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(obj)
        }).then(res => {
            if(res.ok){
                toast.success("Account create successful.");
                if(optional){
                    optional();
                }
            }else{
                toast.error("Something wrong!!!");
            }
        })
           
    }

    return (
        <TogoContext.Provider
            value={{ handleCreateAcc, setEndPoints }}>
            {children}
        </TogoContext.Provider>
    );
};

export default ContextState
