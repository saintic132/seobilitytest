import React from 'react';
import style from "./style/Message.module.scss";

type MessagePropsType = {
    value: string
    setFormDataHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    error: string | undefined
}

export const Message = ({value, setFormDataHandler, error}: MessagePropsType) => {
    return (
        <div className={style.app__textarea__column}>
            <label>Message</label>
            <textarea
                value={value}
                minLength={10}
                maxLength={300}
                data-field='message'
                onChange={setFormDataHandler}
                placeholder='Enter message here. Min 10 letters'
            />
            <div className={style.app__textarea_length}>
                {300 - value.length}
            </div>

            {
                error
                    ? <div className={style.error}>{error}</div>
                    : <div className={style.fakeDiv}/>
            }

        </div>
    )
}