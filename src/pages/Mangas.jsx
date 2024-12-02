const mangas = [
    { title: "Superman Comic", type: "Type", image: "/superman.jpg" },
    { title: "Superman Comic", type: "Type", image: "/superman.jpg" },
    // Repite según el diseño.
  ];


function Mangas(){

          return (
            <div className="min-h-screen bg-gray-100">
              {/* Imagen de fondo */}
              <div
                className="relative h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://s3-alpha-sig.figma.com/img/f0d0/3e80/2ae29b0afaf84c3dc0f77973947cfb6b?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jM4YzCS2maTpYLKMLSX7l3-HbMuW6kkY3prbqcR2D3X~W4yKcLlQs~O1XgA~DP7X2-6HvXTgmCTdp1ZzChQvLzzWIvki1FjUETKsL6KEoQhs-RuTSWXela6gcgTLsmBVx5sg9wtD585MquSDbR0uuDRgjJFOXrD7cLXhjXCChCV3nLEDw1BRiFr7bV8ZyQ-WXXc41BzB242phZNuOyURY8WRGTiuoeoKrIiT9t0rQJsIp1dPwQIpByamNfMKIvIzF2aKscBdIE2D-5J1pn5RIglF3EkbQurznjo~vWOfvoX8VFEyaCYlbcljHy-IWBFHu0U0M6sy~d~H5ITi3HXG2g__')",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                  <h1 className="text-4xl font-bold">Mangas</h1>
                  <input
                    type="text"
                    placeholder="Find your manga here"
                    className="mt-4 px-4 py-2 w-80 rounded-md bg-white text-black outline-none"
                  />
                </div>
              </div>
        
              {/* Filtros */}
              <div className="flex justify-center gap-4 mt-6">
                {["Todos", "Shōnen", "Seinen", "Shōjo", "Kodomo"].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition text-gray-700"
                  >
                    {filter}
                  </button>
                ))}
              </div>
        
              {/* Manga grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mangas.map((manga, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={manga.image}
                      alt={manga.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{manga.title}</h3>
                      <p className="text-sm text-gray-600">{manga.type}</p>
                      <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Read
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
    

}

export default Mangas