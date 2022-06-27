import React from 'react';
import style from "../../App.module.scss";

type NamePropsType = {
    value: string
    setFormDataHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
}

export const Name = ({value, setFormDataHandler, error}: NamePropsType) => {
    return (
        <div className={style.app__fields_column}>
            <label>First and Last name</label>
            <input
                type="text"
                value={value}
                data-field='name'
                onChange={setFormDataHandler}
                placeholder='e.g. "BARBARA LISKOV"'
            />

            {
                error
                    ? <div className={style.error}>{error}</div>
                    : <div className={style.fakeDiv}/>
            }

        </div>
    )
}