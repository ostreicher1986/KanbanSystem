import { locale, addLocale } from 'primereact/api';

// Portuges - Brasil
addLocale('pt-br', {
    firstDayOfWeek: 1,
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: 'Hoje',
    clear: 'Limpar',    
    dateFormat: 'yy-mm-dd',    
    hourFormat: 'hh:MM:ss',
    dateYMDFormat: 'yyyy-MM-dd',    
    dateYMDHMSFormat: 'yyyy-MM-dd hh:MM:ss',    
    yearNavigatorRange:"1900:3000",
    weekHeader: 'Fds'
});

export const localePtBr = () => locale('pt-br');