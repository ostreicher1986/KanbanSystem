import React, { useState, useEffect } from 'react'
import { InputTextarea as InputTextareaPrimeReact } from 'primereact/inputtextarea';
import FeedbackMessageInput from '../../feedbackMessageInputs';
import { useEntityConfig } from '../../../../contexts/EntityConfig';
import AttributeDescription from '../../attributedescription';

type proTypes = {
    id?: string | undefined
    name: string
    value: string
    rows?: number
    onChange: (event: any) => void
    label?: string | undefined
    showIsRequired?: boolean | undefined
}

const InputTextarea: React.FC<proTypes> = props => {

    const { entityConfig } = useEntityConfig();
    const [ inputConfig, setInputConfig ] = useState<any>(null);

    useEffect(() => {
        let config = entityConfig?.config?.find((item: any) => item.field.toLowerCase() === props.name.toLowerCase())
        if (config)
            setInputConfig(config);
    },[entityConfig, props.name]);

    return (
        <div>
            <label htmlFor={props.id}><b>{props.label} {inputConfig?.["required"] && " *"} </b></label>
            { inputConfig?.tooltipEnabled && <AttributeDescription text={inputConfig?.tooltipDesc} /> }
            <InputTextareaPrimeReact
                id={props.id}
                name={props.name}
                value={props.value || ""}
                rows={props.rows}
                onChange={(e: any) => props.onChange(e)}
            />
            { props.showIsRequired && <FeedbackMessageInput message={"Campo obrigatório"} type="error" /> }
        </div>
        
    )

}

export default InputTextarea;