import { DeleteOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react'

export default function ThemeCompanyPhoneInput({ value, setValue, disabled }: { value: string[], setValue: any, disabled: boolean }) {
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [numberList, setNumberList] = useState<string[]>(value)
    const [error, setError] = useState<boolean>(false)
    const initList = useCallback(() => {
        if (value && value.length) {
            setNumberList(value.filter(i => i != ""))
        }
    }, [value])
    useEffect(() => initList(), [initList])


    return (
        <div className=' flex flex-col gap-2'>
            <div className=" relative   flex gap-1 ">
                <Input
                    disabled={disabled}
                    maxLength={11}
                    pattern="^09\d{9}$"
                    dir="ltr"
                    placeholder={"09*********"}
                    className={clsx(
                        "!font-Medium disabled:text-gray-300  placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
                    )}
                    value={phoneNumber}
                    status={error && 'error'}
                    onChange={(e) => {
                        const value = e.target.value.trim();
                        if (value.includes(' ')) return;
                        const isValid = /^09\d{9}$/.test(value) || value === '';
                        setError(!isValid);
                        setPhoneNumber(e.target.value)
                    }}
                />
                <button onClick={() => {
                    const updateValue = numberList.length ? [...numberList, phoneNumber] : [phoneNumber];
                    const trimmedPhones = updateValue.filter(i => i != "")
                    const isExist = numberList.length ? numberList.includes(phoneNumber) : false;
                    if (!isExist) {
                        setNumberList(trimmedPhones);
                        setValue(trimmedPhones);
                    }
                    setPhoneNumber('');
                }} disabled={disabled || error || !phoneNumber.length} className={"rounded-[6px] !px-4 !py-1 disabled:!bg-slate-400 !bg-cta !opacity-70 !text-Highlighter !font-Regular !text-base"}>ثبت  </button>
            </div>
            <div className='flex flex-row gap-2 text-center flex-wrap  '>
                {numberList && numberList.length && numberList.map((i, index) => (
                    <div key={index} className={clsx('  bg-Highlighter flex justify-between  px-2  py-1 rounded-lg', disabled && "!bg-gray-100 !text-gray-400")}>
                        <span>{i}</span>
                        <button
                            type='button'
                            onClick={(e) => {
                                e.stopPropagation();
                                const trimmedPhones = numberList.filter(i => i != "")
                                console.log(trimmedPhones);

                                setNumberList(trimmedPhones.filter(item => item !== i));
                            }}

                            disabled={disabled}
                            className='rounded-[6px]  !opacity-70 !text-Highlighter !font-Regular !text-base'>
                            <DeleteOutlined className={clsx(disabled ? "!text-rose-300" : ' !text-Alert')} />
                        </button>
                    </div>
                ))}
            </div>
        </div >
    )
}
