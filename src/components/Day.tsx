import React from 'react'

import styles from './Day.module.scss'

type TProps = {
    label: string;
    color: string;
}

const Day = ({ label, color }: TProps) => {
    return (
        <div className={styles.container} style={{ backgroundColor: color }}>
            {label}
        </div>
    )
}

export default Day
