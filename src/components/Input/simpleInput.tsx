type PropsType = {
    'name': string,
    'label'?: string,
    'placeholder'?: string
    'className'?: string,
    'type': string
}

const SimpleInput = (prop: PropsType) => {
    const { name, label, placeholder, className, type } = prop
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input id={name} type={type} name={name} placeholder={placeholder} className={`flex items-center w-full px-5 py-4 mr-2 text-sm 
            font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl ${className}`} />
        </>
    )
}

export default SimpleInput