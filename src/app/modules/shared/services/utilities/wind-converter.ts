export const WindConverter = (value: number) : string =>{
    if(value === 0) return 'N';
    if(value > 0 && value <= 22.5) return 'NNE';
    if(value > 22.5 && value <= 45) return 'NE';
    if(value > 45 && value <= 67.5) return 'ENE';
    if(value > 67.5 && value <= 90) return 'E';
    if(value > 90 && value <= 112.5) return 'ESE';
    if(value > 112.5 && value <= 135) return 'SE';
    if(value > 135 && value <= 157.5) return 'SSE';
    if(value > 157.5 && value <= 180) return 'S';
    if(value > 180 && value <= 202.5) return 'SSW';
    if(value > 202.5 && value <= 225) return 'SW';
    if(value > 225 && value <= 247.5) return 'WSW';
    if(value > 247.5 && value <= 270) return 'W';
    if(value > 270 && value <= 292.5) return 'WNW';
    if(value > 292.5 && value <= 315) return 'NW';
    if(value > 315 && value <= 337.5) return 'NNW';
    if(value > 337.5 && value <= 360) return 'N';

    return 'NA'
}