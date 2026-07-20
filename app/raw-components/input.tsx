import React from 'react'

const Input = (props: any) => {
    const {
        placeHolder, id,
        type, className,
        onChange, value
    } = props;
    return (
        <div>
            <input type={type}
                className={className}
                id={id} placeholder={placeHolder} 
                value={value}
                onChange={onChange}
                />
        </div>
    )
}

export default Input
