import React from 'react'
import './EdithAuthor.css'


function EdithAuthor() {
    return (
        <>

            <section className="flex flex-col md:flex-row h-screen items-center">

                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

                    <div className="w-full">

                        <div className="bg-white p-10 w-[315px] mx-auto rounded-2xl">
                            <form action>

                                <div className="flex items-center mb-5">

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        className="font-roboto flex-1 py-2 border-b-2 border-gray-400 focus:border-[#424242] text-gray-600 placeholder-gray-400 outline-none" />
                                </div>

                                <div className="flex items-center mb-5 ">

                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="LastName"
                                        className="font-roboto flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                                </div>
                                <div className="flex items-center mb-5 ">

                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                        className="font-roboto flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                                </div>
                                <div className="flex items-center mb-5 ">

                                    <input
                                        type="date"
                                        id="birthdate"
                                        name="birthdate"
                                        placeholder="birthdate"
                                        className="font-roboto flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none appearance-none" />
                                </div>
                                <div className="flex items-center mb-5">

                                    <input
                                        type="text"
                                        id="URLProfileImage"
                                        name="URLProfileImage"
                                        placeholder="URL Profile Image"
                                        className="font-roboto flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                                </div>
                                <div>

                                    <button className="w-full font-roboto py-5 px-12 bg-[#34D399] text-white font-bold rounded-full mb-5">Save</button>

                                    <button className="w-full font-roboto py-5 px-12 bg-[#FBDDDC] text-[#EE8380] font-bold rounded-full">Delete Account</button>

                                </div>

                            </form>
                        </div>

                    </div>
                </div>

                <div className="bg-indigo-600 px-[30px] w-[379px] mr-[60px] ">
                    <div className='flex items-center justify-center px-[30px] '>
                        <img
                            src="https://s3-alpha-sig.figma.com/img/d771/e8ee/4d516f000e29670bda6ceb5a6c836183?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eLwYCN-8mR4Gid6w2ArEj9XNZ6~SkEYnz-44vxHXmD0sVFWCopHO-AS0ILvEg6QDmhi9~yFMorE8l2gN7Nx8FsQ85JGguAVYJCHccKR-68oAA6t5L53hh-Wqxax1fnNNBVk2SKmzbLcpMLdwDMmNgAUbtJQX~KrVRwpTjRa1YvTbsUx-MvzFXLLdhLBcaEcQjTuHnfG70gTotrQmr5TWRK1cjcFlRfjGeW44g4Q3mV01JXvsbLoGY8umEiX-5~MeEhA9CytZnDBnA5R~KvBsQKo8CbdRDlJQTJkwGFAWGwXkSeDWdFw9woVhKymqDQ3JRoe~aoSDkUuSOCjKiaJSyQ__"
                            alt=""
                            className="rounded-full w-[179px] h-[178px] " />
                    </div>

                    <h1 className='font-roboto flex items-center justify-center mt-[30px]'>Name lastName</h1>
                    <div className="font-roboto flex items-center justify-center">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7712 10.6046C10.2494 11.1263 9.25189 12.1239 8.41377 12.962C7.63273 13.743 6.36723 13.7431 5.58618 12.962C4.76379 12.1396 3.78304 11.1589 3.22872 10.6046C1.14593 8.52177 1.14593 5.14489 3.22872 3.0621C5.31152 0.979301 8.6884 0.979301 10.7712 3.0621C12.854 5.14489 12.854 8.52177 10.7712 10.6046Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.99996 6.83333C8.99996 7.9379 8.10453 8.83333 6.99996 8.83333C5.89539 8.83333 4.99996 7.9379 4.99996 6.83333C4.99996 5.72876 5.89539 4.83333 6.99996 4.83333C8.10453 4.83333 8.99996 5.72876 8.99996 6.83333Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="ml-1">
                            City</span>
                    </div>
                    <div className="font-roboto flex items-center justify-center">
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.75 12.1594C15.3578 12.1594 14.9656 12.2729 14.625 12.5C13.9438 12.9542 13.0562 12.9542 12.375 12.5C11.6938 12.0458 10.8062 12.0458 10.125 12.5C9.44375 12.9542 8.55625 12.9542 7.875 12.5C7.19375 12.0458 6.30625 12.0458 5.625 12.5C4.94375 12.9542 4.05625 12.9542 3.375 12.5C3.03438 12.2729 2.64219 12.1594 2.25 12.1594M6.75 5V6.5M9 5V6.5M11.25 5V6.5M6.75 2.75H6.7575M9 2.75H9.0075M11.25 2.75H11.2575M15.75 16.25V11C15.75 10.1716 15.0784 9.5 14.25 9.5H3.75C2.92157 9.5 2.25 10.1716 2.25 11V16.25H15.75ZM13.5 9.5V8C13.5 7.17157 12.8284 6.5 12 6.5H6C5.17157 6.5 4.5 7.17157 4.5 8V9.5H13.5Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                        <span className="ml-1">
                            12/09/2025</span>
                    </div>

                </div>

            </section>


        </>
    )
}

export default EdithAuthor