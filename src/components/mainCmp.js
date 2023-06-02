import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
// fetch data from redux store 
import { getTodos } from '../store/actions/todoAction'
// internal file for css and contant path
import style from '../assets/todo.module.css'
import { path } from "../store/constant";
import { toast } from "react-hot-toast";
import SignUp from "./signup";

export default function MainCmp() {
    const { todos } = useSelector((state) => state.todoList)
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue } = useForm();
    const [isUpdate, setIsUpdate] = useState(0);
    const [load, setLoad] = useState(false);
    const [btnToggle, setBtnToggle] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [ticked, setTicked] = useState(false)
    const [signup, setSignup] = useState(false);

    async function addTodo({ titleAdd, DescriptionAdd }) {
        await axios.post(path.getTodo, { titleAdd, DescriptionAdd })
        toast.success('Record Added successfully');
        setLoad(!load)
        setShowForm(false)
        setVisible(false)
    }
    async function updateRecord({ titleUpdate, DescriptionUpdate }) {
        await axios.post(`${path.getTodo}/update`, { isUpdate, titleUpdate, DescriptionUpdate })
        console.log('update  Record successully', isUpdate, titleUpdate, DescriptionUpdate);
        toast.success('update  Record successfully');
        setLoad(!load)
        // setIsUpdate(0)
        setBtnToggle(false)
    }
    function setRacord(id) {
        console.log('id from setrecord function : ', id);
        const filter_data = todos.filter(item => item.id === id);
        setIsUpdate(filter_data[0].id);
        setValue('title', filter_data[0].title)
        setValue('Description', filter_data[0].description)
    }
    async function deleteData(id) {
        let { data } = await axios.delete(`${path.getTodo}/${id}`)
        // console.log('delete  Record successully', data);
        toast.error('delete  Record successfully');
        setLoad(!load)
    }
    useEffect(() => {
        dispatch(getTodos())
    }, [load, dispatch]);
    return (
        <div className={style.noteCard}>
            <div className={style.navBar}>
                <div className={style.navHead}>
                    <span>Login</span>
                    <span onClick={() => { setSignup(!signup) }}>SignUp</span>
                </div>
                {signup ? <SignUp setSignup={setSignup} signup={signup} /> : ''}

            </div>
            {/* <div className={style.takeNoteContent} onClick={() => { setVisible(true) }} >
                <form onSubmit={handleSubmit(addTodo)} className={style.NewForm} >
                    <div className={style.mainInput}>
                        <input type='text' className={style.takeNote} placeholder='Take A note' {...register('titleAdd')} />
                        <span onClick={() => { }}>
                            <svg className={style.svg} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="ic_fluent_checkbox_checked_24_regular" fill="#212121" fillRule="nonzero">
                                        <path d="M18.25,3 C19.7687831,3 21,4.23121694 21,5.75 L21,18.25 C21,19.7687831 19.7687831,21 18.25,21 L5.75,21 C4.23121694,21 3,19.7687831 3,18.25 L3,5.75 C3,4.23121694 4.23121694,3 5.75,3 L18.25,3 Z M18.25,4.5 L5.75,4.5 C5.05964406,4.5 4.5,5.05964406 4.5,5.75 L4.5,18.25 C4.5,18.9403559 5.05964406,19.5 5.75,19.5 L18.25,19.5 C18.9403559,19.5 19.5,18.9403559 19.5,18.25 L19.5,5.75 C19.5,5.05964406 18.9403559,4.5 18.25,4.5 Z M10,14.4393398 L16.4696699,7.96966991 C16.7625631,7.6767767 17.2374369,7.6767767 17.5303301,7.96966991 C17.7965966,8.23593648 17.8208027,8.65260016 17.6029482,8.94621165 L17.5303301,9.03033009 L10.5303301,16.0303301 C10.2640635,16.2965966 9.84739984,16.3208027 9.55378835,16.1029482 L9.46966991,16.0303301 L6.46966991,13.0303301 C6.1767767,12.7374369 6.1767767,12.2625631 6.46966991,11.9696699 C6.73593648,11.7034034 7.15260016,11.6791973 7.44621165,11.8970518 L7.53033009,11.9696699 L10,14.4393398 L16.4696699,7.96966991 L10,14.4393398 Z" id="🎨Color">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </div>
                    {visible ? <>
                        <input className={style.descInputNew} placeholder='Add Description' {...register('DescriptionAdd')} />
                        <input type="submit" value='Add' className={style.addNew} />
                    </> : ''}
                </form>
            </div> */}
            {showForm ?
                <form onSubmit={handleSubmit(addTodo)} className={style.form}>
                    <input className={style.titleInput} placeholder='Take A note' {...register('titleAdd')} />
                    <input className={style.descInput} placeholder='Add Description' {...register('DescriptionAdd')} />
                    <input type="submit" value='Add' className={style.add} />
                </form> : ''
            }
            <div className={style.container}>
                {todos && todos.map((todo, index) => {
                    return (
                        <div key={index} className={style.card}>
                            <div className={style.noteContent} >
                                {btnToggle === todo.id ?
                                    <form onSubmit={handleSubmit(updateRecord)} className={style.UpdateForm}>
                                        <input placeholder='Take A note' className={style.updateInput} {...register('titleUpdate')} />
                                        <input placeholder='Add Description' className={style.updateInput} {...register('DescriptionUpdate')} />
                                        <div>
                                            <input type="submit" value='update' className={style.updateBtn} />
                                            <input type="submit" value='cancel' className={style.cancelBtn} onClick={() => { setBtnToggle(false) }} />
                                        </div>
                                    </form> :
                                    <div onClick={() => { setBtnToggle(todo.id); setRacord(todo.id); }}>
                                        <p className={`${ticked === todo.id ? style.checked : ''} ${style.titleNote}`}>{todo.title}</p>
                                        <p className={`${ticked === todo.id ? style.checked : ''}  ${style.descNote}`}>{todo.description}</p>
                                    </div>
                                }
                                {/* <span > */}
                                <input type='checkbox' className={style.tick} onClick={() => { setTicked(todo.id) }}></input>
                                {/* <svg className={style.ticked} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z" /></svg> */}
                                {/* </span> */}
                            </div>
                            <div className={style.Btns}>
                                <button onClick={() => { deleteData(todo.id) }} className={style.deleteBtn}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15">
                                        <g id="trash-2" transform="translate(-29 4.998)">
                                            <path id="Union_10" data-name="Union 10" d="M3.407,15a1.95,1.95,0,0,1-1.972-1.92V3.84H.541a.543.543,0,0,1-.381-.154A.507.507,0,0,1,0,3.314a.532.532,0,0,1,.539-.521H3.588V1.92A1.952,1.952,0,0,1,5.563,0H8.437a1.949,1.949,0,0,1,1.972,1.92v.873h3.053A.533.533,0,0,1,14,3.314V3.32a.53.53,0,0,1-.539.52h-.9v9.24A1.95,1.95,0,0,1,10.588,15Zm-.892-1.92a.884.884,0,0,0,.892.875h7.181a.888.888,0,0,0,.9-.875V3.84H9.872a.583.583,0,0,1-.06,0H4.186c-.021,0-.039,0-.06,0H2.514ZM9.333,2.793V1.92a.885.885,0,0,0-.9-.871H5.563a.889.889,0,0,0-.9.871v.873ZM7.9,10.988V6.8a.538.538,0,0,1,1.075,0v4.184a.538.538,0,0,1-1.075,0Zm-2.872,0V6.8A.539.539,0,0,1,6.1,6.8v4.184a.539.539,0,0,1-1.077,0Z" transform="translate(29 -4.998)" fill="grey" />
                                        </g>
                                    </svg>
                                </button>
                                {/* {btnToggle === todo.id ? ''
                                    : <button onClick={() => { }} className={style.editBtn}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13.997" height="14" viewBox="0 0 13.997 14">
                                            <path id="edit" d="M173.467,4.743l-8.837,8.837-3.042.337a1.39,1.39,0,0,1-1.535-1.534l.337-3.042L169.227.5a1.964,1.964,0,0,1,2.783,0l1.454,1.454a1.971,1.971,0,0,1,0,2.786Zm-3.325,1.04-1.955-1.955-6.252,6.256-.246,2.2,2.2-.246ZM172.323,3.1,170.87,1.647a.351.351,0,0,0-.5,0l-1.04,1.04,1.955,1.955,1.04-1.04A.359.359,0,0,0,172.323,3.1Z" transform="translate(-160.045 0.075)" fill="grey" />
                                        </svg>
                                    </button>} */}
                            </div>
                        </div>
                    )
                })}
            </div>
            <span className={style.plusBtn} onClick={() => { setShowForm(!showForm) }}>+</span>
        </div >
    )
}
