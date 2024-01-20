import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getIcon from '../../../../utils/getIcon';

type proTypes = {
    id?: string | undefined
    symbol: string    
    color?: string | undefined
    text?: string | undefined
    iconPosition?: string | undefined
    iconCheck?: boolean | undefined
    iconSymbol?: string | undefined
}

const LinkOrigin: React.FC<proTypes> = props => {

    const _color = props.color;    

    let _url = '';
    
    switch(props.symbol) {
        case 'ROUTER':                  _url = '/router/view/';                 break;
        case 'GROUP':                   _url = '/group/view/';                  break;
        case 'USER':                    _url = '/user/view/';                   break;
        case 'COMPANY':                 _url = '/company/view/';                break;
        case 'INDIVIDUALPARTNER':       _url = '/individualpartner/view/';      break;
        case 'LEGALENTITYPARTNER':      _url = '/legalentitypartner/view/';     break;
        case 'INTERNALBANKACCOUNT':     _url = '/internalbankaccount/view/';    break;
        case 'EXTERNALBANKACCOUNT':     _url = '/externalbankaccount/view/';    break;
        case 'BANK':                    _url = '/bank/view/';                   break;
        case 'BANKACCOUNTTRANSACTION':  _url = '/bankaccounttransaction/view/'; break;
        case 'BUSINESSUNIT':            _url = '/businessunit/view/';           break;
        case 'COLLABORATOR':            _url = '/collaborator/view/';           break;
        case 'FEETABLE':                _url = '/feetable/view/';               break;
        case 'FINANCIALINSTITUTION':    _url = '/financialinstitution/view/';   break;
        case 'BANKER':                  _url = '/banker/view/';                 break;
        case 'FUNDING':                 _url = '/funding/view/';                break;
        case 'INSURER':                 _url = '/insurer/view/';                break;
        case 'PRIVATECONSIGNED':        _url = '/privateconsigned/view/';       break;
    }

    _url += props.id;

    const _icon = props.iconSymbol === undefined ? 'FiMousePointer' : props.iconSymbol;

    const _position = props.iconPosition === undefined ? 'left' : props.iconPosition;

    return (
        <>
            { props.iconCheck && _position === 'left' && <span>{getIcon(_icon)}</span> }
            <Link style={{ color: _color }} to={_url}>{props.text}</Link>
            { props.iconCheck && _position === 'right' && <span>{getIcon(_icon)}</span> }
        </>        
    )

}

export default LinkOrigin;