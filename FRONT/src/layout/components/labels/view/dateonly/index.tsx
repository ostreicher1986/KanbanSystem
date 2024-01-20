import React from "react";
import moment from 'moment';

interface IProps {
  date: Date;
  format?: string,
  defval?: string
}

const DateOnlyFormat: React.FC<IProps> = ({ date, format, defval}) => {
    
    const DEFAULT_FORMAT = process.env.REACT_APP_DEFAULT_DATE_ONLY_FMT;
    const DEFAULT_VALUE = process.env.REACT_APP_DEFAULT_DATE_ONLY_VAL;

    format = format || DEFAULT_FORMAT;
    defval = defval || DEFAULT_VALUE;

    let result = date ? moment(date).format(format) : defval;
    
    return (
      <>
        {result}
      </>
    );
    
}

export default DateOnlyFormat;