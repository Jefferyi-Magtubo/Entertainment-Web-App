import React from "react"
import { MediaContext } from "../App"
import TrendingTN from "../components/TrendingTN"

export default function DisplayPage() {
    const mediaContext = React.useContext(MediaContext)

    const [trending, setTrending] = React.useState<{title: string, thumbnail: {trending: {large: string}}}[]>([{title: "", thumbnail: {trending: {large: ""}}}])
    const [movies, setMovies] = React.useState()
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
    }, [])

    const trendingElements = trending.map((trender) => {
        return <TrendingTN trender={trender} />
    })

    return(
        <main className="p-4">
            <div className="flex">
                <label htmlFor="search" className="hover:cursor-pointer">
                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z" fill="#FFF"/></svg>    
                </label>

                <input type="text" id="search" placeholder={`Search for movies or TV series`} className="bg-vDarkBlue w-4/5 text-white focus:outline-none" />                
            </div>

            {mediaContext === 'all' ? 
                <section className="mt-4 text-xl">  
                    <h1 className="font-light">Trending</h1>
                    <div className="">
                        {trendingElements}
                    </div>
                </section>

                : 
                ""
            }
        </main>
    )
}