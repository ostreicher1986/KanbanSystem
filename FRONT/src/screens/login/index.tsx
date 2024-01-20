import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorageToken } from '../../contexts/LocalStorageToken';
import { useLocalStorageLogin } from '../../contexts/LocalStorageLogin';
import { auth } from '../../services/kanbansystemapi/login.service';
import { CardBackgroundColor, Container, HeightForm, InputGroupIconAlign, MarginBottomForm } from '../../layout/styles/login';
import { useMenu } from '../../contexts/Menu';
import { useLayoutColorMode } from '../../contexts/LayoutColorMode';
import { useLayoutMode } from '../../contexts/LayoutMode';
import { makeMenu } from '../../utils/makeMenu';

const Index: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonLabel, setButtonLabel] = useState('Entrar');
    const [activeSpinner, setActiveSpinner] = useState(false);
    const {setLocalStorageToken} = useLocalStorageToken();
    const {setLocalStorageLogin} = useLocalStorageLogin();

    const {setMenu} = useMenu();
    const {setLayoutMode} = useLayoutMode();
    const {setLayoutColorMode} = useLayoutColorMode();
    

    const history = useHistory();

    const actionLogin = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setButtonLabel('Entrando...');
        setActiveSpinner(true);

        const response = await auth(username, password);

        if ( !response.success ) {
            
            setButtonLabel('Entrar');
            setActiveSpinner(false);

        } else {
            
            const payload = response;

            if (payload.success){

                const roles = [{
                    ViewMenu: true,
                    Search: true
                }];

                await setMenu(makeMenu(roles));
                await setLayoutMode('static');
                await setLayoutColorMode('dark');

                setTimeout(async () => {
                    await setLocalStorageToken(payload.token);
                    await setLocalStorageLogin(username);
                    history.push("/");
                },100);

            }

        }

    }

    return (
        <Container>         

            <Card style={CardBackgroundColor}>
                
                <div className="layout-logo" style={{color: "#fff", fontWeight: "bold", fontSize: "xx-large"}}>
                    Login
                </div>

                <div className="card card-w-title" style={CardBackgroundColor}>

                    <div className="p-grid" style={MarginBottomForm}>
                        <div className="p-col-12">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon" style={InputGroupIconAlign}><i className="pi pi-user" /></span>
                                <InputText
                                    style={HeightForm}
                                    autoFocus
                                    placeholder="Usuário"
                                    name="username"
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                    disabled={activeSpinner}
                                />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={actionLogin}>
                        <div className="p-grid" style={MarginBottomForm}>
                            <div className="p-col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon" style={InputGroupIconAlign}><i className="pi pi-lock" /></span>
                                    <Password
                                        style={HeightForm}
                                        placeholder="Senha"
                                        feedback={false}
                                        name="password"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        disabled={activeSpinner}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-grid">
                            <div className="p-col-12">
                                <Button
                                    label={buttonLabel}
                                    className="p-button-success"
                                    style={{width: "100%", ...HeightForm}}
                                    icon={activeSpinner ? "pi pi-spin pi-spinner" : ""}
                                    iconPos="right"
                                    disabled={activeSpinner || !username || !password }
                                />
                            </div>
                        </div>
                    </form>
                    
                </div>

            </Card>

        </Container>
    )

}

export default Index;