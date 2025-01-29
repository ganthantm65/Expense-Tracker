import React from 'react'
import { useState } from 'react'
import { Button, Position, Toaster} from '@blueprintjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faLock,faMailReply,faPhone } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const toaster=Toaster.create({
    position:Position.TOP,
})

function Register() {
    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('gr')

    const handleUser=(event)=>{
        setUserName(event.target.value);
    }


    const handlePassword=(event)=>{
        setPassword(event.target.value);
    }


    const handleEmail=(event)=>{
        setEmail(event.target.value);
    }


    const handlePhone=(event)=>{
        setPhone(event.target.value);
    }

    const handleSignUp=()=>{
        let user_data={username:username,password:password,email:email,phone:phone}
        postUserData(user_data)
    }

    const postUserData=async(userData)=>{
        try {
            const response=await fetch('http://localhost/expense/',{
                method:'POST',
                header:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(userData)
            })
    
            const data=await response.json()
    
            if(data.success){
                toaster.show({
                    message:data.message,
                    intent:'success'
                })
            }else{
                toaster.show({
                    message:data.message,
                    intent:'danger'
                })
            }
        } catch (error) {
            toaster.show({
                message:error,
                intent:'danger'
            })
        }
        
    }
  return (
    <div className='Register'>
        <h1>Sign up</h1>
        <div>
            <FontAwesomeIcon icon={faUser}/>
            <input
                id="user"
                placeholder="Enter username"
                type='text'
                autoComplete="off"
                value={username}
                onChange={(event)=>handleUser(event)}
            />
        </div>
        <div>
            <FontAwesomeIcon icon={faMailReply}/>
            <input
                id='email'
                placeholder='Enter E-mail'
                type='email'
                value={email}
                onChange={(event)=>handleEmail(event)}
            />
        </div>
        <div>
            <FontAwesomeIcon icon={faPhone}/>
            <input
                id='phone-no'
                placeholder='Enter Phone No.'
                type='number'
                value={phone}
                onChange={(event)=>handlePhone(event)}
            />
        </div>
        <div>
            <FontAwesomeIcon icon={faLock}/>
            <input
                id="password"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(event)=>handlePassword(event)}
            />
        </div>
        <Button id="sign-up" onClick={handleSignUp}>Sign Up</Button>
        <p>Already Have an account <Link to="/">Login</Link></p>
    </div>
  )
}

export default Register