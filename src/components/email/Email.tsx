import React from 'react';
import style from "../../App.module.scss";

type EmailPropsType = {
    value: string
    setFormDataHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
}

export const Email = ({value, setFormDataHandler, error}: EmailPropsType) => {
    return (
        <div className={style.app__fields_column}>
            <label>Email</label>
            <input
                type="email"
                value={value}
                data-field='email'
                onChange={setFormDataHandler}
                autoComplete='none'
                placeholder='Enter your email'
            />

            {
                error
                    ? <div className={style.error}>{error}</div>
                    : <div className={style.fakeDiv}/>
            }

        </div>
    )
}