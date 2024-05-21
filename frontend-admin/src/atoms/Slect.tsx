import { ChangeEvent, ReactNode } from "react";

interface InputProps {
    onChange?: Function,
    className?: string,
    children?: ReactNode
}

function Select(props: InputProps) {
    return <select
        className={`${props.className ?? ''} p-2 focus-visible:outline-none block mt-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm`}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => props.onChange && props.onChange(event)} >{props.children}</select>
}

export default Select;