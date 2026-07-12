
import Signin from "~/signin/signin"
import Signup from "~/signup/signup"


const Welcome = () => {
  return (
    <div className='container d-flex align-items-center justify-content-end vh-100'>
      <Signin classNameTopDiv="me-3 p-mid-0 w-25" />
      <Signup
        classNameTopDiv="ps-2 p-mid-0 ms-3 border-start border-green w-50"
        formClassName="w-100"
      />
    </div>
  )
}

export default Welcome
