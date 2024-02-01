export const ControllerItems : ControllerItem[] = [
    {
        id: 1,
        title: 'AQI',
        icon: '',
        label: 'مؤشر جودة الهواء',
    },
    
    {
        id: 2,
        title: 'PM2.5',
        icon: '',
        label: 'الجسيمات الدقيقة',
    },

    {
        id: 3,
        title: 'Mini',
        icon: '',
        label: 'الجسيمات الأدق'
        
    },
    
    {
        id: 4,
        title: 'Temp',
        icon: '',
        label: 'درجة الحرارة'
        
    },

    {
        id: 5,
        title: 'Wind',
        icon: '',
        label: 'الرياح'
        
    },

    {
        id: 6,
        title: 'hum',
        icon: '',
        label: 'الرطوبة النسبية'
        
    },
    
]

export interface ControllerItem {
    id: number
    title?: string
    icon?: string
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