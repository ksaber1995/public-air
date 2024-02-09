interface ReadingStatus {
    sequence: number;
}

interface Reading {
    aggregated_at: string;
    value?: any

    
}

interface Variable {
    code: string;
    abbreviation_en: string;
    name_en: string | null;
    name_ar: string | null;
}

interface Unit {
    abbreviation_en: string
    name_ar: string
    name_en: string
}

interface AqiData {
    aggregated_at: string;
    color: string,
    sequence: number,
    status_ar: string,
    status_en: string
    variable: {
        abbreviation_en: string,
        code: string
    }
}

interface Aqi {
    variable: Variable;
    unit: Unit;
    readings: Reading[];
}

interface WeatherData {




    variable: Variable;
    unit: Unit;
    readings: Reading[];
}

export interface Station {
    id: number;
    name_en: string;
    name_ar: string | null;
    aqi: AqiData[];
    variables: Aqi[];
    weather: WeatherData[];
    latitude: number;
    longitude: number;
}

export interface ExtendedStation extends Station {
    brief: {
        [id: number]: {
            color: string,
            sequence?: number,
            label?: string,
            isDegree?: boolean
            class?: string,
            iconPath?: string
        }
    },


}



