import React from 'react';
import style from "./style/Birthday.module.scss";

type BirthdayPropsType = {
    value: string
    setFormDataHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Birthday = ({value, setFormDataHandler}: BirthdayPropsType) => {
    return (
        <div className={style.app__fields_column}>
            <label>Birthday</label>
            <div className={style.input__birthday_wrapper}>
                <input
                    className={style.input__birthday_date}
                    type="date"
                    value={value}
                    data-field='birthday'
                    onChange={setFormDataHandler}
                />
                <input
                    className={style.input__birthday_picker}
                    type="date"
                    value={value}
                    data-field='birthday'
                    onChange={setFormDataHandler}
                />
            </div>
        </div>
    )
}