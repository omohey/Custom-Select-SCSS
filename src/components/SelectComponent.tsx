"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { TDataItem } from '../types/dataItem'

import styles from './SelectComponent.module.scss'

import clsx from 'clsx';

type TProps = {
    renderItem: (item: TDataItem) => React.ReactNode
    data: TDataItem[]
    multiple?: boolean
    initialValue?: string | string[]
    onChange?(value: string | string[]): void
    label?: string
}


const SelectComponent = ({ renderItem, data, multiple, initialValue, onChange, label }: TProps) => {
    // For single select -> string, for multiple select -> string[]
    const [selected, setSelected] = useState<string | string[] | null>(null);
    // Dropdown options open/close state
    const [isOpen, setIsOpen] = useState(false);
    // Ref for the entire container used to detect click outside and close the dropdown
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

    }, [isOpen, handleClickOutside]);

    // updating selected value based on initialValues
    useEffect(() => {
        if (initialValue) {
            if (multiple && Array.isArray(initialValue)) {
                const found = initialValue.filter((item) => data.find((dataItem) => dataItem.value === item))
                setSelected(found)
            }
            else {
                const found = data.find((item) => item.value === initialValue)
                if (found) {
                    setSelected(initialValue);
                }
                else {
                    setSelected('')
                }
            }
        }
        else {
            if (multiple) {
                setSelected([])
            }
            else {
                setSelected('')
            }

        }
    }, [initialValue, multiple, data]);

    // Callback for change of selected value
    useEffect(() => {
        if (onChange) {
            if (selected) {
                onChange(selected)
            }
        }
    }, [selected, onChange]);


    const handleSelect = useCallback((value: string) => () => {
        if (multiple) {
            if (Array.isArray(selected)) {
                if (selected.includes(value)) {
                    setSelected(selected.filter((item) => item !== value))
                }
                else {
                    if (data.find((item) => item.value === value)) {
                        setSelected([...selected, value])
                    }
                }
            }
        }
        else {
            if (data.find((item) => item.value === value)) {
                setSelected(value)
            }
        }
    }, [selected, multiple, data]);

    const handleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>

            {label && <label className={styles.label}>{label}</label>}


            <div className={styles.selectDisplay} onClick={handleOpen}>
                {multiple && Array.isArray(selected) && selected.map((item, index) => {
                    const found = data.find((dataItem) => dataItem.value === item)
                    if (found) {
                        if (index < selected.length - 1) {
                            return (
                                <div className={styles.selectedItem} key={found.value}>
                                    {renderItem(found)}
                                    <span className={styles.comma}>, </span>
                                </div>
                            )
                        }
                        return (<React.Fragment key={found.value}>
                            {renderItem(found)}
                        </React.Fragment>)
                    }
                    return null
                })}
                {!multiple && typeof selected === 'string' && selected && data.find((item) => item.value === selected) && renderItem(data.find((item) => item.value === selected)!)}
            </div>

            <div className={clsx(styles.selectOptions, { [styles.isActive]: isOpen })}>
                {data.map((item) => {
                    return (
                        <div key={item.value} onClick={handleSelect(item.value)} className={styles.option}>
                            {renderItem(item)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SelectComponent;