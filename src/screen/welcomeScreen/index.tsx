
import Image from "next/image"
import ImageManagement from "@/public/ImageManagement"
import SimpleButton from "@/components/button/SimpleButton"

const WelcomeScreen = () => {
    return (
        <div className="text-center">
            <h5 className="text-indigo-700 text-3xl font-bold mt-10">
                CAHENOMNGAJI
            </h5>
            <p className="text-indigo-500 text-xl mt-2">
                Learn Quran and Recite once everyday
            </p>

            <div className="relative mt-5">
                <Image src={ImageManagement.loading} width={330} height={60} alt="ramadhan" className="mx-auto" />
                <SimpleButton type="button" link={"/home"} rounded="rounded-full"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2  bg-yellow-700 text-white w-60 px-5 py-3">
                    Get Started
                </SimpleButton>
            </div>
        </div>
    )
}

export default WelcomeScreen