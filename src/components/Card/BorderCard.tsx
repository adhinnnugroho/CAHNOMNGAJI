type PropsType = {
    'title'?: string,
    'className'?: string,
    'subtitle'?: string
}


const BorderCard = (prop: PropsType) => {
    return (
        <>
            <div className={`border border-gray-500 text-center rounded-lg ${prop.className}`}>
                <div className="block">
                    <h5 className="text-xl font-bold text-left">
                        {prop.title}
                    </h5>
                    <h6 className="text-xl font-semibold mt-5 text-left">
                        {prop.subtitle}
                    </h6>
                </div>
            </div>

        </>
    )
}

export default BorderCard