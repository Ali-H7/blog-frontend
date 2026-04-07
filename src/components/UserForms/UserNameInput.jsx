function UserNameInput({ userName, setUserName, error }) {
  const additionalStyles = error ? 'border-red-500 focus:outline-0' : '';
  return (
    <div>
      <input
        className={`bg-tea_green-DEFAULT w-full rounded-md border p-2 focus:border-2 ${additionalStyles}`}
        type='text'
        name='userName'
        id='userName'
        placeholder='Username'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      {error && <p className='-mb-4 p-2 text-red-500'>{error}</p>}
    </div>
  );
}

export default UserNameInput;
