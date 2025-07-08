import React from 'react'
import { IClubCompanySocialMedias } from '../../../../../../../types/club-types/club_theme_types';
import clsx from 'clsx';
import { DeleteOutlined } from '@ant-design/icons';

function CurrentSocialList({ disabled, socialList, onDeleteSocial }: { socialList: IClubCompanySocialMedias[], disabled: boolean, onDeleteSocial: (item: IClubCompanySocialMedias) => void }) {
    return socialList?.length > 0 &&
        <div className='flex flex-row gap-2 text-center flex-wrap  '>
            {
                socialList.map((i, index) => (
                    <div key={index} className={clsx('  bg-Highlighter flex justify-between  px-2  py-1 rounded-lg', disabled && "!bg-gray-100 !text-gray-400")}>
                        <span>{i.title}</span>
                        <button
                            type='button'
                            disabled={disabled}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteSocial(i)
                            }}
                            className='rounded-[6px]  !opacity-70 !text-Highlighter !font-Regular !text-base'
                        >
                            <DeleteOutlined className={clsx(disabled ? "!text-rose-300" : ' !text-Alert')} />
                        </button>
                    </div>
                ))
            }
        </div>
}

export default CurrentSocialList