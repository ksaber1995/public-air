import { VariablesCodes } from "../../../shared/models/variables"

export const ControllerItems: ControllerItem[] = [
    {
        id: VariablesCodes.AQI,
        title: 'AQI',
        label: 'مؤشر جودة الهواء',
        labelEn: 'Air Quality Index'
    },

    {
        id: VariablesCodes.PM10,
        title: 'PM₁₀',
        label: 'الدقائق العالقة',
        labelEn: 'PM₁₀'
    },

    {
        id: VariablesCodes.PM25,
        title: 'PM₂.₅',
        label: 'الدقائق العالقة',
        labelEn: 'PM₂.₅'

    },

    {
        id: VariablesCodes.TEMP,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/temp.svg',
        activeIcon: 'assets/icons/home/active/temp.svg',
        label: ' درجة الحرارة C°',
        labelEn: 'Temperature °C'

    },

    {
        id: VariablesCodes.WIND,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/wind.svg',
        activeIcon: 'assets/icons/home/active/wind.svg',
        label: 'الرياح',
        labelEn: 'Wind Direction'

    },

    {
        id: VariablesCodes.HUM,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/humidity.svg',
        activeIcon: 'assets/icons/home/active/humidity.svg',
        label: 'الرطوبة النسبية %',
        labelEn: 'Relative Humidity %'

    },

]

export interface ControllerItem {
    id: VariablesCodes
    title?: string
    icon?: boolean
    inactiveIcon?: string
    activeIcon?: string
    label: string,
    labelEn: string
}

export const MapClasses = [
    'na-station',
    'good-station',
    'moderate-station',
    'satisfactory-station',
    'unhealthy-station',
    'veryunhealthy-station',
    'hazardous-station',
]