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

    const [errors, setErrors] = useState<{ [k in keyof FormData]?: string } | null>(null)


    const setFormDataHandler = (fieldName: keyof FormData, e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [fieldName]: e.currentTarget.value
        })
        switch (e.currentTarget.dataset.field) {
            case 'email': {
                e.currentTarget.value
                    ? validatorFormData(e.currentTarget.dataset.field, e.currentTarget.value)
                    : setErrors(null)
            }
        }
    }

    const validatorFormData = (dataField: string, value: string) => {
        switch (dataField) {
            case 'email': {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    const error = {email: 'Invalid email address'}
                    const newErrors = errors ? Object.assign(errors, error) : error
                    setErrors(newErrors)
                } else {
                    setErrors(null)
                }

            }
        }
    }

    return (
        <div className={style.app__container}>
            <div className={style.app__body}>
                <h1>Validation form</h1>
                <form className={style.app__form}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            data-field='name'
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            data-field='email'
                            onChange={(e) => setFormDataHandler('email', e)}
                        />

                        {
                            errors?.email
                                ? <div className={style.error}>{errors.email}</div>
                                : <div className={style.fakeDiv}/>
                        }

                    </div>
                    <div>
                        <label>Phone number</label>
                        <input
                            type="number"
                            value={formData.phoneNumber}
                            data-field='phone'
                        />
                    </div>
                    <div>
                        <label>Birthday</label>
                        <input
                            type="date"
                            value={formData.birthday}
                            data-field='birthday'
                        />
                    </div>
                    <div>
                        <label>Message</label>
                        <textarea
                            value={formData.message}
                            required
                            minLength={10}
                            maxLength={300}
                        >

                        </textarea>
                    </div>
                    <button type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
