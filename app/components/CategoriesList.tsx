'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useRouter, useParams } from 'next/navigation'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

type Category = {
  id:number,
  name:string
}

export default function CategoriesListNav({categories}: {categories:Category[]}) {
  const params = useParams();

  const currentCategoryId = +params.categoryId!;
  const initialCategory = categories.find(c => c.id === currentCategoryId) || categories[0]

  const router = useRouter();

  const [selected, setSelected] = useState(initialCategory)

  // update listbox if url changes
  useEffect(() => {
    const newCategory = categories.find(c => c.id === currentCategoryId)
    if (newCategory) {
      setSelected(newCategory)
    }
  }, [currentCategoryId, categories])


  const onChangeCategory = (category:Category) => {
    setSelected(category);
    router.push(`/${category.id}`)
  }

  return (
    <div className="w-52">
      <Listbox value={selected} onChange={onChangeCategory}>
        <ListboxButton
          className={clsx(
            'mt-2 relative block w-full rounded-lg bg-black/20 py-1.5 pr-8 pl-3 text-left text-sm/6 ',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 cursor-pointer'
          )}
        >
          {selected.name}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path  d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-(--button-width) rounded-xl border border-white/5 bg-black/70 p-1 [--anchor-gap:--spacing(1)] focus:outline-none',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0'
          )}
        >
          {categories.map((category:Category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className="group flex items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10 cursor-pointer"
            >
              <div className="text-sm/6 text-white">{category.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}