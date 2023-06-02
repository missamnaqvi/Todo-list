import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import style from '../assets/login.module.css'
import { getNotes } from '../store/actions/todoAction';
import { path } from "../store/constant";


export default function SignUp({ setSignup, signup }) {
    const { register, handleSubmit } = useForm();
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch()
    function getDataByuser() {
        var token = localStorage.getItem('usertoken');
        console.log('user token', token)
        // dispatch(getNotes(token))
    }
    async function userLogin({ firstname, username, password }) {
        setSignup(!signup)
        if (isLogin) {
            let { data } = await axios.post(`${path.getTodo}/login`, { username, password })
            console.log('full data of user specific ', data)
            console.log('user specific data ',data[0].rows)
            window.localStorage.setItem('usertoken', data.token);
            if (data.success) {
                toast.success('login successfully');
                // getDataByuser()
            } else if (data.fail) {
                toast.error('please enter valid username and password');
            }
        }
        else {
            await axios.post(`${path.getTodo}/register`, { firstname, username, password })
        }
    }
    return (
        <div>
            {SignUp ?
                <form onSubmit={handleSubmit(userLogin)} className={style.login}>
                    <div className={style.formContent}>
                        {!isLogin ?
                            <input placeholder='firstname' className={style.firstname} {...register('firstname')} /> : ''
                        }
                        <input placeholder='username' className={style.loginUser} {...register('username')} />
                        <input placeholder='password' className={style.loginPass} {...register('password')} />
                        <div className={style.registrationBtn}>
                            {isLogin ?
                                <input type="submit" value='Login' className={style.loginBtn} />
                                :
                                <input type="submit" value='SignUp' className={style.loginBtn} />
                            }
                            <input type="submit" value='cancel' className={style.cancelBtn} onClick={() => { }} />
                        </div>
                        {isLogin ?
                            <p>Create Account <span className={style.linkStyle} onClick={() => { setIsLogin(!isLogin) }}>signup</span></p> :
                            <p>Already have an Account ? <span className={style.linkStyle} onClick={() => { setIsLogin(!isLogin) }} >login</span></p>
                        }
                    </div>
                </form> : ''}
        </div>
    )
}
