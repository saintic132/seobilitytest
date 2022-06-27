import React from 'react';
import style from "../../App.module.scss";

type PhonePropsType = {
    value: string
    setFormDataHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
}

export const Phone = ({value, setFormDataHandler, error}: PhonePropsType) => {

    return (
        <div className={style.app__fields_column}>
            <label>Phone number</label>
            <input
                className={style.input__phone}
                type="tel"
                value={value}
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
                error
                    ? <div className={style.error}>{error}</div>
                    : <div className={style.fakeDiv}/>
            }

        </div>
    )
}