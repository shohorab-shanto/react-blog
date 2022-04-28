import React,{useState} from 'react';
import axios from 'axios';
import { MDBValidation,MDBInput,MDBBtn } from 'mdb-react-ui-kit';
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Toast } from 'bootstrap';


//ljcieqdh

const initialization ={
    title:"",
    description:"",
    category:"",
    imageUrl:""

}
const options =["travel","Fashion","Sports"];

const AddEditBlog = () => {
    const [formValue,setFormValue] = useState(initialization);
    const [catErrmsg,setCatErrMsg] = useState(null);
    const {title,description,category,imageUrl} = formValue;
    const navigate = useNavigate();
    const getDate = () =>{
        let today = new Date();
        let dd = String(today.getDate()).padStart(2,"0");
        let mm = String(today.getMonth() + 1).padStart(2,"0");
        let yyyy = today.getFullYear();
        today = mm + "/" + dd + "/" + yyyy;
        return today;
    }


    const onInputChange= (e) => {
        let {name,value} = e.target;
        setFormValue({...formValue,[name]:value})
    };
    const onUploadImage= (file) => {
        // console.log("file",file);
        const formData =new FormData();
        formData.append("file",file);
        formData.append("upload_preset", "ljcieqdh");
        axios.post("http://api.cloudinary.com/v1_1/dcc8yslvg/image/upload",formData).then((res)=>{
            // console.log("response",res);
            toast.info("image uploaded successfully");
            setFormValue({...formValue,imageUrl:res.data.url})
        }).catch((err)=>{
            toast.error("something went wrong");
        })
    };
    const onCategoryChange= (e) => {
        setCatErrMsg(null);
        setFormValue({...formValue,category:e.target.value})
    };
    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!category){
            setCatErrMsg("please select a category");
        }
        if(title && description && imageUrl && category){
            const currentDate = getDate();
            const updateBlogData = {...formValue,date:currentDate};
            const response =await axios.post("http://localhost:5000/blogs",updateBlogData);

            if(response.status === 201){
                toast.success("blog created successfully");
            }else{
                toast.error("something went wrong");
            }
            setFormValue({title:"",description:"",category:"",imageUrl:""})
            navigate("/")
        }
    };
    return(
        <MDBValidation className='row g-3' style={{marginTop:"100px"}} noValidate onSubmit={handleSubmit}>
            <p className='fs-2 fw-bold'>Add Blog</p>
            <div style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}>
                <MDBInput value={title || ""} name="title" type="text" onChange={onInputChange} required placeholder='Title' validation="Please provide a title" /><br/>
                <MDBInput value={description || ""} name="description" type="text" onChange={onInputChange} required placeholder="description" validation="Please provide a description" rows={4} /><br/>
                <MDBInput  name="file" type="file" onChange={(e)=>onUploadImage(e.target.files[0])} required label="Upload file" validation=" file"  /><br/>
                <select className='categoryDropDown' onChange={onCategoryChange} value={category}>
                    <option>Please select category</option>
                    {options.map((option,index) => (
                        <option value={option|| ""} key={index}>{option}</option>
                    ))}
                </select>
                {catErrmsg && (
                    <div className='catErrmsg'>{catErrmsg}</div>
                )}
                <br/>
                <br/>
                <MDBBtn type="submit" style={{marginRight:"10px"}}>Add</MDBBtn>
                <MDBBtn  color="danger" style={{marginRight:"10px"}} onClick={() => navigate("/")}>Go Back</MDBBtn>
            </div>
        </MDBValidation>
    )
}

export default AddEditBlog