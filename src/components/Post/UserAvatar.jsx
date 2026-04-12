function UserAvatar({ name }) {
  const COLORS = ['#ef476f', '#ffd166', '#06d6a0', '#118ab2'];
  const letter = name[0];

  function pickColor() {
    if (name === 'Guest') {
      return '#808080';
    } else {
      const num = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const i = num % COLORS.length;
      if (COLORS[i] === undefined) return '#808080';
      return COLORS[i];
    }
  }

  const color = pickColor();

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
