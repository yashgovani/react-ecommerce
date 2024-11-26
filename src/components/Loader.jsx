const Loader = () => {
  return (
    <div
      data-testid="test-loader"
      className="absolute inset-0 w-screen h-screen flex justify-center items-center z-[10000] bg-black/[0.1]"
    >
      <div
        data-testid="test-spinner"
        className="border-[0.25rem] border-transparent rounded-[50%] border-t-[0.25rem] border-t-dark-brown border-r-[0.25rem] border-r-dark-brown border-b-[0.25rem] border-b-dark-brown w-10 h-10 animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
