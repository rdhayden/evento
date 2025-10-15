type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  // when we constrain the width with max-w-7xl mx-auto sets the margin left and right to auto which centers the div
  // max-h-screen sets the container to the height of the screen, equivalent to 100vh
  return (
    <div className="flex flex-col max-w-7xl mx-auto bg-white/[2%] max-h-screen">
      {children}
    </div>
  );
}
