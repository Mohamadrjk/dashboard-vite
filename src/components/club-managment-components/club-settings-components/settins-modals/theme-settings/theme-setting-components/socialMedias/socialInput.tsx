import { Input } from 'antd';
import React from 'react'
import clsx from 'clsx';
interface SocialInputProps {
    urlInput: string,
    label: string,
    disabled: boolean,
    error: any;
    onSocialInputChnage: (value: string) => void
}
function SocialInput({ error, label, disabled, onSocialInputChnage, urlInput }: SocialInputProps) {
    return (
        <div className=' w-full md:w-1/2'>
            <div>
                {label}
            </div>
            <Input
                type="url"
                disabled={disabled}
                dir="ltr"
                placeholder={"https://"}
                className={clsx(
                    "!font-Medium disabled:text-gray-300   h-max !w-full  placeholder:!text-gray-300 placeholder:!text-secondary !p-[6px]"
                )}
                value={urlInput}
                status={error && 'error'}
                onChange={(e) => {
                    const value = e.target.value.trim();
                    onSocialInputChnage(value)
                }}
            />
        </div>
    )
}

export default SocialInput