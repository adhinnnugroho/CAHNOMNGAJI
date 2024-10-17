const SurahDetailsCard = ({ teksArab, teksLatin, surah, index, playingIndex, handleAudioPlayback, audio }: any) => {
    return (
        <div className="block">
            <div className="text-2xl mb-6 bg-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="text-white text-xl bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center">
                            {surah.nomorAyat}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-right text-purple-600">
                            <div className="flex flex-wrap ">
                                <audio id={`audio-${index}`} src={audio} controls className='hidden'>
                                    <track kind="captions" srcLang="en" src="path/to/captions.vtt" default />
                                </audio>
                                {playingIndex === index ? (
                                    <button className='bx bx-pause text-4xl' onClick={() => handleAudioPlayback(index)}></button>
                                ) : (
                                    <button className='bx bx-play text-4xl' onClick={() => handleAudioPlayback(index)}></button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-2xl ml-5">
                <div className="block">
                    <div className={`text-right text-arabic ${playingIndex === index ? 'animate-pulse text-purple-500' : ''}`}>
                        {teksArab}
                    </div>
                    <div className="mt-5">
                        {teksLatin}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SurahDetailsCard