import { ChangeEvent } from "react";

interface InputProps {
    onChange?: Function,
    type: 'text' | 'password' | 'email',
    placeholder?: string,
    value?: string,
    required?: boolean
}

function Input(props: InputProps) {
    return <input 
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type={props.type} placeholder={props.placeholder} value={props.value}
        required={props.required ?? false}
        onChange={(event: ChangeEvent<HTMLInputElement>) => props.onChange && props.onChange(event)} />
}

export default Input;