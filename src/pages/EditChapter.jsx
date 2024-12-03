import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'

const EditChapter = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        mangaName: '',
        chapter: '',
        date: '',
        dataToEdit: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Navbar menuColor="#4338CA" />
            <div className="flex flex-col md:flex-row w-full h-[calc(100vh-80px)] mt-[200px] md:mt-[80px] bg-[#FAFCFC]">
                <div className="w-full md:w-1/2 h-full flex flex-col items-center px-4 md:px-0">
                    <h1 className="text-3xl md:text-4xl font-roboto font-normal mb-10 md:mb-20">Edit Chapter</h1>

                    <div className="w-full max-w-[280px] flex flex-col gap-7">
                        <input
                            type="text"
                            name="mangaName"
                            placeholder="name of the manga"
                            value={formData.mangaName}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none"
                        />

                        <select
                            name="chapter"
                            value={formData.chapter}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none"
                        >
                            <option value="">select chapter</option>
                        </select>

                        <select
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none"
                        >
                            <option value="">select data</option>
                        </select>
                    </div>

                    <input
                        type="text"
                        name="dataToEdit"
                        placeholder="data to edit"
                        value={formData.dataToEdit}
                        onChange={handleChange}
                        className="w-full max-w-[280px] mt-7 pb-1 border-b border-[#424242] text-[#9D9D9D] font-roboto text-base focus:outline-none"
                    />

                    <div className="flex flex-col gap-5 mt-10 w-full max-w-[280px]">
                        <button className="w-full h-[68px] bg-[#34D399] rounded-[50000px] text-white font-bold text-2xl">
                            Edit
                        </button>
                        <button className="w-full h-[68px] bg-[#FBDDDC] rounded-[50000px] text-[#EE8380] font-bold text-2xl">
                            Delete
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex w-1/2 h-full flex-col items-center mt-10 md:mt-0">
                    <p className="text-xl font-roboto mb-10">Chapter #1 - Discover the word</p>
                    <img
                        src="https://s3-alpha-sig.figma.com/img/c698/cc3f/21fb3f85f083e6806f525d147a260d5a?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TZlZIvHXfkR~DQBAYQmN4hGrrfNsNaOqUtlCkkaTgoRnG79-nmRcQ5SnWcA9XPwujPbmGyKxVb1wdzHSMF7GnFMv3I9xqg1adjIG8Nz7JNWEHeiXmITxL1OPjsiJfP3hQ6RUEF8EmuB9nMqEK4Tw8G79~p4NBuZ~uFNwJOws4gUfrDJODqCY26oRBkKOtSMjnn1ztpYY08wgkJeAQUDG~hht8pZTeB1-MssahEw2OvXOojM0X8yCDjmjSwWVfRXLWQy-sTnefTV0ba4bGWuQM4eFivT73hJZUda9jfF8RtuulN6UfIhCx-Sk036hHSKSw3DvKffg9tm2jWqQD9KAmg__"
                        alt="Chapter cover"
                        className="w-[564px] h-[450px] object-contain rounded-[5px] drop-shadow-[7px_4px_4px_rgba(0,0,0,0.05)]"
                    />
                </div>
            </div>
        </>
    )
}

export default EditChapter