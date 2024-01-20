export const validRequiredInputs = async (stateInputs: any, entityConfig: any) => {

    const checkIsEmpty = (value: any, type: string) => {

        const validators: any = {
            'STRING_LIKE': () => {
                return value ? false : true;
            },
            'STRING': () => {
                return value ? false : true;
            },
            'DATETIME_RANGE': () => {
                return value ? false : true;
            },
            'DATETIME': () => {
                return value ? false : true;
            },
            'DATE_DAY': () => {
                return value ? false : true;
            },
            'BOOLEAN': () => {
                return typeof value === "boolean" ? false : true;
            },
            'DOUBLE': () => {
                return value ? false : true;
            },
            'MONEY': () => {
                return value ? false : true;
            },
            'INT': () => {
                return value ? false : true;
            },
            'ID': () => {
                //return (value !== null || value !== undefined) ? false : true;
                return value ? false : true;
            }
        }

        return validators[type] ? validators[type]() : false

    }

    if (!entityConfig?.config) {

        return {total: 0, inputs: {}};

    } else {

        const requiredInputs = await entityConfig?.config?.reduce((accum: any, item: any) => {

            if (item.required) {
                let property = Object.keys(stateInputs).find(obj => obj.toLowerCase() === item.field.toLowerCase())
                if (property) {
                    let valid = checkIsEmpty(stateInputs[property], item.dataTypeSymbol);
                    if (valid)
                        accum.total += 1;
                    accum.inputs[property] = valid;
                }
            }
    
            return accum;
    
        },{total: 0, inputs: {}})

        return requiredInputs;
        
    }

};

export const defaultValueTypes = [
    {value: 1, name: "string"   , label: "String"   , symbol: " "   },
    {value: 2, name: "number"   , label: "Número"   , symbol: 0     },
    {value: 3, name: "array"    , label: "Array"    , symbol: []    },
    {value: 4, name: "null"     , label: "Nulo"     , symbol: null  },
    {value: 5, name: "boolean"  , label: "Boolean"  , symbol: true  },
]