import React, { useEffect, useState } from 'react'
import { InputText as InputTextPrimeReact } from 'primereact/inputtext';
import FeedbackMessageInput from '../../feedbackMessageInputs';
import { useEntityConfig } from '../../../../contexts/EntityConfig';
import AttributeDescription from '../../attributedescription';

type proTypes = {
    id?: string | undefined
    name: string
    value: string | null
    type?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    label?: string | undefined
    showIsRequired?: boolean | undefined
    placeholder?: string
    tootip?: string
    disabled?: boolean
}

const InputText: React.FC<proTypes> = props => {

    const { entityConfig } = useEntityConfig();
    const [ inputConfig, setInputConfig ] = useState<any>(null);

    useEffect(() => {
        let config = entityConfig?.config?.find((item: any) => item.field.toLowerCase() === props.name.toLowerCase())
        if (config)
            setInputConfig(config);
    },[entityConfig, props.name]);

    return (
        <>
            <label htmlFor={props.id}><b>{props.label} {inputConfig?.["required"] && props.label && " *"} </b></label>
            { inputConfig?.tooltipEnabled && <AttributeDescription text={inputConfig?.tooltipDesc} /> }
            <InputTextPrimeReact
                id={props.id}
                name={props.name}
                value={props.value || ""}
                type={props.type}
                placeholder={props.placeholder}
                tooltip={props.tootip}
                tooltipOptions={{position:'top'}}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e)}
                disabled={props.disabled}
            />
            { props.showIsRequired && <FeedbackMessageInput message={"Campo obrigatório"} type="error" /> }
        </>
        
    )

}

export default InputText;