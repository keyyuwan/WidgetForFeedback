import { Popover } from '@headlessui/react'
import { X } from 'phosphor-react'

export function CloseButton() {
  return (
    <Popover.Button
      className="top-5 right-5 absolute text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
      title="Fechar formulário de feedback"
    >
      <X className="h-4 w-4" weight="bold" />
    </Popover.Button>
  )
}
