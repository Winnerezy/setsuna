export const Button = ({ onClick, children }: { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }) => {
  return (
    <button className='w-36 h-10 p-2 rounded-[20px] border border-[var(--global-border-bg)] justify-self-end font-semibold' onClick={onClick}>{ children }</button>
  )
}
