function getECGData(){

}


function getECGDataJS(count){
    data  = []
    for (let index = 0; index < count; index++) {
        const point  = createDummyDataPoint(index);
        data.push(point)
    }
    return data
}

function createDummyDataPoint(offset){
    timestamp = Date.now() + 100*offset;
    frameType = 1;
    value  = Math.random()*1000

    return([timestamp,value])

}