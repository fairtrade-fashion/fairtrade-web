const EmptyResource = ({ resourceName }: { resourceName: string }) => {
  return (
    <h1 className="my-2 text-center text-sm">
      No {resourceName} to display
    </h1>
  );
};

const Empty = ({ message }: { message: string }) => {
  return (
    <p className="my-2 text-center text-sm">{message}</p>
  );
};

export { Empty, EmptyResource };
