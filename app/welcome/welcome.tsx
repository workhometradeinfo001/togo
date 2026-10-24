
import { useContext, useEffect, useState } from "react"
import Signin from "~/signin/signin"
import Signup from "~/signup/signup"
import Spinner from "~/raw-components/spinner"
import TogoContext from "~/context-materials/togoContext"

const Welcome = () => {
  const { } = useContext(TogoContext);
  const [mail, setMail] = useState<String | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const auth_host = import.meta.env.VITE_CLOUD_AUTH_HOST;
  const dashboard = import.meta.env.VITE_CLOUD_DASHBOARD;

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setMail(email);
    }
  }, []);
  useEffect(() => {
    setIsLoading(true);
    console.log("ooo" + mail)
    const verifyToken = async () => {
      const res = await fetch(`${auth_host}/gToken/verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email: mail })
      });
      console.log(res);
      if (res.status == 202) {
        setIsTokenValid(true);
        setIsLoading(false);
        console.log("middle");
      }
      setIsLoading(false);
      setIsTokenValid(false);
      console.log("last");
    }
    verifyToken();
  }, [mail]);
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      {isLoading === true && <Spinner />}
      {
        (isTokenValid === false) && <>
          <div className='container d-flex align-items-center justify-content-end vh-100'>
            <Signin classNameTopDiv="me-3 p-mid-0 w-25" />
            <Signup
              classNameTopDiv="ps-2 p-mid-0 ms-3 border-start border-green w-50"
              formClassName="w-100"
            />
          </div>
        </>
      }

    </div>
  )
}

export default Welcome
