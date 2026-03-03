type TestComponentProps = {
  name: string;
};

export default function TestComponent({ name }: TestComponentProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Hello {name}</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Click Me
      </button>
    </div>
  );
}
