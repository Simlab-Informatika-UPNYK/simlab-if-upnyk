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

export default function JadwalFilter({ tahunSemester, onTahunSemesterChange, defaultValue }) {
  return (
    <Select onValueChange={onTahunSemesterChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Pilih Tahun Semester" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tahun Semester</SelectLabel>
          {tahunSemester.map((item) => (
            <SelectItem key={item.id} value={item.slug}>
              {item.tahun_ajaran} {item.semester}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}