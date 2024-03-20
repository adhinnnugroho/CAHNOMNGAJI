import { useState, useEffect, useRef } from 'react';

const MonthSlider = () => {
    const [currentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState<{ date: Date; dayName: string; }[]>([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const getDaysInMonth = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const days = [];

            for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
                const date = new Date(year, month, day);
                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                days.push({ date, dayName });
            }

            setDaysInMonth(days);
        };

        getDaysInMonth();
    }, [currentDate]);



    return (
        <div
            ref={containerRef}
            style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}
        >
            {daysInMonth.map((day, index) => (
                <div key={index} className='text-center' style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <p>{day.dayName}</p>
                    <p>{day.date.toDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default MonthSlider;
