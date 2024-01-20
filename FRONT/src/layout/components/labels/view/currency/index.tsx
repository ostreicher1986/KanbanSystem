import React from "react";

interface IProps {
  price: number;
  locale?: string,
  currency?: string
}

const CurrencyFormat: React.FC<IProps> = ({ price, currency, locale}) => {
    
    const DEFAULT_CURRENCY = process.env.REACT_APP_DEFAULT_CURRENCY;
    const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE;

    currency = currency || DEFAULT_CURRENCY;
    locale = locale || DEFAULT_LOCALE;

    return (
      <>
      {Intl.NumberFormat(locale, {
        style: 'currency', 
        currency: currency
        }).format(price ? price : 0)}
      </>
    );
    
}

export default CurrencyFormat;