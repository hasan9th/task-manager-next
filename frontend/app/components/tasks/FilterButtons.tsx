"use client";

interface props {
  filter: string;
  changeFilter: (newFilter: string) => void;
}
export default function FilterButtons({ filter, changeFilter }: props) {
  return (
    <select
      name="filterSelect"
      onChange={(e) => changeFilter(e.target.value)}
      value={filter}
      className="my-2"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>
  );
}
