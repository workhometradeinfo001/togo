import React from 'react'

const Spinner = (props: any) => {
    const {
        className
    } = props;
    return (
        <div className={`spinner-border text-primary ${className}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>

    )
}

export default Spinner
