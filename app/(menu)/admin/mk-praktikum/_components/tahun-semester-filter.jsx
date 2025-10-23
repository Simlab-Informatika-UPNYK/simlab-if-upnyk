'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TahunSemesterFilter({ tahunSemester, onTahunSemesterChange, defaultValue }) {
  return (
    <Select onValueChange={onTahunSemesterChange} defaultValue={defaultValue}>
      <SelectTrigger className="">
        <SelectValue placeholder="Pilih Tahun Semester" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tahun Semester</SelectLabel>
          {tahunSemester.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.tahun_ajaran} {item.semester}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
