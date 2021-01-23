import React, { memo } from 'react';
import './index.scss'
import classNames from 'classnames'

export const Button = memo(props => {
  console.log('props', props)

  //classを複数指定
  let buttonClass = classNames('button', props.className)

  return (
    <div>
      <input type="button" className={buttonClass} onClick={props.onClick} value={props.value} />
    </div>
  )
})
