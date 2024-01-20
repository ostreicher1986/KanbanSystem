import React from 'react';

const getIcon = (icon: string = "", size: string = "", color: string = "") => {

    const props = { size, color };

    let LibName = icon.substring(0,2).toLowerCase();
    let Lib = null;
    let Icon = null;

    switch(LibName) {
        case 'ai':
            Lib = require(`react-icons/ai`);
            Icon = Lib[icon];
            break;
        case 'bs':
            Lib = require(`react-icons/bs`);
            Icon = Lib[icon];
            break;
        case 'bi':
            Lib = require(`react-icons/bi`);
            Icon = Lib[icon];
            break;
        case 'di':
            Lib = require(`react-icons/di`);
            Icon = Lib[icon];
            break;
        case 'fi':
            Lib = require(`react-icons/fi`);
            Icon = Lib[icon];
            break;
        case 'fc':
            Lib = require(`react-icons/fc`);
            Icon = Lib[icon];
            break;
        case 'fa':
            Lib = require(`react-icons/fa`);
            Icon = Lib[icon];
            break;
        case 'gi':
            Lib = require(`react-icons/gi`);
            Icon = Lib[icon];
            break;
        case 'go':
            Lib = require(`react-icons/go`);
            Icon = Lib[icon];
            break;
        case 'gr':
            Lib = require(`react-icons/gr`);
            Icon = Lib[icon];
            break;
        case 'hi':
            Lib = require(`react-icons/hi`);
            Icon = Lib[icon];
            break;
        case 'im':
            Lib = require(`react-icons/im`);
            Icon = Lib[icon];
            break;
        case 'io':
            Lib = require(`react-icons/io`);
            Icon = Lib[icon];
            break;
        case 'md':
            Lib = require(`react-icons/md`);
            Icon = Lib[icon];
            break;
        case 'ri':
            Lib = require(`react-icons/ri`);
            Icon = Lib[icon];
            break;
        case 'si':
            Lib = require(`react-icons/si`);
            Icon = Lib[icon];
            break;
        case 'ti':
            Lib = require(`react-icons/ti`);
            Icon = Lib[icon];
            break;
        case 'wi':
            Lib = require(`react-icons/wi`);
            Icon = Lib[icon];
            break;
        case 'cg':
            Lib = require(`react-icons/cg`);
            Icon = Lib[icon];
            break;
        default:
            const Fa = require('react-icons/fa');
            Icon = Fa['FaQuestion'];
            break;
    }

    if (!Icon) {
        const FaDefault = require('react-icons/fa');
        return <FaDefault.FaQuestion { ...props }/>;
    }

    return <Icon { ...props } />;

}

export default getIcon;