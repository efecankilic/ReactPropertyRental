// DatePickerComponent.tsx
import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface DatePickerComponentProps {
  onChange: (dates: any, dateStrings: [string, string]) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ onChange }) => (
  <RangePicker onChange={onChange} />
);

export default DatePickerComponent;
