import React, {useState} from 'react';
import style from './App.module.scss'

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

    const [errors, setErrors] = useState<{ [K in keyof FormData]?: string | number }>({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const helpValidator = (value: string, field: string) => {
        value
            ? validatorFormData(field, value)
            : setErrors({...errors, [field]: ''})
    }

    const formattedPhoneNumber = (value: string, selectValue: number | null) => {
        let inputValue = value.replace(/\D/g, '')
        let formattedInput = ''

        if (inputValue.length > 10) {
            return formData.phone
        }
        if (value.length !== selectValue) {
            return value
        }
        if (inputValue.length === 1) {
            formattedInput += '(' + inputValue
        }
        if (inputValue.length > 1) {
            formattedInput += '(' + inputValue.substring(0, 3)
        }
        if (inputValue.length >= 4) {
            formattedInput += ') ' + inputValue.substring(3, 6)
        }
        if (inputValue.length >= 7) {
            formattedInput += '-' + inputValue.substring(6, 8)
        }
        if (inputValue.length >= 9) {
            formattedInput += '-' + inputValue.substring(8, 10)
        }
        return formattedInput
    }

    const setFormDataHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (e.currentTarget.dataset.field) {
            case 'name': {
                helpValidator(e.currentTarget.value, e.currentTarget.dataset.field)
                setFormData({
                    ...formData,
                    [e.currentTarget.dataset.field]: e.currentTarget.value.toUpperCase()
                })
                break;
            }
            case 'email': {
                helpValidator(e.currentTarget.value, e.currentTarget.dataset.field)
                setFormData({
                    ...formData,
                    [e.currentTarget.dataset.field]: e.currentTarget.value
                })
                break;
            }
            case 'phone': {
                helpValidator(e.currentTarget.value, e.currentTarget.dataset.field)
                setFormData({
                    ...formData,
                    // @ts-ignore
                    [e.currentTarget.dataset.field]: formattedPhoneNumber(e.currentTarget.value, e.currentTarget.selectionStart)
                })

                break;
            }
            case 'message': {
                helpValidator(e.currentTarget.value, e.currentTarget.dataset.field)
                setFormData({
                    ...formData,
                    [e.currentTarget.dataset.field]: e.currentTarget.value
                })
                break;
            }
        }
    }

    const validatorFormData = (dataField: string, value: string) => {
        switch (dataField) {
            case 'name': {
                if (!/^[a-z]{3,30} [a-z]{3,30}$/i.test(value)) {
                    const error = 'First and Last name min 3 and max 30 letters'
                    setErrors({...errors, name: error})
                } else {
                    setErrors({...errors, name: ''})
                }
                break;
            }
            case 'email': {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    const error = 'Invalid email address'
                    setErrors({...errors, email: error})
                } else {
                    setErrors({...errors, email: ''})
                }
                break;
            }
            case 'phone': {
                if (!/^[(]\d{3}[)]\s\d{3}[-]\d{2}[-]\d{2}/g.test(value)) {
                    const error = 'Accepted only numeric number, e.g. +7 (495) 555 55 55'
                    setErrors({...errors, phone: error})
                } else {
                    setErrors({...errors, phone: ''})
                }
                break;
            }
            case 'message': {
                if (value.length > 0 && value.length < 10) {
                    const error = 'Min 10 letters'
                    setErrors({...errors, message: error})
                } else if (value.length === 300) {
                    const error = 'Max 300 letters'
                    setErrors({...errors, message: error})
                } else {
                    setErrors({...errors, message: ''})
                }
                break;
            }
        }
    }

    return (
        <div className={style.app__container}>
            <div className={style.app__body}>
                <h1>Validation form</h1>
                <form className={style.app__form}>
                    <div className={style.app__fields_column}>
                        <label>First and Last name</label>
                        <input
                            type="text"
                            value={formData.name}
                            data-field='name'
                            onChange={setFormDataHandler}
                            placeholder='e.g. "BARBARA LISKOV"'
                        />

                        {
                            errors.name
                                ? <div className={style.error}>{errors.name}</div>
                                : <div className={style.fakeDiv}/>
                        }

                    </div>
                    <div className={style.app__fields_column}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            data-field='email'
                            onChange={setFormDataHandler}
                            autoComplete='none'
                            placeholder='Enter your email'
                        />

                        {
                            errors?.email
                                ? <div className={style.error}>{errors.email}</div>
                                : <div className={style.fakeDiv}/>
                        }

                    </div>
                    <div className={style.app__fields_column}>
                        <label>Phone number</label>
                        <input
                            className={style.input__phone}
                            type="tel"
                            value={formData.phone}
                            data-field='phone'
                            onChange={setFormDataHandler}
                            placeholder='(495) 555-55-55'
                        />

                        {
                            <div className={style.phoneFormat}>
                                {'+7'}
                            </div>
                        }

                        {
                            errors?.phone
                                ? <div className={style.error}>{errors.phone}</div>
                                : <div className={style.fakeDiv}/>
                        }

                    </div>
                    <div className={style.app__fields_column}>
                        <label>Birthday</label>
                        <input
                            type="date"
                            value={formData.birthday}
                            data-field='birthday'
                            onChange={setFormDataHandler}
                        />
                    </div>
                    <div className={style.app__textarea__column}>
                        <label>Message</label>
                        <textarea
                            value={formData.message}
                            minLength={10}
                            maxLength={300}
                            data-field='message'
                            onChange={setFormDataHandler}
                            placeholder='Enter message here. Min 10 letters'
                        />
                        <div className={style.app__textarea_length}>
                            {300 - formData.message.length}
                        </div>

                        {
                            errors?.message
                                ? <div className={style.error}>{errors.message}</div>
                                : <div className={style.fakeDiv}/>
                        }

                    </div>
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
