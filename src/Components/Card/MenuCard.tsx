type PropsType = {
    'icons'?: string,
    'name'?: string
}

const MenuCard = (prop: PropsType) => {
    return (
        <div className="">
            <div className="border border-gray-500 text-center rounded-lg">
                <i className={`bx bxs-${prop.icons} block text-3xl`}></i>
            </div>
            <h5 className="text-center">
                {prop.name}
            </h5>
        </div>
    )
}

export default MenuCard;