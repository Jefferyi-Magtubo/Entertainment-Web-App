
export default function TN({movie, onClick} : {movie: {id: number, title: string, year: number, category: string, rating: string, thumbnail: {regular: {large: string}}, isTrending: boolean, isBookmarked: boolean}, index: number, onClick: Function}) {


    return (
        <div className="flex-col md:w-1/4 xl:w-1/4  w-1/2 mb-2 " >
            <div key={movie.id} className={`w-100% mr-4  xl:mr-3 h-24 sm:h-48 md:h-40 lg:h-52 bg-cover bg-center rounded-lg relative hover:grayscale`} style={{backgroundImage:`url(${movie.thumbnail.regular.large})`}}>
                <div className="absolute z-40 bg-black bg-opacity-50  rounded-xl top-2 right-2 p-2 hover:cursor-pointer" onClick={() => onClick(movie.id)}>
                    {movie.isBookmarked ?
                        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z" fill="#FFF"/></svg> 
                        :
                        <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z" stroke="#FFF" strokeWidth="1.5" fill="none"/></svg>     
                    }  
                </div>

                <div className="z-30 relative w-full h-full flex justify-center  items-center opacity-0 hover:opacity-100">
                    <div className="bg-gray-400 flex p-1 rounded-lg bg-opacity-30 hover:cursor-pointer">
                        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" ><path d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z" fill="#FFF"/></svg>
                        <p className="ml-1">Play</p> 
                    </div>

                </div>
            </div>
            <div className="flex sm:mb-1">
                <p className="text-gray-400 text-xxs sm:text-sm">{movie.year.toString()}</p>
                <div className="w-3.5 h-3.5 ml-1 flex items-center mr-1">
                    {movie.category === 'Movie' ? 
                        <img src="/assets/icon-nav-movies.svg" className="mt-3 sm:mt-2" />
                        // <svg width="100%" height="100%" viewBox="0 0 25 25" className="mt-4"  xmlns="http://www.w3.org/2000/svg"><path  d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" fill="#6b7280"/></svg> 
                    :
                    movie.category === 'TV Series' ?
                        <img src="/assets/icon-nav-tv-series.svg" className="mt-3 sm:mt-2" />
                            // <svg width="100%" height="100%" viewBox="0 0 25 25" className="mt-4" xmlns="http://www.w3.org/2000/svg"><path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" fill="#6b7280"/></svg> 
                    :
                    ""}             
                </div>
                <p className="text-gray-400 text-xxs sm:text-sm">{movie.category}</p>
                <p className="text-gray-400 text-xxs ml-1 sm:text-sm">{movie.rating}</p>
            </div>
            <h1 className="text-sm -mt-2 sm:text-lg">{movie.title}</h1>        
        </div>

    )
}