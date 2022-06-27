import React, {useState} from 'react';
import style from './App.module.scss'
import {Birthday} from './components/birthday/Birthday';
import {Message} from "./components/message/Message";
import {SuperInput} from './components/superInput/SuperInput';
import {setFormDataHandle} from "./helpers";

type FormData = {
    name: string
    email: string
    phone: string
    birthday: string
    message: string
}

function App() {

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        birthday: '',
        message: '',
    })

    const [errors, setErrors] = useState<{ [K in keyof FormData]?: string }>({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newData = setFormDataHandle(e)

        newData && setFormData({
            ...formData,
            ...newData.data
        })
        newData && setErrors({
            ...errors,
            ...newData.error
        })
    }

    const submitDataForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className={style.app__container}>
            <div className={style.app__body}>
                <h1>Validation form</h1>
                <form
                    className={style.app__form}
                    onSubmit={submitDataForm}
                >

                    <SuperInput
                        name='First and Last name'
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        dataName='name'
                    />

                    <SuperInput
                        name='Email'
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        dataName='email'
                    />

                    <SuperInput
                        finalClassName
                        name='Phone number'
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        dataName='phone'
                        max={15}
                        placeholder='(495) 555-55-55'
                    >
                        <div className={style.phoneFormat}>
                            {'+7'}
                        </div>
                    </SuperInput>

                    <Birthday
                        value={formData.birthday}
                        setFormDataHandler={handleChange}
                    />

                    <Message
                        value={formData.message}
                        setFormDataHandler={handleChange}
                        error={errors.message}
                    />

                    <div className={style.app__submitted}>
                        <button
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;