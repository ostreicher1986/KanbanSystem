const uniqueAnArrayOfObjects = (data: any, key: string) => {

    var resArr: any = [];

    data.filter((item: any) => {
        let i = resArr.findIndex((x: any) => x[key] === item[key]);
        if(i <= -1){
            resArr.push({...item});
        }
        return null;
    });
    
    return resArr;

}

export default uniqueAnArrayOfObjects;