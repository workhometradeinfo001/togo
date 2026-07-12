import React from 'react'

const Input = (props: any) => {
    const {
        placeHolder, id,
        type, className
    } = props;
    return (
        <div>
            <input type={type}
                className={className}
                id={id} placeholder={placeHolder} />
        </div>
    )
}

export default Input
