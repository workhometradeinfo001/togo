

const Button = (props: any) => {
    const { className,
        type, text,
        onclickBtn
    } = props;
    return (
        <div>
            <button
                className={className}
                type={type}
                onClick={onclickBtn}
            >
                {text}
            </button>
        </div>
    )
}

export default Button
