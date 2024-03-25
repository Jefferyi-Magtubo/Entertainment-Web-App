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
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const mediaContext = React.useContext(MediaContext)

    // Get all data and set them to their respective useState
    const [trending, setTrending] = React.useState<{title: string, year: number, category: string, rating: string, thumbnail: {trending: {large: string}}, isTrending: boolean, isBookmarked: boolean}[]>([{title: "", year: 2000, category: "", rating: "", thumbnail: {trending: {large: ""}}, isTrending: true, isBookmarked: true}])
    const [entData, setEntData] = React.useState<{title: string, year: number, category: string, rating: string, thumbnail: {regular: {large:string}}, isTrending: boolean, isBookmarked: boolean}[]>([{title: "", year: 2000, category: "", rating: "", thumbnail: {regular: {large: ''}}, isTrending: false, isBookmarked: true}])
    const [tv, setTv] = React.useState()
    const [bookmarked, setBookmarked] = React.useState()
    const [search, setSearch] = React.useState<string>("")

    React.useEffect(() => {
        async function getTrending() {
            const res = await fetch('data.json')
            const data = await res.json()
            const trending = data.filter((datum : {isTrending: boolean}) => datum.isTrending === true)
            setTrending(trending)
        }
        getTrending()

        async function getMovies() {
            const res = await fetch('data.json')
            const data = await res.json()
            setEntData(data)
    
        }
        getMovies()
    }, [])

    // Search Functionality
    function filterBySearch() {
        const searchEl = document.getElementById('search') as HTMLInputElement
        const searchValue = searchEl.value
        console.log(searchValue)
        setSearch(searchValue)
    }

    return(
        <main className="px-2 py-2">
            <div className="flex">
                <label htmlFor="search" className="hover:cursor-pointer">
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#FFF"/></svg>    
                </label>

                <input type="text" id="search" 
                    placeholder={`Search for movies or TV series`} 
                    className="bg-vDarkBlue w-4/5 text-white focus:outline-none"
                    onChange={() => {filterBySearch()}}
                />                
            </div>


            {mediaContext === 'all' && search === '' ? 

                <>            
                {/* When there's nothing in the search bar and we're viewing both movies and tv shows. */}
                    <section className="mt-2  text-xl">  
                        <h1 className="font-light">Trending</h1>
                        <div className="mt-4 mx-5">
                            <Slider {...settings}>
                                {trending.map((trender, index) => {
                                    return <TrendingTN trender={trender} index={index} />
                                })}
                            </Slider>
                        </div>
                    </section>   

                    <section className="mt-2  text-xl">
                        <h1 className="font-light">Recommended For You</h1>
                        <div className="mt-4  flex flex-wrap justify-center">
                            {entData.filter((ent) => !ent.isTrending).map((movie, index) => {
                                return <TN movie={movie} index={index} />
                            })}
                        </div>
                    </section>             
                </>
                : 
                null
            }

        </main>
    )
}