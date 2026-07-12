import React from 'react'

const Button = (props: any) => {
    const { className,
        type, text } = props;
    return (
        <div>
            <button
                className={className}
                type={type}>
                {text}
            </button>
        </div>
    )
}

export default Button
