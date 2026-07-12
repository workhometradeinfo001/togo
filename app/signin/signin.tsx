import React from 'react'
import { Link } from 'react-router'
import Button from '~/raw-components/button'
import Input from '~/raw-components/input'
import Label from '~/raw-components/label'
import Paragraph from "~/raw-components/paragraph"

const Signin = (props: any) => {
    const { classNameTopDiv } = props;
    return (
        <div className={classNameTopDiv}>
            <form>
                <div className="mb-3">
                    <Label htmlForTag="exampleEmail" className="form-label" text="Email Address" />
                    <Input id="exampleEmail" className="form-control"
                        placeHolder="name@example.com" type="email" />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <Label htmlForTag="examplePassword" className="form-label" text="Password" />
                    <Input id="examplePassword" className="form-control"
                        placeHolder="********" type="password" />
                </div>

                <div className="mb-3 form-check">
                    <Input id="exampleCheck" className="form-check-input"
                        placeHolder="********" type="checkbox" />
                    <Label htmlForTag="exampleCheck" className="form-check-label"
                        text="Logout after 1 weak" />
                </div>
                <Button type="submit" className="btn btn-primary w-100" text="Login" />
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
