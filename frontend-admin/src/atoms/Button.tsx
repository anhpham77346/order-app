import { ReactNode } from "react"

interface ButtonProps {
    onClick?: Function,
    className?: string,
    typeBtn: 'primary',
    type: 'submit' | 'button',
    children?: ReactNode
}

function Button(props: ButtonProps) {
    return <>
        {
            props.typeBtn === 'primary' && (
                <button onClick={() => props.onClick && props.onClick()} type={props.type}
                    className={`${props.className ?? ''} flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                    {props.children}
                </button>
            )
        }
    </>
}

export default Button