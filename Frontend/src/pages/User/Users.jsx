import { Users2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { CgUserAdd } from 'react-icons/cg'
import { CiSearch } from 'react-icons/ci'
import { RxCross1 } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { GiCrossedSabres } from "react-icons/gi";
import { deleteuser, getUser, getUsers, saveUser, updateuser } from './UserService'
import { MdOutlineVerifiedUser } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const Users = () => {

    const [isformclosed, setisformclosed] = useState(true)
    const name=localStorage.getItem("username");
    const roles=localStorage.getItem("roles")
    const[Users,setUsers]=useState([]);
    const[filteredUsers,setfilteredUsers]=useState([]);
    const[currentPage,setcurrentPage]=useState(0)
    const[totaluser,settotaluser]=useState(0)
    const[totaladmin,settotaladmin]=useState(0)
    const [seatcapacity,setseatcapacity]=useState(0)
    
    useEffect(()=>{
        const page=currentPage;
        async function getUser(){
            const response=await getUsers(currentPage);
            console.log(response.data)
            setUsers(response.data.users.filter(u=>u.name!=name))
            setfilteredUsers(response.data.users.filter(u=>u.name!=name))
            settotaladmin(response.data.totaladmin)
            settotaluser(response.data.totaluser)
            setseatcapacity((totaluser/50)*100)
            
        }
        getUser();
    },[currentPage,totaluser])

   

    function closeForm(){
        setusername("")
        setpassword("")
        setrole("")
        setemail("")
        setid("")
        setisformclosed(true)
    }

    function openForm(){
        setisformclosed(false)
    }
    
    function isAdmin(roles){
        if(roles.includes("ROLE_ADMIN") ){
            return "Store Manager";
        }
        else{
            return "Employee";
        }
    }

    function findUser(e){
        if(e.target.value.length >=1){
          async function fetch(){
            const response=await getUser(e.target.value);
            setfilteredUsers(response.data)
          }
          fetch()
        }
        else{
            setfilteredUsers(Users)
        }
    }
    
    const dataperblock=4;
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [role, setrole] = useState(null)
    const [id, setid] = useState("")

    async function Saveuser(e){
         e.preventDefault();

        if(username.length<1){
            toast.error("Enter User Name")
            return
        }
        if(email.length<1){
            toast.error("Enter Email of User")
            return 
        }
        if(password.length<1){
            toast.error("Enter Password ")
            return
        }
        if(role.length<1){
            toast.error("Choose role of User")
            return 
        }





       try{
        const formdata=new FormData()
        formdata.append("name",username)
        formdata.append("email",email)
        formdata.append("password",password)
        formdata.append("role",role=="Store Manager"?"ROLE_ADMIN":"Role_User");
        formdata.append("userid",id)

        await saveUser(formdata)
         if(id.length>1){
            toast.success("User Updated Successfully")
      }
      else{
        toast.success("User saved Successfully")
      }
      const page=currentPage;
        const response=await getUsers(page);
        setUsers(response.data.users)
        setfilteredUsers(response.data.users)
          settotaladmin(response.data.totaladmin)
            settotaluser(response.data.totaluser)

        setusername("")
        setpassword("")
        setrole("")
        setemail("")
        setid("")
       }

       catch(SQLIntegrityConstraintViolationException){
        toast.error("Email already registered")
       }
     
    }

    async function deleteUser(id){
        await deleteuser(id);
        toast.success("User Deleted !!!")
        const page=currentPage;
        const response=await getUsers(page);
        setUsers(response.data.users)
        setfilteredUsers(response.data.users)
          settotaladmin(response.data.totaladmin)
        settotaluser(response.data.totaluser)
    }

    async function updateUser(id){
        const response=await updateuser(id);
        console.log(response.data)
        setusername(response.data.name)
        setemail(response.data.email)
        setpassword(response.data.password)
        setrole(isAdmin(response.data.roles))
        setid(response.data.userid)

        setisformclosed(false)
    }

    const endPage=Math.ceil(totaluser/dataperblock)
    const [index,setindex]=useState(0)
    const windowsize=3;
    const[windowStart,setwindowStart]=useState(0)
    
    function moveNext(){

        if(windowStart>=endPage-3){
            return
        }
       
        setwindowStart(windowStart+windowsize)
        setindex(windowStart+windowsize)
    }       

    function movePrev(){
         if(windowStart<=0){
            return
        }
        setwindowStart(windowStart-windowsize)
        setindex(windowStart-windowsize)
    }



   



  return (
    <>
    <div className='h-17   flex items-center  justify-between  md:px-8 md:py-2  px-2 py-2 md:gap-0 gap-3 bg-white '>
                    <div className=' h-full flex items-center'>
                        <CiSearch  className='bg-[#ECEEF0] md:h-10 h-8 w-7 p-1 rounded-l-md'/>
                    <input type="text" placeholder='Search team members...' className=' md:h-10 h-8 tracking-wider bg-[#ECEEF0] font-medium md:w-65 sm:w-50 p-2 text-[10px] md:text-[12px] focus:outline-none  font-inter rounded-r-md' onChange={(e)=>findUser(e)} />
                    </div>
                <div className='flex h-full mr-10 items-center gap-4'>
                    <span className='flex flex-col'>
                        <p className='font-extrabold font-inter md:text-[13px] text-[10px] text-nowrap text-[#191C1E] '>{name}</p>
                        <p className='opacity-65 md:text-[12px] text-[10px] text-nowrap'>{isAdmin(roles)}</p>
                    </span>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWgyOr4nt2G36R1rcgHml4mkTZPTYi8eYJn4XotkamD988KC0kJhILWzQk_XXzsSNEVn8vURdbQAhCGjCWUM1V7QW1NIclqDUdcbUF4aol5QXVfEHz-gV1Vb3WOvS7cQRoDKJ6RigjXO6RR0tb5Vw7sccjGEZIoc9DV86R49dckVNeC_z-pYscosHAOw_uw6jaeaJtPhWrBvt6vBQie3m_k2ZJQmmoxvf28dAghY40P60oAqb8fIIZ_AHRgXubnDUtCWneYnc3rJE" alt=""  className='md:h-9 md:w-9 h-7 w-7  bg-gray-400 md:p-1 p-0.5 rounded-2xl' />
                </div>
                </div>

    <header className='flex justify-between   md:pl-8 md:pt-8 md:pr-8 items-center  pl-2 pr-2 pt-2 '>
       <span className='flex flex-col'>
         <h1 className='font-extrabold md:text-[25px] text-[14px]'>Team Management</h1>
        <p className='md:text-[14px] text-[10px] opacity-60  font-inter'> Configure user roles and permissions for your retail outlet </p>
       </span>
       <button className='flex items-center md:h-10 md:w-30 w-18  rounded-sm h-8 md:text-[14px] text-[10px] bg-[#26819D]   text-white md:gap-1  px-4    shadow-md cursor-pointer font-inter font-medium' onClick={openForm}><CgUserAdd size={22}/>Add User</button>
    </header>

    

    <section className='flex  md:w-[98%]  h-38  min-w-fit md:gap-15 gap-4 md:flex-row flex-col min-h-fit items-center   mt-4  md:pt-4  md:pl-8 md:pr-8  pr-2 pt-2'>
        <div className='flex h-full   max-w-fit w-screen   items-center rouded-md  md:gap-15 gap-4 bg-[#e5e9ed] p-4 rounded-md'>
            <div  className='h-25 w-44  flex items-center p-2 gap-3 '>
                <div className='  rounded-2xl  bg-[#4cb2cc] text-white flex justify-center items-center'>
               <div className='h-12 w-12 rounded-2xl bg-white/70 p-2 flex'>
                 <Users2 size={30} width={40} className='text-[#00647E]'/>
               </div>
                </div>

                <span className='flex flex-col items-center justify-center  mt-4'>
                    <p className='font-inter font-medium text-sm text-center'>Total Active Users</p>
                    <p className='text-center font-extrabold md:text-3xl  text-[#00647E]'>{String(totaluser).padStart(2,'0')}</p>
                </span>
            </div>
            <div className='h-25  w-44  flex items-center p-2 gap-3'>
                  <div className=' rounded-2xl bg-[#dcb076]  text-white'>
                <div className='rounded-2xl h-12 w-12 bg-white/70 p-2 flex'>
                    <MdOutlineVerifiedUser size={30} className='text-[#E0AC67]' />
                </div>
                </div>

                <span className='flex flex-col items-center justify-center  mt-4'>
                   <p className='font-inter font-medium text-sm text-center'>Verified Admins</p>
                    <p className='text-center font-extrabold text-3xl text-[#af6d16]'>{String(totaladmin).padStart(2,0)}</p>
                </span>
            </div>
            
        </div>

        {/* storage area */}
        <div className='h-34 w-65 rounded-md bg-[#E0E3E5] flex flex-col justify-center p-6 gap-2'>
            <p className='font-bold text-[14px]'>Storage usage</p>
            <div className='w-[90%] rounded-md h-2 bg-white'> <div className={` h-full rounded-md bg-[#00647E]`}   style={{ width: `${seatcapacity}%` }}></div></div>
            <p className='text-[12px]'>{seatcapacity}% of the seat capacity used</p>
        </div>
    </section>

    <div className='flex   md:pl-8  md:pt-6 md:pr-8       '>
        <div className='h-90 w-screen flex flex-col rounded-lg  p-2 mt-5 bg-white shadow-md mb-7 min-h-fit  overflow-auto'>
                        
                        <table className='border-separate border-spacing-y-1.5'>
                            <thead className='bg-[#ECEEF0]  h-10  text-white '>
                                <th className='text-[#57657A] font-inter font-bold text-[10px] md:text-[13px] text-start p-3 rounded-l-lg'>USERNAME</th>
                                <th className='text-[#57657A] font-inter font-bold text-[10px] md:text-[13px] text-start p-3'>EMAIL</th>
                                <th className='text-[#57657A] font-inter font-bold text-[10px] md:text-[13px] text-start p-3'>ROLE</th>
                                <th className='text-[#57657A] font-inter font-bold text-[10px] md:text-[13px] text-start p-3 rounded-r-lg'>ACTION</th>
                            </thead>
                            <tbody className='overflow-auto'>
                              {filteredUsers.map((user)=>(
                                  <tr >
                                    <td className=' text-[#191C1E] font-bold text-[8px] md:text-[15px] pt-5 flex items-center  '><div className='ml-3 mr-2 bg-gray-200 font-extrabold px-2 py-1 rounded-lg text-[#00647E]'><div>{user.name.charAt(0)}</div></div>{user.name}</td>
                                    <td className=' font-inter  text-[8px] md:text-[14px] pt-5'>{user.email}</td>
                                    <td className=' text-[6px] md:text-[10px]  flex   mt-2 md:pt-5'><span className={`rounded-2xl  ${user.roles.includes("ROLE_ADMIN")?"bg-[#E0AC67] text-[#c77f20]":"bg-blue-400 text-[#00647E]"}   `}><p className={` px-2 py-1 w-full h-full  ${user.roles.includes("ROLE_ADMIN")?"bg-white/70 ":"bg-white/70"} font-extrabold `}>{isAdmin(user.roles)}</p></span></td>
                                    <td className=' text-[10px] md:text-[16px] pt-5 '><span className='flex items-center  gap-5'><GoPencil className='cursor-pointer' onClick={()=>updateUser(user.userid)} bol /><RiDeleteBin6Line className='hover:text-red-600 cursor-pointer' onClick={()=>deleteUser(user.userid)}/></span></td>
                                  
                                </tr>
                              ))}
                            </tbody>
                        </table>
                    </div>
    </div>


    {/* form */}
    {!isformclosed &&
    <section className='h-full w-full flex justify-center items-center absolute bg-black/40   '>
        <div className='flex flex-col  w-full items-center rounded-md    '>
        <div className='flex h-full md:w-98 w-90 bg-[#20687e] rounded-t  '>
            <span className=' w-full p-4 ' >
            <h4 className='text-white font-bold text-[18px]'>Add New User</h4>
            <p className='text-white text-[12px] opacity-80'>Assign roles to your team Member</p>
        </span>
        <RxCross1  className='bg-[#26819D] h-full flex items-center mt-1 mr-1 text-white' onClick={closeForm}/>
        </div>

        <form  onSubmit={(e)=>Saveuser(e)} className='flex flex-col  gap-2 pt-10 bg-white md:w-98 w-90 p-4  py-2 '>
            <label htmlFor="" className='text-[14px] text-gray-800 font-semibold'>Username</label>
            <input type="text " placeholder='e.g John Doe' className=' w-full focus:outline-none p-1 text-[15px]  ' onChange={(e)=>setusername(e.target.value)} value={username} />
            <label htmlFor="" className='text-[14px] text-gray-800 font-semibold'>Email Address</label>
            <input type="email" name="" id="" placeholder='john@example.com' className=' w-full focus:outline-none p-1 text-[15px] text-gray-800'  onChange={(e)=>setemail(e.target.value)} value={email} />
                        <label htmlFor="" className='text-[14px] text-gray-800  font-semibold'>Password</label>
            <input type="password" name="" id=""  className=' w-full focus:outline-none p-1 text-[15px] 'placeholder='......' onChange={(e)=>setpassword(e.target.value)} value={password} />
            <label htmlFor="" className='text-[14px] text-gray-800 font-semibold'>Role</label>
            <select name="id" id="" className='w-full   px-6 py-1 rounded-md text-[15px]' onChange={(e)=>setrole(e.target.value)}  value={role} >
                <option value="" className='bg-white text-black '>--Choose Role--</option>
                <option value="Store Manager" className='bg-white text-black'>Store Manager</option>
                <option value="Employee" className='bg-white text-black'>Employee</option>
            </select>
            <input type="text" value={id} onChange={(e)=>setid(e.target.value)}  hidden/>
            <div className='flex  md:pl-4 pr-8 mb-2 mt-6 justify-between gap-3'>
                <button type='submit' className='px-11 py-2 rounded-md shadow-md bg-white text-black border-gray-500 font-semibold  border' onClick={closeForm}>Cancel</button>
                <button type='submit' className='px-11 py-2  rounded-md shadow-md bg-[#26819D] font-medium text-white text-nowrap'>Create User</button>
            </div>
        </form>
    </div>
    </section>}

    <div className='w-[88%] flex justify-center gap-5 h-13 '>
         <div className='md:h-9 md:w-15 h-7 w-11 rounded-md  flex items-center justify-center bg-blue-500 text-white shadow-md cursor-pointer' onClick={movePrev}>
                          <span  className='text-[10px] md:text-[12px]'><FaAngleDoubleLeft /></span>  <p className='text-[10px] md:text-[12px]'>Prev</p>
                        </div>
          {Array.from({length:Math.ceil(totaluser/dataperblock)}).slice(windowStart,windowStart+windowsize).map((_,i)=>{
                        if(index<=(endPage-1)){
                            const pageNumber = windowStart + i; // ✅ actual page index
                            return (
                                <div className='md:h-9 md:w-9 h-7 w-7 rounded-md  flex items-center justify-center bg-blue-500 text-white shadow-md cursor-pointer' onClick={()=>setcurrentPage(pageNumber)}>
                            <p className='text-[10px] md:text-[12px]'>{pageNumber+1}</p>
                        </div>
                            )
                           
                        }
                        return null;
                    })}
          <div className='md:h-9 md:w-15 h-7 w-11 rounded-md  flex items-center justify-center bg-blue-500 text-white shadow-md cursor-pointer' onClick={moveNext}>
                            <p className='text-[10px] md:text-[12px]'>Next</p><span className='text-[10px] md:text-[12px]'><FaAngleDoubleRight /></span> 
                         </div>
    </div>

    <div className='md:mb-0 mb-30'>

    </div>
    </>
  )
}

export default Users