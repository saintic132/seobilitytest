import React, {useState} from 'react';
import style from './App.module.scss'

type FormData = {
    name: string
    email: string
    phoneNumber: string
    birthday: string
    message: string
}

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        message: '',
    })

    const [errors, setErrors] = useState<{ [K in keyof FormData]?: string } | null>(null)

    const setFormDataHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.dataset.field as string]:
                e.currentTarget.dataset.field === 'name'
                    ? e.currentTarget.value.toUpperCase()
                    : e.currentTarget.value
        })
        switch (e.currentTarget.dataset.field) {
            case 'name': {
                e.currentTarget.value
                    ? validatorFormData(e.currentTarget.dataset.field, e.currentTarget.value)
                    // @ts-ignore
                    : setErrors(delete errors['name'])
                break;
            }
            case 'email': {
                e.currentTarget.value
                    ? validatorFormData(e.currentTarget.dataset.field, e.currentTarget.value)
                    // @ts-ignore
                    : setErrors(delete errors['email'])
                break;
            }
            case 'message': {
                e.currentTarget.value
                    ? validatorFormData(e.currentTarget.dataset.field, e.currentTarget.value)
                    // @ts-ignore
                    : setErrors(delete errors['message'])
                break;
            }
        }
    }

    const validatorFormData = (dataField: string, value: string) => {
        switch (dataField) {
            case 'name': {
                if (!/^[a-z]{3,30} [a-z]{3,30}$/i.test(value)) {
                    const error = {name: 'First and Last name min 3 and max 30 letters'}
                    const newErrors = errors ? Object.assign(errors, error) : error
                    setErrors(newErrors)
                }
                break;
            }
            case 'email': {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    const error = {email: 'Invalid email address'}
                    const newErrors = errors ? Object.assign(errors, error) : error
                    setErrors(newErrors)
                }
                break;
            }
            case 'message': {
                if (value.length < 10) {
                    const error = {message: 'Min 10 letters'}
                    const newErrors = errors ? Object.assign(errors, error) : error
                    setErrors(newErrors)
                } else if (value.length === 300) {
                    const error = {message: 'Max 300 letters'}
                    const newErrors = errors ? Object.assign(errors, error) : error
                    setErrors(newErrors)
                } else {
                    // @ts-ignore
                    setErrors(delete errors['message'])
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
                        />

                        {
                            errors?.name
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
                            type="tel"
                            value={formData.phoneNumber}
                            data-field='phone'
                            onChange={setFormDataHandler}
                        />
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
                            required
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
