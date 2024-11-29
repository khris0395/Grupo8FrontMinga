import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';

function Home() {
   const [currentSlide, setCurrentSlide] = useState(0);

   return (
       <div className="min-h-screen md:w-full bg-[#EBEBEB]">
           {/* Hero Section */}
           <section className="relative h-screen">
               {/* Background image */}
               <div className="absolute inset-0">
                   <img
                       src="https://s3-alpha-sig.figma.com/img/9e1b/0909/605c4919d06e9e4c2973cbfcca57c35d?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GQSFmbbIfg2OKcXHveX4vlqfuxaetKTeavDnSRC8E9oTS4WVdouy3p7PmtfaUcNXdZo6TStVtjp~ZaRxzh4l3olr1P-ftY1andYm6N4ZknuAfyyQp12ODAHr6BLBOuabjCrsAxwPdHfT8Uxw442JPt8j6BtbX8sblDmibVvfc67tY0njvtfa2uVHfYbuDH1WGGCeziB7iGH~BrJVrled2JNf1La7KwgOvJbVCRvq91C7wpn6RbKoDYd9LGz63PnlkFv5vhPPU9S33xYzkPfy9Db7EvgDUEg8KuWHdJgPI2ukTJNPwByQGP6pBw14YiHwsupW4Ja50vrz-YM4DCfTrA__"
                       alt="Comic Books Background"
                       className="w-full h-full object-cover object-center md:object-top"
                   />
                   <div className="absolute inset-0 bg-black/60"></div>
               </div>

               {/* Navbar superpuesto */}
               <div className="relative z-20">
                   <Navbar />
               </div>

               {/* Hero content */}
               <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                   <h1 className="text-3xl md:text-5xl font-bold mb-4">
                       <span className="md:hidden">
                           Your favorite comic book store
                       </span>
                       <span className="hidden md:block">
                           Your favorite comic book store ✨
                       </span>
                   </h1>
                   <p className="text-base md:text-xl mb-8 max-w-md md:max-w-xl">
                       <span className="md:hidden">
                           From classics to novelties, we have everything you need to immerse yourself in your favorite universes. Explore our catalog and live the adventure of your life.
                       </span>
                       <span className="hidden md:block">
                           Explore our catalog to live the adventure of your life
                       </span>
                   </p>
                   <button className="bg-[#4338CA] w-full max-w-[260px] py-3 rounded-full text-white font-medium md:w-auto md:px-8 hover:bg-[#3730A3] transition-colors">
                       Let's go!
                   </button>
               </div>
           </section>

           {/* Carousel Section - Solo visible en desktop */}
           <section className="hidden md:flex w-full py-16 px-8 bg-[#F4F4F4] justify-center items-center">
               <div className="w-[1258px] h-[265px] bg-[#4338CA] flex items-center p-6">
                   {/* Botón Izquierdo */}
                   <button
                       onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                       className="text-white bg-[#3730A3] p-3 rounded-full flex items-center justify-center z-10 hover:bg-[#2D2687] transition-colors"
                   >
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                       </svg>
                   </button>

                   {/* Contenido del Carrusel */}
                   <div className="flex-1 grid grid-cols-3 gap-6 px-4 relative">
                       {/* Imagen Izquierda */}
                       <div className="relative flex items-center justify-center">
                           <img
                               src="https://s3-alpha-sig.figma.com/img/7010/55a8/ad631c0e34af539abb86743a2cafbda1?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eogAWD84FiSHfQHRVBmg9zdWLeLn4RpEOg48CZ-JqVeQN6F2ZJ66sY24NEDx5p7xU32QEh6OeVEzeduXK-07C6C0CruGYd2eWr67H~331cFwEpLdI0AjnGcrMDQYDa-vn1YCXdTocgHJo6Tw1fH~TfC8T0UIpUg~qKSNtQxUNJla7d4j8f-hUU-Dz9uN75dNOl0hoVuqaxxoGowj2E4mlxMBXA76e6avm95RKgCSpKCfkre2HYSbh4EZsX4SRD6Z2IrB8ilhKvD7WkjJsg8ROTj0LcnxCcsPT~-fUcvRA1GG9jUl~MtGtn-mepPVrkLjaQqwZRWn1iBc00qCERO2uQ__"
                               alt="Deku with blue effects"
                               className="w-[190px] h-[200px] object-cover rounded-lg shadow-lg absolute -top-24"
                           />
                       </div>

                       {/* Imagen Central */}
                       <div className="relative flex items-center justify-center">
                           <img
                               src="https://s3-alpha-sig.figma.com/img/0b79/70a5/01731543bd32ac773a1b2fa236c42971?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y5o5ge4pgEX5qEg5-iw-r0NY680X1lwc2BQ8xW7fjJGvYm6cXRKKFopxMYVa3JuYCQelKfywum5yaWA3atLTQmvowJKxI2J6qee6VQvbp4qKGmU5NzFS46PW7gSknah2HUuQdcaHdoidmR20rhcPVNiwKKswT9qdIJxL1UTJ8NfE3NHjWaWHf7nsobJzAtyhfddaphPxAOCNTAWhxOCNJaCXfZvvpoEay0YY8JEWaWElAuBjaI9qTun8m-G-Qpu~1jxqq8uWMu0zbvYV7TycLDIrL9CBve46Psp9ZXmFGYfOJFjiJUz8zbPl2Of9U5V7yO~UqZKpFSqP6v5Z6ZyHoQ__"
                               alt="My Hero Academia Group"
                               className="w-[140px] h-[200px] object-cover rounded-lg shadow-lg absolute -top-24"
                           />
                       </div>

                       {/* Texto */}
                       <div className="text-white relative">
                           <h2 className="text-2xl font-bold mb-4">Shonen:</h2>
                           <p className="text-sm leading-relaxed">
                               Is the manga that is aimed at adolescent boys. They are series with large amounts of action, in which humorous situations often occur. The camaraderie between members of a collective or a combat team stands out.
                           </p>
                       </div>
                   </div>

                   {/* Botón Derecho */}
                   <button
                       onClick={() => setCurrentSlide((prev) => prev + 1)}
                       className="text-white bg-[#3730A3] p-3 rounded-full flex items-center justify-center z-10 hover:bg-[#2D2687] transition-colors"
                   >
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                       </svg>
                   </button>
               </div>
           </section>
       </div>
   );
}

export default Home;