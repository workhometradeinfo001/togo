import React from 'react'

interface HeaderSectionProps {
    h2Text: string,
    pText: string
}

const HeaderSection = ({
    h2Text, pText
}: HeaderSectionProps) => {

    return (
        <div className={`text-center mb-4 `}>
            <h2 className="fw-bold text-dark fs-3 fs-sm-2 mb-2">
                {h2Text}
            </h2>
            <p className="text-muted fs-6 fs-sm-6 px-1">
                {pText}
            </p>
        </div>
    )
}

export default HeaderSection
