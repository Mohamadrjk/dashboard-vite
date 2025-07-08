import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'

function renderPlusMinusForCollapse(p) {
    return p.isActive ? <MinusOutlined  {...p} className='!border-none !outline-none !shadow-none' /> : <PlusOutlined  {...p} className='!border-none !outline-none !shadow-none' />
}

export { renderPlusMinusForCollapse } 