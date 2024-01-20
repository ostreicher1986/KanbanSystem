import React, { useEffect, useState } from 'react'
import { useEntityConfig } from '../../../contexts/EntityConfig';
import { Label as LabelStyle} from '../../../layout/styles/viewData';
import AttributeDescription from '../attributedescription';

type proTypes = {
    name: string
}

const Label: React.FC<proTypes> = props => {

    const { entityConfig } = useEntityConfig();
    const [ inputConfig, setInputConfig ] = useState<any>(null);

    useEffect(() => {
        let config = entityConfig?.config?.find((item: any) => item.field.toLowerCase() === props.name.toLowerCase())
        if (config)
            setInputConfig(config);
    },[entityConfig, props.name]);

    return (
        <>
            <LabelStyle>{props.children}</LabelStyle>
            { inputConfig?.tooltipEnabled && <AttributeDescription text={inputConfig?.tooltipDesc} /> }
        </>
        
    )

}

export default Label;