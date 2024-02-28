import SimpleButton from "@/Components/Button/SimpleButton"
import Image from "next/image"

const WelcomeScreen = () => {
    return (
        <div className="text-center">
            <h5 className="text-indigo-700 text-3xl font-bold mt-10">
                Ramadhan Projects
            </h5>
            <p className="text-indigo-500 text-xl mt-2">
                Learn Quran and Recite once everyday
            </p>

            <div className="relative mt-5">
                <Image src={"/img/loading.png"} width={330} height={60} alt="ramadhan" 
                className="mx-auto" />

                {/* jika ada kebutuhan buat pindah halaman bisa tambahin attr link di simple button 
                dengan syarat tidak boleh typenya submit */}
                {/* contoh : */}
                {/* <SimpleButton type="button"  link="/home"></SimpleButton>  */}
                <SimpleButton type="button" link={"/Home"} rounded="rounded-full" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                    bg-yellow-700 text-white w-60 px-5 py-3 cursor-pointer">
                    Get Started
                </SimpleButton>
            </div>

        </div>
    )
}

export default WelcomeScreen