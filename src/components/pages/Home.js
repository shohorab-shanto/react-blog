import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { toast } from 'react-toastify';
import { MDBRow,MDBCol,MDBContainer, MDBTypography } from 'mdb-react-ui-kit'; 
import Blogs from '../Blogs';


const Home = () => {
    const[data,setData] = useState([]);

    useEffect(()=>{
        loadBlogsData();
    },[]);

    const loadBlogsData = async () => {
        const response = await axios.get("http://localhost:5000/blogs");
        if(response.status === 200){
            setData(response.data);
        }else{
            toast.error("something went wrong");
        }
    };
    // console.log("data",data);
    const handleDelete = async (id) =>{
        if(window.confirm("Want to delete??")) {
            const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
        if(response.status === 200){
            toast.success("Blog Deleted Successfully");
            loadBlogsData();
        }else{
            toast.error("something went wrong");
        }
        }
    };
    const excerpt = (str) =>{
        if(str.length > 50){
            str = str.substring(0,50) + "..."
        }
        return str;
    };

    return(
        <>
            <MDBRow>
                {data.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Blog Found
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow>
                            {data && data.map((item,index) => (
                                <Blogs
                                key={index}
                                {...item}
                                excerpt={excerpt}
                                handleDelete={handleDelete}
                                />
                            ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
        </>
    )
}

export default Home