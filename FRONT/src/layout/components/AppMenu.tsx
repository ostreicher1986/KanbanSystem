import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMenu } from '../../contexts/Menu';
import getIcon from '../../utils/getIcon';

interface AppSubmenuProps {
    className?: string,
    items?: Array<any>,
    onMenuItemClick?: any, //React.MouseEvent<HTMLAnchorElement, MouseEvent>,//(event: React.MouseEvent<HTMLButtonElement>) => void,
    root?: boolean
}

const AppSubmenu: React.FC<AppSubmenuProps> = props => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [items, setitems] = useState<Array<object> | null>(null)

    const onMenuItemClick = useCallback((
        event: any, //React.MouseEvent<HTMLAnchorElement, MouseEvent>, //React.MouseEvent<HTMLButtonElement>,
        item: any,
        index: number
    ) => {
        //avoid processing disabled items
        if(item.disabled) {
            event.preventDefault();
            return true;
        }
                        
        //execute command
        if(item.command) {
            item.command({originalEvent: event, item: item});
        }

        if(index === activeIndex)
            setActiveIndex(null)
        else
            setActiveIndex(index)

        if(props.onMenuItemClick) {
            props.onMenuItemClick({
                originalEvent: event,
                item: item
            });
        }
    }, [activeIndex, props])

    const renderLinkContent = (item: any) => {
		let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
		let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;

		return (
			<React.Fragment>
                <span>{getIcon(item.icon)}</span>
				<span>{item.label}</span>
				{submenuIcon}
				{badge}
			</React.Fragment>
		);
    }

    const renderLink = useCallback((item: any, i: number) => {
        let content = renderLinkContent(item);
		if (item.to) {
			return (
				<NavLink activeClassName="active-route" to={item.to} onClick={(e) => onMenuItemClick(e, item, i)} exact target={item.target}>
                    {content}
                </NavLink>
			)
		} else {
			return (
				<a href={item.url} onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
					{content}
				</a>
			);

		}
    }, [onMenuItemClick])

    useEffect(() => {

        if ( props.items ) {

            let itemsMenu = props.items.reduce((accum, item, i) => {

                if (item.to !== "/profile") {

                    let active = activeIndex === i;
                    let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active && !item.to});
        
                    let component = (
                        <li className={styleClass} key={i}>
                            {item.items && props.root === true && <div className='arrow'></div>}
                            {renderLink(item, i)}
                            <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
                        </li>
                    );

                    if (item.to === "/") {
                        accum.home.push(component);
                    } else {
                        accum.items.push(component);
                    }
                }

                return accum;

            },{ items: [], home: [] });
    
            setitems([ ...itemsMenu.home, ...itemsMenu.items ]);

        } else {

            setitems(null)

        }

    }, [props, activeIndex, renderLink])
    
    return (
        <ul className={props.className}>{items}</ul>
    )
}

interface AppMenuProps {
    onMenuItemClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const AppMenu: React.FC<AppMenuProps> = props => {

    const {menu} = useMenu();

    return (
        <div className="layout-menu-container">
            <AppSubmenu
                items={menu}
                className="layout-menu"
                onMenuItemClick={props.onMenuItemClick}
                root={true}
            />
        </div>
    );
}

export default AppMenu;