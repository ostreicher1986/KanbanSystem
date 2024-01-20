import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import getIcon from '../../../utils/getIcon';

type propTypes = {
    text: string
}

const AttributeDescription: React.FC<propTypes> = props => {

    return (
        <span className={"custom-tooltip-btn"} style={{cursor:'help'}}>
            {getIcon('FaQuestion', '13px')}
            <Tooltip target=".custom-tooltip-btn" autoHide={false} style={{cursor:'help'}} content={props.text} />
        </span>
    )
}

export default AttributeDescription;