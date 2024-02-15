import { VariablesCodes } from "../../../shared/models/variables"

export const ControllerItems: ControllerItem[] = [
    {
        id: VariablesCodes.AQI,
        title: 'AQI',
        label: 'مؤشر جودة الهواء',
    },

    {
        id: VariablesCodes.PM10,
        title: 'PM₁₀',
        label: 'الجسيمات الدقيقة',
    },

    {
        id: VariablesCodes.PM25,
        title: 'PM₂.₅',
        label: 'الجسيمات الأدق'

    },

    {
        id: VariablesCodes.TEMP,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/temp.svg',
        activeIcon: 'assets/icons/home/active/temp.svg',
        label: 'درجة الحرارة'

    },

    {
        id: VariablesCodes.WIND,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/wind.svg',
        activeIcon: 'assets/icons/home/active/wind.svg',
        label: 'الرياح'

    },

    {
        id: VariablesCodes.HUM,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/humidity.svg',
        activeIcon: 'assets/icons/home/active/humidity.svg',
        label: 'الرطوبة النسبية'

    },

]

export interface ControllerItem {
    id: VariablesCodes
    title?: string
    icon?: boolean
    inactiveIcon?: string
    activeIcon?: string
    label: string
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