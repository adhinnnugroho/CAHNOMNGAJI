type PropsType = {
    'Jadwal': String,
    'title'?: String
}

const ScheduleCard = (props: PropsType) => {
    const { Jadwal, title } = props
    return (
        <div className="col-span-1 border-b pb-1 border-b-gray-500">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <div className="flex flex-wrap gap-3">
                        <div className="block">
                            <h5 className="text-xl font-bold">
                                { title }
                            </h5>
                            <div className="flex flex-wrap gap-2">
                                <i className='bx bx-time-five text-xl' ></i>
                                <p className="text-xl flex flex-wrap gap-3">
                                    { Jadwal }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleCard