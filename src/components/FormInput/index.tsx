import { ComponentProps } from "react"
import { InputText } from "../TextInput"

interface FormInputProps extends ComponentProps<'input'> {
    $labelName: string
    id: string
    $isRequired?: boolean

}

export const FormInput = ({ $labelName, id, $isRequired = false, ...rest }: FormInputProps) => {
    return (<div>
        <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-200 mb-2"
        >
            {$isRequired?"* ":""}{$labelName}
        </label>
        <InputText
            id={id}
            required={$isRequired}
            className="mt-1 bg-black/20 text-white border-purple-500/30 placeholder:text-gray-400"
            {...rest}
        />
    </div>)
}