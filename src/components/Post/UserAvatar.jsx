function UserAvatar({ letter }) {
  const COLORS = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2'];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return (
    <div
      className='flex h-12.5 w-12.5 items-center justify-center rounded-md text-3xl font-bold text-white text-shadow-2xs text-shadow-black'
      style={{ backgroundColor: color }}
    >
      {letter}
    </div>
  );
}
export default UserAvatar;
