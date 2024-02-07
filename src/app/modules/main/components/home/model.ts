
export const ControllerItems: ControllerItem[] = [
    {
        id: 1,
        title: 'AQI',
        label: 'مؤشر جودة الهواء',
    },

    {
        id: 2,
        title: 'PM₁₀',
        label: 'الجسيمات الدقيقة',
    },

    {
        id: 3,
        title: 'PM₂.₅',
        label: 'الجسيمات الأدق'

    },

    {
        id: 4,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/temp.svg',
        activeIcon: 'assets/icons/home/active/temp.svg',
        label: 'درجة الحرارة'

    },

    {
        id: 5,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/wind.svg',
        activeIcon: 'assets/icons/home/active/wind.svg',
        label: 'الرياح'

    },

    {
        id: 6,
        icon: true,
        inactiveIcon: 'assets/icons/home/inactive/humidity.svg',
        activeIcon: 'assets/icons/home/active/humidity.svg',
        label: 'الرطوبة النسبية'

    },

]

export interface ControllerItem {
    id: number
    title?: string
    icon?: boolean
    inactiveIcon?: string
    activeIcon?: string
    label: string
}

export const MapClasses = [
    'na',
    'good-station',
    'moderate-station',
    'satisfactory-station',
    'unhealthy-station',
    'veryunhealthy-station',
    'hazardous-station',
]