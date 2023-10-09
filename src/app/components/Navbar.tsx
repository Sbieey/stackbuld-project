import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { SearchInput } from "../types";



const Navbar = () =>{

 
    return(
        <div className="navbar bg-base-200">
            <div className="container">
                <div className="flex-1">
                    <Link href='/'>Stackbuld Project</Link>
                </div>
                <div className="flex-none">
                    {/* <div className="form-control"> */}
                    {}
                    {/* <form onSubmit={handleSubmit(submit)}>
                        <input {...register("title", {required: true})} type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                        <button type="submit" className="btn">Search </button> */}
                        <Link href="/create" className="btn btn-ghost">CREATE POST</Link>
                        <Link href="/author" className="btn btn-ghost">ADD NEW AUTHOR</Link>
                    {/* </form> */}
                    {/* </div> */}
                    
                </div>
        </div>
  
    </div>
    )
}

export default Navbar