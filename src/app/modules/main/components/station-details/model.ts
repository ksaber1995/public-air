export const StationContent = {
    1: {
        description: 'جودة الهواء جيدة جدًا، ولا يشكل تلوث الهواء خطرًا على الأفراد',
        instructions: [
            { icon: 'assets/icons/good/1.svg', content: 'افتح النوافذ الخاصة بك لجلب الهواء النقي والنظيف إلى الداخل' },
            { icon: 'assets/icons/good/2.svg', content: 'استمتع بالأنشطة الخارجية' },

        ]
    },

    2: {
        description: 'جودة الهواء جيدة للأفراد',
        instructions: [
            { icon: 'assets/icons/moderate/1.svg', content: 'مرضى الربو: اتبع التوصيات الطبية' },
            { icon: 'assets/icons/moderate/2.svg', content: 'يمكن أن يعاني الأفراد الحساسين جدًا من علامات السعال وضيق التنفس أو التعب غير المعتاد' },
            { icon: 'assets/icons/moderate/3.svg', content: 'استمتع بالأنشطة الخارجية' },
            { icon: 'assets/icons/moderate/4.svg', content: 'افتح النوافذ الخاصة بك لجلب الهواء النقي والنظيف إلى الداخل' },
        ]
    },

    3: {
        description: 'قد تعاني الفئات الحساسة من تأثيرات صحية',
        instructions: [
            { icon: 'assets/icons/satisfactory/1.svg', content: 'مرضى الربو: اتبع التوصيات الطبية' },
            { icon: 'assets/icons/satisfactory/2.svg', content: 'يمكن أن يعاني الأفراد الحساسين جدًا من علامات السعال وضيق التنفس أو التعب غير المعتاد' },
            { icon: 'assets/icons/satisfactory/3.svg', content: 'يجب على الفئات الحساسة الحد من الأنشطة المطولة أو المكثفة الخارجية' },
            { icon: 'assets/icons/satisfactory/4.svg', content: 'اغلق النوافذ لتجنب الهواء الخارجي الملوث' },
        ]
    },

    4: {
        description: 'غير صحية - تأثيرات صحية للجميع',
        instructions: [
            { icon: 'assets/icons/unhealthy/1.svg', content: 'ارتد القناع الطبي بالخارج' },
            { icon: 'assets/icons/unhealthy/2.svg', content: 'يمكن أن يعاني الأفراد الحساسين جدًا من علامات السعال وضيق التنفس أو التعب غير المعتاد' },
            { icon: 'assets/icons/unhealthy/3.svg', content: 'تجنب الأنشطة الخارجية' },
            { icon: 'assets/icons/unhealthy/4.svg', content: 'اغلق النوافذ لتجنب الهواء الخارجي الملوث' },
        ]
    },

    5: {
        description: 'غير صحية - تأثيرات صحية خطيرة للجميع',

        instructions: [
            { icon: 'assets/icons/very-unhealthy/1.svg', content: 'ارتد القناع الطبي بالخارج' },
            { icon: 'assets/icons/very-unhealthy/2.svg', content: 'قم بتشغيل جهاز تنقية الهواء' },
            { icon: 'assets/icons/very-unhealthy/3.svg', content: 'تجنب الأنشطة الخارجية' },
            { icon: 'assets/icons/very-unhealthy/4.svg', content: 'اغلق النوافذ لتجنب الهواء الخارجي الملوث' },
        ]
    },

    6: {
        description: 'ظروف صحية خطيرة للجميع مع احتمال وجود غازات سامة',

        instructions: [
            { icon: 'assets/icons/hazardous/1.svg', content: 'ارتد القناع الطبي بالخارج' },
            { icon: 'assets/icons/hazardous/2.svg', content: 'قم بتشغيل جهاز تنقية الهواء' },
            { icon: 'assets/icons/hazardous/3.svg', content: 'تجنب الأنشطة الخارجية' },
            { icon: 'assets/icons/hazardous/4.svg', content: 'اغلق النوافذ لتجنب الهواء الخارجي الملوث' },

        ]
    },

}

export const lightColors = [
    '#D1D1D1',
    '#DBFFDB',
    '#FFF7C4',
    '#FFF6F1',
    '#FFEEED',
    '#FDEBFF',
    '#FFE8EF'
]