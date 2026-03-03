type TestComponentProps = {
  name: string;
};

export default function TestComponent({ name }: TestComponentProps) {
  return (
    <div>
      <h1>Hello {name}</h1>
      <button>Click Me</button>
    </div>
  );
}
