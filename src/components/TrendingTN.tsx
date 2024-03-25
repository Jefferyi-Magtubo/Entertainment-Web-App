
export default function TrendingTN({trender} : {trender: {title: string, thumbnail: {trending: {large: string}}}}) {


    return (
        <div key={trender.title} className={`w-4/5 h-32 mb-4 bg-cover bg-center `}style={{backgroundImage:`url(${trender.thumbnail.trending.large})`}}>
            <h1>{trender.title}</h1>


        </div>
    )
}