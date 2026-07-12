import React from 'react'
import Button from '~/raw-components/button';
import Input from '~/raw-components/input'
import Label from '~/raw-components/label'

const Signup = (props: any) => {
    const { classNameTopDiv, formClassName } = props;
    return (
        <div className={classNameTopDiv}>
            <h3 className='mb-4 text-decoration-underline'>Account Creation Form</h3>
            <form className={formClassName}>
                <div className='row w-100 align-items-center justify-content-between'>
                    <div className='mb-3 col'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="First Name" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="Given Name" type="email" />
                    </div>
                    <div className='mb-3 col'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="Last Name" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="Family Name" type="email" />
                    </div>
                </div>
                <div className='row w-100'>
                    <div className='mb-3'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="Email Address" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="name@example.com" type="email" />
                    </div>
                    <div className='mb-3'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="Password" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="********" type="email" />
                    </div>
                    <div className='mb-3'>
                        <Label htmlForTag="exampleEmail" className="form-label" text="Confirm Password" />
                        <Input id="exampleEmail" className="form-control"
                            placeHolder="********" type="email" />
                    </div>
                    <Button
                        className="btn btn-success w-100"
                        type="submit" text="Signup" />
                </div>
            </form>
        </div>
    )
}

export default Signup
