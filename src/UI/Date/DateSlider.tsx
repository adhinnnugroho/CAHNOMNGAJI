import { useState, useEffect } from 'react';


type TypeProps = {
    'cityId': Number,
    'year': Number,
    'month': Number
}

const MonthSlider = (prop: TypeProps) => {
    const { cityId, year, month } = prop
    const [currentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState<{ date: Date; dayName: string; isToday: boolean }[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        const getDaysInMonth = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const today = new Date();
            const days = [];

            for (let day = 1; day <= 7; day++) {
                const date = new Date(year, month, today.getDate() + day - today.getDay());
                const dayName = getDayName(date.getDay());
                const isToday = date.toDateString() === today.toDateString();
                days.push({ date, dayName, isToday });
            }

            setDaysInMonth(days);

        };

        const getDayName = (dayIndex: number) => {
            const daysOfWeek = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            return daysOfWeek[dayIndex];
        };

        getDaysInMonth();
    }, [currentDate]);

    const changeSchedule = async (date: Date) => {
        setSelectedDate(date);
        setDaysInMonth(prev => prev.map(day => ({ ...day, isToday: day.date.toDateString() === date.toDateString() })));
    };


    
    return (
        <div className='overflow-x-auto scrollbar-hidden mt-10 ml-1'>
            <div className='flex space-x-4'>
                {daysInMonth.map((day, index) => (
                    <div key={index} className={`border rounded-lg cursor-pointer ${day.isToday
                        ? 'bg-green-600 border-green-600' 
                        : 'border-gray-500'} 
                        
                        ${selectedDate && day.date.toDateString() === selectedDate.toDateString() 
                        ? 'bg-green-600 border-green-600' : ''}`} onClick={() => changeSchedule(day.date)}>
                        <div className="text-center w-12 h-16 mt-3">
                            <p className='text-xl'>{day.dayName}</p>
                            <p className='text-xl'>{day.date.getDate()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthSlider;
