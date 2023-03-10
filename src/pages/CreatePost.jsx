import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { FormFeild, Loader } from '../components'
import { getRandomPrompt } from '../utils'

const CreatePost = () => {
    const navigate=useNavigate()
    const [form, setForm] = useState({
        name:"",
        prompt:"",
        photo:""
    })
    const [ganerating, setGanerating] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit =async(e)=>{
e.preventDefault();
if (form.prompt && form.photo) {
    setLoading(true)
    try {
        const response=await fetch("http://localhost:8080/api/v1/post",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
            
        })
        await response.json()
        navigate("/")
    } catch (error) {
        alert(error)
        
    }finally{
        setLoading(false)
    }
    
}else{
    alert("please ganerate image then share")
}

}
    const handleChange =(e)=>{
       console.log(e.target.value);
setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSurpriceMe =(e)=>{
const randomPrompt=getRandomPrompt(form.prompt)
return setForm({...form, prompt:randomPrompt})
    }
    const ganearteImge =async()=>{
if (form.prompt) {
    try {
        setGanerating(true)
        const response=await fetch("http://localhost:8080/api/v1/dalle",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({prompt:form.prompt})
        })
        const data=await response.json()
        setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
        
    } catch (error) {
        alert(error)
        
    }finally{
setGanerating(false)
    }
    
}else{
    alert("please enter the prompt")
}
    }
    console.log(form.name);
  return (
    <section className='max-w-7xl mx-auto'>
    <div >
       <h1 className='font-extrabold text-[#222328] text--[32px]'> create</h1>
       <p className='mt-2 text-[#666e5] text-[16px] max-w-[500px]'>Create imaginative and visually stunning images through DALL-E-AI and share with the community</p>
       </div>
       <form className="mt-16  max-w-3xl" onSubmit={handleSubmit}>
       <div className='flex flex-col gap 5'>
       <FormFeild
       labelName="your Name"
       type="text"
       name="name"
       placeholder="Ram Survase"
       value={form.name}
       handleChange={handleChange}
       />
       <FormFeild
       labelName="Prompt"
       type="text"
       name="prompt"
       placeholder=" A plush toy robot sitting against a yellow wall"
       value={form.prompt} 
       defaultValue={form.prompt}
       
       handleChange={handleChange}
       isSurpriseMe
       handleSurpriceMe={handleSurpriceMe}
       />
       </div>
       <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
       focus/:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center item-center'>
       {
        form.photo?(
            <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
        ):(  <img src={preview} alt="preview" className=" w-9/12 h-9/12 object-contain opacity-40"/>
        )
       }
       {
        ganerating && <div className='absolute insert-0 z-0 flex justify-center item-center bg-[rgba(0,0,0,0.5)] rounded-lg'><Loader/></div>
       }
       </div>
       <div>
       <button type='button' onClick={ganearteImge} className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
       {ganerating?"Generating...":"Generate"}
       </button></div>
       <div className='mt-10'>
       <p className='mt-2 text-[#666e75] text-[14px]'>Once you have to generated the image you want,you can share it with others</p></div>
      <button type='button' className='mt-3 text-white bg-[#6469ff] fount-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>{loading?"sharing..." : "share with the community"}</button>
       </form>
    </section>
  )
}

export default CreatePost