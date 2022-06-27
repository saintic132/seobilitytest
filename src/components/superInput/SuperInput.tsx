import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from "./style/SuperInput.module.scss";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputPropsType = DefaultInputPropsType & {
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    finalClassName?: boolean
    error?: string | undefined
    dataName: string
    max?: number
    children?: React.ReactNode
}

export const SuperInput: React.FC<SuperInputPropsType> = ({
                                                              name,
                                                              type,
                                                              onChange,
                                                              dataName,
                                                              error,
                                                              className,
                                                              finalClassName,
                                                              max,
                                                              children,
                                                              ...restProps
                                                          }) => {

    const onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
    }

    const finalInputClassName = finalClassName ? style.input__phone : ''

    return (
        <div className={style.app__fields_column}>
            <label>{name}</label>
            <input
                className={finalInputClassName}
                maxLength={max}
                type={type}
                data-field={dataName}
                onChange={onChangeCallback}
                {...restProps}
            />

            {children}

            {
                error
                    ? <div className={style.error}>{error}</div>
                    : <div className={style.fakeDiv}/>
            }

        </div>
    )
}