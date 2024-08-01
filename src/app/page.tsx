"use client";

import React, { useCallback, useState } from 'react';

import Day from '@/components/Day';
import SelectComponent from '@/components/SelectComponent';

import { TDataItem } from '@/types/dataItem';

const options: TDataItem[] = [
  { value: 'sunday', key: 'sunday', label: 'Sunday', color: 'red' },
  { value: 'monday', key: 'monday', label: 'Monday', color: 'green' },
  { value: 'tuesday', key: 'tuesday', label: 'Tuesday', color: 'aqua' },
  { value: 'wednesday', key: 'wednesday', label: 'Wednesday', color: 'yellow' },
  { value: 'thursday', key: 'thursday', label: 'Thursday', color: 'orange' },
  { value: 'friday', key: 'friday', label: 'Friday', color: 'mediumslateblue' },
  { value: 'saturday', key: 'saturday', label: 'Saturday', color: 'pink' },
];


export default function Home() {
  const [day, setDay] = useState<string>('');
  const [dayMultiple, setDayMultiple] = useState<string[]>([]);

  const renderItem = useCallback(
    (item: TDataItem) => (
      <Day
        label={item.label}
        color={item.color}
      />
    ),
    []
  );

  const handleDayMultipleChange = useCallback((value: string[]) => {
    setDayMultiple(value);
  }, []);

  const handleDayChange = useCallback((value: string) => {
    setDay(value);
  }, []);



  return (
    <main>

      <h3>Single Select</h3>
      <SelectComponent data={options} renderItem={renderItem} onChange={handleDayChange} label='Select a day' />


      <h3>Multiple Select</h3>
      <SelectComponent data={options} renderItem={renderItem} multiple onChange={handleDayMultipleChange} label='Select some days' />

    </main>
  );
}




