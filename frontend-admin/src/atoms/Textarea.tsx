import { ChangeEvent } from "react";

interface InputProps {
    onChange?: Function,
    placeholder?: string,
    value?: string,
    required?: boolean,
    className?: string
}

function Textarea(props: InputProps) {
    return <textarea
        className={`${props.className ?? ''} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        placeholder={props.placeholder} value={props.value}
        required={props.required ?? false}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => props.onChange && props.onChange(event)} ></textarea>
}

export default Textarea;