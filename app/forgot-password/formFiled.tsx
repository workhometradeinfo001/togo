import { useContext, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import TogoContext from '~/context-materials/togoContext'
import Button from '~/raw-components/button'
import Input from '~/raw-components/input'
import Label from '~/raw-components/label'

interface FieldsConfig {
    id: number,
    label: string,
    type: string,
    placeHolder: string,
    value: string | number
}
interface DynamicCofig {
    fields: FieldsConfig[],
    onChange: (id: number, value: string) => void,
    btnText: string,
    formClassName: string,
    email: string
}

const FormFiled = ({
    fields, onChange, btnText, formClassName,
    email
}: DynamicCofig) => {
    const { handlePostMethod } = useContext(TogoContext);
    const navigator = useNavigate();
    const postObj = {
        email: email,
        password: fields.at(1)?.value
    }
    const handleBtnOnClick = async (e: Event) => {
        e.preventDefault();
        const data = await handlePostMethod(
            postObj,
            e, "forgotPass/update_pass",
            "Successfully Changed",
            "Try later"
        );
        console.log(data);
        if(data === 202){
            navigator("/");
        }
        if(data === 406){
            toast.error("Try different password")
        }
    }
    return (
        <form className={formClassName}>
            {/* Email Input */}
            {
                fields.map((field) => (
                    <div key={field.id} className="mb-4">
                        <Label
                            htmlForTag={field.id}
                            className="form-label fw-semibold small text-secondary"
                            text={field.label}
                        />
                        <Input
                            id={field.id}
                            type={field.type}
                            placeHolder={field.placeHolder}
                            className="form-control form-control-lg fs-6"
                            value={field.value}
                            onChange={
                                (e: ChangeEvent<HTMLInputElement>) =>
                                    onChange(field.id, e.target.value)
                            }
                        />
                    </div>
                ))
            }
            {/* Submit Button */}
            <Button
                type="submit"
                className="btn btn-primary btn-lg w-100 fs-6 fw-medium py-2 shadow-sm mb-3"
                onclickBtn={handleBtnOnClick}
                text={btnText}
            />
        </form>
    )
}

export default FormFiled
