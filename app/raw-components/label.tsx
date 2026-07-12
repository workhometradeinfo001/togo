import React from 'react'

const Label = (props: any) => {
    const {
        htmlForTag, className,
        text
    } = props;
    return (
        <div>
            <label htmlFor={htmlForTag}
                className={className}>{text}</label>
        </div>
    )
}

export default Label
