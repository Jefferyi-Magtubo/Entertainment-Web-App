import React from "react"
import { MediaContext } from "../App"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrendingTN from "../components/TrendingTN"
import TN from "../components/TN";

export default function DisplayPage() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true
                }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true
              }
            }
        ]
    };

    const mediaContext = React.useContext(MediaContext)

    // Get all data and search 
    const [trending, setTrending] = React.useState<{id: number, title: string, year: number, category: string, rating: string, thumbnail: {trending: {large: string}}, isTrending: boolean, isBookmarked: boolean}[]>([{id: 0, title: "", year: 2000, category: "", rating: "", thumbnail: {trending: {large: ""}}, isTrending: true, isBookmarked: true}])

    const [entData, setEntData] = React.useState<{id: number, title: string, year: number, category: string, rating: string, thumbnail: {regular: {large:string}}, isTrending: boolean, isBookmarked: boolean}[]>([{id: 0, title: "", year: 2000, category: "", rating: "", thumbnail: {regular: {large: ''}}, isTrending: false, isBookmarked: true}])

    const [search, setSearch] = React.useState<string>("")

    React.useEffect(() => {

        async function getTrending() {
            if(localStorage.getItem('data') === null) {
                const res = await fetch('data.json')
                const data = await res.json()
                localStorage.setItem('data', JSON.stringify(data))
            }
            const data = JSON.parse(localStorage.getItem('data') as string)
            const trending = data.filter((datum : {isTrending: boolean}) => datum.isTrending === true)
            setTrending(trending)
        }
        getTrending()

        async function getData() {
            if(localStorage.getItem('data') === null) {
                const res = await fetch('data.json')
                const data = await res.json()
                localStorage.setItem('data', JSON.stringify(data))
            }
            const data = JSON.parse(localStorage.getItem('data') as string)
            setEntData(data)
        }
        getData()

    }, [])

    // Search Functionality
    function filterBySearch() {
        const searchEl = document.getElementById('search') as HTMLInputElement
        const searchValue = searchEl.value
        setSearch(searchValue)
        
    }

    // Bookmark Functionality
    function setBookMark(index: number) {
        const data = JSON.parse(localStorage.getItem('data') as string)
        data[index].isBookmarked = !data[index].isBookmarked
        localStorage.setItem('data', JSON.stringify(data))
        setEntData(data)
        const trending = data.filter((datum : {isTrending: boolean}) => datum.isTrending === true)
        setTrending(trending)
    }

    return(
        <main className="px-7 pr-1 py-2 md:-mt-2 lg:mt-2 xl:mt-4 xl:ml-32 ">
            <div className="flex">
                <label htmlFor="search" className="hover:cursor-pointer">
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#FFF"/></svg>    
                </label>

                <input type="text" id="search" 
                    placeholder={mediaContext === 'All' ?
                    'Search for movies or TV series'
                    :
                    mediaContext === 'Movie' ?
                    'Search for Movies'
                    :
                    mediaContext === 'Tv' ?
                    "Search for TV series"
                    :
                    mediaContext === 'Bookmarked' ?
                    "Search bookmarked media"
                    :
                    ""
                    } 
                    className="bg-vDarkBlue w-4/5 mb-2 text-white focus:outline-none md:text-lg mt-1"
                    onChange={() => {filterBySearch()}}
                />                
            </div>


            {mediaContext === 'All' && search === '' ? 
                
                <div className="w-full">{/* When there's nothing in the search bar and we're viewing both movies and tv shows. */}        
                    <section className="mt-2 text-xl">  
                        <h1 className="font-light xl:text-2xl">Trending</h1>
                        <div className="mt-4 ml-2 mr-8 xl:hidden">
                            <Slider {...settings}>
                                {trending.map((trender, index) => {
                                    return <TrendingTN trender={trender} index={index} onClick={setBookMark} />
                                })}
                            </Slider>
                        </div>
                        <div className="mt-4  hidden xl:flex xl:flex-wrap  ">

                                {trending.map((trender, index) => {
                                    return <TrendingTN trender={trender} index={index} onClick={setBookMark} />
                                })}

                        </div>
                    </section>   

                    <section className="mt-2 mx-auto w-full text-xl ">
                        <h1 className="font-light xl:text-2xl">Recommended For You</h1>
                        <div className="mt-4  flex flex-wrap">
                            {entData.filter((ent) => !ent.isTrending).map((movie, index) => {
                                return <TN movie={movie} index={index} onClick={setBookMark}/>
                            })}
                        </div>
                    </section>             
                </div>
                : 
            mediaContext === 'All' && search !== '' ?

                <>{/* When there's something in the search bar and we're viewing both movies and tv shows. */}  
                    <section className="mt-2  text-xl  w-full">  
                        <h1 className="font-light xl:text-2xl">Found {entData.filter((ent) => ent.title.toLowerCase().includes(search.toLowerCase())).length} result{entData.filter((ent) => ent.title.toLowerCase().includes(search.toLowerCase())).length === 0 || entData.filter((ent) => ent.title.toLowerCase().includes(search.toLowerCase())).length > 1 ? "s" : ""} for "{search}"</h1>
                        <div className="mt-4 flex flex-wrap w-full">
                            {entData.filter((ent) => ent.title.toLowerCase().includes(search.toLowerCase())).map((movie, index) => {
                                    return <TN movie={movie} index={index} onClick={setBookMark}/>
                            })}
                        </div>
                    </section>   
                </>
                :
                null
            }

            {mediaContext === 'Movie' ?
                // Showing movies but no search parameters
                <section className="mt-2  text-xl w-full">  
                    {search ? 
                        <h1 className="font-light xl:text-2xl">Found {entData.filter((ent) => ent.category === 'Movie').filter((ent) => ent.title.toLowerCase().includes(search.toLowerCase())).length} result{entData.filter((ent) => ent.category === 'Movie').length === 0 || entData.filter((ent) => ent.category === 'Movie').length > 1 ? "s": ""} for "{search}"</h1>
                        :
                        <h1 className="xl:text-2xl">Movies</h1>
                    }

                    <div className="mt-4  flex flex-wrap ">
                        {search === '' ? entData.filter((ent) => ent.category === 'Movie').map((movie, index) => {
                            return <TN movie={movie} index={index} onClick={setBookMark}/>
                        })
                        :
                        search !== '' ?
                        entData.filter((ent) => ent.category === 'Movie' && ent.title.toLowerCase().includes(search.toLowerCase())).map((movie, index) => {
                            return <TN movie={movie} index={index} onClick={setBookMark}/>
                        })
                        :
                        null
                        }
                    </div>
                </section>   
                :
            
                null
            }

            {mediaContext === 'Tv' ?
                // Showing movies but no search parameters
                <section className="mt-2  text-xl w-full">  
                    {search ? 
                        <h1 className="font-light xl:text-2xl">Found {entData.filter((ent) => ent.category === 'TV Series').filter((ent) => ent.title.toLowerCase().includes(search.toLowerCase())).length} result{entData.filter((ent) => ent.category === 'TV Series').length === 0 || entData.filter((ent) => ent.category === 'TV Series').length > 1 ? "s": ""} for "{search}"</h1>
                        :
                        <h1 className="xl:text-2xl">TV Series</h1>
                    }
                    <div className="mt-4  flex flex-wrap ">
                        {search === '' ? entData.filter((ent) => ent.category === 'TV Series').map((movie, index) => {
                            return <TN movie={movie} index={index} onClick={setBookMark}/>
                        })
                        :
                        search !== '' ?
                        entData.filter((ent) => ent.category === 'TV Series' && ent.title.toLowerCase().includes(search.toLowerCase())).map((movie, index) => {
                            return <TN movie={movie} index={index} onClick={setBookMark}/>
                        })
                        :
                        null
                        }
                    </div>
                </section>   
                :
                null
            }

            {mediaContext === 'Bookmarked' ?
                // Showing movies but no search parameters
                <section className="mt-2 text-xl w-full">  
                    {search ? 
                        <h1 className="font-light xl:text-2xl">Found {entData.filter((ent) => ent.isBookmarked ===  true).filter((ent) => ent.title.toLowerCase().includes(search.toLowerCase())).length} result{entData.filter((ent) => ent.isBookmarked === true).length === 0 || entData.filter((ent) => ent.isBookmarked === true).length > 1 ? "s": ""} for "{search}"</h1>
                        :
                        <h1 className="xl:text-2xl">Bookmarks</h1>
                    }
                    <div className="mt-4  flex flex-wrap">
                        {search === '' ? entData.filter((ent) => ent.isBookmarked === true).map((movie, index) => {
                            return <TN movie={movie} index={index} onClick={setBookMark}/>
                        })
                        :
                        search !== '' ?
                        entData.filter((ent) => ent.isBookmarked && ent.title.toLowerCase().includes(search.toLowerCase())).map((movie, index) => {
                            return <TN movie={movie} index={index} onClick={setBookMark}/>
                        })
                        :
                        null
                        }
                    </div>
                </section>   
                :
                null
            }

        </main>
    )
}