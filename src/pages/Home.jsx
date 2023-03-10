import React, { useState } from 'react'
import { FormFeild, Loader } from '../components';

const RenderCard=({data,title})=>{
if (data.length>0) {
    return data.map((post)=><card key={post._id} {...post}/>)
    
}
return <h2 className='mt-5 font-bold text-[6449ff] text-xl uppercase'>{title}</h2>
}

const Home = () => {
  const [loading,setLoading]=useState(false);
  
  const [allPost,setAllPost]=useState(null);
const [searchText, setSearchText] = useState("true")
    return (
        <section className='max-w-7xl mx-auto'>
        <div >
       <h1 className='font-extrabold text-[#222328] text--[32px]'> The community showcase</h1>
       <p className='mt-2 text-[#666e5] text-[16px] max-w-[500px]'>Browse through a collection through imaginative and visually stunning images generated by DALL-E-AI</p>
       </div>
       <div className='mt-16'>
       <FormFeild/>
       </div>
      {loading?( <div className='flex justify-center item-center'>
<Loader/>
       </div>):(
        <div>
        {
            searchText && (<h2 className='font-medium text-[#666e75] text-xl mb-3'>showing result for
            <span className='text-[#222328] '>{searchText}</span>
            </h2>)
        }
        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-col-2 grid-cols-1 gap-3'>
        {
            searchText?(<RenderCard data={[]} title="no search result found"/>):(
                <RenderCard data={[]} title="no post found"/>
            )
        }
        </div>
        </div>
       )}
       </section>
    
  )
}

export default Home