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
    // const host: string = import.meta.env.VITE_CLOUD_HOST;
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

    const handlePostMethod = async (
        obj: Record<string, any>,
        end_point: string,
        toastMsgSuc: string,
        toastMsgFail: string,
        optional?: () => void
    ) => {
        try {
            const res = await fetch(`${host}/${end_point}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            });

            if (res.ok || res.status === 302 || res.status === 202) {
                toast.success(toastMsgSuc);
                if (optional) optional();

                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const text = await res.text();
                    return text ? JSON.parse(text) : res.status;
                }
                return res.status; // Return HTTP status code (e.g., 202)
            } else {
                toast.error(toastMsgFail);
                return res.status; // Return error HTTP status code (e.g., 406)
            }
        } catch (error) {
            console.log(error);
            toast.error("Try again later");
            return null;
        }
    };

    // const handlePostMethod = async (
    //     obj: Record<string, any>,
    //     end_point: string,
    //     toastMsgSuc: string,
    //     toastMsgFail: string,
    //     optional: ()=> void) => {
    //     try {
    //         await fetch(`${host}/${end_point}`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(obj)
    //         }).then( async res => {
    //             if (res.ok || res.status === 302) {
    //                 toast.success(toastMsgSuc);
    //                 if (optional) {
    //                     optional();
    //                 }
    //                 const contentType = res.headers.get("content-type");
    //                 if (contentType && contentType.includes("application/json")) {
    //                     const text = await res.text();
    //                     return text ? JSON.parse(text) : res.status;
    //                 } else {
    //                     return res.status;
    //                 }

    //             } else {
    //                 toast.error(toastMsgFail);
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Try again later")
    //     }
    // }
    const handleGetMethodWithParam =
        async (endPoint: string, email: string, msgFaild: string) => {
            try {
                return fetch(`${host}/${endPoint}?email=${email}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        sessionStorage.removeItem("code");
                        sessionStorage.setItem("code", data.code);
                        return data;
                    } else if (res.status === null) {
                        toast.error(`${msgFaild}`)
                    } else {
                        toast.error(`${msgFaild}`);
                    }
                })
            } catch (error) {
                toast.error("Try again later")
            }
        }
    return (
        <TogoContext.Provider
            value={{
                handlePostMethod, endpoints,
                setEndPoints, regex, handleRegEx,
                handleGetMethodWithParam
            }}>
            {children}
        </TogoContext.Provider>
    );
};

export default ContextState
